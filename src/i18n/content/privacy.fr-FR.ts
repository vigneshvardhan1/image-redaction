import type { PrivacyContent } from './types';

export const privacyFrFR: PrivacyContent = {
  meta: {
    title: 'Confidentialité — Redact',
    description:
      'Votre capture d’écran n’est jamais envoyée. Découvrez exactement ce qui s’exécute dans votre navigateur, l’unique requête CDN divulguée pour l’OCR facultatif, et comment vérifier ces affirmations vous-même.',
    keywords: [
      'confidentialité caviardage d’images',
      'caviardage d’images dans le navigateur',
      'éditeur d’images sans envoi',
      'vérifier l’absence d’envoi',
    ],
  },
  hero: {
    eyebrow: 'Confidentialité',
    title: 'L’image ne quitte jamais cet onglet.',
    lead: 'Pas après le traitement. Pas pour la modération. Pas sous forme d’événement d’analyse anonyme. Votre navigateur lit le fichier, le caviarde et en écrit un nouveau.',
    primaryCta: 'Ouvrir l’éditeur',
    secondaryCta: 'Vérifiez-le vous-même',
  },
  policyNotice:
    'Cette page explique comment l’éditeur traite votre image. Pour la politique officielle — cookies, journaux d’hébergement et vos droits — lisez la Politique de confidentialité.',
  badges: [
    'Aucun envoi d’image',
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
        copy: 'L’image est dessinée sur un canvas en mémoire. C’est la même API Canvas que celle utilisée par tous les éditeurs d’images.',
      },
      {
        icon: 'square',
        title: 'Vous dessinez les cadres',
        copy: 'Les caviardages sont dessinés sur les pixels locaux. L’historique d’annulation vit dans la mémoire JavaScript, pas dans une base de données.',
      },
      {
        icon: 'download',
        title: 'Le canvas exporte une nouvelle image',
        copy: 'Le téléchargement est un nouveau fichier encodé depuis le canvas. Il ne contient ni EXIF, ni GPS, ni métadonnées d’appareil.',
      },
    ],
    noServerTitle: 'Aucun serveur au milieu.',
    noServerCopy:
      'Il n’existe aucun point de terminaison pour recevoir une image, donc il n’y a rien à conserver, journaliser, modérer ou vendre. Fermer l’onglet efface la copie de travail de la mémoire.',
    requestLabel: 'Requête illustrative',
    requestText: 'POST /upload',
    requestResult: '→ 404 Not Found',
    requestNote: 'Aucun point de terminaison de ce type n’existe sur imageredaction.com.',
  },
  network: {
    eyebrow: 'Requêtes réseau',
    title: 'La liste honnête.',
    copy: 'La détection intelligente est facultative, et c’est la seule fonctionnalité qui doit récupérer du code après le chargement de la page. Voici toutes les requêtes que l’éditeur peut effectuer.',
    columns: { request: 'Requête', when: 'Quand', contains: 'Ce qu’elle contient' },
    rows: [
      {
        request: 'Cette page et sa police',
        when: 'À l’ouverture du site',
        contains: 'HTML, CSS, JavaScript et la police Inter auto-hébergée. Aucune image.',
      },
      {
        request: 'Tesseract.js',
        when: 'À la première utilisation de la détection intelligente',
        contains: 'La bibliothèque OCR depuis jsDelivr. Aucune image.',
      },
      {
        request: 'Noyau OCR et modèle anglais',
        when: 'Première détection intelligente dans un navigateur',
        contains: 'WebAssembly et les données de langue demandées par Tesseract.js. Aucune image.',
      },
      {
        request: 'Votre capture d’écran',
        when: 'Jamais',
        contains: 'Rien. Il n’existe aucun point de terminaison d’envoi pour la recevoir.',
        never: true,
      },
    ],
    whenLabel: 'Quand :',
    noteTitle: 'Ce que « en local » signifie ici',
    noteCopy:
      'Le moteur OCR est du code téléchargé, et la reconnaissance s’exécute dans votre navigateur. Votre image n’est pas envoyée avec la requête. L’hébergeur statique et le CDN peuvent conserver des journaux d’accès ordinaires pour les requêtes qui ont effectivement lieu, comme le fait tout site web ou CDN. Ces journaux contiennent l’URL de la requête, pas votre capture d’écran.',
  },
  verify: {
    eyebrow: 'Vérifiez par vous-même',
    title: 'Ne croyez pas cette page sur parole.',
    copy: 'L’affirmation est testable en deux minutes environ. Si vous trouvez une requête qui contient votre image, c’est un bug qui mérite d’être signalé.',
    cta: 'Signaler un problème',
    steps: [
      'Ouvrez les outils de développement de votre navigateur et passez à l’onglet réseau. Videz la liste.',
      'Chargez une image et dessinez quelques cadres. Observez la liste des requêtes : aucune requête d’image n’apparaît.',
      'Lancez la détection intelligente. Vous verrez des requêtes pour la bibliothèque OCR et le modèle. La capture d’écran n’en fait pas partie.',
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
    copy: 'Les mêmes réponses que dans la FAQ, centrées sur la destination de l’image et sur ce qui quitte la page.',
  },
  cta: {
    eyebrow: 'Constatez par vous-même',
    title: 'Apportez une image. Surveillez l’onglet réseau.',
    copy: 'L’éditeur est la preuve. Chargez une capture d’écran, caviardez-la, exportez-la et inspectez le fichier. Rien n’a besoin de quitter l’onglet.',
    primary: 'Ouvrir l’éditeur',
    secondary: 'Lire les guides',
    secondaryHref: '/guides',
  },
};
