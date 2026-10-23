import type { HomeContent } from './types';

export const homeFrFR: HomeContent = {
  meta: {
    title: 'Outil de caviardage d’images et de PDF — Gratuit, privé, en ligne | Redact',
    description:
      'Logiciel gratuit de caviardage d’images et de PDF. Masquez noms, e-mails, numéros de carte et adresses sur votre appareil — sans envoi ni compte.',
    keywords: [
      'caviardage d’image',
      'caviarder une image',
      'caviarder un PDF',
      'caviardage de PDF',
      'logiciel de caviardage',
      'caviardage en ligne',
      'caviardage automatique par IA',
      'masquer les données sensibles sur une image',
      'anonymiser une capture d’écran',
      'Redact',
    ],
    ogImageAlt: 'Redact — un outil gratuit de caviardage d’images et de PDF',
  },
  useCasesHead: {
    eyebrow: 'Ce que les gens cachent',
    title: 'Chaque capture d’écran contient un petit aveu.',
    copy: 'Le secret évident est rarement le seul. Choisissez le type d’image que vous êtes sur le point de partager et voyez ce qui doit généralement être couvert.',
  },
  hero: {
    badge: 'Caviardage d’images et de PDF, sur votre appareil',
    title: ['Partagez la capture.', 'Pas les secrets.'],
    lead: 'Caviardez images et PDF dans votre navigateur : masquez noms, e-mails, numéros de carte et adresses en quelques secondes. La détection intelligente s’exécute sur votre appareil, et chaque export abandonne ses métadonnées.',
    primaryCta: 'Caviarder un fichier',
    secondaryCta: 'Voir comment ça marche',
    proof: ['Gratuit', 'Sans compte', 'Aucun envoi', 'Sans filigrane'],
  },
  facts: [
    {
      icon: 'lock',
      title: '0 octet envoyé',
      copy: 'Aucun point d’envoi n’existe.',
    },
    {
      icon: 'shield',
      title: 'Métadonnées supprimées',
      copy: 'Les données EXIF et GPS ne suivent pas l’export.',
    },
    {
      icon: 'zap',
      title: 'Gratuit, sans compte',
      copy: 'Aucun e-mail, aucune formule, aucun filigrane.',
    },
    {
      icon: 'globe',
      title: 'Fonctionne dans le navigateur',
      copy: 'Tout navigateur moderne suffit. Rien à installer.',
    },
  ],
  proof: {
    eyebrow: 'Des preuves, pas des promesses',
    title: 'La barre noire, c’est tout l’enjeu.',
    copy: 'Un caviardage doit être ennuyeux : opaque, aplati et vérifié. Rien à décoller dans le fichier que vous téléchargez — et ce, quel que soit le style choisi parmi les quatre proposés.',
    points: [
      {
        icon: 'square',
        title: 'Aplati, sans calques',
        copy: 'L’export est une nouvelle image. Pas de calque caché, pas de masque modifiable, pas d’annulation dans le fichier.',
      },
      {
        icon: 'shield-check',
        title: 'Revérifiez avant de partager',
        copy: 'La vérification relit l’image aplatie et signale le texte qui correspond encore à un motif sensible.',
      },
      {
        icon: 'eye',
        title: 'Inspectez-la en taille réelle',
        copy: 'Passez en revue les quatre styles dans l’exemple, puis faites glisser la poignée et cherchez le texte qui dépasse derrière un masque.',
      },
    ],
    cta: 'Ouvrir l’exemple de pièce d’identité',
    sampleName: 'Carte étudiante',
  },
  useCases: [
    {
      title: 'Discussions et messages',
      copy: 'Noms, e-mails, numéros de téléphone et détails de livraison glissés dans les bulles de message.',
      alt: 'Une capture de messagerie avec des barres noires couvrant un nom, une adresse e-mail, un numéro de téléphone, une adresse et une date d’expiration de carte.',
      sample: '/samples/chat.svg',
      sampleName: 'Capture de messagerie',
      icon: 'chat',
      badge: 'Caviardé',
    },
    {
      title: 'Pièces d’identité et documents',
      copy: 'Photos, dates de naissance, numéros de pièce, adresses et codes lisibles par machine.',
      alt: 'Une carte étudiante avec des barres noires couvrant la photo, le nom, la date de naissance, le numéro de carte, l’adresse, le code-barres et le QR code.',
      sample: '/samples/id.svg',
      sampleName: 'Carte étudiante',
      icon: 'id-card',
      badge: 'Caviardé',
    },
    {
      title: 'Reçus et opérations bancaires',
      copy: 'Coordonnées de carte, e-mails de facturation, numéros de commande, identifiants fiscaux et contacts du service client.',
      alt: 'Un reçu avec des barres noires couvrant le numéro de commande, les détails de paiement, l’e-mail de facturation, l’adresse de livraison, l’identifiant fiscal et le téléphone du service client.',
      sample: '/samples/receipt.svg',
      sampleName: 'Reçu',
      icon: 'credit-card',
      badge: 'Caviardé',
    },
    {
      title: 'Tableaux de bord professionnels',
      copy: 'Comptes connectés, tables clients, chiffres d’affaires et URL internes.',
      alt: 'Un tableau de bord analytique avec des barres noires couvrant le titulaire du compte, les noms des clients, les adresses e-mail et les chiffres d’affaires.',
      sample: '/samples/dashboard.svg',
      sampleName: 'Tableau de bord',
      icon: 'layout',
      badge: 'Caviardé',
    },
  ],
  detection: {
    eyebrow: 'Détection intelligente',
    title: 'Cessez de chercher les éléments sensibles.',
    copy: 'La détection intelligente lit le texte déjà visible dans votre capture d’écran et propose les lignes qui ressemblent à des identifiants. Elle s’exécute dans un Web Worker sur votre appareil : l’image ne quitte jamais la page.',
    points: [
      'Repère les e-mails, numéros de carte, numéros de téléphone, pièces d’identité, adresses et dates.',
      'Chaque zone est une suggestion — incluez-la ou excluez-la avant de caviarder.',
      'Le mode Tout le texte couvre chaque ligne détectée lorsque vous préférez ne pas trancher.',
      'La vérification relit le résultat aplati pour repérer le texte qui semble encore sensible.',
    ],
    primaryCta: 'Essayer la détection intelligente',
    secondaryCta: 'Lire le guide du caviardage',
    footnote:
      'Au premier usage, le moteur OCR, le modèle anglais et le modèle de visages sont téléchargés. L’image ne fait pas partie de ces requêtes.',
  },
  styles: {
    eyebrow: 'Styles de caviardage',
    title: 'Quatre façons de faire disparaître quelque chose.',
    copy: 'Adaptez le masque au risque. Les effets doux sont plus esthétiques ; la barre noire est celle à qui confier l’argent et l’identité.',
    cta: 'Ouvrir l’éditeur',
  },
  privacy: {
    eyebrow: 'Confidentialité par conception',
    title: 'L’image n’a nulle part où aller.',
    copy: 'Ce n’est pas une promesse de supprimer votre fichier après traitement. Le fichier n’est jamais envoyé, dès le départ. Vous pouvez le confirmer dans l’onglet réseau.',
    cta: 'Lire les notes sur la confidentialité',
    points: [
      {
        icon: 'monitor',
        title: 'C’est votre navigateur qui travaille',
        copy: 'Le fichier est décodé dans un canvas de cet onglet. Aucun point d’envoi n’existe pour le transmettre.',
      },
      {
        icon: 'image',
        title: 'Les exports sont de nouvelles images',
        copy: 'Le réencodage par canvas laisse derrière lui les données EXIF d’origine, les coordonnées GPS et les détails de l’appareil.',
      },
      {
        icon: 'globe',
        title: 'Les requêtes supplémentaires sont divulguées',
        copy: 'La détection intelligente télécharge Tesseract.js et un modèle anglais au premier usage, et « Détecter les visages » un petit modèle MediaPipe. Votre image ne fait jamais partie de ces requêtes. Le caviardage manuel fonctionne sans elles.',
      },
    ],
  },
  compare: {
    eyebrow: 'Comparatif',
    title: 'Un petit outil, une frontière claire.',
    copy: 'Des catégories, pas des produits précis. La comparaison utile n’est pas la liste des fonctions : c’est l’endroit où va votre image.',
  },
  how: {
    eyebrow: 'Comment ça marche',
    title: 'Trois étapes. Aucun écran de compte au milieu.',
    copy: 'Ouvrez la page, travaillez l’image, récupérez le fichier. Tout le parcours tient là.',
    steps: [
      {
        number: '01',
        title: 'Déposez ou collez une image',
        copy: 'PNG, JPG, WebP, GIF, BMP ou AVIF. Elle s’ouvre localement — pas sur un serveur.',
        icon: 'image',
      },
      {
        number: '02',
        title: 'Couvrez ce qui ne doit pas circuler',
        copy: 'Lancez la détection intelligente, puis déplacez, redimensionnez ou dessinez des zones. Utilisez encre, pixellisation, flou ou autocollant.',
        icon: 'cursor',
      },
      {
        number: '03',
        title: 'Vérifiez et téléchargez',
        copy: 'Relisez le résultat aplati, puis exportez en PNG, JPG ou WebP sans métadonnées — et allégez le fichier s’il est trop lourd.',
        icon: 'shield-check',
      },
    ],
    cta: 'Commencer à caviarder',
  },
  guide: {
    eyebrow: 'Caviardage d’images',
    title: 'Le caviardage d’images, à partir des pixels.',
    lead: 'Ce qu’un bon outil supprime, comment la détection sur appareil aide, et où chaque style s’arrête.',
    intro:
      'Le caviardage d’images consiste à supprimer ou masquer durablement les détails sensibles d’une image avant de la partager. Un bon outil de caviardage fait trois choses : il repère les informations qui comptent, les couvre d’une manière impossible à décoller, et ne laisse aucune donnée cachée dans le fichier exporté. Cette page explique comment le caviardage fonctionne dans cet éditeur, ce que la détection sur appareil peut voir ou non, et les vérifications à faire avant qu’une image ne quitte vos mains.',
    sections: [
      {
        id: 'what-image-redaction-removes',
        navLabel: 'Ce que le caviardage supprime',
        title: 'Ce que le caviardage d’images supprime réellement',
        paragraphs: [
          'Le caviardage n’est pas de la décoration. Une barre noire, un bloc pixelisé, un flou et un recadrage modifient tous une image, mais seuls certains suppriment l’information en dessous. Le test est simple : après l’export, le détail couvert ne doit être ni lisible, ni récupérable, ni déductible de ce qui reste. Si un nom, une adresse e-mail, un numéro de carte, un numéro de pièce d’identité, une adresse, une date de naissance, un code-barres ou un identifiant de compte reste lisible — ou reconstructible à partir des pixels —, l’image n’est pas encore caviardée.',
          'Cette distinction compte, car les captures d’écran regorgent de combinaisons. Un nom seul peut être public. Le même nom à côté d’un code postal, d’un numéro de commande et des quatre derniers chiffres d’une carte forme un ensemble qui peut ouvrir un compte ou appuyer un paiement. Couvrez ce qui identifie une personne, donne accès ou prouve une transaction, et considérez que deux de ces détails réunis sont plus sensibles que chacun pris isolément.',
        ],
      },
      {
        id: 'why-screenshots-leak',
        navLabel: 'Pourquoi les captures fuient',
        title: 'Pourquoi les captures d’écran en disent plus que vous ne croyez',
        paragraphs: [
          'Une capture d’écran enregistre tout le cadre, pas seulement la partie que vous vouliez saisir. Onglets du navigateur, barre d’URL, bannières de notification, pastille de compte connecté, avatar, nom d’espace de travail, horodatage et nom de fichier dans la barre de titre voyagent tous avec l’image. Le détail que vous avez remarqué en premier est rarement le seul à couvrir.',
          'Les fichiers image peuvent aussi transporter des métadonnées : champs EXIF, coordonnées GPS, détails de l’appareil photo et nom de fichier d’origine. Les captures d’écran en contiennent moins que les photos prises avec un appareil, mais partez du principe que tout ce dont le destinataire n’a pas besoin ne doit pas partir avec le fichier. Cet éditeur exporte une image réencodée depuis un canvas : les métadonnées d’origine restent donc sur place.',
        ],
      },
      {
        id: 'ai-image-redaction-software',
        navLabel: 'Comment marche la détection',
        title: 'Comment fonctionne ici le logiciel de caviardage par IA',
        paragraphs: [
          'La détection de texte de ce logiciel de caviardage repose sur de l’OCR et des contrôles de motifs, pas sur un modèle génératif qui invente des détails. Tesseract lit le texte déjà visible dans l’image au sein d’un Web Worker, puis l’éditeur recherche des e-mails, des numéros de carte valides selon l’algorithme de Luhn, des numéros de téléphone, des SSN, des numéros Aadhaar, des PAN, des GSTIN, des IBAN, des adresses IP, des dates, des mots-clés d’adresse et de courtes lignes en majuscules qui ressemblent à des noms. « Détecter les visages » ajoute un modèle BlazeFace distinct, sur l’appareil, qui propose des zones autour des visages sur les photos. Chaque correspondance arrive sous forme de suggestion que vous pouvez conserver ou écarter.',
          'Un logiciel de caviardage par IA est utile en première passe, pas comme autorité finale. L’analyse peut manquer un petit visage, un QR code, un code-barres, un logo ou un nom inhabituel, et elle ne peut pas savoir quels détails sont sensibles dans votre contexte. Servez-vous-en pour arrêter de chercher ligne par ligne, puis relisez le cadre vous-même. Le mode Tout le texte couvre chaque ligne détectée lorsqu’une capture chargée rend les décisions au cas par cas trop risquées.',
        ],
      },
      {
        id: 'image-redaction-online',
        navLabel: 'En ligne, sans envoi',
        title: 'Le caviardage d’images en ligne, sans l’envoi',
        paragraphs: [
          'La plupart des outils de caviardage d’images en ligne vous demandent d’envoyer le fichier à un serveur, d’attendre son retour et de croire que la copie a été supprimée. Celui-ci est construit dans l’autre sens. Le navigateur décode l’image dans un canvas de l’onglet courant, garde les pixels en mémoire et dessine chaque caviardage localement. Il n’y a pas de point d’envoi, donc pas de copie serveur à supprimer. La page Confidentialité documente chaque requête effectuée par le site.',
          'Un ensemble de requêtes mérite d’être connu : les détecteurs. Au premier usage, la page télécharge Tesseract.js, un modèle de langue anglaise et le modèle de visages MediaPipe. Votre image ne fait pas partie de ces requêtes. Le caviardage manuel, l’annulation, la copie et l’export n’en ont pas besoin, et vous pouvez observer chaque requête dans l’onglet réseau de votre navigateur.',
        ],
      },
      {
        id: 'redaction-styles',
        navLabel: 'Quatre styles, un sûr',
        title: 'Quatre styles, et celui à qui faire confiance',
        paragraphs: [
          'L’encre noire dessine une forme opaque et aplatie sur les pixels d’origine. Aucun dégradé à inverser, aucun motif à analyser : c’est pourquoi elle est le choix par défaut pour les pièces d’identité, les détails de paiement, les adresses et tout ce qui donne accès à un compte. La pixellisation remplace une zone par des blocs de couleur moyennée ; elle peut sembler radicale tout en conservant la forme des grandes lettres. Le flou est l’option la plus douce et la garantie la plus faible, car un texte ou un visage légèrement flouté ou pixelisé peut parfois être partiellement reconstruit.',
          'L’autocollant emoji dessine une plaque opaque avant l’emoji : il couvre donc la zone au lieu de flotter en transparence dessus. Il convient à un visage dans une discussion de groupe décontractée. Le recadrage est le caviardage le plus fort de tous lorsque le contexte autour n’est pas nécessaire : un recadrage ne se défloute pas. Pour tout ce qui identifie une personne, déplace de l’argent ou ouvre un compte, préférez l’encre ou le recadrage. Gardez les effets plus doux pour le contexte que vous accepteriez de perdre.',
        ],
      },
      {
        id: 'image-redaction-tool',
        navLabel: 'Ce que l’outil doit faire',
        title: 'Ce qu’un bon outil de caviardage d’images doit faire',
        paragraphs: [
          'La liste des fonctions compte moins que la frontière qui l’entoure. Un outil qui mérite d’être utilisé doit travailler le fichier localement, garder chaque zone modifiable jusqu’à l’export, aplatir le résultat en de nouveaux pixels et vérifier sa propre sortie avant le téléchargement. Il doit aussi être honnête sur l’endroit où la détection s’arrête, plutôt que de laisser croire qu’une analyse est une garantie.',
          'Ces principes expliquent pourquoi cet éditeur fonctionne ainsi :',
        ],
        bullets: [
          'Local par défaut : le fichier est décodé dans l’onglet, sans point d’envoi.',
          'Modifiable jusqu’à l’export : les zones se déplacent et se redimensionnent, les actions s’annulent et se rétablissent ; le téléchargement est aplati.',
          'Sortie vérifiée : une nouvelle analyse signale le texte qui se lit encore comme sensible.',
          'Fichiers propres : des exports PNG, JPG ou WebP neufs, sans les métadonnées d’origine, plus un panneau de taille qui mesure le vrai téléchargement.',
          'Aucun compte, aucun filigrane, aucun paiement.',
        ],
      },
      {
        id: 'pre-share-check',
        navLabel: 'Une vérification avant l’envoi',
        title: 'Une courte vérification avant l’envoi',
        paragraphs: [
          'Avant que l’image ne quitte vos mains, faites une passe lente sur tout le cadre. Ces contrôles évitent la plupart des erreurs coûteuses :',
        ],
        bullets: [
          'Regardez les quatre coins, l’en-tête, les onglets et toute notification.',
          'Utilisez l’encre pour les identifiants et les détails de paiement ; réservez le flou et la pixellisation au contexte.',
          'Zoomez et vérifiez qu’aucun texte ne dépasse derrière un bord.',
          'Lancez la vérification, puis ouvrez le fichier exporté en taille réelle.',
          'Demandez-vous si un recadrage serait plus sûr qu’un caviardage.',
          'N’envoyez que la version caviardée. Ne la faites jamais suivre de l’originale.',
        ],
      },
    ],
    principles: [],
    checks: [],
    cta: 'Caviarder une image',
    relatedLinks: [
      { label: 'Reçus', slug: 'redact-a-receipt' },
      { label: 'Pièces d’identité', slug: 'redact-an-id-card' },
      { label: 'tableaux de bord professionnels', slug: 'work-screenshot-checklist' },
      { label: 'captures de discussion', slug: 'how-to-redact-a-screenshot' },
    ],
    closing:
      'La version courte est toujours la même : couvrez ce qui identifie, vérifiez ce qui reste, et envoyez la plus petite image qui fait encore passer votre message.',
  },
  guides: {
    eyebrow: 'Guides',
    title: 'Un peu de paranoïa, mise par écrit.',
    copy: 'Des notes courtes et pratiques sur ce qu’il faut couvrir, quel style utiliser et comment vérifier son propre travail.',
    cta: 'Tous les guides',
  },
  faq: {
    eyebrow: 'FAQ sur le caviardage d’images',
    title: 'Questions fréquentes sur le caviardage d’images.',
    copy: 'S’il manque quelque chose, demandez. La réponse sera ajoutée ici plutôt qu’enfouie dans une boîte de support.',
    ask: 'Poser une question',
  },
  cta: {
    eyebrow: 'Quand vous voulez',
    title: 'La capture la plus sûre est celle qui en dit moins.',
    copy: 'Ouvrez l’éditeur, déposez une image et prenez une minute pour couvrir ce qui ne doit pas voyager avec elle. Sans compte, sans envoi, sans filigrane.',
    primary: 'Caviarder une image',
    secondary: 'Lire les notes sur la confidentialité',
    secondaryHref: '/privacy',
  },
};
