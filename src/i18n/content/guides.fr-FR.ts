import type { Guide } from '../../data/guides';

export const guidesFrFR: Guide[] = [
  {
    slug: 'how-to-redact-a-screenshot',
    title: 'Comment caviarder une capture d’écran sans rien oublier',
    description:
      'Un détail oublié dans un coin de capture peut ruiner un caviardage minutieux. Suivez cette méthode reproductible pour repérer ce que l’on oublie presque toujours.',
    category: 'Captures d’écran',
    readingTime: '7 min de lecture',
    date: 'Oct 16, 2026',
    dateISO: '2026-10-16',
    cover: '/samples/chat-redacted.svg',
    coverAlt: 'Une capture d’écran de conversation avec des bandes noires couvrant un nom, une adresse e-mail, un numéro de téléphone, une adresse postale et des données de carte bancaire.',
    intro:
      'La plupart des erreurs de caviardage ne viennent pas du rectangle noir. Elles viennent de tout ce qui l’entoure : le nom dans l’en-tête, l’adresse e-mail dans une notification, le numéro de commande sous le code-barres.',
    blocks: [
      {
        type: 'p',
        text: 'Une capture d’écran fige toute une interface, pas seulement la partie que vous vouliez montrer. La bonne méthode consiste à considérer l’image entière comme suspecte tant que vous ne l’avez pas examinée délibérément, région par région.',
      },
      {
        type: 'h2',
        text: 'Commencez par l’image entière, pas par le secret le plus évident',
      },
      {
        type: 'p',
        text: 'Avant de tracer le moindre rectangle, balayez l’image en Z : du coin supérieur gauche vers la droite, puis vers le bas, et de nouveau vers la gauche. Ce que vous avez remarqué en premier est rarement la seule chose à cacher.',
      },
      {
        type: 'ul',
        items: [
          'Les noms affichés, les noms d’utilisateur, les pseudos, les avatars et les photos de profil.',
          'Les adresses e-mail, les numéros de téléphone et les identifiants de compte dans les bulles de message.',
          'Les adresses, les instructions de livraison et les dates de naissance.',
          'Les numéros de carte, les dates d’expiration, les CVV et les noms de banque.',
          'Les onglets du navigateur, les favoris et la barre d’adresse.',
          'Les bannières de notification et les aperçus de messages.',
          'Les noms de fichiers, les titres de fenêtre et les panneaux latéraux des applications.',
          'Les code-barres, les QR codes, les numéros de commande et les numéros de facture.',
        ],
      },
      {
        type: 'p',
        text: 'Quand vous le pouvez, capturez uniquement la fenêtre de l’application plutôt que tout le bureau. Le recadrage est le caviardage le plus fiable qui soit : moins de pixels, moins d’occasions de laisser passer quelque chose.',
      },
      {
        type: 'h2',
        text: 'Masquez des identités, pas seulement des visages',
      },
      {
        type: 'p',
        text: 'Un visage n’est pas le seul identifiant. Une adresse e-mail peut suffire à cibler quelqu’un. Une fin de numéro de carte et une date d’expiration peuvent permettre un paiement frauduleux. Un numéro de commande associé à un code postal peut ouvrir l’accès à un compte d’assistance. Raisonnez par combinaisons : quels deux éléments, réunis, permettraient à un inconnu d’agir ?',
      },
      {
        type: 'h2',
        text: 'Utilisez l’encre pour tout ce qui compte',
      },
      {
        type: 'p',
        text: 'L’encre noire est un remplissage opaque. Aucun pixel récupérable ne subsiste en dessous. Le flou et la pixelisation sont utiles pour donner du contexte, mais ils peuvent parfois être partiellement inversés, surtout quand le texte est grand ou l’effet léger. Pour les pièces d’identité, les données de paiement, les adresses et l’accès aux comptes, commencez par l’encre.',
      },
      {
        type: 'h2',
        text: 'Faites une passe de vérification',
      },
      {
        type: 'p',
        text: 'Le bouton Vérifier de l’éditeur génère votre image caviardée et lance un OCR sur le résultat aplati. Il recherche le texte qui correspond encore à un motif d’adresse e-mail, de carte, de téléphone, d’identifiant, d’adresse ou de date. Si quelque chose ressort, ajoutez un rectangle et vérifiez de nouveau. Ce contrôle reste une approximation, pas une garantie : un dernier examen humain demeure important.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Chargez l’image',
            text: 'Déposez-la, collez-la ou partez d’un exemple. Le fichier est décodé par votre navigateur.',
          },
          {
            title: 'Lancez la détection intelligente',
            text: 'L’OCR propose les lignes qui semblent sensibles. Cliquez sur une proposition pour l’exclure. Choisissez Tout le texte si vous préférez masquer chaque ligne.',
          },
          {
            title: 'Corrigez les bords',
            text: 'Faites glisser des rectangles sur ce que l’analyse a manqué. Utilisez l’encre pour les identifiants et recadrez si une grande zone est privée.',
          },
          {
            title: 'Vérifiez, puis exportez',
            text: 'Relancez l’analyse sur l’image aplatie, relisez l’aperçu une dernière fois, puis téléchargez un PNG, un JPG ou un WebP sans métadonnées.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Le flou n’est pas une promesse',
        tone: 'warning',
        text: 'Des outils de recherche peuvent parfois récupérer un texte légèrement flouté ou pixelisé. Pour tout ce qui peut identifier une personne ou permettre un paiement, utilisez un rectangle opaque. Réservez les effets doux aux arrière-plans et aux contextes anodins.',
      },
      {
        type: 'h2',
        text: 'Une dernière vérification en 20 secondes',
      },
      {
        type: 'ul',
        items: [
          'Plissez les yeux devant l’aperçu. Un texte dépasse-t-il d’un rectangle ?',
          'Vérifiez les quatre coins, pas seulement le centre de l’image.',
          'Ouvrez le fichier exporté en taille réelle avant de l’envoyer.',
          'Demandez-vous si le destinataire a besoin de toute l’image. Un recadrage est plus sûr qu’un caviardage.',
        ],
      },
      {
        type: 'quote',
        text: 'La capture la plus sûre est celle qui en contient le moins. Caviardez ce que vous devez, recadrez ce que vous pouvez et envoyez la plus petite version qui remplit encore son rôle.',
      },
    ],
    takeaways: [
      'Balayez toute l’image, y compris les en-têtes, les onglets et les notifications.',
      'Utilisez l’encre noire pour les identifiants et les données de paiement.',
      'Vérifiez l’image aplatie et contrôlez l’export en taille réelle.',
    ],
  },
  {
    slug: 'blur-vs-pixelate-vs-black-box',
    title: 'Flou, pixelisation ou rectangle noir : quel caviardage est vraiment sûr ?',
    description:
      'Le flou donne une impression de confidentialité, mais ce n’est pas une garantie. Voici comment se comparent les quatre styles de caviardage et dans quels cas chacun convient.',
    category: 'Choisir un style',
    readingTime: '6 min de lecture',
    date: 'Oct 9, 2026',
    dateISO: '2026-10-09',
    cover: '/samples/id-redacted.svg',
    coverAlt: 'Un exemple de carte d’étudiant avec des bandes noires couvrant la photo, le nom, la date de naissance, le numéro d’identification, l’adresse et le code-barres.',
    intro:
      'Chaque style de caviardage modifie les pixels. Un seul supprime de façon fiable l’information qu’ils contiennent.',
    blocks: [
      {
        type: 'callout',
        title: 'La réponse courte',
        tone: 'note',
        text: 'Utilisez l’encre noire ou un recadrage pour tout ce qui identifie une personne, un compte ou un moyen de paiement. Le flou et la pixelisation servent pour le contexte dont vous acceptez la perte, jamais pour les secrets.',
      },
      {
        type: 'p',
        text: 'Le bon style dépend du risque. Un visage flouté à l’arrière-plan d’une photo de vacances ne pose pas le même problème qu’un numéro de carte flouté sur une facture. C’est en les traitant de la même façon que l’on finit par partager plus que prévu.',
      },
      {
        type: 'h2',
        text: 'Le risque en un paragraphe',
      },
      {
        type: 'p',
        text: 'Le flou et la pixelisation réduisent le niveau de détail, mais ne l’effacent pas. Des chercheurs ont montré à plusieurs reprises que des images en basse résolution, des textes légèrement floutés et des visages pixelisés pouvaient être partiellement reconstruits avec le bon modèle ou suffisamment d’hypothèses. Le résultat n’a pas besoin d’être parfait pour être dangereux. Un numéro de carte partiel, un visage reconnaissable ou une courte adresse e-mail restent exploitables.',
      },
      {
        type: 'h2',
        text: 'L’encre noire',
      },
      {
        type: 'p',
        text: 'L’encre dessine une forme pleine et opaque par-dessus les pixels d’origine. Aucun dégradé à inverser, aucun motif à analyser. Ce n’est pas un hasard si c’est le style par défaut de cet éditeur. Le seul point à surveiller est la couverture : faites le rectangle légèrement plus grand que le texte et zoomez pour vérifier qu’aucune hampe ni signe de ponctuation ne reste à l’extérieur.',
      },
      {
        type: 'h2',
        text: 'La pixelisation',
      },
      {
        type: 'p',
        text: 'La pixelisation remplace une zone par de grands blocs de couleur. Le résultat paraît radical, mais chaque bloc est une moyenne des pixels d’origine. Avec peu de blocs ou un texte court, la forme des lettres peut survivre. Réservez-la au masquage décoratif, jamais à un numéro d’identification ni à une adresse e-mail.',
      },
      {
        type: 'h2',
        text: 'Le flou',
      },
      {
        type: 'p',
        text: 'Le flou est l’option la plus naturelle, et celle qui offre le moins de garanties. Un léger flou gaussien préserve la mise en page et souvent la forme des mots. Les visages peuvent rester reconnaissables avec des rayons de flou étonnamment élevés. C’est un choix raisonnable pour un visage dans une foule si l’image reste petite et que la personne n’est pas le sujet, et un mauvais choix pour une photo d’identité ou un relevé bancaire.',
      },
      {
        type: 'h2',
        text: 'L’autocollant emoji',
      },
      {
        type: 'p',
        text: 'Dans cet éditeur, le style emoji n’est pas un caractère transparent flottant. Il dessine d’abord une pastille blanche opaque, puis pose l’emoji par-dessus. La zone est donc couverte même si l’emoji est plus petit que le rectangle. C’est un rendu sympathique pour un visage dans une conversation de groupe, à condition que le rectangle couvre entièrement le visage et tout nom à proximité.',
      },
      {
        type: 'h2',
        text: 'Le style qui gagne toujours : le recadrage',
      },
      {
        type: 'p',
        text: 'Si un détail n’est pas nécessaire à votre propos, retirez-le complètement du cadre. Recadrez la capture sur le message, le total ou la seule ligne qui compte. Un recadrage ne peut pas être déflouté. Il allège aussi l’image et la rend plus lisible.',
      },
      {
        type: 'h2',
        text: 'Une règle simple',
      },
      {
        type: 'ul',
        items: [
          'Identité, argent ou accès à un compte : encre noire ou recadrage.',
          'Un visage dans une scène publique : le flou uniquement si le visage n’est pas le sujet et que l’image reste petite ; sinon, l’encre.',
          'Éléments visuels anodins : pixelisation ou emoji.',
          'Tout ce qui va sur un profil public : recadrez d’abord, vérifiez ensuite, publiez en dernier.',
        ],
      },
      {
        type: 'p',
        text: 'Un caviardage peut sembler convaincant dans l’éditeur à 40 % de zoom. Contrôlez le fichier exporté à 100 %. Si vous pouvez le lire, partez du principe que quelqu’un d’autre le peut aussi.',
      },
    ],
    takeaways: [
      'L’encre et le recadrage sont les seuls styles qui suppriment réellement l’information.',
      'Le flou et la pixelisation peuvent laisser échapper du texte et des visages.',
      'Jugez l’export final en taille réelle, pas l’aperçu de l’éditeur.',
    ],
  },
  {
    slug: 'redact-an-id-card',
    title: 'Caviarder une pièce d’identité : les champs à ne jamais partager',
    description:
      'La photo d’une pièce d’identité est un condensé de données personnelles. Voici ce qu’il faut masquer, ce qu’il faut recadrer et ce qu’il faut demander avant d’envoyer une copie.',
    category: 'Pièces d’identité et documents',
    readingTime: '6 min de lecture',
    date: 'Sep 24, 2026',
    dateISO: '2026-09-24',
    cover: '/samples/id-redacted.svg',
    coverAlt: 'Une carte d’étudiant avec des bandes noires couvrant la photo, le nom, la date de naissance, le numéro d’identification, l’adresse, le code-barres et le QR code.',
    intro:
      'Une pièce d’identité est conçue pour être lue par des machines et reconnue par des humains. C’est précisément pour cela qu’une photo de ce document a tant de valeur pour une personne malveillante.',
    blocks: [
      {
        type: 'p',
        text: 'Les demandes de vérification sont courantes : louer un logement, ouvrir un compte, retirer un colis ou justifier une réduction étudiante. La demande est souvent légitime. La réponse par défaut, qui consiste à envoyer une photo nette de toute la carte, n’est pas une obligation pour autant.',
      },
      {
        type: 'h2',
        text: 'Le recto et le verso comptent tous les deux',
      },
      {
        type: 'p',
        text: 'Le verso d’une pièce d’identité porte souvent un code-barres, une zone de lecture automatique, une signature ou une adresse. Ne caviarder que le recto laisse une seconde copie des mêmes données. Si vous n’avez pas besoin du verso, ne le photographiez pas.',
      },
      {
        type: 'h2',
        text: 'Masquez ces champs',
      },
      {
        type: 'ul',
        items: [
          'Le numéro d’identification. C’est la clé qui relie la carte aux bases de données et aux systèmes d’assistance.',
          'La date de naissance. Un facteur d’identité essentiel utilisé lors de la récupération de compte.',
          'L’adresse du domicile. Souvent suffisante pour localiser une personne ou répondre à des questions de sécurité.',
          'La photographie. Les données biométriques méritent une protection à part.',
          'Le code-barres, le QR code ou la zone de lecture automatique. Ils peuvent coder les mêmes champs sous une forme facile à copier.',
          'La signature et toute marque manuscrite.',
          'La date d’expiration, la date de délivrance et la nationalité lorsqu’elles ne sont pas nécessaires à la vérification.',
        ],
      },
      {
        type: 'p',
        text: 'Votre nom seul n’est généralement pas le secret. C’est la combinaison qui l’est. Si un formulaire doit correspondre à un nom, laissez le nom visible et masquez tout ce qui en fait une fiche d’identité.',
      },
      {
        type: 'h2',
        text: 'Recadrez au minimum',
      },
      {
        type: 'p',
        text: 'Demandez ce dont le destinataire a réellement besoin. Un hôtel peut avoir besoin de votre nom et des dates de votre séjour. Un fournisseur d’énergie peut avoir besoin de votre nom et de l’adresse du logement concerné. Un agent d’assistance qui vérifie la propriété d’un compte peut n’avoir besoin que du type de carte et des quatre derniers chiffres du compte. Une fiche de paie ou une facture d’énergie convient souvent mieux qu’une pièce d’identité complète.',
      },
      {
        type: 'h2',
        text: 'Utilisez l’encre, pas le flou',
      },
      {
        type: 'p',
        text: 'Les pièces d’identité sont des documents très contrastés, en gros caractères. Le flou et la pixelisation y sont particulièrement inadaptés : le format est prévisible, donc les formes partielles sont plus faciles à reconstruire. Utilisez des rectangles opaques qui dépassent légèrement de chaque champ.',
      },
      {
        type: 'h2',
        text: 'Ajoutez du contexte à la copie',
      },
      {
        type: 'p',
        text: 'Si vous devez écrire « pour vérification auprès d’Acme, le 20 octobre » sur une copie, utilisez l’outil d’annotation de votre téléphone ou un éditeur séparé. Cet outil de caviardage n’ajoute pas encore de texte. Placez la mention à l’écart des champs sensibles et ne partagez pas l’image d’origine.',
      },
      {
        type: 'callout',
        title: 'Envoyez une fois, pas deux',
        tone: 'warning',
        text: 'Si vous envoyez une copie caviardée puis l’original « au cas où », le caviardage n’aura servi à rien. Décidez de ce qui est nécessaire avant le premier message. Vous pourrez toujours en partager davantage plus tard.',
      },
      {
        type: 'h2',
        text: 'Avant d’appuyer sur envoyer',
      },
      {
        type: 'ul',
        items: [
          'Le numéro d’identification, la date de naissance, l’adresse et la signature sont masqués.',
          'Tout code-barres, QR code ou zone de lecture automatique est entièrement caché.',
          'La photo est masquée si le destinataire n’en a pas besoin.',
          'Les deux faces de la carte ont été vérifiées.',
          'L’image exportée est la seule version que vous ayez partagée.',
        ],
      },
    ],
    takeaways: [
      'Masquez le numéro d’identification, la date de naissance, l’adresse, la photo et les codes lisibles par machine.',
      'Demandez ce dont le destinataire a besoin et recadrez en conséquence.',
      'Utilisez une encre opaque, puis vérifiez et n’envoyez que la copie caviardée.',
    ],
  },
];
