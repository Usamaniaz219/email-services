---
paths:
  - "campaigns/**/emails/*.md"
---

# Email File Requirements

Every email file must follow this structure:

## Header
- Start with `Subject: ...` (50 characters or fewer)
- Follow with `Preview: ...` (90 characters or fewer)

## Greeting
- Greet the reader with `{{first_name}}`

## Main Link
- Include exactly one main call-to-action link
- Format: `[Button text](https://kettlebird.example/steep-club)`

## Sign-off
- End with our standard sign-off:

**Happy to help,**

[Name]  
Zoneomics Team

## Footer
- Include this two-line footer as plain text:

You're getting this because you joined the Kettlebird Tea waitlist.
Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
