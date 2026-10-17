# Triage Labels

Map canonical triage roles to the `Status:` strings used in local tickets.

| Canonical role | Local status | Meaning |
| --- | --- | --- |
| `needs-triage` | `needs-triage` | Maintainer needs to evaluate the issue |
| `needs-info` | `needs-info` | Waiting on the reporter for more information |
| `ready-for-agent` | `ready-for-agent` | Fully specified and ready for an autonomous agent |
| `ready-for-human` | `ready-for-human` | Requires human implementation |
| `wontfix` | `wontfix` | Will not be actioned |

When a skill requests a triage label, set the ticket's `Status:`
to the corresponding local status.

Edit the Local status column to change this repo's vocabulary.
