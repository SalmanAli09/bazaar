import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      fullName,
      phone,
      address,
      city,
      country,
      isSeller,
      storeName,
      storeAddress,
      storeBannerImage
    } = body;

    // Validate required fields
    if (!email || !password || !fullName || !city || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate seller-specific fields
    if (isSeller && !storeName) {
      return NextResponse.json(
        { error: 'Store name is required for sellers' },
        { status: 400 }
      );
    }

    // 1. Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: authError?.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    // 2. Create user record in our database
    const { error: userError } = await supabase
      .from('users')
      .insert({
        user_id: authData.user.id,
        email,
        password_hash: '', // Not storing password hash, Supabase handles this
        full_name: fullName,
        phone_number: phone || null,
        role: isSeller ? 'seller' : 'buyer',
        city,
        country,
      });

    if (userError) {
      return NextResponse.json(
        { error: 'Failed to create user profile' },
        { status: 500 }
      );
    }

    // 3. If seller, create seller record
    if (isSeller && storeName) {
      let storeBannerUrl = null;
      
      // Handle store banner image upload if provided
      if (storeBannerImage && typeof storeBannerImage === 'object') {
        try {
          const fileExt = storeBannerImage.name.split('.').pop();
          const fileName = `store-banner-${authData.user.id}.${fileExt}`;
          
          // Convert base64 to blob if needed
          let imageFile: Blob;
          if (storeBannerImage.base64) {
            const base64Data = storeBannerImage.base64.split(',')[1];
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            imageFile = new Blob([bytes], { type: `image/${fileExt}` });
          } else {
            imageFile = storeBannerImage;
          }
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('store-banners')
            .upload(fileName, imageFile);
          
          if (!uploadError && uploadData) {
            const { data: { publicUrl } } = supabase.storage
              .from('store-banners')
              .getPublicUrl(fileName);
            storeBannerUrl = publicUrl;
          }
        } catch (uploadError) {
          console.error('Error uploading store banner:', uploadError);
        }
      }

      const { error: sellerError } = await supabase
        .from('sellers')
        .insert({
          user_id: authData.user.id,
          store_name: storeName,
          store_banner_image: storeBannerUrl,
          pickup_address: storeAddress || null,
          city,
          country,
        });

      if (sellerError) {
        return NextResponse.json(
          { error: 'Failed to create seller profile' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Account created successfully',
        userId: authData.user.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
