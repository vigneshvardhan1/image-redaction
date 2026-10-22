import type { GuidesIndexContent } from './types';

export const guidesIndexFrFR: GuidesIndexContent = {
  meta: {
    title: 'Guides — Redact',
    description:
      'Guides pratiques pour caviarder captures d’écran, reçus, pièces d’identité et tableaux de bord professionnels. Apprenez quel style de caviardage est sûr et comment vérifier votre propre travail.',
    keywords: [
      'comment caviarder une capture d’écran',
      'guide du caviardage',
      'caviarder un reçu',
      'caviarder une carte d’identité',
      'flou ou pixellisation',
      'checklist capture d’écran professionnelle',
    ],
  },
  hero: {
    eyebrow: 'Guides',
    title: 'Partager moins. Réfléchir plus.',
    lead: 'Des notes courtes et pratiques sur ce qu’il faut couvrir, quel style adopter et comment vérifier votre propre caviardage avant que l’image ne quitte vos mains.',
    primaryCta: 'Ouvrir l’éditeur',
    secondaryCta: 'Commencer par le plus récent',
  },
  latestLabel: 'Dernier guide',
  readGuide: 'Lire le guide',
  allGuidesEyebrow: 'Tous les guides',
  allGuidesTitle: 'Le reste des notes de terrain.',
  allGuidesCopy: 'Écrit pour celles et ceux qui préfèrent ne pas découvrir le caviardage à leurs dépens.',
  rule: {
    title: 'La règle des 60 secondes.',
    copy: 'Si vous ne liriez pas ce détail à voix haute dans une pièce bondée, couvrez-le avant que la capture ne quitte votre appareil. Trois questions simplifient la décision :',
    questions: [
      {
        question: 'Cela pourrait-il identifier une personne ?',
        copy: 'Nom, photo, identifiant, e-mail, téléphone, adresse, numéro de pièce d’identité.',
      },
      {
        question: 'Cela pourrait-il coûter de l’argent ?',
        copy: 'Numéro de carte, date d’expiration, cryptogramme, coordonnées bancaires, numéro de facture.',
      },
      {
        question: 'Cela pourrait-il ouvrir un compte ?',
        copy: 'Numéro de commande, date de naissance, identifiant fiscal, réponse de sécurité.',
      },
    ],
  },
  cta: {
    eyebrow: 'Passons à la pratique',
    title: 'Lisez moins. Caviardez quelque chose.',
    copy: 'L’éditeur est gratuit et local. Chargez un exemple, couvrez quelques détails et vérifiez le résultat avant de le télécharger.',
    primary: 'Ouvrir l’éditeur',
    secondary: 'Lire les notes sur la confidentialité',
    secondaryHref: '/privacy',
  },
};
