-- Bazaar Marketplace Database Schema v2
-- PostgreSQL schema with UUIDs, Enums, and Audit Triggers

-- 0. Setup Extensions and Types
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
    CREATE TYPE offer_status AS ENUM ('pending', 'accepted', 'rejected', 'expired');
    CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'completed', 'cancelled');
    CREATE TYPE item_condition AS ENUM ('new', 'like_new', 'used_good', 'used_fair', 'refurbished');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop tables for clean recreation
DROP TABLE IF EXISTS seller_analytics CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS offer_images CASCADE;
DROP TABLE IF EXISTS offers CASCADE;
DROP TABLE IF EXISTS buyer_requests CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users Table (Core Identity)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    role user_role NOT NULL DEFAULT 'buyer',
    city VARCHAR(100),
    country VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sellers Table (Store Profile)
CREATE TABLE sellers (
    seller_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    store_name VARCHAR(255) NOT NULL,
    store_banner_image TEXT,
    pickup_address TEXT,
    city VARCHAR(100),    -- Specific store location
    country VARCHAR(100),
    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categories Table
CREATE TABLE categories (
    category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    icon_name VARCHAR(50), -- Reference to Lucide icon name
    bg_color VARCHAR(50),
    text_color VARCHAR(50),
    item_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Products Table (Inventory)
CREATE TABLE products (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(category_id),
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    product_actual_price DECIMAL(12,2) NOT NULL,
    product_selling_price DECIMAL(12,2) NOT NULL,
    condition item_condition DEFAULT 'used_good',
    is_negotiable BOOLEAN DEFAULT false,
    is_urgent BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_draft BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT false,
    is_sold BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Product Images Table
CREATE TABLE product_images (
    image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- 6. Buyer Requests Table (Bidding/Reverse Auction)
CREATE TABLE buyer_requests (
    request_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(category_id),
    budget_max DECIMAL(12,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Offers Table (Seller responses to Requests)
CREATE TABLE offers (
    offer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE,
    buyer_request_id UUID NOT NULL REFERENCES buyer_requests(request_id) ON DELETE CASCADE,
    offered_price DECIMAL(12,2) NOT NULL,
    seller_message TEXT,
    offer_status offer_status DEFAULT 'pending',
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '3 days'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Offer Images Table
CREATE TABLE offer_images (
    image_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID NOT NULL REFERENCES offers(offer_id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

-- 9. Orders Table (Transactions)
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(product_id), -- For direct shop sales
    offer_id UUID REFERENCES offers(offer_id),     -- For accepted requests
    buyer_id UUID NOT NULL REFERENCES users(user_id),
    seller_id UUID NOT NULL REFERENCES sellers(seller_id),
    final_price DECIMAL(12,2) NOT NULL,
    status order_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Seller Analytics (Historical snapshots)
CREATE TABLE seller_analytics (
    analytics_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES sellers(seller_id) ON DELETE CASCADE,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    total_items_sold INTEGER DEFAULT 0,
    monthly_items_sold INTEGER DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

---
--- TRIGGERS & INDEXES
---

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_sellers BEFORE UPDATE ON sellers FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_products BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_offers BEFORE UPDATE ON offers FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp_orders BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Indexes for performance
CREATE INDEX idx_products_published_not_sold ON products(is_published, is_sold);
CREATE INDEX idx_orders_seller_status ON orders(seller_id, status);
CREATE INDEX idx_offers_request_status ON offers(buyer_request_id, offer_status);
CREATE INDEX idx_users_geo ON users(country, city);

-- Sample Data
INSERT INTO categories (name, icon_name, bg_color, text_color) VALUES
('Apparel', 'Shirt', 'bg-red-100', 'text-red-600'),
('Tech', 'Smartphone', 'bg-blue-100', 'text-blue-600'),
('Home', 'Home', 'bg-green-100', 'text-green-600');