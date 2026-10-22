import type { ContactContent } from './types';

export const contactDeDE: ContactContent = {
  meta: {
    title: 'Kontakt — Redact',
    description:
      'Schreiben Sie dem Team hinter Redact per E-Mail wegen eines Fehlers, einer Datenschutzfrage oder eines Funktionswunsches. Kein Ticketportal, kein Chatbot — nur ein Postfach.',
    keywords: ['kontakt redact', 'hilfe beim bildschwärzen', 'datenschutzfrage'],
  },
  hero: {
    eyebrow: 'Kontakt',
    title: 'Sagen Sie uns, was kaputt ist oder was fehlt.',
    lead: 'Fragen, Fehlerberichte, Datenschutzanliegen und Funktionswünsche landen alle im selben Postfach. Kein Ticketportal, kein Chatbot, kein Konto erforderlich.',
    primaryCta: 'Nachricht schreiben',
    secondaryCta: 'Direkt per E-Mail schreiben',
  },
  channels: [
    {
      icon: 'mail',
      title: 'Schreiben Sie uns',
      copy: 'Der schnellste Weg. Ein Postfach, von einem Menschen gelesen.',
    },
    {
      icon: 'clock',
      title: 'Was Sie erwarten können',
      copy: 'Antworten dauern meist ein bis zwei Tage. Es gibt keine Ticketnummer und keine garantierte Antwortzeit.',
    },
    {
      icon: 'shield',
      title: 'Datenschutz oder Sicherheit',
      copy: 'Schreiben Sie „Datenschutz“ in den Betreff und beschreiben Sie die Anfrage, die Sie gesehen haben. Hängen Sie niemals ein echtes sensibles Bild an.',
    },
  ],
  form: {
    eyebrow: 'Schreiben Sie uns',
    title: 'Ein Postfach, von einem Menschen gelesen.',
    copy: 'Nutzen Sie das Formular, um eine Nachricht in Ihrer eigenen E-Mail-App vorzubereiten. Von dieser Seite wird nichts übertragen, und hier wird kein Entwurf gespeichert.',
    notes: [
      'Das Formular erstellt einen mailto:-Link. Ihre Nachricht wird erst gesendet, wenn Sie in Ihrer E-Mail-App auf Senden drücken.',
      'Bitte hängen Sie keine echten Bilder mit sensiblen Daten an. Ein synthetisches Beispiel oder ein geschwärzter Screenshot reicht aus.',
      'Antworten werden von einem Menschen geschrieben. Rechnen Sie mit ein bis zwei Tagen, nicht mit einer sofortigen Antwort.',
    ],
    fallback: 'Keine E-Mail-App auf diesem Gerät? Schreiben Sie direkt an {email}.',
    name: 'Name',
    namePlaceholder: 'Ihr Name',
    email: 'E-Mail',
    emailRequired: '(erforderlich)',
    emailPlaceholder: 'sie@beispiel.de',
    topic: 'Thema',
    topics: [
      'Allgemeine Frage',
      'Fehlerbericht',
      'Datenschutz oder Sicherheit',
      'Funktionswunsch',
      'Etwas anderes',
    ],
    message: 'Nachricht',
    messageRequired: '(erforderlich)',
    messagePlaceholder: 'Was ist passiert, was haben Sie erwartet und welchen Browser haben Sie verwendet?',
    privacyNote: 'Dieses Formular öffnet Ihre E-Mail-App. Von dieser Seite wird nichts gesendet.',
    submit: 'E-Mail-Entwurf öffnen',
    opening: 'Ihre E-Mail-App wird geöffnet…',
    sentFrom: 'Gesendet über die Redact-Kontaktseite',
    requiredError: 'Bitte geben Sie eine gültige E-Mail-Adresse und eine Nachricht an.',
  },
  before: {
    eyebrow: 'Bevor Sie schreiben',
    title: 'Ein paar Details beschleunigen die Antwort.',
    copy: 'Es gibt kein Formular, das weitergeleitet wird — die erste Nachricht ist also das gesamte Ticket. Diese drei Hinweise decken den Großteil des Hin und Her ab.',
    items: [
      {
        icon: 'alert',
        title: 'Fehlerberichte',
        copy: 'Nennen Sie den Browser, was Sie getan haben, was passiert ist und was Sie erwartet haben. Ein geschwärzter Screenshot hilft — schwärzen Sie ihn vorher.',
      },
      {
        icon: 'shield',
        title: 'Datenschutzfragen',
        copy: 'Beschreiben Sie die Anfrage, die Sie im Netzwerk-Tab gesehen haben, und was daran falsch aussah. Ein synthetisches Beispiel reicht aus, um die meisten Probleme nachzuvollziehen.',
      },
      {
        icon: 'sparkles',
        title: 'Funktionswünsche',
        copy: 'Beschreiben Sie die Aufgabe, die Sie erledigen möchten, nicht nur den Button, den Sie sich wünschen. Ausgehend vom Problem lässt sich das Richtige leichter bauen.',
      },
    ],
  },
  answers: {
    eyebrow: 'Antworten zuerst',
    title: 'Manche Fragen brauchen keine E-Mail.',
    copy: 'Die FAQ und die Datenschutzhinweise decken die häufigen Fragen ab: Dateiformate, OCR, Cookies, Metadaten und was mit dem Bild passiert. Wenn Ihre Antwort dort steht, können Sie die Wartezeit überspringen.',
    cta: 'Editor öffnen',
    links: [
      {
        title: 'Häufig gestellte Fragen',
        copy: 'Uploads, Dateiformate, OCR, Metadaten und das eine Cookie.',
        href: '/#faq',
        icon: 'info',
      },
      {
        title: 'Leitfäden',
        copy: 'Praxisnahe Hinweise zu Ausweisen, Belegen, Chats, Dashboards und Stilen zum Schwärzen.',
        href: '/guides',
        icon: 'file',
      },
      {
        title: 'Datenschutzhinweise',
        copy: 'Der Datenfluss, jede Netzwerkanfrage und wie Sie beides überprüfen.',
        href: '/privacy',
        icon: 'shield',
      },
      {
        title: 'Allgemeine Geschäftsbedingungen',
        copy: 'Die Regeln für die Nutzung des Tools, einschließlich seiner Grenzen.',
        href: '/terms',
        icon: 'layout',
      },
    ],
  },
  copy: {
    button: 'Adresse kopieren',
    copied: 'Kopiert',
    failed: 'Kopieren fehlgeschlagen — wählen Sie stattdessen die Adresse aus.',
    emailLabel: 'E-Mail-Adresse kopieren',
  },
};
