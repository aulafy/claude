-- Añade dos señales cerradas a instalaciones que ya aplicaron la migración inicial.

begin;

alter table private.learning_event_daily
  drop constraint if exists learning_event_daily_name_check;

alter table private.learning_event_daily
  add constraint learning_event_daily_name_check check (event_name in (
    'landing_view', 'mission_start', 'mission_complete', 'route_view',
    'route_step_toggle', 'route_selected', 'search_used', 'search_no_results',
    'lesson_25', 'lesson_50', 'lesson_90', 'next_lesson_click',
    'continue_return', 'return_7d', 'return_30d', 'feedback_useful', 'task_open', 'external_source_open'
  ));

create or replace function public.record_learning_event(p_event_name text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_event_name not in (
    'landing_view', 'mission_start', 'mission_complete', 'route_view',
    'route_step_toggle', 'route_selected', 'search_used', 'search_no_results',
    'lesson_25', 'lesson_50', 'lesson_90', 'next_lesson_click',
    'continue_return', 'return_7d', 'return_30d', 'feedback_useful', 'task_open', 'external_source_open'
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

commit;
