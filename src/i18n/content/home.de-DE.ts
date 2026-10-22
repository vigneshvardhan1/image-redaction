import type { HomeContent } from './types';

export const homeDeDE: HomeContent = {
  meta: {
    title: 'Bilder und PDFs schwärzen — kostenlos, privat, online | Redact',
    description:
      'Kostenlose Software zum Schwärzen von Bildern, Screenshots, Fotos und PDFs. Namen, E-Mails, Kartennummern und Adressen direkt auf Ihrem Gerät verbergen — kein Upload, kein Konto.',
    keywords: [
      'Bilder schwärzen',
      'PDF schwärzen',
      'PDF schwärzen online',
      'Bilder schwärzen Software',
      'Bilder schwärzen mit Redact',
      'Bilder schwärzen online',
      'KI-Software zum Schwärzen von Bildern',
      'Bild unkenntlich machen',
      'Screenshot schwärzen',
      'sensible Daten im Bild verbergen',
    ],
    ogImageAlt: 'Redact — ein kostenloses Werkzeug zum Schwärzen von Bildern und PDFs',
  },
  useCasesHead: {
    eyebrow: 'Was Menschen verbergen',
    title: 'Jeder Screenshot enthält ein kleines Geständnis.',
    copy: 'Das offensichtliche Geheimnis ist selten das einzige. Wählen Sie die Art von Bild, die Sie gleich teilen möchten, und sehen Sie, was üblicherweise abgedeckt werden sollte.',
  },
  hero: {
    badge: 'Bilder und PDFs schwärzen, direkt auf Ihrem Gerät',
    title: ['Teilen Sie den Screenshot.', 'Nicht die Geheimnisse.'],
    lead: 'Bilder und PDFs direkt im Browser schwärzen: Namen, E-Mails, Kartennummern und Adressen in Sekunden verbergen. Die intelligente Erkennung läuft auf Ihrem Gerät, und jeder Export lässt seine Metadaten zurück.',
    primaryCta: 'Datei schwärzen',
    secondaryCta: 'So funktioniert es',
    proof: ['Kostenlos', 'Kein Konto', 'Kein Upload', 'Kein Wasserzeichen'],
  },
  facts: [
    {
      icon: 'lock',
      title: '0 Byte hochgeladen',
      copy: 'Es existiert kein Upload-Endpunkt.',
    },
    {
      icon: 'shield',
      title: 'Metadaten entfernt',
      copy: 'EXIF- und GPS-Daten sind im Export nicht enthalten.',
    },
    {
      icon: 'zap',
      title: 'Kostenlos, kein Konto',
      copy: 'Keine E-Mail, kein Tarif, kein Wasserzeichen.',
    },
    {
      icon: 'wifi-off',
      title: 'Funktioniert offline',
      copy: 'Sie können nach dem Laden der Seite weiterarbeiten.',
    },
  ],
  proof: {
    eyebrow: 'Belege statt Versprechen',
    title: 'Auf den schwarzen Balken kommt es an.',
    copy: 'Eine Schwärzung sollte langweilig sein: deckend, abgeflacht und geprüft. In der Datei, die Sie herunterladen, gibt es keine verborgene Ebene zum Freilegen — ganz gleich, welchen der vier Stile Sie verwenden.',
    points: [
      {
        icon: 'square',
        title: 'Abgeflacht statt geschichtet',
        copy: 'Der Export ist ein neues Bild. Keine verborgene Ebene, keine editierbare Maske, kein Rückgängig in der Datei.',
      },
      {
        icon: 'shield-check',
        title: 'Vor dem Teilen erneut prüfen',
        copy: 'Die Prüfung liest das abgeflachte Bild und markiert Text, der noch zu einem sensiblen Muster passt.',
      },
      {
        icon: 'eye',
        title: 'In voller Größe ansehen',
        copy: 'Gehen Sie alle vier Stile im Beispiel durch, ziehen Sie dann den Griff und prüfen Sie, ob Text hinter einer Abdeckung hervorlugt.',
      },
    ],
    cta: 'ID-Beispiel öffnen',
    sampleName: 'Studentenausweis',
  },
  useCases: [
    {
      title: 'Chats & Nachrichten',
      copy: 'Namen, E-Mails, Telefonnummern und Lieferdaten, die in Nachrichtenblasen stecken.',
      alt: 'Ein Chat-Screenshot mit schwarzen Balken über einem Namen, einer E-Mail-Adresse, einer Telefonnummer, einer Anschrift und einem Kartenablaufdatum.',
      sample: '/samples/chat.svg',
      sampleName: 'Chat-Screenshot',
      icon: 'chat',
      badge: 'Geschwärzt',
    },
    {
      title: 'Ausweise & Dokumente',
      copy: 'Fotos, Geburtsdaten, Ausweisnummern, Adressen und maschinenlesbare Codes.',
      alt: 'Ein Studentenausweis mit schwarzen Balken über Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code.',
      sample: '/samples/id.svg',
      sampleName: 'Studentenausweis',
      icon: 'id-card',
      badge: 'Geschwärzt',
    },
    {
      title: 'Belege & Banking',
      copy: 'Kartendaten, Rechnungs-E-Mails, Bestellnummern, Steuer-IDs und Support-Kontakte.',
      alt: 'Ein Beleg mit schwarzen Balken über Bestellnummer, Zahlungsdaten, Rechnungs-E-Mail, Lieferadresse, Steuer-ID und Support-Telefonnummer.',
      sample: '/samples/receipt.svg',
      sampleName: 'Beleg',
      icon: 'credit-card',
      badge: 'Geschwärzt',
    },
    {
      title: 'Arbeits-Dashboards',
      copy: 'Angemeldete Konten, Kundentabellen, Umsatzzahlen und interne URLs.',
      alt: 'Ein Analyse-Dashboard mit schwarzen Balken über Kontoinhaber, Kundennamen, E-Mail-Adressen und Umsatzzahlen.',
      sample: '/samples/dashboard.svg',
      sampleName: 'Dashboard',
      icon: 'layout',
      badge: 'Geschwärzt',
    },
  ],
  detection: {
    eyebrow: 'Intelligente Erkennung',
    title: 'Schluss mit der Suche nach den sensiblen Stellen.',
    copy: 'Die intelligente Erkennung liest den Text, der in Ihrem Screenshot bereits sichtbar ist, und schlägt die Zeilen vor, die wie Identifikatoren aussehen. Sie läuft in einem Web Worker auf Ihrem Gerät — das Bild verlässt die Seite nie.',
    points: [
      'Findet E-Mails, Kartennummern, Telefonnummern, Ausweisnummern, Adressen und Datumsangaben.',
      'Jeder Rahmen ist ein Vorschlag — schließen Sie ihn ein oder aus, bevor Sie schwärzen.',
      'Der Modus „Alle Texte“ deckt jede erkannte Zeile ab, wenn Sie lieber nicht selbst entscheiden möchten.',
      'Die Prüfung scannt das abgeflachte Ergebnis erneut auf Text, der noch sensibel wirkt.',
    ],
    primaryCta: 'Intelligente Erkennung ausprobieren',
    secondaryCta: 'Anleitung zum Schwärzen lesen',
    footnote:
      'Bei der ersten Nutzung werden die OCR-Engine, ein englisches Modell und ein Gesichtsmodell heruntergeladen. Ihr Bild ist nicht Teil dieser Anfragen.',
  },
  styles: {
    eyebrow: 'Schwärzungsstile',
    title: 'Vier Wege, etwas verschwinden zu lassen.',
    copy: 'Passen Sie die Abdeckung an das Risiko an. Die weichen Effekte sehen besser aus; bei Geld und Identität ist der schwarze Kasten die verlässliche Wahl.',
    cta: 'Editor öffnen',
  },
  privacy: {
    eyebrow: 'Datenschutz durch Architektur',
    title: 'Es gibt keinen Ort, an den das Bild gehen könnte.',
    copy: 'Das ist kein Versprechen, Ihre Datei nach der Verarbeitung zu löschen. Die Datei wird gar nicht erst gesendet. Sie können das im Netzwerk-Tab überprüfen.',
    cta: 'Datenschutzhinweise lesen',
    points: [
      {
        icon: 'monitor',
        title: 'Ihr Browser erledigt die Arbeit',
        copy: 'Die Datei wird in diesem Tab in ein Canvas dekodiert. Es gibt keinen Upload-Endpunkt, an den sie gesendet werden könnte.',
      },
      {
        icon: 'image',
        title: 'Exporte sind neue Bilder',
        copy: 'Beim Neukodieren im Canvas bleiben die ursprünglichen EXIF-Daten, GPS-Koordinaten und Gerätedetails zurück.',
      },
      {
        icon: 'globe',
        title: 'Die zusätzlichen Anfragen werden offengelegt',
        copy: 'Die intelligente Erkennung lädt bei der ersten Nutzung Tesseract.js und ein englisches Modell herunter, „Gesichter erkennen“ ein kleines MediaPipe-Modell. Ihr Bild ist nie Teil dieser Anfragen. Manuelles Schwärzen funktioniert auch ohne.',
      },
    ],
  },
  compare: {
    eyebrow: 'Vergleich',
    title: 'Ein kleines Werkzeug mit klarer Grenze.',
    copy: 'Kategorien, keine konkreten Produkte. Der sinnvolle Vergleich ist nicht die Funktionsliste, sondern die Frage, wohin Ihr Bild geht.',
  },
  how: {
    eyebrow: 'So funktioniert es',
    title: 'Drei Schritte. Kein Konto-Bildschirm dazwischen.',
    copy: 'Seite öffnen, Bild bearbeiten, Datei mitnehmen. Das ist der ganze Ablauf.',
    steps: [
      {
        number: '01',
        title: 'Bild ablegen oder einfügen',
        copy: 'PNG, JPG, WebP, GIF, BMP oder AVIF. Es öffnet sich lokal — nicht auf einem Server.',
        icon: 'image',
      },
      {
        number: '02',
        title: 'Abdecken, was nicht mitreisen soll',
        copy: 'Starten Sie die intelligente Erkennung, dann verschieben, skalieren oder zeichnen Sie Rahmen. Nutzen Sie Schwarz, Verpixeln, Weichzeichnen oder einen Sticker.',
        icon: 'cursor',
      },
      {
        number: '03',
        title: 'Prüfen und herunterladen',
        copy: 'Scannen Sie das abgeflachte Ergebnis erneut und exportieren Sie dann PNG, JPG oder WebP ohne Metadaten — und verkleinern Sie es, wenn die Datei zu groß ist.',
        icon: 'shield-check',
      },
    ],
    cta: 'Jetzt schwärzen',
  },
  guide: {
    eyebrow: 'Bilder schwärzen',
    title: 'Bilder schwärzen, von den Pixeln aufwärts.',
    lead: 'Was ein gutes Werkzeug entfernt, wie Erkennung auf Ihrem Gerät hilft und wo jeder Stil an seine Grenzen stößt.',
    intro:
      'Bilder schwärzen heißt, sensible Details dauerhaft aus einem Bild zu entfernen oder zu verdecken, bevor es geteilt wird. Ein gutes Werkzeug zum Schwärzen von Bildern tut drei Dinge: Es findet die Informationen, auf die es ankommt, deckt sie so ab, dass sie sich nicht wieder freilegen lassen, und hinterlässt keine verborgenen Daten in der exportierten Datei. Diese Seite erklärt, wie das Schwärzen von Bildern in diesem Editor funktioniert, was die Erkennung auf Ihrem Gerät sehen kann und was nicht, und welche Kontrollen sich lohnen, bevor ein Bild Ihre Hände verlässt.',
    sections: [
      {
        id: 'what-image-redaction-removes',
        navLabel: 'Was Schwärzen entfernt',
        title: 'Was das Schwärzen von Bildern tatsächlich entfernt',
        paragraphs: [
          'Schwärzen ist keine Dekoration. Ein schwarzer Balken, ein verpixelter Block, ein Weichzeichner und ein Zuschnitt verändern alle ein Bild — aber nur einige davon entfernen die Information darunter. Der Test ist einfach: Nach dem Export darf das abgedeckte Detail nicht lesbar, nicht wiederherstellbar und aus dem Verbleibenden nicht ableitbar sein. Wenn ein Name, eine E-Mail-Adresse, eine Kartennummer, eine Ausweisnummer, eine Adresse, ein Geburtsdatum, ein Barcode oder ein Kontoname noch lesbar ist — oder aus den Pixeln rekonstruiert werden kann —, ist das Bild noch nicht geschwärzt.',
          'Diese Unterscheidung ist wichtig, weil Screenshots voller Kombinationen stecken. Ein Name allein mag öffentlich sein. Derselbe Name neben einer Postleitzahl, einer Bestellnummer und den letzten vier Ziffern einer Karte ist ein Paket, das Zugang zu einem Konto verschaffen oder eine Zahlung belegen kann. Decken Sie ab, was eine Person identifiziert, Zugang gewährt oder eine Transaktion belegt, und behandeln Sie zwei dieser Details zusammen als sensibler, als jedes für sich allein wäre.',
        ],
      },
      {
        id: 'why-screenshots-leak',
        navLabel: 'Warum Screenshots zu viel verraten',
        title: 'Warum Screenshots mehr enthalten, als Sie denken',
        paragraphs: [
          'Ein Screenshot zeichnet den gesamten Bildschirm auf, nicht nur den Ausschnitt, den Sie erfassen wollten. Browser-Tabs, die Adressleiste, Benachrichtigungsbanner, ein Chip mit dem angemeldeten Konto, ein Avatar, ein Workspace-Name, ein Zeitstempel und der Dateiname in der Fenstertitelzeile — all das ist auf dem Bild zu sehen. Das Detail, das Ihnen zuerst aufgefallen ist, ist selten das einzige, das sich abzudecken lohnt.',
          'Bilddateien können außerdem Metadaten tragen: EXIF-Felder, GPS-Koordinaten, Kamera- und Gerätedetails und den ursprünglichen Dateinamen. Screenshots enthalten weniger davon als Kamerafotos, aber gehen Sie davon aus, dass alles, was der Empfänger nicht braucht, nicht mit der Datei mitgehen sollte. Dieser Editor exportiert ein neu kodiertes Bild aus einem Canvas, sodass die ursprünglichen Metadaten zurückbleiben.',
        ],
      },
      {
        id: 'ai-image-redaction-software',
        navLabel: 'Wie die Erkennung arbeitet',
        title: 'Wie KI-Software zum Schwärzen von Bildern hier arbeitet',
        paragraphs: [
          'Die Texterkennung in dieser Software zum Schwärzen von Bildern ist OCR plus Musterprüfung, kein generatives Modell, das Details erfindet. Tesseract liest in einem Web Worker den Text, der im Bild bereits sichtbar ist; danach sucht der Editor nach E-Mails, Luhn-gültigen Kartennummern, Telefonnummern, SSNs, Aadhaar-Nummern, PANs, GSTINs, IBANs, IP-Adressen, Datumsangaben, Adress-Schlüsselwörtern und kurzen großgeschriebenen Zeilen, die wie Namen aussehen. „Gesichter erkennen“ ergänzt ein eigenes BlazeFace-Modell auf dem Gerät, das Rahmen um Gesichter in Fotos vorschlägt. Jeder Treffer erscheint als Vorschlag, den Sie behalten oder verwerfen können.',
          'KI-Software zum Schwärzen ist als erster Durchlauf nützlich, nicht als letzte Instanz. Der Scan kann ein kleines Gesicht, einen QR-Code, einen Barcode, ein Logo oder einen ungewöhnlichen Namen übersehen, und er kann nicht wissen, welche Details in Ihrem Kontext sensibel sind. Nutzen Sie ihn, um nicht Zeile für Zeile suchen zu müssen, und prüfen Sie den ganzen Ausschnitt danach selbst. Der Modus „Alle Texte“ deckt jede erkannte Zeile ab, wenn ein unruhiger Screenshot jede Einzelentscheidung wie ein Glücksspiel wirken lässt.',
        ],
      },
      {
        id: 'image-redaction-online',
        navLabel: 'Online, ohne Upload',
        title: 'Bilder online schwärzen, ohne Upload',
        paragraphs: [
          'Die meisten Online-Werkzeuge zum Schwärzen von Bildern verlangen, dass Sie die Datei an einen Server senden, auf die Rückkehr warten und darauf vertrauen, dass die Kopie gelöscht wurde. Dieses Werkzeug ist umgekehrt gebaut. Der Browser dekodiert das Bild im aktuellen Tab in ein Canvas, hält die Pixel im Speicher und zeichnet jede Schwärzung lokal. Es gibt keinen Upload-Endpunkt und damit auch keine Serverkopie, die gelöscht werden müsste. Die Datenschutzseite dokumentiert jede Anfrage, die die Website stellt.',
          'Eine Gruppe von Anfragen ist erwähnenswert: die Detektoren. Bei der ersten Nutzung lädt die Seite Tesseract.js, ein englisches Sprachmodell und das MediaPipe-Gesichtsmodell herunter. Ihr Bild ist nicht Teil dieser Anfragen. Manuelles Schwärzen, Rückgängig, Kopieren und Export funktionieren auch ohne. Sobald die Seite geladen ist, können Sie offline weiterarbeiten.',
        ],
      },
      {
        id: 'redaction-styles',
        navLabel: 'Vier Stile, einer verlässlich',
        title: 'Vier Stile — und der eine, dem Sie vertrauen sollten',
        paragraphs: [
          'Deckendes Schwarz zeichnet eine undurchsichtige, abgeflachte Form über die Originalpixel. Es gibt keinen Verlauf zum Umkehren und kein Muster zum Analysieren — deshalb ist es die Standardwahl für Ausweise, Zahlungsdaten, Adressen und alles, was Zugang zu einem Konto gewährt. Verpixeln ersetzt einen Bereich durch gemittelte Farbblöcke; das kann entschlossen wirken, bewahrt aber die Form großer Buchstaben. Der Weichzeichner ist die weichste Option und die schwächste Garantie, denn leicht verschwommener oder verpixelter Text und ebensolche Gesichter lassen sich manchmal teilweise rekonstruieren.',
          'Der Emoji-Sticker zeichnet eine undurchsichtige Fläche unter dem Emoji, sodass er den Bereich abdeckt, statt transparent darüber zu schweben. Er eignet sich für ein Gesicht in einem lockeren Gruppenchat. Zuschneiden ist die stärkste Schwärzung überhaupt, wenn der umgebende Kontext nicht gebraucht wird: Bei einem Zuschnitt bleibt nichts, was sich rekonstruieren ließe. Für alles, was eine Person identifiziert, Geld bewegt oder Zugang zu einem Konto verschafft, greifen Sie zu Schwarz oder einem Zuschnitt. Heben Sie die weicheren Effekte für Kontext auf, dessen Verlust Ihnen nichts ausmacht.',
        ],
      },
      {
        id: 'image-redaction-tool',
        navLabel: 'Was das Werkzeug leisten sollte',
        title: 'Was ein gutes Werkzeug zum Schwärzen leisten sollte',
        paragraphs: [
          'Die Funktionsliste ist weniger wichtig als die Grenze drumherum. Ein Werkzeug, das sich lohnt, sollte die Datei lokal verarbeiten, jeden Rahmen bis zum Export bearbeitbar halten, das Ergebnis in neue Pixel überführen und die eigene Ausgabe überprüfen, bevor Sie herunterladen. Es sollte außerdem ehrlich sagen, wo die Erkennung endet, statt einen Scan als Garantie darzustellen.',
          'Diese Grundsätze sind der Grund, warum dieser Editor so arbeitet:',
        ],
        bullets: [
          'Standardmäßig lokal: Die Datei wird im Tab dekodiert, ohne Upload-Endpunkt.',
          'Bis zum Export bearbeitbar: Rahmen lassen sich verschieben, skalieren, rückgängig machen und wiederherstellen; der Download ist abgeflacht.',
          'Geprüfte Ausgabe: Ein erneuter Scan markiert Text, der noch sensibel wirkt.',
          'Saubere Dateien: frische PNG-, JPG- oder WebP-Exporte ohne die ursprünglichen Metadaten, dazu ein Größenbereich, der den echten Download misst.',
          'Kein Konto, kein Wasserzeichen, keine Zahlung.',
        ],
      },
      {
        id: 'pre-share-check',
        navLabel: 'Kurze Kontrolle vor dem Senden',
        title: 'Eine kurze Kontrolle, bevor Sie das Bild versenden',
        paragraphs: [
          'Bevor das Bild Ihre Hände verlässt, werfen Sie einen langsamen Blick über das gesamte Bild. Diese Kontrollen fangen die meisten teuren Fehler ab:',
        ],
        bullets: [
          'Prüfen Sie alle vier Ecken, den Kopfbereich, die Tabs und jede Benachrichtigung.',
          'Nutzen Sie Schwarz für Identifikatoren und Zahlungsdaten; Weichzeichner und Verpixeln sind für Kontext gedacht.',
          'Zoomen Sie hinein und vergewissern Sie sich, dass kein Text hinter einem Rand hervorlugt.',
          'Führen Sie die Prüfung aus und öffnen Sie dann die exportierte Datei in voller Größe.',
          'Fragen Sie sich, ob ein Zuschnitt sicherer wäre als eine Schwärzung.',
          'Senden Sie nur die geschwärzte Version. Schicken Sie niemals das Original hinterher.',
        ],
      },
    ],
    principles: [],
    checks: [],
    cta: 'Bild schwärzen',
    relatedLinks: [
      { label: 'Belege', slug: 'redact-a-receipt' },
      { label: 'Ausweise', slug: 'redact-an-id-card' },
      { label: 'Arbeits-Dashboards', slug: 'work-screenshot-checklist' },
      { label: 'Chat-Screenshots', slug: 'how-to-redact-a-screenshot' },
    ],
    closing:
      'Die Kurzfassung ist immer dieselbe: Decken Sie ab, was identifiziert, prüfen Sie, was übrig bleibt, und senden Sie das kleinste Bild, das Ihren Punkt noch klar macht.',
  },
  guides: {
    eyebrow: 'Anleitungen',
    title: 'Ein bisschen Paranoia, aufgeschrieben.',
    copy: 'Kurze, praktische Notizen dazu, was Sie abdecken sollten, welcher Stil sich lohnt und wie Sie Ihre eigene Arbeit überprüfen.',
    cta: 'Alle Anleitungen',
  },
  faq: {
    eyebrow: 'FAQ zum Schwärzen von Bildern',
    title: 'Häufige Fragen zum Schwärzen von Bildern.',
    copy: 'Wenn etwas fehlt, fragen Sie. Die Antwort wird hier ergänzt, statt in einem Support-Postfach zu verschwinden.',
    ask: 'Frage stellen',
  },
  cta: {
    eyebrow: 'Bereit, wenn Sie es sind',
    title: 'Der sicherste Screenshot ist der, auf dem weniger zu sehen ist.',
    copy: 'Öffnen Sie den Editor, legen Sie ein Bild ab und nehmen Sie sich eine Minute, um abzudecken, was nicht mitreisen sollte. Kein Konto, kein Upload, kein Wasserzeichen.',
    primary: 'Bild schwärzen',
    secondary: 'Datenschutzhinweise lesen',
    secondaryHref: '/privacy',
  },
};
