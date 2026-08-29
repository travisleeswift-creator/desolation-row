create table if not exists entitlements (
  id serial primary key,
  user_id text not null,
  product_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
create index if not exists entitlements_user_id_idx on entitlements (user_id);

create table if not exists reading_progress (
  user_id text not null,
  slug text not null,
  block_index int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, slug)
);
