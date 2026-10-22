import type { ContactContent } from './types';

export const contactEnUS: ContactContent = {
  meta: {
    title: 'Contact — Redact',
    description:
      'Email the team behind Redact about a bug, a privacy question, or a feature request. No ticket portal, no chatbot — just one inbox.',
    keywords: ['contact redact', 'image redaction support', 'privacy question'],
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Tell us what broke, or what is missing.',
    lead: 'Questions, bug reports, privacy concerns, and feature requests all land in the same inbox. No ticket portal, no chatbot, no account required.',
    primaryCta: 'Write a message',
    secondaryCta: 'Email us directly',
  },
  channels: [
    {
      icon: 'mail',
      title: 'Email us',
      copy: 'The fastest route. One inbox, read by a person.',
    },
    {
      icon: 'clock',
      title: 'What to expect',
      copy: 'Replies usually take a day or two. There is no ticket number and no guaranteed response time.',
    },
    {
      icon: 'shield',
      title: 'Privacy or security',
      copy: 'Put “Privacy” in the subject and include the request you saw. Never attach a real sensitive image.',
    },
  ],
  form: {
    eyebrow: 'Write to us',
    title: 'One inbox, read by a person.',
    copy: 'Use the form to prepare a message in your own email app. Nothing is transmitted from this page, and no draft is stored here.',
    notes: [
      'The form builds a mailto: link. Your message is sent only when you press send in your email app.',
      'Please do not attach real images containing sensitive data. A synthetic sample or a redacted screenshot is enough.',
      'Replies are written by a human. Expect a day or two, not an instant response.',
    ],
    fallback: 'No email app on this device? Write to {email} directly.',
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailRequired: '(required)',
    emailPlaceholder: 'you@example.com',
    topic: 'Topic',
    topics: [
      'General question',
      'Bug report',
      'Privacy or security',
      'Feature request',
      'Something else',
    ],
    message: 'Message',
    messageRequired: '(required)',
    messagePlaceholder: 'What happened, what did you expect, and which browser were you using?',
    privacyNote: 'This form opens your email app. Nothing is sent from this page.',
    submit: 'Open email draft',
    opening: 'Opening your email app…',
    sentFrom: 'Sent from the Redact contact page',
    requiredError: 'Please add a valid email address and a message.',
  },
  before: {
    eyebrow: 'Before you write',
    title: 'A few details make the reply faster.',
    copy: 'There is no form to route, so the first message is the whole ticket. These three notes cover most of the back-and-forth.',
    items: [
      {
        icon: 'alert',
        title: 'Bug reports',
        copy: 'Tell us the browser, what you did, what happened, and what you expected. A redacted screenshot helps — redact it first.',
      },
      {
        icon: 'shield',
        title: 'Privacy questions',
        copy: 'Describe the request you saw in the Network tab and what looked wrong. A synthetic sample is enough to reproduce most issues.',
      },
      {
        icon: 'sparkles',
        title: 'Feature requests',
        copy: 'Describe the job you are trying to finish, not only the button you want. It is easier to build the right thing from the problem.',
      },
    ],
  },
  answers: {
    eyebrow: 'Answers first',
    title: 'Some questions do not need an email.',
    copy: 'The FAQ and the privacy notes cover the common ones: file formats, OCR, cookies, metadata, and what happens to the image. If your answer is there, you can skip the wait.',
    cta: 'Open the editor',
    links: [
      {
        title: 'Frequently asked questions',
        copy: 'Uploads, file formats, OCR, metadata, and the one cookie.',
        href: '/#faq',
        icon: 'info',
      },
      {
        title: 'Guides',
        copy: 'Practical notes on IDs, receipts, chats, dashboards, and redaction styles.',
        href: '/guides',
        icon: 'file',
      },
      {
        title: 'Privacy notes',
        copy: 'The data flow, every network request, and how to verify both.',
        href: '/privacy',
        icon: 'shield',
      },
      {
        title: 'Terms & Conditions',
        copy: 'The rules for using the tool, including its limits.',
        href: '/terms',
        icon: 'layout',
      },
    ],
  },
  copy: {
    button: 'Copy address',
    copied: 'Copied',
    failed: 'Copy failed — select the address instead.',
    emailLabel: 'Copy email address',
  },
};
