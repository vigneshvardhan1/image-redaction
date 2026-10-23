import type { Locale } from '../config';
import type { ComparisonRow } from '../../data/comparison';
import { comparisonRows } from '../../data/comparison';
import { toBritishEnglish } from './englishVariants';

export interface ComparisonContent {
  rows: ComparisonRow[];
  columns: {
    capability: string;
    ours: string;
    web: string;
    desktop: string;
  };
  mobileColumns: {
    ours: string;
    web: string;
    desktop: string;
  };
  vs: string;
  caption: string;
  footnote: string;
  verify: string;
}

const enUS: ComparisonContent = {
  rows: comparisonRows,
  columns: {
    capability: 'Capability',
    ours: 'This site',
    web: 'Typical web tool',
    desktop: 'Desktop app',
  },
  mobileColumns: { ours: 'This site', web: 'Web tool', desktop: 'Desktop' },
  vs: 'vs. typical tools',
  caption: 'How Redact compares with typical web tools and desktop apps',
  footnote: 'Categories, not specific products. Features vary by tool, plan, and version.',
  verify: 'Verify anything that matters before you rely on it.',
};

const enGB = toBritishEnglish(enUS);

const deDE: ComparisonContent = {
  rows: [
    {
      feature: 'Bild verlässt Ihr Gerät',
      ours: 'Nie',
      web: 'Oft hochgeladen',
      desktop: 'Nein',
      note: 'Es gibt keinen Upload-Endpunkt im Editor.',
    },
    {
      feature: 'Erkennung sensibler Texte auf dem Gerät',
      ours: 'Ja, OCR im Browser',
      web: 'Selten',
      desktop: 'Selten',
    },
    {
      feature: 'Jede erkannte Zeile abdecken',
      ours: 'All-Text-Modus',
      web: 'Selten',
      desktop: 'Unterschiedlich',
    },
    {
      feature: 'Redaktionsstile',
      ours: 'Tinte, Verpixeln, Unschärfe, Emoji',
      web: 'Meist Unschärfe oder Mosaik',
      desktop: 'Unterschiedlich',
    },
    {
      feature: 'Rechteck- und Ovalauswahl',
      ours: 'Beides',
      web: 'Unterschiedlich',
      desktop: 'Unterschiedlich',
    },
    {
      feature: 'Verschieben, Größe ändern und rückgängig',
      ours: 'Ja',
      web: 'Unterschiedlich',
      desktop: 'Ja',
    },
    {
      feature: 'Das abgeflachte Ergebnis erneut scannen',
      ours: 'Ja, bestmögliche OCR',
      web: 'Nein',
      desktop: 'Nein',
    },
    {
      feature: 'EXIF-, GPS- und Gerätemetadaten',
      ours: 'Beim Export entfernt',
      web: 'Unterschiedlich',
      desktop: 'Unterschiedlich',
    },
    {
      feature: 'Exportgröße reduzieren',
      ours: 'Ja, mit Live-Schätzung',
      web: 'Selten',
      desktop: 'Manchmal',
      note: 'Qualitäts- und Kantenregler, vor dem Download gemessen.',
    },
    {
      feature: 'Konto erforderlich',
      ours: 'Nein',
      web: 'Manchmal',
      desktop: 'Oft',
    },
    {
      feature: 'Preis',
      ours: 'Kostenlos',
      web: 'Kostenlos oder kostenpflichtig',
      desktop: 'Kostenpflichtig',
    },
    {
      feature: 'Stapelverarbeitung',
      ours: 'Noch nicht',
      web: 'Unterschiedlich',
      desktop: 'Manchmal',
    },
  ],
  columns: {
    capability: 'Funktion',
    ours: 'Diese Seite',
    web: 'Typisches Web-Tool',
    desktop: 'Desktop-App',
  },
  mobileColumns: { ours: 'Diese Seite', web: 'Web-Tool', desktop: 'Desktop' },
  vs: 'vs. typische Tools',
  caption: 'Wie Redact im Vergleich zu typischen Web-Tools und Desktop-Apps abschneidet',
  footnote: 'Kategorien, keine konkreten Produkte. Funktionen variieren je nach Tool, Tarif und Version.',
  verify: 'Prüfen Sie alles Wichtige, bevor Sie sich darauf verlassen.',
};

const frFR: ComparisonContent = {
  rows: [
    {
      feature: 'L’image quitte votre appareil',
      ours: 'Jamais',
      web: 'Souvent envoyée',
      desktop: 'Non',
      note: 'Aucun point d’envoi n’existe dans l’éditeur.',
    },
    {
      feature: 'Détection de texte sensible sur l’appareil',
      ours: 'Oui, OCR dans le navigateur',
      web: 'Rare',
      desktop: 'Rarement',
    },
    {
      feature: 'Couvrir chaque ligne détectée',
      ours: 'Mode tout le texte',
      web: 'Rare',
      desktop: 'Variable',
    },
    {
      feature: 'Styles de caviardage',
      ours: 'Encre, pixellisation, flou, emoji',
      web: 'Généralement flou ou mosaïque',
      desktop: 'Variable',
    },
    {
      feature: 'Sélections rectangulaires et ovales',
      ours: 'Les deux',
      web: 'Variable',
      desktop: 'Variable',
    },
    {
      feature: 'Déplacer, redimensionner et annuler',
      ours: 'Oui',
      web: 'Variable',
      desktop: 'Oui',
    },
    {
      feature: 'Réanalyser le résultat aplati',
      ours: 'Oui, OCR au mieux',
      web: 'Non',
      desktop: 'Non',
    },
    {
      feature: 'Métadonnées EXIF, GPS et appareil',
      ours: 'Supprimées à l’export',
      web: 'Variable',
      desktop: 'Variable',
    },
    {
      feature: 'Réduction de la taille d’export',
      ours: 'Oui, avec estimation en direct',
      web: 'Rare',
      desktop: 'Parfois',
      note: 'Contrôles de qualité et de bord le plus long, mesurés avant le téléchargement.',
    },
    {
      feature: 'Compte requis',
      ours: 'Non',
      web: 'Parfois',
      desktop: 'Souvent',
    },
    {
      feature: 'Prix',
      ours: 'Gratuit',
      web: 'Gratuit ou payant',
      desktop: 'Payant',
    },
    {
      feature: 'File d’attente par lots',
      ours: 'Pas encore',
      web: 'Variable',
      desktop: 'Parfois',
    },
  ],
  columns: {
    capability: 'Fonction',
    ours: 'Ce site',
    web: 'Outil web typique',
    desktop: 'Application de bureau',
  },
  mobileColumns: { ours: 'Ce site', web: 'Outil web', desktop: 'Bureau' },
  vs: 'vs. outils typiques',
  caption: 'Comment Redact se compare aux outils web et applications de bureau typiques',
  footnote:
    'Des catégories, pas des produits précis. Les fonctionnalités varient selon l’outil, l’offre et la version.',
  verify: 'Vérifiez tout ce qui compte avant de vous y fier.',
};

export const comparisonContent: Record<Locale, ComparisonContent> = {
  'en-US': enUS,
  'en-GB': enGB,
  'en-IN': enGB,
  'de-DE': deDE,
  'fr-FR': frFR,
};

export function getComparisonContent(locale: Locale): ComparisonContent {
  return comparisonContent[locale] ?? enUS;
}
