#!/usr/bin/env node

import { readFileSync } from 'fs';

const input = readFileSync(0, 'utf-8');
const toolCall = JSON.parse(input);

const { tool_name, tool_input } = toolCall;

const myEmail = process.env.MY_EMAIL;

function isAllowedAddress(address) {
  if (!address) return false;
  return address.endsWith('@resend.dev') || address === myEmail;
}

function collectAddresses(input) {
  const addresses = [];

  if (input.to) {
    if (Array.isArray(input.to)) {
      addresses.push(...input.to);
    } else {
      addresses.push(input.to);
    }
  }

  if (input.cc) {
    if (Array.isArray(input.cc)) {
      addresses.push(...input.cc);
    } else {
      addresses.push(input.cc);
    }
  }

  if (input.bcc) {
    if (Array.isArray(input.bcc)) {
      addresses.push(...input.bcc);
    } else {
      addresses.push(input.bcc);
    }
  }

  return addresses;
}

if (tool_name === 'mcp__resend__send-email' || tool_name === 'mcp__resend__send-batch-emails') {
  const addresses = collectAddresses(tool_input);

  for (const address of addresses) {
    if (!isAllowedAddress(address)) {
      console.log(`Blocked: ${address} is not a Resend test address (@resend.dev) or your email`);
      process.exit(2);
    }
  }

  process.exit(0);
}

if (tool_name === 'mcp__resend__send-broadcast' ||
    tool_name === 'mcp__resend__create-automation' ||
    tool_name === 'mcp__resend__send-inbox-draft' ||
    tool_name === 'mcp__resend__send-new-inbox-email') {
  console.log(`Blocked: ${tool_name} can reach whole lists of people`);
  process.exit(2);
}

process.exit(0);
