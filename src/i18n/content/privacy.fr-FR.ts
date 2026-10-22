import type { PrivacyContent } from './types';

export const privacyFrFR: PrivacyContent = {
  meta: {
    title: 'Confidentialité — Redact',
    description:
      'Votre image ou votre PDF n’est jamais envoyé. Découvrez exactement ce qui s’exécute dans votre navigateur, les requêtes OCR et PDF divulguées, et comment vérifier ces affirmations vous-même.',
    keywords: [
      'confidentialité caviardage d’images',
      'confidentialité caviardage de pdf',
      'caviardage d’images dans le navigateur',
      'éditeur d’images sans envoi',
      'vérifier l’absence d’envoi',
    ],
  },
  hero: {
    eyebrow: 'Confidentialité',
    title: 'Le fichier ne quitte jamais cet onglet.',
    lead: 'Pas après le traitement. Pas pour la modération. Pas sous forme d’événement d’analyse anonyme. Votre navigateur lit le fichier — image ou PDF —, le caviarde et en écrit un nouveau.',
    primaryCta: 'Ouvrir l’éditeur',
    secondaryCta: 'Vérifiez-le vous-même',
  },
  policyNotice:
    'Cette page explique comment l’éditeur traite votre fichier. Pour la politique officielle — cookies, journaux d’hébergement et vos droits — lisez la Politique de confidentialité.',
  badges: [
    'Aucun envoi d’image ou de PDF',
    'Aucun compte',
    'Aucune analyse d’audience',
    'Aucun cookie de suivi',
  ],
  flow: {
    eyebrow: 'Flux de données',
    title: 'Tout le trajet se déroule dans la page.',
    copy: 'Il n’y a pas de file de traitement, pas d’espace de stockage temporaire et aucune promesse « nous la supprimons après 24 heures » à croire. Le fichier est décodé par votre navigateur.',
    localTitle: 'Dans cet onglet de navigateur',
    localBadge: 'Local uniquement',
    steps: [
      {
        icon: 'file',
        title: 'Vous choisissez un fichier',
        copy: 'Un sélecteur de fichier, un collage ou un dépôt. Le navigateur crée une URL d’objet locale — aucune requête ne quitte la page.',
      },
      {
        icon: 'monitor',
        title: 'Le navigateur le décode',
        copy: 'Une image est dessinée sur un canvas en mémoire ; les pages PDF sont rendues une à une par le moteur PDF intégré. Aucune donnée du fichier n’est envoyée.',
      },
      {
        icon: 'square',
        title: 'Vous dessinez les cadres',
        copy: 'Les caviardages sont dessinés sur les pixels locaux. L’historique d’annulation vit dans la mémoire JavaScript, pas dans une base de données.',
      },
      {
        icon: 'download',
        title: 'L’éditeur exporte un nouveau fichier',
        copy: 'Les exports d’images sont réencodés depuis le canvas ; les exports PDF sont reconstruits page par page sous forme d’images. Ni l’un ni l’autre ne contient les métadonnées EXIF, GPS ou documentaires d’origine.',
      },
    ],
    noServerTitle: 'Aucun serveur au milieu.',
    noServerCopy:
      'Il n’existe aucun point de terminaison pour recevoir un fichier, donc il n’y a rien à conserver, journaliser, modérer ou vendre. Fermer l’onglet efface la copie de travail de la mémoire.',
    requestLabel: 'Requête illustrative',
    requestText: 'POST /upload',
    requestResult: '→ 404 Not Found',
    requestNote: 'Aucun point de terminaison de ce type n’existe sur imageredaction.com.',
  },
  network: {
    eyebrow: 'Requêtes réseau',
    title: 'La liste honnête.',
    copy: 'L’éditeur charge son code principal à l’ouverture. La détection intelligente et la prise en charge des PDF ne récupèrent du code supplémentaire qu’au moment de leur utilisation. Voici toutes les requêtes que l’éditeur peut effectuer.',
    columns: { request: 'Requête', when: 'Quand', contains: 'Ce qu’elle contient' },
    rows: [
      {
        request: 'Cette page et sa police',
        when: 'À l’ouverture du site',
        contains: 'HTML, CSS, JavaScript et la police Inter auto-hébergée. Aucune donnée de fichier.',
      },
      {
        request: 'Tesseract.js',
        when: 'À la première utilisation de la détection intelligente',
        contains: 'La bibliothèque OCR depuis jsDelivr. Aucune donnée de fichier.',
      },
      {
        request: 'Noyau OCR et modèle anglais',
        when: 'Première détection intelligente dans un navigateur',
        contains: 'WebAssembly et les données de langue demandées par Tesseract.js. Aucune donnée de fichier.',
      },
      {
        request: 'Moteur PDF et ressources',
        when: 'À la première ouverture d’un PDF',
        contains: 'Le worker PDF.js, les polices et les modules WebAssembly auto-hébergés. Aucune donnée de fichier.',
      },
      {
        request: 'Votre image ou PDF',
        when: 'Jamais',
        contains: 'Rien. Il n’existe aucun point de terminaison d’envoi pour le recevoir.',
        never: true,
      },
    ],
    whenLabel: 'Quand :',
    noteTitle: 'Ce que « en local » signifie ici',
    noteCopy:
      'Le moteur OCR et la prise en charge des PDF sont du code téléchargé, et la reconnaissance comme le rendu s’exécutent dans votre navigateur. Votre fichier n’est pas envoyé avec ces requêtes. L’hébergeur statique et le CDN peuvent conserver des journaux d’accès ordinaires pour les requêtes qui ont effectivement lieu, comme le fait tout site web ou CDN. Ces journaux contiennent l’URL de la requête, pas votre fichier.',
  },
  verify: {
    eyebrow: 'Vérifiez par vous-même',
    title: 'Ne croyez pas cette page sur parole.',
    copy: 'L’affirmation est testable en deux minutes environ. Si vous trouvez une requête qui contient votre fichier, c’est un bug qui mérite d’être signalé.',
    cta: 'Signaler un problème',
    steps: [
      'Ouvrez les outils de développement de votre navigateur et passez à l’onglet réseau. Videz la liste.',
      'Chargez une image ou un PDF et dessinez quelques cadres. Observez la liste des requêtes : aucune requête d’envoi n’apparaît.',
      'Lancez la détection intelligente ou ouvrez un PDF. Vous verrez des requêtes pour le moteur OCR ou PDF. Votre fichier n’en fait pas partie.',
      'Déconnectez-vous d’Internet. Le caviardage manuel, la copie et le téléchargement fonctionnent encore, car les pixels sont déjà en local.',
      'Ouvrez les propriétés du fichier téléchargé. Vous n’y trouverez aucun champ de métadonnées lié à l’appareil photo, au GPS ou à l’appareil.',
    ],
  },
  cards: [
    {
      icon: 'monitor',
      title: 'Votre appareil, votre responsabilité',
      copy: 'Les extensions de navigateur, les gestionnaires de presse-papiers et les outils d’enregistrement d’écran peuvent lire ce qui se passe dans un onglet. Si votre modèle de menace inclut un navigateur compromis, utilisez un profil propre ou un appareil distinct.',
    },
    {
      icon: 'shield',
      title: 'Pas de compte, pas de profil',
      copy: 'Il n’y a pas de connexion, pas de collecte d’e-mail et pas de stockage par utilisateur. L’éditeur n’a aucune idée de qui vous êtes. C’est aussi pourquoi il n’y a aucun historique d’utilisation à exporter.',
    },
    {
      icon: 'code',
      title: 'Ouvert à l’inspection',
      copy: 'L’éditeur est du JavaScript simple et du canvas. Il n’y a pas de couche native cachée. Utilisez l’onglet réseau, lisez la liste des requêtes et testez le comportement hors ligne.',
    },
  ],
  faq: {
    eyebrow: 'Questions de confidentialité',
    title: 'La version courte, répétée.',
    copy: 'Les mêmes réponses que dans la FAQ, centrées sur la destination du fichier et sur ce qui quitte la page.',
  },
  cta: {
    eyebrow: 'Constatez par vous-même',
    title: 'Apportez un fichier. Surveillez l’onglet réseau.',
    copy: 'L’éditeur est la preuve. Chargez une capture d’écran ou un PDF, caviardez-le, exportez-le et inspectez le fichier. Rien n’a besoin de quitter l’onglet.',
    primary: 'Ouvrir l’éditeur',
    secondary: 'Lire les guides',
    secondaryHref: '/guides',
  },
};
