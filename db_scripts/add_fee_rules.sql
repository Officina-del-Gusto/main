ALTER TABLE store_settings
ADD COLUMN IF NOT EXISTS fee_rules JSONB DEFAULT '{
  "standard": {
    "packaging": [],
    "delivery": []
  },
  "special": {
    "packaging": [],
    "delivery": []
  }
}'::jsonb;
