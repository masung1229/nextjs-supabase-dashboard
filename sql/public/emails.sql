-- SQL Editor > New query
-- https://supabase.com/docs/guides/auth/managing-user-data

drop table if exists emails;

create table emails (
  id bigint generated by default as identity primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  user_id uuid references users(id) on delete cascade not null,
  email varchar(255) not null,
  email_confirmed_at timestamptz,
  unique (user_id, email)
);

-- Secure the table
alter table emails enable row level security;

-- Add row-level security
create policy "Users can view their emails." on emails for select to authenticated using ( auth.uid() = user_id );
create policy "Users can insert their own email." on emails for insert to authenticated with check ( auth.uid() = user_id );
create policy "Users can update their own email." on emails for update to authenticated using ( auth.uid() = user_id );
create policy "Users can delete their own email." on emails for delete to authenticated using ( auth.uid() = user_id );

-- Update a column timestamp on every update.
create extension if not exists moddatetime schema extensions;

-- assuming the table name is "emails", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
drop trigger if exists handle_updated_at on emails;

create trigger handle_updated_at before update on emails
  for each row execute procedure moddatetime (updated_at);
