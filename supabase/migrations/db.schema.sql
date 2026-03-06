-- ============================================
-- BAZAAR - Pakistan's Thrift Marketplace
-- Supabase Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Will be hashed
    cnic_number VARCHAR(15) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('buyer', 'seller')),
    
    -- Store Information (required if role = seller)
    store_name VARCHAR(255),
    store_address TEXT,
    pickup_address TEXT,
    phone_number VARCHAR(20),
    
    -- System Fields
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT check_seller_fields 
        CHECK (
            role = 'buyer' OR 
            (role = 'seller' AND store_name IS NOT NULL AND store_address IS NOT NULL AND pickup_address IS NOT NULL AND phone_number IS NOT NULL)
        )
);

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    bg_color VARCHAR(50),
    text_color VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, icon, bg_color, text_color) VALUES
('Clothing', 'checkroom', 'bg-rose-100', 'text-rose-500'),
('Electronics', 'devices', 'bg-blue-100', 'text-blue-500'),
('Furniture', 'chair', 'bg-orange-100', 'text-orange-500'),
('Books', 'book', 'bg-purple-100', 'text-purple-500'),
('Accessories', 'watch', 'bg-amber-100', 'text-amber-500');

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id),
    
    -- Basic Information
    ad_title VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    condition VARCHAR(50) NOT NULL CHECK (condition IN ('Brand New', 'Like New', 'Good', 'Gently Used', 'Used')),
    description TEXT,
    product_pictures TEXT[], -- Array of image URLs
    
    -- Pricing
    selling_price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    negotiable_price BOOLEAN DEFAULT FALSE,
    
    -- Boost Options
    featured BOOLEAN DEFAULT FALSE,
    urgent BOOLEAN DEFAULT FALSE,
    
    -- Listing Status
    is_draft BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    is_sold BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. BUYER REQUESTS TABLE
-- ============================================
CREATE TABLE buyer_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Request Details
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    budget DECIMAL(10, 2),
    condition_required VARCHAR(50) DEFAULT 'Any' CHECK (condition_required IN ('Any', 'New', 'Like New', 'Good')),
    description TEXT,
    reference_image TEXT, -- Optional reference image URL
    
    -- Request Status
    is_active BOOLEAN DEFAULT TRUE,
    is_fulfilled BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. SELLER OFFERS TABLE
-- ============================================
CREATE TABLE seller_offers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    request_id UUID NOT NULL REFERENCES buyer_requests(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Offer Details
    offered_price DECIMAL(10, 2) NOT NULL,
    message_to_buyer TEXT,
    upload_photos TEXT[], -- Array of product image URLs
    
    -- Offer Status
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint: One offer per seller per request
    UNIQUE(request_id, seller_id)
);

-- ============================================
-- 6. PRODUCT REVIEWS TABLE
-- ============================================
CREATE TABLE product_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Review Details
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Unique constraint: One review per product per user
    UNIQUE(product_id, reviewer_id)
);

-- ============================================
-- 7. MESSAGES TABLE (Chat System)
-- ============================================
CREATE TABLE messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    offer_id UUID REFERENCES seller_offers(id) ON DELETE CASCADE,
    
    -- Message Details
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CHECK ((product_id IS NOT NULL) OR (offer_id IS NOT NULL))
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_cnic ON users(cnic_number);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- Products table indexes
CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_city ON products(city);
CREATE INDEX idx_products_is_published ON products(is_published);
CREATE INDEX idx_products_is_sold ON products(is_sold);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_urgent ON products(urgent);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Buyer requests indexes
CREATE INDEX idx_buyer_requests_buyer_id ON buyer_requests(buyer_id);
CREATE INDEX idx_buyer_requests_is_active ON buyer_requests(is_active);
CREATE INDEX idx_buyer_requests_category ON buyer_requests(category);

-- Seller offers indexes
CREATE INDEX idx_seller_offers_request_id ON seller_offers(request_id);
CREATE INDEX idx_seller_offers_seller_id ON seller_offers(seller_id);
CREATE INDEX idx_seller_offers_status ON seller_offers(status);

-- Reviews indexes
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_seller_id ON product_reviews(seller_id);
CREATE INDEX idx_product_reviews_rating ON product_reviews(rating);

-- Messages indexes
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_product_id ON messages(product_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Products table policies
CREATE POLICY "Anyone can view published products" ON products
    FOR SELECT USING (is_published = TRUE AND is_sold = FALSE);

CREATE POLICY "Sellers can manage their own products" ON products
    FOR ALL USING (auth.uid()::text = seller_id::text);

-- Buyer requests policies
CREATE POLICY "Anyone can view active requests" ON buyer_requests
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Buyers can manage their own requests" ON buyer_requests
    FOR ALL USING (auth.uid()::text = buyer_id::text);

-- Seller offers policies
CREATE POLICY "Sellers can manage their own offers" ON seller_offers
    FOR ALL USING (auth.uid()::text = seller_id::text);

CREATE POLICY "Buyers can view offers for their requests" ON seller_offers
    FOR SELECT USING (auth.uid()::text IN (SELECT buyer_id::text FROM buyer_requests WHERE id = request_id));

-- Product reviews policies
CREATE POLICY "Anyone can view reviews" ON product_reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for purchased products" ON product_reviews
    FOR INSERT WITH CHECK (auth.uid()::text = reviewer_id::text);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (auth.uid()::text IN (sender_id::text, receiver_id::text));

CREATE POLICY "Users can create messages" ON messages
    FOR INSERT WITH CHECK (auth.uid()::text = sender_id::text);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buyer_requests_updated_at BEFORE UPDATE ON buyer_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seller_offers_updated_at BEFORE UPDATE ON seller_offers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
