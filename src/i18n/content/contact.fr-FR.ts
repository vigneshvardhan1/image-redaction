import type { ContactContent } from './types';

export const contactFrFR: ContactContent = {
  meta: {
    title: 'Contact — Redact',
    description:
      'Écrivez à l’équipe derrière Redact pour signaler un bug, poser une question sur la confidentialité ou proposer une fonctionnalité. Pas de portail de tickets, pas de chatbot — une seule boîte de réception.',
    keywords: [
      'contact redact',
      'assistance caviardage d’images',
      'question confidentialité',
    ],
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Dites-nous ce qui a cassé, ou ce qui manque.',
    lead: 'Les questions, les rapports de bug, les préoccupations liées à la confidentialité et les demandes de fonctionnalités arrivent tous dans la même boîte de réception. Pas de portail de tickets, pas de chatbot, aucun compte requis.',
    primaryCta: 'Écrire un message',
    secondaryCta: 'Nous écrire directement',
  },
  channels: [
    {
      icon: 'mail',
      title: 'Écrivez-nous',
      copy: 'La voie la plus rapide. Une seule boîte de réception, lue par une personne.',
    },
    {
      icon: 'clock',
      title: 'À quoi vous attendre',
      copy: 'Les réponses prennent généralement un jour ou deux. Il n’y a pas de numéro de ticket ni de délai de réponse garanti.',
    },
    {
      icon: 'shield',
      title: 'Confidentialité ou sécurité',
      copy: 'Indiquez « Confidentialité » en objet et joignez la requête que vous avez vue. Ne joignez jamais une vraie image sensible.',
    },
  ],
  form: {
    eyebrow: 'Nous écrire',
    title: 'Une seule boîte de réception, lue par une personne.',
    copy: 'Utilisez le formulaire pour préparer un message dans votre propre application de messagerie. Rien n’est transmis depuis cette page, et aucun brouillon n’est stocké ici.',
    notes: [
      'Le formulaire crée un lien « mailto: ». Votre message n’est envoyé que lorsque vous appuyez sur envoyer dans votre application de messagerie.',
      'Veuillez ne pas joindre de vraies images contenant des données sensibles. Un exemple synthétique ou une capture caviardée suffit.',
      'Les réponses sont rédigées par un humain. Comptez un jour ou deux, pas une réponse instantanée.',
    ],
    fallback: 'Pas d’application de messagerie sur cet appareil ? Écrivez directement à {email}.',
    name: 'Nom',
    namePlaceholder: 'Votre nom',
    email: 'E-mail',
    emailRequired: '(requis)',
    emailPlaceholder: 'vous@exemple.com',
    topic: 'Sujet',
    topics: [
      'Question générale',
      'Rapport de bug',
      'Confidentialité ou sécurité',
      'Demande de fonctionnalité',
      'Autre chose',
    ],
    message: 'Message',
    messageRequired: '(requis)',
    messagePlaceholder:
      'Que s’est-il passé, à quoi vous attendiez-vous, et quel navigateur utilisiez-vous ?',
    privacyNote: 'Ce formulaire ouvre votre application de messagerie. Rien n’est envoyé depuis cette page.',
    submit: 'Ouvrir le brouillon d’e-mail',
    opening: 'Ouverture de votre application de messagerie…',
    sentFrom: 'Envoyé depuis la page Contact de Redact',
    requiredError: 'Veuillez indiquer une adresse e-mail valide et un message.',
  },
  before: {
    eyebrow: 'Avant d’écrire',
    title: 'Quelques détails accélèrent la réponse.',
    copy: 'Il n’y a aucun formulaire à router, donc le premier message est tout le ticket. Ces trois notes couvrent l’essentiel des allers-retours.',
    items: [
      {
        icon: 'alert',
        title: 'Rapports de bug',
        copy: 'Indiquez le navigateur, ce que vous avez fait, ce qui s’est produit et ce que vous attendiez. Une capture caviardée aide — caviardez-la d’abord.',
      },
      {
        icon: 'shield',
        title: 'Questions de confidentialité',
        copy: 'Décrivez la requête que vous avez vue dans l’onglet réseau et ce qui vous a semblé anormal. Un exemple synthétique suffit à reproduire la plupart des problèmes.',
      },
      {
        icon: 'sparkles',
        title: 'Demandes de fonctionnalités',
        copy: 'Décrivez la tâche que vous cherchez à accomplir, pas seulement le bouton que vous voulez. Il est plus facile de construire la bonne chose à partir du problème.',
      },
    ],
  },
  answers: {
    eyebrow: 'Les réponses d’abord',
    title: 'Certaines questions n’ont pas besoin d’un e-mail.',
    copy: 'La FAQ et les notes de confidentialité couvrent les cas courants : formats de fichiers, OCR, cookies, métadonnées et ce qu’il advient de l’image. Si votre réponse s’y trouve, vous pouvez éviter l’attente.',
    cta: 'Ouvrir l’éditeur',
    links: [
      {
        title: 'Questions fréquentes',
        copy: 'Envois, formats de fichiers, OCR, métadonnées et l’unique cookie.',
        href: '/#faq',
        icon: 'info',
      },
      {
        title: 'Guides',
        copy: 'Notes pratiques sur les pièces d’identité, les reçus, les discussions, les tableaux de bord et les styles de caviardage.',
        href: '/guides',
        icon: 'file',
      },
      {
        title: 'Notes de confidentialité',
        copy: 'Le flux de données, chaque requête réseau, et comment vérifier l’un et l’autre.',
        href: '/privacy',
        icon: 'shield',
      },
      {
        title: 'Conditions générales',
        copy: 'Les règles d’utilisation de l’outil, y compris ses limites.',
        href: '/terms',
        icon: 'layout',
      },
    ],
  },
  copy: {
    button: 'Copier l’adresse',
    copied: 'Copié',
    failed: 'Échec de la copie — sélectionnez l’adresse manuellement.',
    emailLabel: 'Copier l’adresse e-mail',
  },
};
