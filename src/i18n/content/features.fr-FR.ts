import type { FeaturesContent } from './types';

export const featuresFrFR: FeaturesContent = {
  meta: {
    title: 'Fonctionnalités — Redact',
    description:
      'Détection de données personnelles sur l’appareil, quatre styles de caviardage, nouvelle analyse de vérification, exports sans métadonnées, raccourcis clavier et limites clairement énoncées.',
    keywords: [
      'fonctionnalités de caviardage d’image',
      'caviardage OCR sur appareil',
      'supprimer les métadonnées d’une image',
      'raccourcis de caviardage',
      'vérifier un caviardage',
    ],
  },
  hero: {
    eyebrow: 'Fonctionnalités',
    title: 'Du caviardage sérieux. Sans rituel d’envoi.',
    lead: 'Tout ce qu’il faut pour retirer les détails sensibles d’une capture d’écran — plus les contrôles que la plupart des outils ignorent, et un compte rendu honnête de ce qui demande encore un œil humain.',
    primaryCta: 'Ouvrir l’éditeur',
    secondaryCta: 'Comment fonctionne la confidentialité',
  },
  features: [
    {
      icon: 'sparkles',
      title: 'Détection intelligente des données personnelles',
      copy: 'L’OCR repère e-mails, numéros de carte, téléphones, pièces d’identité, adresses et noms probables — sur votre appareil.',
    },
    {
      icon: 'scan',
      title: 'Mode Tout le texte',
      copy: 'Couvrez chaque ligne détectée lorsque vous préférez ne pas trancher pour chacune.',
    },
    {
      icon: 'square',
      title: 'Quatre styles de caviardage',
      copy: 'Encre opaque, pixellisation, flou ou autocollant emoji. Utilisez des rectangles ou des ovales.',
    },
    {
      icon: 'move',
      title: 'Déplacer et redimensionner',
      copy: 'Décalez une zone ou tirez un coin jusqu’à couvrir les bords. Annuler et rétablir tiennent à une touche.',
    },
    {
      icon: 'shield-check',
      title: 'Nouvelle analyse de vérification',
      copy: 'Lancez l’OCR sur le résultat aplati pour signaler tout ce qui se lit encore comme sensible.',
    },
    {
      icon: 'download',
      title: 'Exports propres',
      copy: 'Téléchargez en PNG, JPG ou WebP — ou copiez dans le presse-papiers. Les métadonnées restent sur place, et le fichier peut être allégé avant l’envoi.',
    },
  ],
  detection: {
    eyebrow: 'Détection',
    title: 'Trouvez le texte et les visages avant de partager.',
    copy: 'La détection intelligente lit la capture d’écran ou la page PDF affichée avec l’OCR Tesseract dans un Web Worker, puis compare chaque ligne à des motifs d’identifiants courants. « Détecter les visages » exécute un petit modèle MediaPipe dans le même onglet. Aucun des deux détecteurs n’envoie votre fichier ; les modèles sont téléchargés une fois.',
    cards: [
      {
        title: 'Ce qu’elle recherche',
        copy: 'E-mails, numéros de carte valides selon l’algorithme de Luhn, SSN, Aadhaar, PAN, GSTIN, IBAN, numéros de téléphone, adresses IP, dates, mots-clés d’adresse et noms probables — ainsi que les visages dans les photos et les pièces d’identité.',
      },
      {
        title: 'Ce que vous contrôlez',
        copy: 'Une zone n’est incluse par défaut que si elle correspond. Cliquez sur une zone pour l’exclure, utilisez Tout le texte pour couvrir chaque ligne, ou appliquez votre style actuel aux suggestions de visages.',
      },
      {
        title: 'Visages, sur l’appareil',
        copy: '« Détecter les visages » propose une zone légèrement agrandie autour de chaque visage trouvé. Vérifiez les suggestions, puis caviardez-les avec l’encre, la pixellisation, le flou ou un autocollant emoji.',
      },
    ],
    cta: 'Essayer sur un exemple',
  },
  styles: {
    eyebrow: 'Styles',
    title: 'Choisissez le masque adapté au risque.',
    copy: 'L’encre est le choix par défaut, et pour une bonne raison. Les effets plus doux sont utiles quand le détail relève du contexte plutôt que de l’identité.',
  },
  review: {
    eyebrow: 'Relecture',
    title: 'Une seconde passe, sans quitter l’onglet.',
    copy: 'Un caviardage est facile à réussir à moitié. La vérification relit l’image aplatie à la recherche de données personnelles lisibles. La fonction Comparer revient à l’original pour voir exactement ce qui a changé. L’annulation est là si vous repérez une erreur.',
    points: [
      {
        icon: 'shield-check',
        title: 'Vérifiez le résultat, pas l’aperçu',
        copy: 'La nouvelle analyse porte sur le rendu final : elle voit donc ce que contiendra le fichier exporté.',
      },
      {
        icon: 'eye',
        title: 'Comparez sans perdre votre travail',
        copy: 'Activez et désactivez l’original. Vos zones et votre historique restent intacts.',
      },
      {
        icon: 'undo',
        title: 'Annulez tout l’historique',
        copy: 'Dessin, déplacement, redimensionnement et effacement rejoignent la même pile d’annulation.',
      },
    ],
    panel: {
      title: 'Vérification',
      badge: 'Exemple de résultat',
      okTitle: 'Aucune donnée personnelle lisible trouvée',
      okCopy: 'L’image aplatie a été analysée de nouveau. Faites tout de même un dernier contrôle visuel.',
      checks: ['Motifs d’e-mail', 'Motifs de numéro de carte', 'Motifs de téléphone', 'Motifs de pièce d’identité et de date'],
      matches: '0 correspondance',
      footnote: 'OCR au mieux de ses possibilités. Une analyse propre est une preuve, pas une garantie.',
    },
    cta: 'Ouvrir l’éditeur',
  },
  delivery: {
    eyebrow: 'Livraison',
    title: 'Caviardez, puis allégez assez pour envoyer.',
    copy: 'Une capture caviardée reste souvent trop lourde pour une messagerie, un ticket ou un e-mail. Le panneau Taille mesure le véritable export dans votre navigateur : baissez la qualité pour JPG et WebP, plafonnez le plus grand côté et lisez le nombre d’octets réel avant de télécharger quoi que ce soit.',
    points: [
      {
        icon: 'gauge',
        title: 'Une estimation en direct, pas une supposition',
        copy: 'Le panneau encode l’export dans votre onglet et indique la taille réelle du fichier ainsi que le pourcentage économisé par rapport à la version pleine taille.',
      },
      {
        icon: 'shrink',
        title: 'Plafonnez le plus grand côté',
        copy: 'Redimensionnez le résultat aplati à 2 560, 1 920, 1 280 ou 960 px. La scène est mise à l’échelle dans son ensemble : chaque caviardage tombe exactement où vous l’avez dessiné.',
      },
      {
        icon: 'info',
        title: 'Honnête sur le PNG',
        copy: 'Le PNG est sans perte : le curseur de qualité y est donc désactivé. Utilisez le plafond de taille — ou choisissez WebP, généralement bien plus léger pour les captures d’écran.',
      },
    ],
    panel: {
      title: 'Réduire la taille',
      badge: 'Exemple de résultat',
      quality: 'Qualité',
      qualityValue: '72 %',
      qualityNote: 'S’applique aux exports JPG et WebP. Le PNG reste sans perte.',
      edge: 'Plus grand côté',
      edgeValue: '1 920 px',
      edgeNote: 'Redimensionne le résultat aplati. Les caviardages restent intégrés.',
      estimate: 'Export estimé',
      estimateValue: '212 Ko · 1 920 × 1 080',
      estimateNote: '−86 % par rapport à 1,5 Mo en pleine taille',
    },
    cta: 'Ouvrir le panneau Taille',
  },
  proof: {
    eyebrow: 'Preuves',
    title: 'Voyez les pixels, pas une promesse.',
    copy: 'L’image après caviardage est intégrée, pas superposée. Faites glisser la poignée et inspectez le bord de chaque barre. Si quelque chose reste lisible, ce n’est pas caviardé.',
    primaryCta: 'Essayer l’exemple de pièce d’identité',
    secondaryCta: 'Quel style est sûr ?',
  },
  shortcuts: {
    eyebrow: 'Rapidité',
    title: 'Gardez les mains sur le clavier.',
    copy: 'Collez une image depuis le presse-papiers, déposez-la sur l’éditeur ou remplacez le fichier courant sans recharger la page. Puis changez d’outil et annulez sans toucher à la souris.',
    points: [
      'Ctrl / ⌘ + V colle une image lorsque l’éditeur est visible.',
      'Le glisser-déposer fonctionne sur l’écran de démarrage.',
      'Remplacez l’image depuis la barre d’outils sans perdre la page.',
    ],
    panelTitle: 'Raccourcis',
    list: [
      { keys: 'B', action: 'Encre noire' },
      { keys: 'P', action: 'Pixellisation' },
      { keys: 'L', action: 'Flou' },
      { keys: 'E', action: 'Autocollant emoji' },
      { keys: 'F', action: 'Détecter les visages' },
      { keys: 'R', action: 'Sélection rectangulaire' },
      { keys: 'O', action: 'Sélection ovale' },
      { keys: 'C', action: 'Comparer avec l’original' },
      { keys: 'Ctrl / ⌘ + Z', action: 'Annuler' },
      { keys: 'Ctrl / ⌘ + Shift + Z', action: 'Rétablir' },
      { keys: 'Delete', action: 'Supprimer le caviardage sélectionné' },
      { keys: 'Esc', action: 'Effacer la sélection courante' },
    ],
  },
  limits: {
    eyebrow: 'Limites assumées',
    title: 'Ce que cet outil ne fait pas encore.',
    copy: 'Un outil de caviardage doit être clair sur ses angles morts. Voici ceux qu’il vaut mieux connaître avant de se fier au résultat.',
    items: [
      {
        title: 'Petits visages et codes machine',
        copy: 'La détection des visages est fournie au mieux : les visages petits, détournés, partiellement masqués ou dessinés peuvent être manqués. Les QR codes, codes-barres, zones MRZ et logos ne sont pas détectés. Dessinez une zone sur chacun — et vérifiez les deux faces d’une pièce d’identité.',
        badge: 'Au mieux',
      },
      {
        title: 'Les noms : au mieux',
        copy: 'Les noms reposent sur un motif de lignes courtes commençant par une majuscule. Les noms inhabituels, les identifiants en minuscules et les textes stylisés peuvent passer.',
        badge: 'Au mieux',
      },
      {
        title: 'Une image à la fois',
        copy: 'Il n’y a pas encore de file d’attente par lots. Remplacez l’image et recommencez ; chaque export est indépendant et sans métadonnées.',
        badge: 'Pas encore',
      },
      {
        title: 'Pas d’annotation textuelle',
        copy: 'Vous ne pouvez pas ajouter d’étiquette « pour Acme uniquement » dans l’éditeur. Ajoutez du contexte avec un outil de balisage séparé, à l’écart de la zone caviardée.',
        badge: 'Pas encore',
      },
    ],
    footnote:
      'Aucun contrôle automatisé ne remplace un dernier coup d’œil à l’image exportée. Dans le doute, utilisez l’encre et recadrez davantage.',
  },
  cta: {
    eyebrow: 'Quand vous voulez',
    title: 'Utilisez les fonctions, puis vos yeux.',
    copy: 'La détection intelligente sauve la première passe. L’encre, la vérification et un dernier regard à 100 % sauvent la dernière.',
    primary: 'Caviarder une image',
    secondary: 'Lire les guides',
    secondaryHref: '/guides',
  },
};
