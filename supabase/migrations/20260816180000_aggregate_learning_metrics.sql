-- Métricas educativas agregadas, sin identificadores de visitante ni contenido.
-- Cada llamada incrementa únicamente un contador diario de un evento permitido.

begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table private.learning_event_daily (
  event_day date not null default current_date,
  event_name text not null,
  event_count bigint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (event_day, event_name),
  constraint learning_event_daily_name_check check (event_name in (
    'landing_view',
    'mission_start',
    'mission_complete',
    'route_view',
    'route_step_toggle',
    'route_selected',
    'search_used',
    'search_no_results',
    'lesson_25',
    'lesson_50',
    'lesson_90',
    'next_lesson_click',
    'continue_return', 'return_7d', 'return_30d',
    'feedback_useful',
    'task_open',
    'external_source_open'
  )),
  constraint learning_event_daily_count_check check (event_count >= 0)
);

revoke all on table private.learning_event_daily from public, anon, authenticated;

create or replace function public.record_learning_event(p_event_name text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_name not in (
    'landing_view', 'mission_start', 'mission_complete', 'route_view',
    'route_step_toggle', 'route_selected', 'search_used', 'search_no_results', 'lesson_25',
    'lesson_50', 'lesson_90', 'next_lesson_click', 'continue_return', 'return_7d', 'return_30d',
    'feedback_useful', 'task_open', 'external_source_open'
  ) then
    raise exception 'Unsupported learning event';
  end if;

  insert into private.learning_event_daily (event_day, event_name, event_count)
  values (current_date, p_event_name, 1)
  on conflict (event_day, event_name)
  do update set
    event_count = private.learning_event_daily.event_count + 1,
    updated_at = now();
end;
$$;

revoke all on function public.record_learning_event(text) from public, anon, authenticated;
grant execute on function public.record_learning_event(text) to service_role;

create or replace function public.get_learning_event_summary(p_days integer default 30)
returns table (event_day date, event_name text, event_count bigint)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'Not authorized';
  end if;

  return query
  select metric.event_day, metric.event_name, metric.event_count
  from private.learning_event_daily as metric
  where metric.event_day >= current_date - greatest(1, least(coalesce(p_days, 30), 365))
  order by metric.event_day desc, metric.event_name asc;
end;
$$;

revoke all on function public.get_learning_event_summary(integer) from public, anon, authenticated;
grant execute on function public.get_learning_event_summary(integer) to service_role;

commit;
