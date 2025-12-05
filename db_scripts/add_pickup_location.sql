-- Add pickup_location column to order_requests table
ALTER TABLE order_requests ADD COLUMN IF NOT EXISTS pickup_location TEXT;
