## Before you start

A connector lets one tool read or change information in another. That convenience can also expand the reach of a mistake. In this practice you will choose permissions using fictional data, without linking real accounts.

## 1. Draw the data path

Start with the previous chapter's workflow and add a fictional question source:

```text
Input: one test question.
Read: consult a fictional schedule list.
Transform: prepare a draft.
Write: save the draft in a test folder.
Send: not allowed.
```

For each arrow, ask what data moves, who receives it and whether the step needs to read or write. “Connect the calendar” does not describe the permission precisely enough.

## 2. Reduce the permission

Make a table before accepting a connection:

| Step | Need | Minimum permission |
| --- | --- | --- |
| Read the schedule | Consult data | Read-only access to the test list |
| Prepare the draft | Transform text | Access to the selected text |
| Save the draft | Create a temporary file | Write access to a test folder |
| Send a message | External action | Not granted |

A broad permission is not justified because the interface presents it as the default. If you cannot limit it, stop the connection and find another way to test the task.

## 3. Test with disposable data

Create a list with three invented schedules. Before using it, write down the expected result: the workflow may read those schedules and save a draft, but it may not change the list or send a message.

Check the logs or permission screen to see what was read and written. If you cannot tell, that lack of visibility is a connector risk. Do not treat a fictional name as a privacy guarantee: a real file may contain more information than you can see.

## 4. Revoke and recover

When finished, remove the test permission from the tool that granted it and confirm what remains saved. Keep the draft if you need to review the activity, but do not keep copies of data you no longer need.

If a connection fails halfway through, keep the original input and mark the state as pending. Do not automatically repeat a write until you know whether the first one completed. Recovery is part of the design, not a detail for later.

## Your result

You are done when you can explain what data crosses each step, which permission it uses and where the workflow stops. The most useful connector is not the one that asks for the most access; it is the one that makes the task possible with a small, observable scope.

In the next chapter you will practise explicit approvals and stops before any risky action.
