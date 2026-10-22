import type { Locale } from '../config';
import type { RedactionMode } from '../../data/redactionModes';
import { redactionModes } from '../../data/redactionModes';
import { toBritishEnglish } from './englishVariants';

const enGB: RedactionMode[] = toBritishEnglish(redactionModes);

const deDE: RedactionMode[] = [
  {
    id: 'ink',
    icon: 'square',
    title: 'Tinte',
    shortTitle: 'Tinte',
    badge: 'Am sichersten',
    guide:
      'Feste Pixel ersetzen Foto, Namen, Ausweisnummer, Adresse, Barcode und QR-Code. Hinter dem Balken gibt es nichts zu lesen.',
    copy: 'Die richtige Standardwahl für Kartennummern, Ausweise, Adressen und alles Finanzielle.',
    alt: 'Derselbe Schülerausweis, bei dem Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code durch undurchsichtige schwarze Balken abgedeckt sind.',
  },
  {
    id: 'pixelate',
    icon: 'pixelate',
    title: 'Verpixeln',
    shortTitle: 'Verpixeln',
    badge: 'Sanft',
    guide:
      'Jeder abgedeckte Bereich wird auf wenige Blöcke reduziert. Buchstaben zerfallen in flache Farbe, aber die Form des Originals bleibt sichtbar.',
    copy: 'Geeignet für beiläufige Screenshots, bei denen ein weicherer Look passt.',
    alt: 'Derselbe Schülerausweis, bei dem Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code durch ein grobes Pixelmosaik abgedeckt sind.',
  },
  {
    id: 'blur',
    icon: 'blur',
    title: 'Unschärfe',
    shortTitle: 'Unschärfe',
    badge: 'Sanft',
    guide:
      'Pixel werden zu einem weichen Verlauf gemittelt. Ein Gesicht wird zum Fleck, aber ein kurzes Passwort kann einer genauen Betrachtung standhalten.',
    copy: 'Geeignet für Gesichter und Kontext, nie die erste Wahl für Geheimnisse.',
    alt: 'Derselbe Schülerausweis, bei dem Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code durch eine weiche fotografische Unschärfe abgedeckt sind.',
  },
  {
    id: 'emoji',
    icon: 'emoji',
    title: 'Emoji-Aufkleber',
    shortTitle: 'Emoji',
    badge: 'Lässig',
    guide:
      'Eine undurchsichtige Fläche wird über den Bereich gemalt und ein Emoji daraufgesetzt. Die Pixel darunter sind endgültig weg.',
    copy: 'Freundlich auf einem Gesicht, trotzdem vollständig abgedeckt.',
    alt: 'Derselbe Schülerausweis, bei dem Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code durch undurchsichtige weiße Aufkleber mit einem Sonnenbrillen-Emoji abgedeckt sind.',
  },
];

const frFR: RedactionMode[] = [
  {
    id: 'ink',
    icon: 'square',
    title: 'Encre noire',
    shortTitle: 'Encre',
    badge: 'Le plus sûr',
    guide:
      'Des pixels opaques remplacent la photo, le nom, le numéro, l’adresse, le code-barres et le QR code. Derrière la barre, il n’y a rien à lire.',
    copy: 'Le choix par défaut pour les numéros de carte, les pièces d’identité, les adresses et tout ce qui touche aux finances.',
    alt: 'La même carte d’étudiant avec la photo, le nom, la date de naissance, le numéro, l’adresse, le code-barres et le QR code couverts par des barres noires opaques.',
  },
  {
    id: 'pixelate',
    icon: 'pixelate',
    title: 'Pixellisation',
    shortTitle: 'Pixels',
    badge: 'Doux',
    guide:
      'Chaque zone couverte est réduite à quelques blocs. Les lettres se fondent en aplats de couleur, mais la forme de l’original reste visible.',
    copy: 'Correct pour les captures décontractées où un rendu plus doux convient.',
    alt: 'La même carte d’étudiant avec la photo, le nom, la date de naissance, le numéro, l’adresse, le code-barres et le QR code couverts par une mosaïque pixelisée.',
  },
  {
    id: 'blur',
    icon: 'blur',
    title: 'Flou',
    shortTitle: 'Flou',
    badge: 'Doux',
    guide:
      'Les pixels sont moyennés en un dégradé doux. Un visage devient une tache, mais un mot de passe court peut encore survivre à un examen attentif.',
    copy: 'Correct pour les visages et le contexte, jamais le premier choix pour les secrets.',
    alt: 'La même carte d’étudiant avec la photo, le nom, la date de naissance, le numéro, l’adresse, le code-barres et le QR code couverts par un flou photographique.',
  },
  {
    id: 'emoji',
    icon: 'emoji',
    title: 'Autocollant emoji',
    shortTitle: 'Emoji',
    badge: 'Décontracté',
    guide:
      'Une plaque opaque est peinte sur la zone et un emoji est posé dessus. Les pixels en dessous ont disparu pour de bon.',
    copy: 'Sympa sur un visage, toujours entièrement couvert.',
    alt: 'La même carte d’étudiant avec la photo, le nom, la date de naissance, le numéro, l’adresse, le code-barres et le QR code couverts par des autocollants blancs opaques avec un emoji à lunettes de soleil.',
  },
];

export const localizedRedactionModes: Record<Locale, RedactionMode[]> = {
  'en-US': redactionModes,
  'en-GB': enGB,
  'en-IN': enGB,
  'de-DE': deDE,
  'fr-FR': frFR,
};

export function getRedactionModes(locale: Locale): RedactionMode[] {
  return localizedRedactionModes[locale] ?? redactionModes;
}
