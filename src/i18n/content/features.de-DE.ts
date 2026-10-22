import type { FeaturesContent } from './types';

export const featuresDeDE: FeaturesContent = {
  meta: {
    title: 'Funktionen — Redact',
    description:
      'PII-Erkennung auf Ihrem Gerät, vier Schwärzungsstile, Prüfung per erneutem Scan, Exporte ohne Metadaten, Tastaturkürzel und klar benannte Grenzen.',
    keywords: [
      'Redact Funktionen',
      'OCR-Schwärzung auf dem Gerät',
      'Bild-Metadaten entfernen',
      'Tastaturkürzel zum Schwärzen',
      'Schwärzung prüfen',
    ],
  },
  hero: {
    eyebrow: 'Funktionen',
    title: 'Ernsthaftes Schwärzen. Ohne Upload-Ritual.',
    lead: 'Alles, was Sie brauchen, um sensible Details aus einem Screenshot zu entfernen — plus die Kontrollen, die die meisten Werkzeuge überspringen, und eine ehrliche Auskunft darüber, was weiterhin einen menschlichen Blick braucht.',
    primaryCta: 'Editor öffnen',
    secondaryCta: 'Wie Datenschutz funktioniert',
  },
  features: [
    {
      icon: 'sparkles',
      title: 'Intelligente PII-Erkennung',
      copy: 'OCR findet E-Mails, Kartennummern, Telefonnummern, Ausweisnummern, Adressen und wahrscheinliche Namen — auf Ihrem Gerät.',
    },
    {
      icon: 'scan',
      title: 'Modus „Alle Texte“',
      copy: 'Deckt jede erkannte Zeile ab, wenn Sie nicht über jede einzeln entscheiden möchten.',
    },
    {
      icon: 'square',
      title: 'Vier Schwärzungsstile',
      copy: 'Deckendes Schwarz, Verpixeln, Weichzeichnen oder ein Emoji-Sticker. Nutzen Sie Rechtecke oder Ovale.',
    },
    {
      icon: 'move',
      title: 'Verschieben und skalieren',
      copy: 'Verschieben Sie einen Rahmen pixelgenau oder ziehen Sie an einer Ecke, bis er die Kanten abdeckt. Rückgängig und Wiederherstellen sind nur einen Tastendruck entfernt.',
    },
    {
      icon: 'shield-check',
      title: 'Prüfung per erneutem Scan',
      copy: 'Führt OCR auf dem abgeflachten Ergebnis aus und markiert alles, was noch sensibel wirkt.',
    },
    {
      icon: 'download',
      title: 'Saubere Exporte',
      copy: 'Laden Sie PNG, JPG oder WebP herunter — oder kopieren Sie das Bild in die Zwischenablage. Metadaten bleiben zurück, und die Datei lässt sich vor dem Senden verkleinern.',
    },
  ],
  detection: {
    eyebrow: 'Erkennung',
    title: 'Finden Sie Text und Gesichter, bevor Sie teilen.',
    copy: 'Die intelligente Erkennung liest den Screenshot oder die aktuelle PDF-Seite mit Tesseract-OCR in einem Web Worker und prüft jede Zeile gegen Muster für gängige Identifikatoren. „Gesichter erkennen“ führt ein kleines MediaPipe-Modell im selben Tab aus. Beide Detektoren senden Ihre Datei nirgendwohin; die Modelle werden einmal heruntergeladen.',
    cards: [
      {
        title: 'Wonach gesucht wird',
        copy: 'E-Mails, Luhn-gültige Kartennummern, SSNs, Aadhaar, PAN, GSTIN, IBAN, Telefonnummern, IP-Adressen, Datumsangaben, Adress-Schlüsselwörter und wahrscheinliche Namen — dazu Gesichter in Fotos und Ausweisen.',
      },
      {
        title: 'Was Sie steuern',
        copy: 'Jeder Rahmen wird standardmäßig nur dann einbezogen, wenn er einem Muster entspricht. Klicken Sie auf einen Rahmen, um ihn auszuschließen, nutzen Sie „Alle Texte“ für jede Zeile, oder wenden Sie den aktuellen Stil auf die Gesichtsvorschläge an.',
      },
      {
        title: 'Gesichter, auf dem Gerät',
        copy: '„Gesichter erkennen“ schlägt einen etwas größeren Rahmen um jedes gefundene Gesicht vor. Prüfen Sie die Vorschläge und schwärzen Sie sie mit Tinte, Verpixeln, Weichzeichnen oder einem Emoji-Sticker.',
      },
    ],
    cta: 'An einem Beispiel ausprobieren',
  },
  styles: {
    eyebrow: 'Stile',
    title: 'Wählen Sie die Abdeckung passend zum Risiko.',
    copy: 'Schwarz ist aus gutem Grund die Standardwahl. Die weicheren Effekte sind nützlich, wenn das Detail eher Kontext als Identität ist.',
  },
  review: {
    eyebrow: 'Kontrolle',
    title: 'Ein zweiter Durchgang, ohne den Tab zu verlassen.',
    copy: 'Eine Schwärzung ist schnell fast richtig. Die Prüfung scannt das abgeflachte Bild erneut auf lesbare PII. Der Vergleich wechselt zum Original zurück, sodass Sie genau sehen, was sich geändert hat. Rückgängig ist da, wenn Ihnen ein Fehler auffällt.',
    points: [
      {
        icon: 'shield-check',
        title: 'Prüfen Sie das Ergebnis, nicht die Vorschau',
        copy: 'Der erneute Scan läuft auf der gerenderten Ausgabe und sieht daher, was die exportierte Datei enthalten wird.',
      },
      {
        icon: 'eye',
        title: 'Vergleichen, ohne Arbeit zu verlieren',
        copy: 'Schalten Sie das Original ein und aus. Ihre Rahmen und der Verlauf bleiben erhalten.',
      },
      {
        icon: 'undo',
        title: 'Die gesamte Historie rückgängig machen',
        copy: 'Zeichnen, Verschieben, Skalieren und Löschen landen alle im selben Rückgängig-Stapel.',
      },
    ],
    panel: {
      title: 'Prüfung',
      badge: 'Beispielergebnis',
      okTitle: 'Keine lesbaren PII gefunden',
      okCopy: 'Das abgeflachte Bild wurde erneut gescannt. Werfen Sie trotzdem einen letzten Blick darauf.',
      checks: ['E-Mail-Muster', 'Kartennummern-Muster', 'Telefonnummern-Muster', 'Ausweis- und Datumsmuster'],
      matches: '0 Treffer',
      footnote: 'OCR so gut es geht. Ein sauberer Scan ist ein Beleg, keine Garantie.',
    },
    cta: 'Editor öffnen',
  },
  delivery: {
    eyebrow: 'Ausgabe',
    title: 'Erst schwärzen, dann klein genug zum Senden machen.',
    copy: 'Ein geschwärzter Screenshot ist für einen Chat, ein Ticket oder eine E-Mail oft noch zu schwer. Der Größenbereich misst den echten Export in Ihrem Browser: Senken Sie die Qualität für JPG und WebP, begrenzen Sie die längste Kante und lesen Sie die tatsächliche Byte-Zahl, bevor Sie etwas herunterladen.',
    points: [
      {
        icon: 'gauge',
        title: 'Eine Live-Schätzung, keine Vermutung',
        copy: 'Der Bereich kodiert den Export in Ihrem Tab und meldet die echte Dateigröße sowie die Ersparnis in Prozent gegenüber der Vollversion.',
      },
      {
        icon: 'shrink',
        title: 'Längste Kante begrenzen',
        copy: 'Skalieren Sie das abgeflachte Ergebnis auf 2560, 1920, 1280 oder 960 px. Die Szene wird als Ganzes skaliert, sodass jede Schwärzung genau dort bleibt, wo Sie sie gezeichnet haben.',
      },
      {
        icon: 'info',
        title: 'Ehrlich bei PNG',
        copy: 'PNG ist verlustfrei, deshalb ist der Qualitätsregler dafür deaktiviert. Nutzen Sie stattdessen die Größenbegrenzung — oder wählen Sie WebP, das für Screenshots meist deutlich leichter ist.',
      },
    ],
    panel: {
      title: 'Größe reduzieren',
      badge: 'Beispielergebnis',
      quality: 'Qualität',
      qualityValue: '72 %',
      qualityNote: 'Gilt für JPG- und WebP-Exporte. PNG bleibt verlustfrei.',
      edge: 'Längste Kante',
      edgeValue: '1920 px',
      edgeNote: 'Skaliert das abgeflachte Ergebnis neu. Schwärzungen bleiben eingebrannt.',
      estimate: 'Geschätzter Export',
      estimateValue: '212 KB · 1920 × 1080',
      estimateNote: '−86 % gegenüber 1,5 MB in voller Größe',
    },
    cta: 'Größenbereich öffnen',
  },
  proof: {
    eyebrow: 'Beleg',
    title: 'Sehen Sie die Pixel, kein Versprechen.',
    copy: 'Das Nachher-Bild ist eingebrannt, nicht in Ebenen abgelegt. Ziehen Sie den Griff und untersuchen Sie den Rand jedes Balkens. Wenn noch etwas lesbar ist, ist es nicht geschwärzt.',
    primaryCta: 'ID-Beispiel ausprobieren',
    secondaryCta: 'Welcher Stil ist sicher?',
  },
  shortcuts: {
    eyebrow: 'Tempo',
    title: 'Die Hände bleiben auf der Tastatur.',
    copy: 'Fügen Sie ein Bild aus der Zwischenablage ein, ziehen Sie eines in den Editor oder ersetzen Sie die aktuelle Datei ohne Neuladen. Danach wechseln Sie Werkzeuge und machen rückgängig, ohne zur Maus zu greifen.',
    points: [
      'Strg / ⌘ + V fügt ein Bild ein, während der Editor sichtbar ist.',
      'Drag-and-drop funktioniert auch auf dem Startbildschirm.',
      'Ersetzen Sie das Bild über die Symbolleiste, ohne die Seite zu verlieren.',
    ],
    panelTitle: 'Tastaturkürzel',
    list: [
      { keys: 'B', action: 'Deckendes Schwarz' },
      { keys: 'P', action: 'Verpixeln' },
      { keys: 'L', action: 'Weichzeichnen' },
      { keys: 'E', action: 'Emoji-Sticker' },
      { keys: 'F', action: 'Gesichter erkennen' },
      { keys: 'R', action: 'Rechteck-Auswahl' },
      { keys: 'O', action: 'Oval-Auswahl' },
      { keys: 'C', action: 'Mit dem Original vergleichen' },
      { keys: 'Strg / ⌘ + Z', action: 'Rückgängig' },
      { keys: 'Strg / ⌘ + Shift + Z', action: 'Wiederherstellen' },
      { keys: 'Entf', action: 'Ausgewählte Schwärzung entfernen' },
      { keys: 'Esc', action: 'Aktuelle Auswahl aufheben' },
    ],
  },
  limits: {
    eyebrow: 'Ehrliche Grenzen',
    title: 'Was dieses Werkzeug noch nicht kann.',
    copy: 'Ein Schwärzungswerkzeug sollte über seine blinden Flecken informieren. Diese sollten Sie kennen, bevor Sie sich auf die Ausgabe verlassen.',
    items: [
      {
        title: 'Kleine Gesichter und Maschinencodes',
        copy: 'Die Gesichtserkennung ist bestmöglich: kleine, abgewandte, teilweise verdeckte oder gezeichnete Gesichter können übersehen werden. QR-Codes, Barcodes, MRZ-Zeilen und Logos werden nicht erkannt. Zeichnen Sie einen Rahmen über jedes einzelne — und prüfen Sie beide Seiten eines Ausweises.',
        badge: 'Ohne Gewähr',
      },
      {
        title: 'Namenserkennung ist nicht perfekt',
        copy: 'Namen folgen einem Muster für kurze, großgeschriebene Zeilen. Ungewöhnliche Namen, kleingeschriebene Handles und stilisierter Text können durchrutschen.',
        badge: 'Ohne Gewähr',
      },
      {
        title: 'Ein Bild nach dem anderen',
        copy: 'Es gibt noch keine Stapelverarbeitung. Ersetzen Sie das Bild und wiederholen Sie den Vorgang. Jeder Export ist unabhängig und frei von Metadaten.',
        badge: 'Noch nicht',
      },
      {
        title: 'Keine Textannotation',
        copy: 'Sie können im Editor kein Label wie „nur für Acme“ ergänzen. Fügen Sie Kontext mit einem separaten Markup-Werkzeug hinzu — abseits der geschwärzten Fläche.',
        badge: 'Noch nicht',
      },
    ],
    footnote:
      'Keine automatische Kontrolle ersetzt einen letzten Blick auf das exportierte Bild. Im Zweifel: Schwarz verwenden und großzügiger zuschneiden.',
  },
  cta: {
    eyebrow: 'Bereit, wenn Sie es sind',
    title: 'Nutzen Sie die Funktionen — und dann Ihre Augen.',
    copy: 'Die intelligente Erkennung spart den ersten Durchgang. Schwarz, Prüfung und ein letzter Blick bei 100 % sparen den letzten.',
    primary: 'Bild schwärzen',
    secondary: 'Anleitungen lesen',
    secondaryHref: '/guides',
  },
};
