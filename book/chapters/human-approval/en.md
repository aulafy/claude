## Before you start

A checkbox labelled “approve” does not make a review safe. The person must know what they are approving, which source supports it, what permissions the action has and what happens when the result is rejected. In this practice you will use a fictional workflow with no external actions.

## 1. Define the approval point

The workflow prepares a notice for a book club. Approval happens after the draft and fact check, before saving it in a shared folder or sending it:

```text
Source -> draft -> fact check -> human review -> allowed action
                                  |
                             reject/stop
```

The reviewer must be able to see the source, draft, added details and permissions that would be used. “Reviewed by a person” is not enough without defining what was checked.

## 2. Write an approval checklist

Use a short, concrete list:

| Check | Possible decision |
| --- | --- |
| The output answers the task | Approve or return |
| Every fact appears in the source | Approve or reject |
| No unnecessary personal data appears | Approve or remove |
| The recipient and action are correct | Approve or stop |
| The permission matches the task | Approve or stop |

Approval must refer to one specific draft revision. If the text changes later, review it again. Do not use an old approval to authorize a new version.

## 3. Practise approval and rejection

Review two fictional drafts. The first keeps the source’s time and room. The second adds five places and a registration date that are not stated. Approve the first only if the checklist is complete; return the second with this reason:

```text
Rejected: it contains two details unsupported by the source.
Next step: remove both details and check the complete draft again.
External action: stopped.
```

Do not replace the reason with “the AI made a mistake”. A useful record explains which detail failed and what should happen next.

## 4. Design the stop

The stop should keep the input, rejected draft, source and reason without sending anything. A responsible person decides whether to correct, archive or discard it under their organization’s rules.

Also test a lost connection or a duplicate approval request. The safe result is to wait or mark the state as pending, not run twice. Responsible automation can be slower because it makes an important decision visible.

## Your result

You are done when you can point to the approval point, criteria, reviewer identity or role, decision record and recovery action. Human review is not a decorative button: it is a boundary of responsibility.

In the next part you will study local AI and decide what to measure before trusting a model installed on your computer.
