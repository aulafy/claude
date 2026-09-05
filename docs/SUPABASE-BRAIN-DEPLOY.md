# Applying Aulafy Brain migrations

The repository contains the Brain schema, but this workspace does not hold Supabase credentials. Apply the migrations from an authenticated operator environment.

## Preconditions

- Install the Supabase CLI.
- Link the repository to the intended project; never use production credentials in a local `.env` committed to Git.
- Confirm that the project already contains the social `profiles` and `user_roles` tables. The evidence review policy depends on them.

## Apply

```bash
supabase login
supabase link --project-ref <project-ref>
supabase db push
```

The migrations are ordered by timestamp. The Brain domain foundation runs before the evidence review migration, which adds review audit fields and the moderator/admin update policy.

## Verify

Check that the following are true in the target project:

1. `aulafy_evidence.reviewed_at` and `aulafy_evidence.reviewed_by` exist.
2. An authenticated member cannot update another user's evidence.
3. An authenticated moderator or admin can review `submitted` evidence.
4. A review records the reviewer and timestamp and cannot update an already reviewed row through the Brain action.

Run the repository contracts before and after applying the migration:

```bash
npm run test:domain-migration
npm run test:evidence-review
npm run test:brain-action-guards
```

These are static contracts; they do not replace a SQL-level smoke test against the linked Supabase project.
