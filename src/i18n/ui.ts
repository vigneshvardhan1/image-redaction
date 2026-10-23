import type { Locale } from './config';

/**
 * Strings that are shared by every page: navigation, footer, theme controls,
 * the language picker, and a few common calls to action.
 *
 * Page-specific copy lives next to the page content in `src/i18n/content/`.
 */
export interface UIStrings {
  'nav.editor': string;
  'nav.features': string;
  'nav.privacy': string;
  'nav.guides': string;
  'nav.faq': string;
  'nav.cta': string;
  'nav.menu': string;
  'nav.menuOpen': string;
  'nav.menuClose': string;
  'nav.language': string;
  'nav.languageChoose': string;
  'nav.languageCurrent': string;

  'theme.title': string;
  'theme.switchToDark': string;
  'theme.switchToLight': string;

  'footer.tagline': string;
  'footer.description': string;
  'footer.processing': string;
  'footer.product': string;
  'footer.resources': string;
  'footer.company': string;
  'footer.legal': string;
  'footer.languages': string;
  'footer.editor': string;
  'footer.features': string;
  'footer.compare': string;
  'footer.privacy': string;
  'footer.guides': string;
  'footer.howItWorks': string;
  'footer.faq': string;
  'footer.shortcuts': string;
  'footer.about': string;
  'footer.contact': string;
  'footer.emailUs': string;
  'footer.privacyPolicy': string;
  'footer.terms': string;
  'footer.verify': string;
  'footer.noUploads': string;
  'footer.noAccount': string;
  'footer.privacySettings': string;
  'footer.backToTop': string;
  'footer.rights': string;

  'consent.title': string;
  'consent.copy': string;
  'consent.accept': string;
  'consent.reject': string;
  'consent.note': string;
  'ad.label': string;

  'common.openEditor': string;
  'common.redactImage': string;
  'common.free': string;
  'common.noAccount': string;
  'common.noUploads': string;
  'common.noWatermark': string;
  'common.footerNote': string;
  'common.englishOnly': string;
  'common.languageLink': string;
  'common.skipToContent': string;

  'guide.inThisGuide': string;
  'guide.eachHasOwnGuide': string;
  'guide.onThisPage': string;
  'guide.breadcrumbAria': string;
  'guide.readyToTry': string;
  'guide.readyCopy': string;
  'guide.caution': string;
  'guide.note': string;
  'guide.shortVersion': string;
  'guide.practice': string;
  'guide.trySample': string;
  'guide.keepReading': string;
  'guide.published': string;
  'guide.backToGuides': string;
  'guide.allGuides': string;

  'demo.styleTour': string;
  'demo.fourWays': string;
  'demo.before': string;
  'demo.after': string;
  'demo.dragHandle': string;
  'demo.flattened': string;
  'demo.seeSample': string;
  'demo.warning': string;
  'demo.redacted': string;
  'demo.openSample': string;
  'demo.sampleScan': string;
  'demo.details': string;
  'demo.readGuide': string;
  'demo.compareAria': string;
  'demo.sampleTitle': string;
  'demo.illustrative': string;
  'demo.detectionAria': string;
  'demo.idOriginalAlt': string;
  'demo.idRedactedAlt': string;
  'nav.primary': string;

  'mode.ink': string;
  'mode.pixelate': string;
  'mode.blur': string;
  'mode.emoji': string;
  'mode.inkBadge': string;
  'mode.softBadge': string;
  'mode.casualBadge': string;

  'ctaBand.note': string;
  'ctaBand.eyebrow': string;
}

const enUS: UIStrings = {
  'nav.editor': 'Editor',
  'nav.features': 'Features',
  'nav.privacy': 'Privacy',
  'nav.guides': 'Guides',
  'nav.faq': 'FAQ',
  'nav.cta': 'Redact an image',
  'nav.menu': 'Menu',
  'nav.menuOpen': 'Open menu',
  'nav.menuClose': 'Close menu',
  'nav.language': 'Language',
  'nav.languageChoose': 'Choose a language',
  'nav.languageCurrent': 'Current language',

  'theme.title': 'Switch color theme',
  'theme.switchToDark': 'Switch to dark theme',
  'theme.switchToLight': 'Switch to light theme',

  'footer.tagline': 'Share the screenshot. Not the secrets.',
  'footer.description':
    "A browser-based redaction studio for screenshots, IDs, receipts, and anything else you'd rather not hand over in full.",
  'footer.processing': 'Processing stays on your device',
  'footer.product': 'Product',
  'footer.resources': 'Resources',
  'footer.company': 'Company',
  'footer.legal': 'Legal',
  'footer.languages': 'Languages',
  'footer.editor': 'Editor',
  'footer.features': 'Features',
  'footer.compare': 'Compare',
  'footer.privacy': 'Privacy',
  'footer.guides': 'Guides',
  'footer.howItWorks': 'How it works',
  'footer.faq': 'FAQ',
  'footer.shortcuts': 'Shortcuts',
  'footer.about': 'About',
  'footer.contact': 'Contact',
  'footer.emailUs': 'Email us',
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
  'footer.verify': 'Verify our claims',
  'footer.noUploads': 'No uploads.',
  'footer.noAccount': 'No account.',
  'footer.privacySettings': 'Privacy settings',
  'footer.backToTop': 'Back to top',
  'footer.rights': 'All rights reserved.',

  'consent.title': 'Your privacy choice',
  'consent.copy':
    'Redact uses Google AdSense to show ads when advertising is enabled. With your permission, Google and its partners may use cookies or similar technologies to personalise ads and measure them. You can accept or reject; the editor works either way.',
  'consent.accept': 'Accept ads',
  'consent.reject': 'Reject non-essential',
  'consent.note': 'You can change this later with “Privacy settings” in the footer.',
  'ad.label': 'Advertisement',

  'common.openEditor': 'Open the editor',
  'common.redactImage': 'Redact an image',
  'common.free': 'Free',
  'common.noAccount': 'No account',
  'common.noUploads': 'No uploads',
  'common.noWatermark': 'No watermark',
  'common.footerNote': 'Free · No account · Nothing uploaded',
  'common.englishOnly': 'Available in English',
  'common.languageLink': 'Read this page in {language}',
  'common.skipToContent': 'Skip to content',

  'guide.inThisGuide': 'In this guide',
  'guide.eachHasOwnGuide': 'Each has its own guide.',
  'guide.onThisPage': 'On this page',
  'guide.breadcrumbAria': 'Breadcrumb',
  'guide.readyToTry': 'Ready to try it?',
  'guide.readyCopy': 'Redact a sample or your own screenshot. Nothing is uploaded.',
  'guide.caution': 'A caution',
  'guide.note': 'A note',
  'guide.shortVersion': 'The short version',
  'guide.practice': 'Put it into practice with a sample image.',
  'guide.trySample': 'Try it on a sample',
  'guide.keepReading': 'Keep reading.',
  'guide.published': 'Published',
  'guide.backToGuides': 'Guides',
  'guide.allGuides': 'All guides',

  'demo.styleTour': 'Style tour',
  'demo.fourWays': '· 4 ways to cover',
  'demo.before': 'Before',
  'demo.after': 'After',
  'demo.dragHandle': 'Drag the handle to compare.',
  'demo.flattened': 'Flattened pixels, not a removable layer',
  'demo.seeSample': 'See it in the sample',
  'demo.warning':
    'Blur and pixelation can sometimes be partially reversed. For identity documents, card numbers, and addresses, use ink black — and run Verify before you share.',
  'demo.redacted': 'Redacted',
  'demo.openSample': 'Open this sample',
  'demo.sampleScan': 'Sample scan',
  'demo.details': '{count} details',
  'demo.readGuide': 'Read guide',
  'demo.compareAria': 'Compare the original image with the redacted version',
  'demo.idOriginalAlt':
    'A sample student ID card with a photo, name, date of birth, ID number, address, barcode, and QR code.',
  'demo.idRedactedAlt':
    'The same student ID with the photo, name, date of birth, ID number, address, barcode, and QR code covered by opaque black bars.',
  'demo.sampleTitle': 'Chat screenshot',
  'demo.illustrative':
    'Illustrative result. OCR is best-effort — always review the boxes before you export.',
  'demo.detectionAria':
    'A sample chat screenshot with dashed detection boxes over a name, email address, phone number, two address lines, and two card detail lines.',
  'nav.primary': 'Primary',

  'mode.ink': 'Ink black',
  'mode.pixelate': 'Pixelate',
  'mode.blur': 'Blur',
  'mode.emoji': 'Emoji sticker',
  'mode.inkBadge': 'Most secure',
  'mode.softBadge': 'Soft',
  'mode.casualBadge': 'Casual',

  'ctaBand.note': 'Free · No account · Nothing uploaded',
  'ctaBand.eyebrow': 'Ready when you are',
};

const enGB: UIStrings = {
  ...enUS,
  'theme.title': 'Switch colour theme',
  'footer.tagline': 'Share the screenshot. Not the secrets.',
  'footer.description':
    "A browser-based redaction studio for screenshots, IDs, receipts, and anything else you'd rather not hand over in full.",
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
};

const enIN: UIStrings = {
  ...enUS,
  'footer.description':
    "A browser-based redaction studio for screenshots, IDs, receipts, and anything else you'd rather not hand over in full.",
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.terms': 'Terms & Conditions',
};

const deDE: UIStrings = {
  'nav.editor': 'Editor',
  'nav.features': 'Funktionen',
  'nav.privacy': 'Datenschutz',
  'nav.guides': 'Ratgeber',
  'nav.faq': 'FAQ',
  'nav.cta': 'Bild redigieren',
  'nav.menu': 'Menü',
  'nav.menuOpen': 'Menü öffnen',
  'nav.menuClose': 'Menü schließen',
  'nav.language': 'Sprache',
  'nav.languageChoose': 'Sprache wählen',
  'nav.languageCurrent': 'Aktuelle Sprache',

  'theme.title': 'Farbschema wechseln',
  'theme.switchToDark': 'Zum dunklen Design wechseln',
  'theme.switchToLight': 'Zum hellen Design wechseln',

  'footer.tagline': 'Teilen Sie den Screenshot. Nicht die Geheimnisse.',
  'footer.description':
    'Ein browserbasierter Redaktions-Editor für Screenshots, Ausweise, Belege und alles andere, was Sie lieber nicht vollständig weitergeben möchten.',
  'footer.processing': 'Die Verarbeitung bleibt auf Ihrem Gerät',
  'footer.product': 'Produkt',
  'footer.resources': 'Ressourcen',
  'footer.company': 'Unternehmen',
  'footer.legal': 'Rechtliches',
  'footer.languages': 'Sprachen',
  'footer.editor': 'Editor',
  'footer.features': 'Funktionen',
  'footer.compare': 'Vergleich',
  'footer.privacy': 'Datenschutz',
  'footer.guides': 'Ratgeber',
  'footer.howItWorks': 'So funktioniert es',
  'footer.faq': 'FAQ',
  'footer.shortcuts': 'Tastenkürzel',
  'footer.about': 'Über uns',
  'footer.contact': 'Kontakt',
  'footer.emailUs': 'E-Mail schreiben',
  'footer.privacyPolicy': 'Datenschutzerklärung',
  'footer.terms': 'Allgemeine Geschäftsbedingungen',
  'footer.verify': 'Unsere Aussagen prüfen',
  'footer.noUploads': 'Keine Uploads.',
  'footer.noAccount': 'Kein Konto.',
  'footer.privacySettings': 'Datenschutzeinstellungen',
  'footer.backToTop': 'Nach oben',
  'footer.rights': 'Alle Rechte vorbehalten.',

  'consent.title': 'Ihre Datenschutzauswahl',
  'consent.copy':
    'Redact verwendet Google AdSense, um Anzeigen zu zeigen, wenn Werbung aktiviert ist. Mit Ihrer Erlaubnis können Google und seine Partner Cookies oder ähnliche Technologien verwenden, um Anzeigen zu personalisieren und zu messen. Sie können zustimmen oder ablehnen; der Editor funktioniert in beiden Fällen.',
  'consent.accept': 'Anzeigen zustimmen',
  'consent.reject': 'Nicht notwendige ablehnen',
  'consent.note':
    'Sie können dies später über „Datenschutzeinstellungen“ in der Fußzeile ändern.',
  'ad.label': 'Anzeige',

  'common.openEditor': 'Editor öffnen',
  'common.redactImage': 'Bild redigieren',
  'common.free': 'Kostenlos',
  'common.noAccount': 'Kein Konto',
  'common.noUploads': 'Keine Uploads',
  'common.noWatermark': 'Kein Wasserzeichen',
  'common.footerNote': 'Kostenlos · Kein Konto · Nichts wird hochgeladen',
  'common.englishOnly': 'Auf Englisch verfügbar',
  'common.languageLink': 'Diese Seite auf {language} lesen',
  'common.skipToContent': 'Zum Inhalt springen',

  'guide.inThisGuide': 'In dieser Anleitung',
  'guide.eachHasOwnGuide': 'Zu jedem Thema gibt es eine eigene Anleitung.',
  'guide.onThisPage': 'Auf dieser Seite',
  'guide.breadcrumbAria': 'Navigationspfad',
  'guide.readyToTry': 'Bereit zum Ausprobieren?',
  'guide.readyCopy':
    'Redigieren Sie ein Beispiel oder Ihren eigenen Screenshot. Nichts wird hochgeladen.',
  'guide.caution': 'Vorsicht',
  'guide.note': 'Hinweis',
  'guide.shortVersion': 'Die Kurzfassung',
  'guide.practice': 'Setzen Sie es mit einem Beispielbild in die Praxis um.',
  'guide.trySample': 'Mit einem Beispiel testen',
  'guide.keepReading': 'Weiterlesen.',
  'guide.published': 'Veröffentlicht',
  'guide.backToGuides': 'Ratgeber',
  'guide.allGuides': 'Alle Ratgeber',

  'demo.styleTour': 'Stil-Tour',
  'demo.fourWays': '· 4 Möglichkeiten zum Abdecken',
  'demo.before': 'Vorher',
  'demo.after': 'Nachher',
  'demo.dragHandle': 'Ziehen Sie den Griff zum Vergleichen.',
  'demo.flattened': 'Eingebrannte Pixel, keine entfernbare Ebene',
  'demo.seeSample': 'Im Beispiel ansehen',
  'demo.warning':
    'Unschärfe und Verpixelung lassen sich manchmal teilweise rückgängig machen. Für Ausweisdokumente, Kartennummern und Adressen verwenden Sie Tinte und führen Sie vor dem Teilen „Prüfen“ aus.',
  'demo.redacted': 'Redigiert',
  'demo.openSample': 'Dieses Beispiel öffnen',
  'demo.sampleScan': 'Beispielscan',
  'demo.details': '{count} Details',
  'demo.readGuide': 'Anleitung lesen',
  'demo.compareAria': 'Originalbild mit der redigierten Version vergleichen',
  'demo.idOriginalAlt':
    'Eine Beispiel-Studentenkarte mit Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code.',
  'demo.idRedactedAlt':
    'Dieselbe Studentenkarte mit Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code, abgedeckt durch undurchsichtige schwarze Balken.',
  'demo.sampleTitle': 'Chat-Screenshot',
  'demo.illustrative':
    'Illustratives Ergebnis. OCR ist bestmöglich — prüfen Sie die Rahmen immer, bevor Sie exportieren.',
  'demo.detectionAria':
    'Ein Beispiel-Chat-Screenshot mit gestrichelten Erkennungsrahmen über Name, E-Mail-Adresse, Telefonnummer, zwei Adresszeilen und zwei Kartendetails.',
  'nav.primary': 'Hauptnavigation',

  'mode.ink': 'Tinte',
  'mode.pixelate': 'Verpixeln',
  'mode.blur': 'Unschärfe',
  'mode.emoji': 'Emoji-Aufkleber',
  'mode.inkBadge': 'Am sichersten',
  'mode.softBadge': 'Sanft',
  'mode.casualBadge': 'Lässig',

  'ctaBand.note': 'Kostenlos · Kein Konto · Nichts wird hochgeladen',
  'ctaBand.eyebrow': 'Bereit, wenn Sie es sind',
};

const frFR: UIStrings = {
  'nav.editor': 'Éditeur',
  'nav.features': 'Fonctionnalités',
  'nav.privacy': 'Confidentialité',
  'nav.guides': 'Guides',
  'nav.faq': 'FAQ',
  'nav.cta': 'Caviarder une image',
  'nav.menu': 'Menu',
  'nav.menuOpen': 'Ouvrir le menu',
  'nav.menuClose': 'Fermer le menu',
  'nav.language': 'Langue',
  'nav.languageChoose': 'Choisir une langue',
  'nav.languageCurrent': 'Langue actuelle',

  'theme.title': 'Changer de thème',
  'theme.switchToDark': 'Passer au thème sombre',
  'theme.switchToLight': 'Passer au thème clair',

  'footer.tagline': 'Partagez la capture. Pas les secrets.',
  'footer.description':
    "Un studio de caviardage dans le navigateur pour les captures d'écran, pièces d'identité, reçus et tout ce que vous préférez ne pas transmettre en entier.",
  'footer.processing': 'Le traitement reste sur votre appareil',
  'footer.product': 'Produit',
  'footer.resources': 'Ressources',
  'footer.company': 'Entreprise',
  'footer.legal': 'Mentions légales',
  'footer.languages': 'Langues',
  'footer.editor': 'Éditeur',
  'footer.features': 'Fonctionnalités',
  'footer.compare': 'Comparatif',
  'footer.privacy': 'Confidentialité',
  'footer.guides': 'Guides',
  'footer.howItWorks': 'Comment ça marche',
  'footer.faq': 'FAQ',
  'footer.shortcuts': 'Raccourcis',
  'footer.about': 'À propos',
  'footer.contact': 'Contact',
  'footer.emailUs': 'Nous écrire',
  'footer.privacyPolicy': 'Politique de confidentialité',
  'footer.terms': 'Conditions générales',
  'footer.verify': 'Vérifier nos affirmations',
  'footer.noUploads': 'Aucun envoi.',
  'footer.noAccount': 'Aucun compte.',
  'footer.privacySettings': 'Paramètres de confidentialité',
  'footer.backToTop': 'Retour en haut',
  'footer.rights': 'Tous droits réservés.',

  'consent.title': 'Votre choix de confidentialité',
  'consent.copy':
    'Redact utilise Google AdSense pour afficher des annonces lorsque la publicité est activée. Avec votre autorisation, Google et ses partenaires peuvent utiliser des cookies ou des technologies similaires pour personnaliser et mesurer les annonces. Vous pouvez accepter ou refuser ; l’éditeur fonctionne dans les deux cas.',
  'consent.accept': 'Accepter les annonces',
  'consent.reject': 'Refuser le non-essentiel',
  'consent.note':
    'Vous pourrez changer ce choix plus tard via « Paramètres de confidentialité » dans le pied de page.',
  'ad.label': 'Publicité',

  'common.openEditor': "Ouvrir l'éditeur",
  'common.redactImage': 'Caviarder une image',
  'common.free': 'Gratuit',
  'common.noAccount': 'Sans compte',
  'common.noUploads': 'Aucun envoi',
  'common.noWatermark': 'Sans filigrane',
  'common.footerNote': 'Gratuit · Sans compte · Rien n’est envoyé',
  'common.englishOnly': 'Disponible en anglais',
  'common.languageLink': 'Lire cette page en {language}',
  'common.skipToContent': 'Aller au contenu',

  'guide.inThisGuide': 'Dans ce guide',
  'guide.eachHasOwnGuide': 'Chaque sujet a son propre guide.',
  'guide.onThisPage': 'Sur cette page',
  'guide.breadcrumbAria': 'Fil d’Ariane',
  'guide.readyToTry': 'Prêt à essayer ?',
  'guide.readyCopy': 'Caviardez un exemple ou votre propre capture. Rien n’est envoyé.',
  'guide.caution': 'Attention',
  'guide.note': 'Remarque',
  'guide.shortVersion': 'L’essentiel',
  'guide.practice': 'Mettez-le en pratique avec une image d’exemple.',
  'guide.trySample': 'Essayer sur un exemple',
  'guide.keepReading': 'Continuer la lecture.',
  'guide.published': 'Publié',
  'guide.backToGuides': 'Guides',
  'guide.allGuides': 'Tous les guides',

  'demo.styleTour': 'Visite des styles',
  'demo.fourWays': '· 4 façons de masquer',
  'demo.before': 'Avant',
  'demo.after': 'Après',
  'demo.dragHandle': 'Faites glisser la poignée pour comparer.',
  'demo.flattened': 'Pixels aplatis, pas une couche amovible',
  'demo.seeSample': 'Voir dans l’exemple',
  'demo.warning':
    'Le flou et la pixellisation peuvent parfois être partiellement inversés. Pour les pièces d’identité, les numéros de carte et les adresses, utilisez l’encre noire et lancez Vérifier avant de partager.',
  'demo.redacted': 'Caviardé',
  'demo.openSample': 'Ouvrir cet exemple',
  'demo.sampleScan': 'Aperçu de l’analyse',
  'demo.details': '{count} éléments',
  'demo.readGuide': 'Lire le guide',
  'demo.compareAria': 'Comparer l’image originale avec la version caviardée',
  'demo.idOriginalAlt':
    'Une carte d’étudiant d’exemple avec photo, nom, date de naissance, numéro d’étudiant, adresse, code-barres et QR code.',
  'demo.idRedactedAlt':
    'La même carte d’étudiant avec la photo, le nom, la date de naissance, le numéro d’étudiant, l’adresse, le code-barres et le QR code recouverts de barres noires opaques.',
  'demo.sampleTitle': 'Capture d’écran de chat',
  'demo.illustrative':
    'Résultat illustratif. L’OCR est fourni au mieux — vérifiez toujours les zones avant d’exporter.',
  'demo.detectionAria':
    'Une capture d’écran de chat avec des zones de détection en pointillés sur un nom, une adresse e-mail, un numéro de téléphone, deux lignes d’adresse et deux lignes de carte bancaire.',
  'nav.primary': 'Navigation principale',

  'mode.ink': 'Encre noire',
  'mode.pixelate': 'Pixellisation',
  'mode.blur': 'Flou',
  'mode.emoji': 'Autocollant emoji',
  'mode.inkBadge': 'Le plus sûr',
  'mode.softBadge': 'Doux',
  'mode.casualBadge': 'Décontracté',

  'ctaBand.note': 'Gratuit · Sans compte · Rien n’est envoyé',
  'ctaBand.eyebrow': 'Quand vous voulez',
};

export const ui: Record<Locale, UIStrings> = {
  'en-US': enUS,
  'en-GB': enGB,
  'en-IN': enIN,
  'de-DE': deDE,
  'fr-FR': frFR,
};

export type UIKey = keyof UIStrings;

/** Translate a shared UI string, falling back to the default locale. */
export function t(locale: Locale, key: UIKey): string {
  return ui[locale]?.[key] ?? ui['en-US'][key];
}
