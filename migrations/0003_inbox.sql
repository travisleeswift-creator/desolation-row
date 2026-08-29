create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists part_two_list (
  id serial primary key,
  name text,
  email text not null unique,
  created_at timestamptz not null default now()
);
create unique index if not exists part_two_list_email_idx on part_two_list (email);
