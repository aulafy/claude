-- Allow only existing community moderators/admins to verify Brain evidence.
begin;
drop policy if exists aulafy_evidence_reviewer_update on public.aulafy_evidence;
create policy aulafy_evidence_reviewer_update on public.aulafy_evidence for update using (
  exists (select 1 from public.user_roles where user_id = auth.uid() and role in ('moderator','admin'))
) with check (
  exists (select 1 from public.user_roles where user_id = auth.uid() and role in ('moderator','admin'))
);
commit;
