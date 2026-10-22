import type { FaqItem } from '../../data/faq';

export const faqsFrFR: FaqItem[] = [
  {
    question: 'Quels styles de caviardage sont disponibles ?',
    answer:
      'Redact propose quatre styles de caviardage d’images : l’encre noire, la pixellisation, le flou et l’autocollant emoji. L’encre noire remplace la zone par des pixels opaques : c’est le choix le plus sûr pour les noms, les numéros de carte, les pièces d’identité, les adresses, les QR codes et tout ce qui touche aux finances. La pixellisation et le flou sont des options plus douces pour les visages et les captures d’écran ordinaires, tandis que l’autocollant emoji peint une plaque opaque et dépose un emoji par-dessus. Les quatre fonctionnent avec des sélections rectangulaires ou ovales.',
  },
  {
    question: 'Ce caviardage est-il vraiment définitif ?',
    answer:
      'Oui — dans le fichier que vous téléchargez. L’export est une nouvelle image aplatie : les caviardages sont donc intégrés aux pixels plutôt qu’enregistrés comme un calque, un masque ou une balise de métadonnées que l’on pourrait retirer. L’image d’origine sur votre appareil reste intacte. Pour les détails qui ne doivent jamais pouvoir être récupérés, utilisez l’encre noire plutôt que le flou ou la pixellisation, et vérifiez les bords avant de partager le fichier.',
  },
  {
    question: 'Quelqu’un peut-il annuler le caviardage ?',
    answer:
      'Pas dans l’image exportée. Le téléchargement ne contient aucun calque caché, aucun historique d’annulation et aucun pixel d’origine, et le réencodage par canvas supprime les métadonnées EXIF et GPS. Le flou et la pixellisation appellent plus de prudence : des recherches ont montré que du texte et des visages légèrement masqués peuvent parfois être partiellement reconstruits. L’encre noire supprime entièrement les pixels sous-jacents, c’est pourquoi elle est le style recommandé pour les données d’identité et financières.',
  },
  {
    question: 'Comment caviarder une image ?',
    answer:
      'Ouvrez l’éditeur Redact et déposez, collez ou choisissez une image. Lancez la détection intelligente pour trouver le texte probablement sensible, ou dessinez un rectangle ou un ovale sur tout ce qu’elle manque, puis choisissez un style de caviardage et ajustez les bords du cadre. Utilisez la vérification pour réanalyser le résultat aplati, puis téléchargez un PNG, un JPG ou un WebP. Tout s’exécute dans votre navigateur, et l’image n’est jamais envoyée.',
  },
  {
    question: 'Puis-je annuler un caviardage après l’avoir dessiné ?',
    answer:
      'Oui, tant que vous êtes encore en train de modifier l’image. Utilisez le bouton Annuler ou Ctrl/Cmd + Z pour revenir en arrière, Rétablir pour restaurer une modification, ou sélectionnez un cadre et appuyez sur Suppr pour le retirer. L’historique d’annulation n’existe que dans l’onglet courant du navigateur et il est effacé lorsque vous fermez ou rechargez la page. Après l’export, le caviardage est aplati dans la nouvelle image et ne peut pas être annulé dans ce fichier.',
  },
  {
    question: 'Quels formats d’image sont pris en charge ?',
    answer:
      'Vous pouvez caviarder des images PNG, JPG, WebP, GIF, BMP et AVIF jusqu’à 25 Mo. Les GIF animés sont aplatis sur leur première image, et les images très volumineuses sont redimensionnées à un grand côté de 5 200 px pour que l’éditeur reste réactif. Les images caviardées peuvent être exportées en PNG, JPG ou WebP, sans métadonnées EXIF ni GPS.',
  },
  {
    question: 'Aurez-vous accès à mon image ?',
    answer:
      'Non. Votre navigateur lit l’image et la dessine sur un canvas local dans votre onglet. Il n’existe aucun point d’envoi : le fichier n’est donc jamais envoyé à un serveur, stocké, journalisé ou examiné par nous. La détection intelligente télécharge un moteur OCR et un modèle anglais au premier usage, mais votre image ne fait pas partie de cette requête. Vous pouvez vérifier ces deux affirmations dans l’onglet réseau de votre navigateur.',
  },
  {
    question: 'Puis-je caviarder autre chose que des visages ?',
    answer:
      'Oui. Vous pouvez couvrir tout ce qui est visible dans une image : visages, noms, adresses e-mail, numéros de téléphone, numéros de carte, numéros de pièce d’identité, adresses, QR codes, codes-barres, logos, noms de compte et bien plus encore. La détection intelligente suggère automatiquement le texte qui ressemble à des e-mails, des numéros de carte, des numéros de téléphone, des pièces d’identité officielles, des adresses et des dates. Les visages, les QR codes, les codes-barres et les logos nécessitent encore un cadre manuel.',
  },
  {
    question: 'Redact utilise-t-il des cookies ou me suit-il ?',
    answer:
      'Un seul cookie fonctionnel. Redact n’a ni analyse d’audience, ni pixels publicitaires, ni traceurs tiers, et votre image n’est jamais envoyée. L’unique cookie enregistre votre préférence de thème clair/sombre, avec une copie dans le stockage local, pour que la page n’affiche pas le mauvais thème lors de votre prochaine visite. Il ne contient aucune donnée personnelle, n’est jamais envoyé à un serveur et peut être supprimé dans les paramètres de votre navigateur à tout moment.',
  },
];

export const privacyFaqsFrFR: FaqItem[] = [
  {
    question: 'Mes images ne sont-elles vraiment jamais envoyées ?',
    answer:
      'C’est exact. Votre navigateur lit le fichier, le dessine sur un canvas local et le garde en mémoire. Il n’existe aucun point d’envoi — vous pouvez observer l’onglet réseau pendant que vous travaillez. La détection intelligente télécharge un moteur OCR et un modèle de texte anglais au premier usage, mais l’image elle-même reste dans l’onglet.',
  },
  {
    question: 'Est-ce gratuit ? Ai-je besoin d’un compte ?',
    answer:
      'C’est gratuit, sans compte et sans filigrane. Ouvrez l’éditeur et utilisez-le. Il n’y a pas d’export payant, pas de compteur de crédits et aucune raison de fournir une adresse e-mail avant de commencer.',
  },
  {
    question: 'Comment fonctionne la détection intelligente ?',
    answer:
      'Elle exécute l’OCR Tesseract dans un Web Worker au sein de votre navigateur, puis applique des contrôles de motifs : e-mails, numéros de carte valides au regard de Luhn, SSN, numéros Aadhaar, PAN, GSTIN, IBAN, numéros de téléphone, adresses IP, dates, mots-clés d’adresse et noms probables. Chaque résultat est une suggestion que vous pouvez inclure ou exclure. L’OCR fait au mieux : vérifiez donc les cadres et utilisez la vérification.',
  },
  {
    question: 'Fonctionne-t-il hors ligne ?',
    answer:
      'L’éditeur, oui. Une fois la page ouverte, vous pouvez continuer à caviarder sans connexion réseau. La détection intelligente a besoin du moteur OCR et du modèle anglais au premier usage ; votre navigateur peut les mettre en cache, mais ne comptez pas sur lui pour une première utilisation hors ligne. Le caviardage manuel, la copie et l’export fonctionnent tous hors ligne.',
  },
  {
    question: 'Les données EXIF et GPS sont-elles supprimées ?',
    answer:
      'Oui. L’export par canvas réencode les pixels : les métadonnées de l’appareil photo, les coordonnées GPS, les détails de l’appareil et le nom d’origine du fichier ne voyagent donc pas avec le nouveau fichier. Les captures d’écran n’ont souvent aucune donnée EXIF au départ ; le réencodage normalise aussi les exports PNG, JPG et WebP.',
  },
  {
    question: 'Puis-je réduire la taille du fichier exporté ?',
    answer:
      'Oui. Le panneau Taille de l’éditeur mesure l’export réel avant que vous ne le téléchargiez : baissez la qualité pour JPG et WebP, ou plafonnez le plus grand côté pour redimensionner l’image aplatie. Vous voyez le nombre d’octets réel et le pourcentage économisé. Le PNG est sans perte, la qualité ne s’y applique donc pas — utilisez le plafond de taille ou choisissez WebP. Les caviardages restent intégrés dans les deux cas.',
  },
];
