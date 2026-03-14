export interface User {
  id: string;
  full_name: string;
  email: string;
  cnic_number: string;
  role: 'buyer' | 'seller';
  store_name?: string;
  store_address?: string;
  pickup_address?: string;
  phone_number?: string;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  ad_title: string;
  city: string;
  condition: string;
  description: string;
  product_pictures: string[];
  selling_price: number;
  original_price: number;
  negotiable_price: boolean;
  featured: boolean;
  urgent: boolean;
  is_draft: boolean;
  is_published: boolean;
  is_sold: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductWithSeller extends Product {
  seller: {
    id: string;
    full_name: string;
    email: string;
    store_name?: string;
    phone_number?: string;
    is_verified: boolean;
  };
}

export interface Review {
  id: string;
  rating: number;
  review_text: string;
  created_at: string;
  reviewer: {
    full_name: string;
  };
  product: {
    ad_title: string;
    product_pictures: string[];
  };
}

export const staticUser: User = {
  id: 'user-1',
  full_name: 'M Salman Ali',
  email: 'msalmanali7890@gmail.com',
  cnic_number: '35202-1234567-1',
  role: 'seller',
  store_name: 'Vintage Vibes',
  store_address: 'Lahore, Pakistan',
  pickup_address: 'Gulberg III, Lahore',
  phone_number: '0321-1234567',
  is_verified: true,
  is_active: true,
  created_at: '2025-01-15T10:00:00Z',
  updated_at: '2025-03-01T10:00:00Z',
};

export const staticProducts: Product[] = [
  {
    id: 'prod-1',
    seller_id: 'user-1',
    category_id: 'clothing',
    ad_title: 'Vintage Levi\'s 501 Jeans',
    city: 'Lahore',
    condition: 'Like New',
    description: 'Authentic Levi\'s 501 jeans in excellent condition. Barely worn, classic fit with no signs of wear. Perfect for vintage denim lovers.',
    product_pictures: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'],
    selling_price: 3500,
    original_price: 8000,
    negotiable_price: true,
    featured: true,
    urgent: false,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-03-10T10:00:00Z',
    updated_at: '2026-03-10T10:00:00Z',
  },
  {
    id: 'prod-2',
    seller_id: 'user-1',
    category_id: 'electronics',
    ad_title: 'iPhone 14 Pro Max - 256GB',
    city: 'Karachi',
    condition: 'Gently Used',
    description: 'iPhone 14 Pro Max in great condition. Comes with original box, charger, and a free case. Battery health at 92%.',
    product_pictures: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600'],
    selling_price: 185000,
    original_price: 350000,
    negotiable_price: true,
    featured: true,
    urgent: true,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-03-08T14:30:00Z',
    updated_at: '2026-03-08T14:30:00Z',
  },
  {
    id: 'prod-3',
    seller_id: 'user-1',
    category_id: 'furniture',
    ad_title: 'Mid-Century Modern Coffee Table',
    city: 'Islamabad',
    condition: 'Used',
    description: 'Beautiful walnut coffee table with tapered legs. Minor scratches on top, otherwise in great shape. Dimensions: 120cm x 60cm.',
    product_pictures: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=600'],
    selling_price: 12000,
    original_price: 25000,
    negotiable_price: false,
    featured: false,
    urgent: false,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-03-05T09:00:00Z',
    updated_at: '2026-03-05T09:00:00Z',
  },
  {
    id: 'prod-4',
    seller_id: 'user-1',
    category_id: 'clothing',
    ad_title: 'Nike Air Jordan 1 Retro High',
    city: 'Lahore',
    condition: 'Brand New',
    description: 'Brand new Nike Air Jordan 1 Retro High OG. Size 10 US. Never worn, still in original packaging with receipt.',
    product_pictures: ['https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600'],
    selling_price: 28000,
    original_price: 42000,
    negotiable_price: true,
    featured: false,
    urgent: false,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-03-02T16:00:00Z',
    updated_at: '2026-03-02T16:00:00Z',
  },
  {
    id: 'prod-5',
    seller_id: 'user-1',
    category_id: 'electronics',
    ad_title: 'Sony WH-1000XM5 Headphones',
    city: 'Faisalabad',
    condition: 'Like New',
    description: 'Premium noise-canceling headphones. Used for 2 months only. Comes with all original accessories and box.',
    product_pictures: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600'],
    selling_price: 45000,
    original_price: 72000,
    negotiable_price: true,
    featured: false,
    urgent: true,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-02-28T11:00:00Z',
    updated_at: '2026-02-28T11:00:00Z',
  },
  {
    id: 'prod-6',
    seller_id: 'user-1',
    category_id: 'books',
    ad_title: 'Complete Harry Potter Box Set',
    city: 'Rawalpindi',
    condition: 'Gently Used',
    description: 'All 7 books in the Harry Potter series. Paperback edition. Pages in good condition with no markings.',
    product_pictures: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600'],
    selling_price: 4500,
    original_price: 9000,
    negotiable_price: false,
    featured: false,
    urgent: false,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-02-25T08:00:00Z',
    updated_at: '2026-02-25T08:00:00Z',
  },
  {
    id: 'prod-7',
    seller_id: 'user-1',
    category_id: 'sports',
    ad_title: 'Mountain Bike - Trek Marlin 7',
    city: 'Lahore',
    condition: 'Used',
    description: 'Trek Marlin 7 mountain bike. 2024 model with hydraulic disc brakes. Some minor scratches but rides perfectly.',
    product_pictures: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600'],
    selling_price: 65000,
    original_price: 120000,
    negotiable_price: true,
    featured: false,
    urgent: false,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-02-20T13:00:00Z',
    updated_at: '2026-02-20T13:00:00Z',
  },
  {
    id: 'prod-8',
    seller_id: 'user-1',
    category_id: 'home',
    ad_title: 'Dyson V15 Detect Vacuum',
    city: 'Karachi',
    condition: 'Like New',
    description: 'Dyson V15 Detect cordless vacuum. Used for 3 months. All attachments included. Laser dust detection works perfectly.',
    product_pictures: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600'],
    selling_price: 55000,
    original_price: 95000,
    negotiable_price: true,
    featured: true,
    urgent: false,
    is_draft: false,
    is_published: true,
    is_sold: false,
    created_at: '2026-02-18T10:00:00Z',
    updated_at: '2026-02-18T10:00:00Z',
  },
];

export const staticSellerStats = {
  listings: 8,
  sales: 24,
  rating: 4.7,
  reviews: 18,
};

export const staticReviews: Review[] = [
  {
    id: 'rev-1',
    rating: 5,
    review_text: 'Excellent seller! Item was exactly as described and shipping was fast. Would definitely buy from again.',
    created_at: '2026-03-12T10:00:00Z',
    reviewer: { full_name: 'Ahmed Khan' },
    product: { ad_title: 'Vintage Levi\'s 501 Jeans', product_pictures: [] },
  },
  {
    id: 'rev-2',
    rating: 4,
    review_text: 'Good quality product. Packaging could have been better but overall a great experience.',
    created_at: '2026-03-08T14:00:00Z',
    reviewer: { full_name: 'Sara Malik' },
    product: { ad_title: 'Sony WH-1000XM5 Headphones', product_pictures: [] },
  },
  {
    id: 'rev-3',
    rating: 5,
    review_text: 'Perfect condition as promised. The seller was very responsive and helpful throughout.',
    created_at: '2026-03-01T09:00:00Z',
    reviewer: { full_name: 'Usman Raza' },
    product: { ad_title: 'iPhone 14 Pro Max - 256GB', product_pictures: [] },
  },
  {
    id: 'rev-4',
    rating: 4,
    review_text: 'Great deal for the price. Minor wear but seller was upfront about it. Recommended!',
    created_at: '2026-02-25T16:00:00Z',
    reviewer: { full_name: 'Fatima Noor' },
    product: { ad_title: 'Mid-Century Modern Coffee Table', product_pictures: [] },
  },
  {
    id: 'rev-5',
    rating: 5,
    review_text: 'Amazing seller with great communication. Item arrived quickly and in perfect condition.',
    created_at: '2026-02-20T11:00:00Z',
    reviewer: { full_name: 'Ali Hassan' },
    product: { ad_title: 'Complete Harry Potter Box Set', product_pictures: [] },
  },
];

export const staticRatingDistribution = {
  5: 10,
  4: 5,
  3: 2,
  2: 1,
  1: 0,
};

export const staticSellerProfile = {
  id: 'user-1',
  full_name: 'M Salman Ali',
  email: 'msalmanali7890@gmail.com',
  store_name: 'Vintage Vibes',
  store_address: 'Gulberg III, Lahore',
  pickup_address: 'Gulberg III, Lahore',
  phone_number: '0321-1234567',
  is_verified: true,
  is_active: true,
  created_at: '2025-01-15T10:00:00Z',
  stats: staticSellerStats,
};
