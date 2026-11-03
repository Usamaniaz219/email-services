---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize Campaign Emails by Lead Group

You are creating personalized versions of campaign emails for different customer groups.

## Step 1: Check for campaign folder argument

If no argument was provided:
- Use Glob to find all folders in `campaigns/`
- List them and tell the user which campaign folders exist
- Stop here

If an argument was provided, use it as the campaign folder path.

## Step 2: Read the lead groups

Read `leads/leads.csv` and extract the unique values from the `group` column. These are your target groups (typically: tea-curious, gift-buyers, daily-drinkers).

## Step 3: Find all email files

Use Glob to find all `.md` files in `<campaign-folder>/emails/`.

## Step 4: Personalize each email for each group

For each email file you found:

1. Read the email file
2. Identify these parts:
   - Subject line (first line starting with "Subject:")
   - Preview line (line starting with "Preview:")
   - Opening line (the first paragraph after the greeting)
   - Main body content
   - Call-to-action link
   - Sign-off section (starts with "**Happy to help,**")
   - Footer (last two lines with unsubscribe info)

3. For each group, create a version that:
   - **Keeps exactly the same:** Subject, Preview, main link URL, sign-off, footer
   - **Changes only:** Opening line and one example/detail in the body to fit that group
   
4. Group-specific adaptations:
   - **tea-curious**: Focus on exploration, learning, trying new things
   - **gift-buyers**: Focus on giving, presentation, making someone's day
   - **daily-drinkers**: Focus on routine, consistency, quality in daily life

5. Save each version to: `<campaign-folder>/groups/<group-name>/emails/<original-filename>`

## Step 5: Report results

After writing all files, reply with a short summary:
- Total number of files written
- One example opening line for each group (just one line per group)

**Important:** Keep your response brief. Do not repeat full email content or explain your reasoning. Just the summary.
