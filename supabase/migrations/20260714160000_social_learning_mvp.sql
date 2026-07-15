-- Aulafy Comunidad — piloto de aprendizaje social.
-- Ejecutar como una migración única en un proyecto Supabase nuevo.

begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to authenticated;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  display_name text not null default 'Estudiante Aulafy',
  bio text,
  website text,
  interests text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_format check (username ~ '^[a-z0-9_]{3,30}$'),
  constraint profiles_display_name_length check (char_length(btrim(display_name)) between 2 and 80),
  constraint profiles_bio_length check (bio is null or char_length(bio) <= 500),
  constraint profiles_website_check check (
    website is null or (char_length(website) <= 300 and website ~* '^https?://')
  ),
  constraint profiles_interests_limit check (
    cardinality(interests) <= 8 and char_length(array_to_string(interests, ',')) <= 240
  )
);

create unique index profiles_username_unique_ci on public.profiles (lower(username));

-- Separar los roles evita que un usuario pueda ascenderse editando su perfil.
create table public.user_roles (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  constraint user_roles_role_check check (role in ('member', 'moderator', 'admin'))
);

-- Catálogo pequeño y explícito para el piloto. Impide publicar contra slugs inventados.
create table public.social_learning_units (
  course_slug text not null,
  lesson_slug text not null,
  course_title text not null,
  lesson_title text not null,
  project_prompt text not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (course_slug, lesson_slug)
);

create table public.learning_projects (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  course_slug text not null,
  lesson_slug text not null,
  title text not null,
  summary text not null,
  what_built text not null,
  what_learned text not null,
  obstacles text,
  technologies text[] not null default '{}',
  difficulty text not null default 'principiante',
  repository_url text,
  demo_url text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learning_projects_unit_fk
    foreign key (course_slug, lesson_slug)
    references public.social_learning_units(course_slug, lesson_slug),
  constraint learning_projects_title_length check (char_length(btrim(title)) between 6 and 120),
  constraint learning_projects_summary_length check (char_length(btrim(summary)) between 20 and 320),
  constraint learning_projects_what_built_length check (char_length(btrim(what_built)) between 40 and 4000),
  constraint learning_projects_what_learned_length check (char_length(btrim(what_learned)) between 20 and 2000),
  constraint learning_projects_obstacles_length check (obstacles is null or char_length(obstacles) <= 2000),
  constraint learning_projects_technologies_limit check (
    cardinality(technologies) <= 8 and char_length(array_to_string(technologies, ',')) <= 240
  ),
  constraint learning_projects_difficulty_check check (difficulty in ('principiante', 'intermedio', 'avanzado')),
  constraint learning_projects_repository_url_check check (
    repository_url is null or (char_length(repository_url) <= 500 and repository_url ~* '^https?://')
  ),
  constraint learning_projects_demo_url_check check (
    demo_url is null or (char_length(demo_url) <= 500 and demo_url ~* '^https?://')
  ),
  constraint learning_projects_status_check check (status in ('draft', 'published', 'hidden', 'removed'))
);

create table public.project_reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.learning_projects(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  works_correctly text not null default 'not_tested',
  explanation_rating smallint not null,
  educational_value smallint not null,
  feedback text not null,
  suggestion text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint project_reviews_one_per_reviewer unique (project_id, reviewer_id),
  constraint project_reviews_works_check check (works_correctly in ('yes', 'partly', 'not_tested')),
  constraint project_reviews_explanation_check check (explanation_rating between 1 and 5),
  constraint project_reviews_educational_check check (educational_value between 1 and 5),
  constraint project_reviews_feedback_length check (char_length(btrim(feedback)) between 40 and 2000),
  constraint project_reviews_suggestion_length check (suggestion is null or char_length(suggestion) <= 1200),
  constraint project_reviews_status_check check (status in ('published', 'hidden', 'removed'))
);

create table public.content_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  reason text not null,
  details text,
  status text not null default 'open',
  resolved_by uuid references public.profiles(id) on delete set null,
  resolved_at timestamptz,
  created_at timestamptz not null default now(),
  constraint content_reports_target_type_check check (target_type in ('project', 'review', 'profile')),
  constraint content_reports_reason_check check (reason in ('spam', 'illegal', 'harassment', 'copyright', 'privacy', 'malware', 'other')),
  constraint content_reports_details_length check (details is null or char_length(details) <= 1500),
  constraint content_reports_status_check check (status in ('open', 'reviewing', 'resolved', 'dismissed'))
);

create unique index content_reports_one_open_per_target
  on public.content_reports (reporter_id, target_type, target_id)
  where status in ('open', 'reviewing');

create table public.moderation_actions (
  id uuid primary key default gen_random_uuid(),
  moderator_id uuid not null references public.profiles(id) on delete restrict,
  target_type text not null,
  target_id uuid not null,
  action text not null,
  reason text not null,
  created_at timestamptz not null default now(),
  constraint moderation_actions_target_type_check check (target_type in ('project', 'review', 'profile')),
  constraint moderation_actions_action_check check (action in ('hide', 'restore', 'remove', 'dismiss_report')),
  constraint moderation_actions_reason_length check (char_length(btrim(reason)) between 10 and 1000)
);

create or replace function private.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  safe_name text;
begin
  safe_name := left(
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 'Estudiante Aulafy'),
    80
  );

  insert into public.profiles (id, username, display_name)
  values (new.id, 'user_' || substr(replace(new.id::text, '-', ''), 1, 12), safe_name);

  insert into public.user_roles (user_id, role)
  values (new.id, 'member');

  return new;
end;
$$;

create or replace function private.is_moderator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role in ('moderator', 'admin')
  );
$$;

create or replace function private.set_project_publish_time()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  elsif new.status = 'draft' then
    new.published_at = null;
  end if;
  return new;
end;
$$;

create or replace function private.validate_report_target()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.target_type = 'project' and not exists (
    select 1 from public.learning_projects where id = new.target_id
  ) then
    raise exception 'El proyecto denunciado no existe.';
  elsif new.target_type = 'review' and not exists (
    select 1 from public.project_reviews where id = new.target_id
  ) then
    raise exception 'La revisión denunciada no existe.';
  elsif new.target_type = 'profile' and not exists (
    select 1 from public.profiles where id = new.target_id
  ) then
    raise exception 'El perfil denunciado no existe.';
  end if;
  return new;
end;
$$;

create or replace function private.prevent_self_review()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if exists (
    select 1
    from public.learning_projects
    where id = new.project_id and author_id = new.reviewer_id
  ) then
    raise exception 'No puedes revisar tu propio proyecto.';
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function private.touch_updated_at();

create trigger projects_touch_updated_at
  before update on public.learning_projects
  for each row execute function private.touch_updated_at();

create trigger projects_set_publish_time
  before insert or update on public.learning_projects
  for each row execute function private.set_project_publish_time();

create trigger reviews_touch_updated_at
  before update on public.project_reviews
  for each row execute function private.touch_updated_at();

create trigger reviews_prevent_self_review
  before insert or update on public.project_reviews
  for each row execute function private.prevent_self_review();

create trigger reports_validate_target
  before insert on public.content_reports
  for each row execute function private.validate_report_target();

revoke all on function private.handle_new_user() from public, anon, authenticated;
revoke all on function private.touch_updated_at() from public, anon, authenticated;
revoke all on function private.set_project_publish_time() from public, anon, authenticated;
revoke all on function private.prevent_self_review() from public, anon, authenticated;
revoke all on function private.validate_report_target() from public, anon, authenticated;
revoke all on function private.is_moderator() from public, anon, authenticated;
grant execute on function private.is_moderator() to authenticated;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.social_learning_units enable row level security;
alter table public.learning_projects enable row level security;
alter table public.project_reviews enable row level security;
alter table public.content_reports enable row level security;
alter table public.moderation_actions enable row level security;

create policy profiles_public_read
  on public.profiles for select
  to anon, authenticated
  using (true);

create policy profiles_update_own
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy user_roles_read_own_or_moderator
  on public.user_roles for select
  to authenticated
  using ((select auth.uid()) = user_id or (select private.is_moderator()));

create policy social_learning_units_public_read
  on public.social_learning_units for select
  to anon, authenticated
  using (enabled = true);

create policy social_learning_units_moderator_read
  on public.social_learning_units for select
  to authenticated
  using ((select private.is_moderator()));

create policy projects_public_read
  on public.learning_projects for select
  to anon, authenticated
  using (status = 'published');

create policy projects_owner_or_moderator_read
  on public.learning_projects for select
  to authenticated
  using ((select auth.uid()) = author_id or (select private.is_moderator()));

create policy projects_insert_own
  on public.learning_projects for insert
  to authenticated
  with check (
    (select auth.uid()) = author_id
    and status in ('draft', 'published')
    and exists (
      select 1 from public.social_learning_units unit
      where unit.course_slug = learning_projects.course_slug
        and unit.lesson_slug = learning_projects.lesson_slug
        and unit.enabled = true
    )
  );

create policy projects_update_own
  on public.learning_projects for update
  to authenticated
  using ((select auth.uid()) = author_id and status in ('draft', 'published'))
  with check ((select auth.uid()) = author_id and status in ('draft', 'published'));

create policy projects_update_moderator
  on public.learning_projects for update
  to authenticated
  using ((select private.is_moderator()))
  with check ((select private.is_moderator()));

create policy projects_delete_own_draft
  on public.learning_projects for delete
  to authenticated
  using ((select auth.uid()) = author_id and status = 'draft');

create policy reviews_public_read
  on public.project_reviews for select
  to anon, authenticated
  using (
    status = 'published'
    and exists (
      select 1 from public.learning_projects project
      where project.id = project_reviews.project_id and project.status = 'published'
    )
  );

create policy reviews_owner_or_moderator_read
  on public.project_reviews for select
  to authenticated
  using ((select auth.uid()) = reviewer_id or (select private.is_moderator()));

create policy reviews_insert_own
  on public.project_reviews for insert
  to authenticated
  with check (
    (select auth.uid()) = reviewer_id
    and status = 'published'
    and exists (
      select 1 from public.learning_projects project
      where project.id = project_reviews.project_id
        and project.status = 'published'
        and project.author_id <> (select auth.uid())
    )
  );

create policy reviews_update_own
  on public.project_reviews for update
  to authenticated
  using ((select auth.uid()) = reviewer_id and status = 'published')
  with check ((select auth.uid()) = reviewer_id and status = 'published');

create policy reviews_update_moderator
  on public.project_reviews for update
  to authenticated
  using ((select private.is_moderator()))
  with check ((select private.is_moderator()));

create policy reports_read_own_or_moderator
  on public.content_reports for select
  to authenticated
  using ((select auth.uid()) = reporter_id or (select private.is_moderator()));

create policy reports_insert_own
  on public.content_reports for insert
  to authenticated
  with check ((select auth.uid()) = reporter_id and status = 'open');

create policy reports_update_moderator
  on public.content_reports for update
  to authenticated
  using ((select private.is_moderator()))
  with check ((select private.is_moderator()));

create policy moderation_actions_read_moderator
  on public.moderation_actions for select
  to authenticated
  using ((select private.is_moderator()));

create policy moderation_actions_insert_moderator
  on public.moderation_actions for insert
  to authenticated
  with check ((select private.is_moderator()) and moderator_id = (select auth.uid()));

-- Función invoker: conserva RLS y agrupa decisión, cambio de estado y auditoría
-- en una única transacción accesible desde el servidor de Next.js.
create or replace function public.moderate_report(
  report_id uuid,
  expected_target_type text,
  expected_target_id uuid,
  decision text,
  decision_reason text
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  report_row public.content_reports%rowtype;
  next_status text;
begin
  if not private.is_moderator() then
    raise exception 'No autorizado.';
  end if;

  if decision not in ('hide', 'restore', 'remove', 'dismiss_report') then
    raise exception 'Decisión no válida.';
  end if;

  select * into report_row
  from public.content_reports
  where id = report_id and status in ('open', 'reviewing')
  for update;

  if not found
    or report_row.target_type <> expected_target_type
    or report_row.target_id <> expected_target_id then
    raise exception 'La denuncia no coincide con el contenido.';
  end if;

  if decision = 'dismiss_report' then
    update public.content_reports
    set status = 'dismissed', resolved_by = auth.uid(), resolved_at = now()
    where id = report_id;
  else
    if expected_target_type = 'profile' then
      raise exception 'Los perfiles requieren revisión manual fuera del piloto.';
    end if;

    next_status := case decision
      when 'hide' then 'hidden'
      when 'restore' then 'published'
      when 'remove' then 'removed'
    end;

    if expected_target_type = 'project' then
      update public.learning_projects set status = next_status where id = expected_target_id;
    elsif expected_target_type = 'review' then
      update public.project_reviews set status = next_status where id = expected_target_id;
    end if;

    update public.content_reports
    set status = 'resolved', resolved_by = auth.uid(), resolved_at = now()
    where id = report_id;
  end if;

  insert into public.moderation_actions (
    moderator_id, target_type, target_id, action, reason
  ) values (
    auth.uid(), expected_target_type, expected_target_id, decision, decision_reason
  );
end;
$$;

revoke all on public.profiles, public.user_roles, public.social_learning_units,
  public.learning_projects, public.project_reviews, public.content_reports,
  public.moderation_actions from anon, authenticated;

grant select on public.profiles, public.social_learning_units,
  public.learning_projects, public.project_reviews to anon;

grant select on public.profiles, public.user_roles, public.social_learning_units,
  public.learning_projects, public.project_reviews, public.content_reports,
  public.moderation_actions to authenticated;

grant update (username, display_name, bio, website, interests) on public.profiles to authenticated;
grant insert (author_id, course_slug, lesson_slug, title, summary, what_built,
  what_learned, obstacles, technologies, difficulty, repository_url, demo_url, status)
  on public.learning_projects to authenticated;
grant update (course_slug, lesson_slug, title, summary, what_built, what_learned,
  obstacles, technologies, difficulty, repository_url, demo_url, status)
  on public.learning_projects to authenticated;
grant delete on public.learning_projects to authenticated;
grant insert (project_id, reviewer_id, works_correctly, explanation_rating,
  educational_value, feedback, suggestion, status)
  on public.project_reviews to authenticated;
grant update (works_correctly, explanation_rating, educational_value, feedback,
  suggestion, status) on public.project_reviews to authenticated;
grant insert (reporter_id, target_type, target_id, reason, details, status)
  on public.content_reports to authenticated;
grant update (status, resolved_by, resolved_at) on public.content_reports to authenticated;
grant insert (moderator_id, target_type, target_id, action, reason)
  on public.moderation_actions to authenticated;
revoke all on function public.moderate_report(uuid, text, uuid, text, text) from public, anon, authenticated;
grant execute on function public.moderate_report(uuid, text, uuid, text, text) to authenticated;

create index learning_projects_feed_idx
  on public.learning_projects (published_at desc)
  where status = 'published';
create index learning_projects_author_idx on public.learning_projects (author_id, created_at desc);
create index learning_projects_unit_idx on public.learning_projects (course_slug, lesson_slug, published_at desc);
create index project_reviews_project_idx on public.project_reviews (project_id, created_at desc);
create index content_reports_status_idx on public.content_reports (status, created_at asc);

insert into public.social_learning_units (
  course_slug,
  lesson_slug,
  course_title,
  lesson_title,
  project_prompt
) values
  (
    'codex-desde-cero',
    'primera-web-local',
    'Codex desde cero',
    'Construye tu primera web local',
    'Publica la web que has construido, explica qué necesidad resuelve y qué comprobaste antes de darla por terminada.'
  ),
  (
    'codex-desde-cero',
    'automatizar-con-vista-previa',
    'Codex desde cero',
    'Automatiza una tarea repetitiva con vista previa',
    'Comparte una automatización segura: muestra la vista previa, los límites y cómo evitaste modificar datos por sorpresa.'
  ),
  (
    'codex-desde-cero',
    'proyecto-final',
    'Codex desde cero',
    'Proyecto final según tu perfil',
    'Presenta tu proyecto final, las decisiones que tomaste, la evidencia de que funciona y el siguiente paso que mejorarías.'
  );

comment on table public.learning_projects is
  'Evidencias de aprendizaje vinculadas a una lección habilitada del piloto social de Aulafy.';
comment on table public.project_reviews is
  'Revisiones educativas estructuradas; no son certificaciones profesionales.';

commit;
