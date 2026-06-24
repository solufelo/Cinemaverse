-- CinemaVerse status feed (run in Supabase SQL editor)

create table if not exists public.status_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username text not null,
  tmdb_id integer not null,
  media_type text not null default 'movie',
  title text not null,
  poster_path text,
  status text not null check (status in ('watching', 'completed', 'planned', 'dropped')),
  note text,
  rating smallint check (rating is null or (rating >= 1 and rating <= 10))
);

alter table public.status_posts enable row level security;

create policy "Anyone can read posts"
  on public.status_posts for select
  using (true);

create policy "Users insert own posts"
  on public.status_posts for insert
  with check (auth.uid() = user_id);

create policy "Users delete own posts"
  on public.status_posts for delete
  using (auth.uid() = user_id);
