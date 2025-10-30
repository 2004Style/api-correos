// ============================================
// mail.interface.ts
// ============================================
import type { Attachment } from 'nodemailer/lib/mailer';

export interface MailAttachment extends Attachment {
  filename?: string;
  content?: string | Buffer;
  path?: string;
  contentType?: string;
  cid?: string;
  encoding?: string;
  href?: string;
  httpHeaders?: Record<string, string>;
  contentDisposition?: 'attachment' | 'inline';
}

export interface MailContent {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
  headers?: Record<string, string>;
  attachments?: MailAttachment[];
}

export interface EmailResult {
  messageId: string;
  accepted: string[];
  rejected: string[];
  response: string;
  from: string;
}
