import type { AboutContent } from './types';

export const aboutDeDE: AboutContent = {
  meta: {
    title: 'Über uns — Redact',
    description:
      'Warum es Redact gibt: ein kostenloses Tool zum Schwärzen im Browser, damit der Screenshot, den Sie schützen möchten, nicht hochgeladen werden muss, um ihn zu schützen.',
    keywords: ['über redact', 'private bildschwärzung', 'schwärzungstool im browser'],
  },
  hero: {
    eyebrow: 'Über uns',
    title: 'Gebaut, damit Sie weniger teilen müssen.',
    lead: 'Redact ist ein kostenloses Studio zum Schwärzen im Browser, gebaut nach einer Regel: Die Datei, die Sie schützen möchten, darf nicht hochgeladen werden, um sie zu schützen.',
    primaryCta: 'Editor öffnen',
    secondaryCta: 'Kontakt aufnehmen',
  },
  stats: [
    { value: '0', label: 'Hochgeladene Bilder' },
    { value: '0', label: 'Benötigte Konten' },
    { value: '0', label: 'Tracker oder Analysedienste' },
    { value: '100%', label: 'Verarbeitung in Ihrem Browser' },
  ],
  why: {
    eyebrow: 'Warum es das gibt',
    title: 'Der Upload war das Problem.',
    paragraphs: [
      'Screenshots sind heute das Mittel der Wahl, um Arbeit zu erklären — ein Support-Thread, ein Beleg, ein Ausweis, ein Dashboard, ein Chat mit Lieferadresse. Das Detail, das den Screenshot nützlich macht, ist oft genau das Detail, das nicht mit ihm reisen sollte.',
      'Die meisten Tools zum Schwärzen verlangen zuerst den Upload genau der Datei, die Sie schützen möchten. Das war nie richtig. Ein Tool, das sensible Details entfernt, sollte sie nicht zuerst einsammeln — und das Versprechen, die Kopie morgen zu löschen, ist heute trotzdem eine Kopie.',
      'Redact dreht die Reihenfolge um. Ihr Browser dekodiert das Bild, zeichnet es auf einen lokalen Canvas und bäckt die Schwärzungen in eine neue Datei ein. Es gibt keinen Upload-Endpunkt. Die intelligente Erkennung lädt eine OCR-Engine und ein englisches Modell herunter, aber Ihr Bild ist nicht Teil dieser Anfrage.',
    ],
    emphasis:
      'Wir sind nicht gegen die Cloud. Wir sind gegen den unnötigen Schritt dazwischen. Wenn der Browser die Aufgabe erledigen kann, ist der sicherste Ort für die Datei der Ort, an dem sie bereits ist.',
  },
  principles: {
    eyebrow: 'Grundsätze',
    title: 'Die Regeln, auf denen das Produkt aufbaut.',
    copy: 'Das sind keine Wunschsätze an der Wand. Sie entscheiden, was ausgeliefert wird, was offengelegt wird und was weggelassen wird.',
    items: [
      {
        icon: 'monitor',
        title: 'Standardmäßig lokal',
        copy: 'Wenn eine Funktion im Tab laufen kann, tut sie das. Es gibt keinen Upload-Endpunkt, keine Verarbeitungswarteschlange und keinen temporären Speicher, dem man vertrauen müsste.',
      },
      {
        icon: 'alert',
        title: 'Ehrlich über Grenzen',
        copy: 'Gesichter, QR-Codes und ungewöhnliche Namen brauchen weiterhin einen manuellen Rahmen. Ein sauberer Prüfscan ist ein Nachweis, keine Garantie.',
      },
      {
        icon: 'chat',
        title: 'Klare Sprache',
        copy: 'Datenschutz- und Rechtstexte sollten ohne Übersetzer lesbar sein. Wo ein Begriff unvermeidlich ist, wird er erklärt.',
      },
      {
        icon: 'shield',
        title: 'Kein Konto, kein Profil',
        copy: 'Keine Anmeldung, keine E-Mail-Sperre, kein Nutzungsverlauf. Der Editor weiß nicht, wer Sie sind, und es gibt nichts, was über Sie exportiert werden könnte.',
      },
      {
        icon: 'zap',
        title: 'Kostenlos ohne Haken',
        copy: 'Kein Wasserzeichen, keine Exportgutschrift, kein kostenpflichtiges Upgrade für die sichere Option. Tintenschwarz — der stärkste Stil — kostet nichts.',
      },
      {
        icon: 'code',
        title: 'Nachprüfbare Aussagen',
        copy: 'Der Netzwerk-Tab ist der Beleg. Die Datenschutzseite erklärt genau, was Sie prüfen sollten und was Sie beim Prüfen sehen werden.',
      },
    ],
  },
  how: {
    eyebrow: 'So funktioniert es',
    title: 'Drei Schritte, keiner davon ein Server.',
    copy: 'Der gesamte Ablauf passt in einen Tab. Der einzige optionale Download ist die OCR-Engine, die von der intelligenten Erkennung verwendet wird.',
    cta: 'Datenfluss ansehen',
    steps: [
      {
        number: '01',
        title: 'Datei ablegen oder einfügen',
        copy: 'Der Browser liest das Bild lokal. PNG, JPG, WebP, GIF, BMP und AVIF werden unterstützt.',
        icon: 'image',
      },
      {
        number: '02',
        title: 'Abdecken, was zählt',
        copy: 'Die intelligente Erkennung schlägt wahrscheinliche personenbezogene Daten vor. Zeichnen Sie über Gesichter, Codes und alles, was der Scan übersieht. Tintenschwarz ist die Voreinstellung.',
        icon: 'square',
      },
      {
        number: '03',
        title: 'Prüfen und exportieren',
        copy: 'Scannen Sie das abgeflachte Bild erneut, vergleichen Sie es mit dem Original und laden Sie ein metadatenfreies PNG, JPG oder WebP herunter.',
        icon: 'shield-check',
      },
    ],
  },
  stack: {
    eyebrow: 'Unter der Haube',
    title: 'Kleiner Stack. Kein versteckter Dienst.',
    copy: 'Die Website besteht aus statischem HTML, CSS und JavaScript. Es gibt kein Backend, das Bilder empfängt, kein Analyse-SDK und keinen Werbecode. Die Komponenten, die die Arbeit erledigen, sind gewöhnliche Web-APIs und Open-Source-Software.',
    note: 'Die intelligente Erkennung ist die einzige Funktion, die nach dem Laden der Seite eine Netzwerkanfrage benötigt. Sie ruft Tesseract.js und Sprachdaten ab; das Bild bleibt im Tab.',
    items: [
      { label: 'Astro', value: 'Statische Seiten und Komponenten' },
      { label: 'Canvas API', value: 'Lokales Dekodieren, Schwärzen und Exportieren' },
      { label: 'Tesseract.js', value: 'Optionales OCR in einem Web Worker' },
      { label: 'Inter', value: 'Selbst gehostete Schrift, von dieser Website ausgeliefert' },
    ],
  },
  limits: {
    eyebrow: 'Ehrliche Grenzen',
    title: 'Was Redact nicht ist.',
    items: [
      {
        title: 'Kein Compliance-Zertifikat',
        copy: 'Ein geschwärztes Bild beweist nicht, dass ein Dokument ein Datenschutzgesetz, eine gerichtliche Anordnung oder eine interne Richtlinie erfüllt.',
      },
      {
        title: 'Keine Rechtsberatung',
        copy: 'Die Leitfäden erklären das praktische Schwärzen. Sie ersetzen weder einen Anwalt noch einen Datenschutzbeauftragten.',
      },
      {
        title: 'Kein vollständiger Bildeditor',
        copy: 'Es gibt noch keine Ebenen, Textanmerkungen oder Stapel-Exporte. Es ist ein fokussiertes Werkzeug zum Abdecken von Dingen.',
      },
      {
        title: 'Nicht unfehlbar',
        copy: 'OCR liefert bestmögliche Ergebnisse, und ein Rahmen deckt nur ab, was er abdeckt. Sehen Sie sich die exportierte Datei immer an, bevor Sie sie teilen.',
      },
    ],
    footnote:
      'Diese Grenzen sind der Grund, warum die Überprüfung und eine abschließende visuelle Kontrolle Teil des Ablaufs sind und kein optionales Extra.',
  },
  cta: {
    eyebrow: 'Nutzen Sie es für das, was es ist',
    title: 'Teilen Sie den Screenshot. Nicht die Geheimnisse.',
    copy: 'Der Editor ist kostenlos, lokal und offen für die Prüfung. Laden Sie ein Bild, decken Sie ab, was nicht mitreisen soll, und prüfen Sie den Export, bevor Sie ihn senden.',
    primary: 'Bild schwärzen',
    secondary: 'Sprechen Sie mit uns',
    secondaryHref: '/contact',
  },
};
