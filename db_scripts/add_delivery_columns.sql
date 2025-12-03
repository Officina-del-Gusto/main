-- Add delivery_type column if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'order_requests' and column_name = 'delivery_type') then
        alter table order_requests add column delivery_type text not null default 'pickup';
    end if;
end $$;

-- Add delivery_address column if it doesn't exist
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'order_requests' and column_name = 'delivery_address') then
        alter table order_requests add column delivery_address text;
    end if;
end $$;
