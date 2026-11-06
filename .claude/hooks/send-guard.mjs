#!/usr/bin/env node

import { createInterface } from 'readline';

async function readStdin() {
  const lines = [];
  const rl = createInterface({ input: process.stdin });

  for await (const line of rl) {
    lines.push(line);
  }

  return lines.join('\n');
}

function extractEmails(input) {
  const emails = [];

  if (input.to) {
    if (Array.isArray(input.to)) {
      emails.push(...input.to);
    } else if (typeof input.to === 'string') {
      emails.push(input.to);
    }
  }

  if (input.cc) {
    if (Array.isArray(input.cc)) {
      emails.push(...input.cc);
    } else if (typeof input.cc === 'string') {
      emails.push(input.cc);
    }
  }

  if (input.bcc) {
    if (Array.isArray(input.bcc)) {
      emails.push(...input.bcc);
    } else if (typeof input.bcc === 'string') {
      emails.push(input.bcc);
    }
  }

  return emails;
}

async function main() {
  try {
    const input = await readStdin();
    const toolCall = JSON.parse(input);

    const { tool_name, tool_input } = toolCall;

    const alwaysBlockTools = [
      'mcp__resend__send-broadcast',
      'mcp__resend__create-automation',
      'mcp__resend__send-inbox-draft',
      'mcp__resend__send-new-inbox-email'
    ];

    if (alwaysBlockTools.includes(tool_name)) {
      console.error(`Blocked: ${tool_name} can send to multiple people and is not allowed in practice mode`);
      process.exit(2);
    }

    const emailSendTools = [
      'mcp__resend__send-email',
      'mcp__resend__send-batch-emails'
    ];

    if (emailSendTools.includes(tool_name)) {
      const myEmail = process.env.MY_EMAIL;

      if (!myEmail) {
        console.error('Blocked: MY_EMAIL environment variable not set');
        process.exit(2);
      }

      const emails = extractEmails(tool_input);

      for (const email of emails) {
        const emailStr = typeof email === 'object' ? email.email : email;

        if (!emailStr.endsWith('@resend.dev') && emailStr !== myEmail) {
          console.error(`Blocked: Cannot send to ${emailStr} (only @resend.dev and ${myEmail} allowed)`);
          process.exit(2);
        }
      }
    }

    process.exit(0);

  } catch (error) {
    console.error(`Guard error: ${error.message}`);
    process.exit(1);
  }
}

main();
