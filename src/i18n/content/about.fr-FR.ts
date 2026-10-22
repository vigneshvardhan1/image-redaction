import type { AboutContent } from './types';

export const aboutFrFR: AboutContent = {
  meta: {
    title: 'À propos — Redact',
    description:
      'Pourquoi Redact existe : un outil de caviardage gratuit, exécuté dans le navigateur, conçu pour que l’image ou le PDF que vous cherchez à protéger n’ait jamais besoin d’être envoyé pour être protégé.',
    keywords: [
      'à propos de redact',
      'caviardage d’images privé',
      'caviardage de pdf privé',
      'outil de caviardage dans le navigateur',
    ],
  },
  hero: {
    eyebrow: 'À propos',
    title: 'Conçu pour que vous partagiez moins.',
    lead: 'Redact est un studio de caviardage gratuit, exécuté dans le navigateur, fondé sur une règle : le fichier que vous cherchez à protéger ne devrait pas avoir à être envoyé pour être protégé.',
    primaryCta: 'Ouvrir l’éditeur',
    secondaryCta: 'Nous contacter',
  },
  stats: [
    { value: '0', label: 'Fichiers envoyés' },
    { value: '0', label: 'Comptes requis' },
    { value: '0', label: 'Traceurs ou analyse d’audience' },
    { value: '100%', label: 'Traitement dans votre navigateur' },
  ],
  why: {
    eyebrow: 'Pourquoi il existe',
    title: 'L’étape d’envoi était le problème.',
    paragraphs: [
      'Les captures d’écran sont devenues la façon d’expliquer le travail : un fil de support, un reçu, une pièce d’identité, un tableau de bord, une conversation contenant une adresse de livraison. Le détail qui rend la capture utile est souvent celui qui ne devrait pas voyager avec elle.',
      'La plupart des outils de caviardage commencent par vous demander d’envoyer le fichier exact que vous cherchez à protéger. Cela n’a jamais paru juste. Un outil qui supprime des détails sensibles ne devrait pas les collecter d’abord, et une promesse de supprimer la copie demain reste une copie aujourd’hui.',
      'Redact inverse l’ordre. Votre navigateur décode l’image — ou rend chaque page PDF —, la dessine sur un canvas local et intègre les caviardages dans un nouveau fichier. Il n’existe aucun point d’envoi. La détection intelligente télécharge un moteur OCR et un modèle de langue anglaise, et le moteur PDF est auto-hébergé, mais votre fichier ne fait pas partie de ces requêtes.',
    ],
    emphasis:
      'Nous ne sommes pas contre le cloud. Nous sommes contre l’étape inutile au milieu. Quand le navigateur peut faire le travail, l’endroit le plus sûr pour le fichier est celui où il se trouve déjà.',
  },
  principles: {
    eyebrow: 'Principes',
    title: 'Les règles sur lesquelles le produit est construit.',
    copy: 'Ce ne sont pas des intentions affichées au mur. Elles décident de ce qui est livré, de ce qui est divulgué et de ce qui est laissé de côté.',
    items: [
      {
        icon: 'monitor',
        title: 'Local par défaut',
        copy: 'Si une fonctionnalité peut fonctionner dans l’onglet, elle y fonctionne. Il n’y a aucun point d’envoi, aucune file de traitement et aucun espace de stockage temporaire à croire sur parole.',
      },
      {
        icon: 'alert',
        title: 'Honnête sur les limites',
        copy: 'Les visages, les QR codes et les noms inhabituels nécessitent encore un cadre manuel. Une analyse de vérification propre est une preuve, pas une garantie.',
      },
      {
        icon: 'chat',
        title: 'Langage clair',
        copy: 'Les pages de confidentialité et les pages légales devraient être lisibles sans traducteur. Quand un terme est inévitable, il est expliqué.',
      },
      {
        icon: 'shield',
        title: 'Pas de compte, pas de profil',
        copy: 'Pas de connexion, pas de mur d’e-mails, pas d’historique d’utilisation. L’éditeur ne sait pas qui vous êtes, et il n’y a rien à exporter sur vous.',
      },
      {
        icon: 'zap',
        title: 'Gratuit sans piège',
        copy: 'Pas de filigrane, pas de crédit d’export, pas d’offre payante pour l’option sûre. L’encre noire — le style le plus fort — ne coûte rien.',
      },
      {
        icon: 'code',
        title: 'Des affirmations vérifiables',
        copy: 'L’onglet réseau est le reçu. La page Confidentialité explique exactement quoi vérifier et ce que vous devriez voir lorsque vous le faites.',
      },
    ],
  },
  how: {
    eyebrow: 'Comment ça marche',
    title: 'Trois étapes, aucune sur un serveur.',
    copy: 'L’ensemble du flux de travail tient dans un seul onglet. Les seuls téléchargements facultatifs sont le moteur OCR utilisé par la détection intelligente et le moteur PDF utilisé pour les PDF.',
    cta: 'Voir le flux de données',
    steps: [
      {
        number: '01',
        title: 'Déposer ou coller un fichier',
        copy: 'Le navigateur lit l’image ou le PDF en local. PNG, JPG, WebP, GIF, BMP, AVIF et PDF jusqu’à 100 pages sont pris en charge.',
        icon: 'image',
      },
      {
        number: '02',
        title: 'Couvrir ce qui compte',
        copy: 'La détection intelligente suggère les données personnelles probables sur la page affichée. Dessinez sur les visages, les codes et tout ce que l’analyse manque. L’encre est le style par défaut.',
        icon: 'square',
      },
      {
        number: '03',
        title: 'Vérifier et exporter',
        copy: 'Relisez le résultat aplati, comparez-le à l’original, puis téléchargez une image sans métadonnées ou un PDF aplati.',
        icon: 'shield-check',
      },
    ],
  },
  stack: {
    eyebrow: 'Sous le capot',
    title: 'Une architecture légère. Aucun service caché.',
    copy: 'Le site est en HTML, CSS et JavaScript statiques. Il n’y a aucun backend qui reçoit des fichiers, aucun SDK d’analyse d’audience et aucun code publicitaire. Les éléments qui font le travail sont des API web ordinaires et des logiciels open source.',
    note: 'La détection intelligente et la prise en charge des PDF sont les fonctionnalités qui récupèrent du code après le chargement de la page. Elles chargent Tesseract.js, des données de langue et le moteur PDF auto-hébergé ; votre fichier reste dans l’onglet.',
    items: [
      { label: 'Astro', value: 'Pages et composants statiques' },
      { label: 'Canvas API', value: 'Décodage, caviardage et export en local' },
      { label: 'Tesseract.js', value: 'OCR facultatif dans un Web Worker' },
      { label: 'PDF.js', value: 'Rendu PDF local auto-hébergé' },
      { label: 'pdf-lib', value: 'Assemblage du PDF aplati dans l’onglet' },
      { label: 'Inter', value: 'Police auto-hébergée, servie depuis ce site' },
    ],
  },
  limits: {
    eyebrow: 'Limites assumées',
    title: 'Ce que Redact n’est pas.',
    items: [
      {
        title: 'Pas un certificat de conformité',
        copy: 'Une image caviardée ne prouve pas qu’un document respecte une loi sur la confidentialité, une décision de justice ou une politique interne.',
      },
      {
        title: 'Pas un avis juridique',
        copy: 'Les guides expliquent le caviardage pratique. Ils ne remplacent pas un avocat ou un délégué à la protection des données.',
      },
      {
        title: 'Pas un éditeur complet',
        copy: 'Il n’y a pas encore de calques, d’annotations textuelles, d’exports par lots ni de réorganisation des pages PDF. C’est un outil ciblé pour couvrir des éléments.',
      },
      {
        title: 'Pas infaillible',
        copy: 'L’OCR fait au mieux, et un cadre ne couvre que ce qu’il couvre. Regardez toujours le fichier exporté avant de le partager.',
      },
    ],
    footnote:
      'Ces limites sont la raison pour laquelle la vérification et un dernier contrôle visuel font partie du flux de travail, et non d’un extra facultatif.',
  },
  cta: {
    eyebrow: 'Utilisez-le pour ce qu’il est',
    title: 'Partagez la capture. Pas les secrets.',
    copy: 'L’éditeur est gratuit, local et ouvert à l’inspection. Chargez une image ou un PDF, couvrez ce qui ne devrait pas voyager avec lui, et vérifiez l’export avant de l’envoyer.',
    primary: 'Caviarder un fichier',
    secondary: 'Parlez-nous',
    secondaryHref: '/contact',
  },
};
