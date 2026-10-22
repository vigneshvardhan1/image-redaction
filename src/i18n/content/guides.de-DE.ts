import type { Guide } from '../../data/guides';

export const guidesDeDE: Guide[] = [
  {
    slug: 'how-to-redact-a-screenshot',
    title: 'So schwärzen Sie einen Screenshot, ohne etwas zu übersehen',
    description:
      'Ein übersehenes Detail in der Ecke eines Screenshots kann eine sorgfältige Schwärzung zunichtemachen. Mit diesem wiederholbaren Ablauf erwischen Sie genau die Stellen, die die meisten übersehen.',
    category: 'Screenshots',
    readingTime: '7 Min. Lesezeit',
    date: 'Oct 16, 2026',
    dateISO: '2026-10-16',
    cover: '/samples/chat-redacted.svg',
    coverAlt:
      'Ein Chat-Screenshot mit schwarzen Balken über Namen, E-Mail-Adresse, Telefonnummer, Adresse und Kartendaten.',
    intro:
      'Die meisten Fehler beim Schwärzen entstehen nicht durch den schwarzen Kasten, sondern durch alles drumherum: den Namen in der Kopfzeile, die E-Mail-Adresse in einer Benachrichtigung, die Bestellnummer unter dem Barcode.',
    blocks: [
      {
        type: 'p',
        text: 'Ein Screenshot zeigt eine komplette Benutzeroberfläche, nicht nur den Ausschnitt, den Sie eigentlich festhalten wollten. Der sichere Ansatz: Betrachten Sie das gesamte Bild so lange als nicht vertrauenswürdig, bis Sie es bewusst Bereich für Bereich geprüft haben.',
      },
      {
        type: 'h2',
        text: 'Beginnen Sie mit dem ganzen Bild, nicht mit dem offensichtlichen Geheimnis',
      },
      {
        type: 'p',
        text: 'Bevor Sie den ersten Kasten ziehen, scannen Sie das Bild in Z-Form: von oben links nach oben rechts, dann nach unten und wieder zurück. Was Ihnen zuerst auffällt, ist selten das Einzige, das verborgen werden sollte.',
      },
      {
        type: 'ul',
        items: [
          'Anzeigenamen, Nutzernamen, Handles, Avatare und Profilbilder.',
          'E-Mail-Adressen, Telefonnummern und Konto-IDs in Nachrichtenblasen.',
          'Adressen, Lieferhinweise und Geburtsdaten.',
          'Kartennummern, Ablaufdaten, CVVs und Banknamen.',
          'Browser-Tabs, Lesezeichen und die Adressleiste.',
          'Benachrichtigungsbanner und Nachrichtenvorschauen.',
          'Dateinamen, Fenstertitel und Seitenleisten von Apps.',
          'Barcodes, QR-Codes, Bestellnummern und Rechnungsnummern.',
        ],
      },
      {
        type: 'p',
        text: 'Erstellen Sie wenn möglich nur einen Screenshot des App-Fensters statt des ganzen Desktops. Der Zuschnitt ist die zuverlässigste Schwärzung überhaupt: weniger Pixel bedeuten weniger Gelegenheiten, etwas zu übersehen.',
      },
      {
        type: 'h2',
        text: 'Verdecken Sie Identitäten, nicht nur Gesichter',
      },
      {
        type: 'p',
        text: 'Ein Gesicht ist nicht die einzige Identifizierungsmöglichkeit. Eine E-Mail-Adresse kann ausreichen, um jemanden gezielt anzugreifen. Die letzten Ziffern einer Karte zusammen mit dem Ablaufdatum können eine betrügerische Zahlung ermöglichen. Eine Bestellnummer plus Postleitzahl kann ein Support-Konto freischalten. Denken Sie in Kombinationen: Welche zwei Angaben würden einem Fremden zusammen ermöglichen, etwas anzurichten?',
      },
      {
        type: 'h2',
        text: 'Verwenden Sie Tinte für alles, was wichtig ist',
      },
      {
        type: 'p',
        text: 'Tintenschwarz ist eine deckende Füllung. Darunter bleiben keine wiederherstellbaren Pixel zurück. Weichzeichnen und Verpixeln sind für Kontext nützlich, lassen sich aber manchmal teilweise rückgängig machen – besonders wenn der Text groß oder der Effekt schwach ist. Bei Ausweisen, Zahlungsdaten, Adressen und Kontozugängen greifen Sie zuerst zu Tinte.',
      },
      {
        type: 'h2',
        text: 'Führen Sie eine Prüfrunde durch',
      },
      {
        type: 'p',
        text: 'Die Schaltfläche Verify des Editors rendert Ihr geschwärztes Bild und lässt OCR über das zusammengeführte Ergebnis laufen. Gesucht wird nach Text, der noch auf ein Muster für E-Mail, Karte, Telefon, Ausweis, Adresse oder Datum passt. Wenn etwas gefunden wird, ziehen Sie einen weiteren Kasten und prüfen Sie erneut. Die Prüfung ist bestmöglich, aber keine Garantie – ein letzter menschlicher Blick bleibt wichtig.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Bild laden',
            text: 'Ziehen Sie es hinein, fügen Sie es ein oder starten Sie mit einem Beispiel. Die Datei wird von Ihrem Browser dekodiert.',
          },
          {
            title: 'Smart detect ausführen',
            text: 'OCR schlägt Zeilen vor, die sensibel aussehen. Klicken Sie auf einen Vorschlag, um ihn auszuschließen. Nutzen Sie All text, wenn Sie lieber jede Zeile abdecken möchten.',
          },
          {
            title: 'Kanten korrigieren',
            text: 'Ziehen Sie Kästen über alles, was der Scan übersehen hat. Verwenden Sie Tinte für Identifikatoren und schneiden Sie zu, wenn ein großer Bereich privat ist.',
          },
          {
            title: 'Prüfen, dann exportieren',
            text: 'Lassen Sie das zusammengeführte Bild erneut scannen, prüfen Sie die Vorschau noch einmal und laden Sie dann ein metadatenfreies PNG, JPG oder WebP herunter.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Weichzeichnen ist kein Versprechen',
        tone: 'warning',
        text: 'Forschungswerkzeuge können leicht weichgezeichneten oder verpixelten Text manchmal wiederherstellen. Für alles, was eine Person identifizieren oder belasten kann, verwenden Sie einen deckenden Kasten. Sparen Sie die weichen Effekte für Hintergründe und beiläufigen Kontext auf.',
      },
      {
        type: 'h2',
        text: 'Eine letzte Prüfung in 20 Sekunden',
      },
      {
        type: 'ul',
        items: [
          'Betrachten Sie die Vorschau mit zusammengekniffenen Augen. Lugt irgendein Text hinter einem Kasten hervor?',
          'Prüfen Sie alle vier Ecken, nicht nur die Bildmitte.',
          'Öffnen Sie die exportierte Datei in voller Größe, bevor Sie sie versenden.',
          'Fragen Sie sich, ob der Empfänger das ganze Bild braucht. Ein Zuschnitt ist sicherer als eine Schwärzung.',
        ],
      },
      {
        type: 'quote',
        text: 'Der sicherste Screenshot ist der mit weniger Inhalt. Schwärzen Sie, was Sie müssen, schneiden Sie zu, was Sie können, und senden Sie die kleinste Version, die ihren Zweck noch erfüllt.',
      },
    ],
    takeaways: [
      'Scannen Sie das gesamte Bild, einschließlich Kopfzeilen, Tabs und Benachrichtigungen.',
      'Verwenden Sie Tintenschwarz für Identifikatoren und Zahlungsdaten.',
      'Prüfen Sie das zusammengeführte Bild und kontrollieren Sie den Export in voller Größe.',
    ],
  },
  {
    slug: 'blur-vs-pixelate-vs-black-box',
    title: 'Weichzeichnen, Verpixeln, schwarzer Kasten: Welche Schwärzung ist wirklich sicher?',
    description:
      'Weichzeichnen fühlt sich privat an, ist aber keine Garantie. Hier erfahren Sie, wie die vier Schwärzungsstile abschneiden und wann welcher geeignet ist.',
    category: 'Stilwahl',
    readingTime: '6 Min. Lesezeit',
    date: 'Oct 9, 2026',
    dateISO: '2026-10-09',
    cover: '/samples/id-redacted.svg',
    coverAlt:
      'Eine Beispiel-Studentenkarte mit schwarzen Balken über Foto, Name, Geburtsdatum, Ausweisnummer, Adresse und Barcode.',
    intro:
      'Jeder Schwärzungsstil verändert die Pixel. Nur einer entfernt zuverlässig die Informationen, die diese Pixel enthalten.',
    blocks: [
      {
        type: 'callout',
        title: 'Die kurze Antwort',
        tone: 'note',
        text: 'Verwenden Sie Tintenschwarz oder einen Zuschnitt für alles, was eine Person, ein Konto oder eine Zahlungsmethode identifiziert. Weichzeichnen und Verpixeln sind für Kontext gedacht, den Sie verlieren können – niemals für Geheimnisse.',
      },
      {
        type: 'p',
        text: 'Der richtige Stil hängt vom Risiko ab. Ein weichgezeichnetes Gesicht im Hintergrund eines Urlaubsfotos ist ein anderes Problem als eine weichgezeichnete Kartennummer auf einer Rechnung. Wer beides gleich behandelt, teilt am Ende mehr als beabsichtigt.',
      },
      {
        type: 'h2',
        text: 'Das Risiko in einem Absatz',
      },
      {
        type: 'p',
        text: 'Weichzeichnen und Verpixeln reduzieren Details, löschen sie aber nicht. Forschende haben wiederholt gezeigt, dass sich niedrig aufgelöste Bilder, leicht weichgezeichneter Text und verpixelte Gesichter mit dem richtigen Modell oder genügend Versuchen teilweise rekonstruieren lassen. Das Ergebnis muss nicht perfekt sein, um Schaden anzurichten. Eine teilweise sichtbare Kartennummer, ein erkennbares Gesicht oder eine kurze E-Mail-Adresse lassen sich weiterhin verwenden.',
      },
      {
        type: 'h2',
        text: 'Tintenschwarz',
      },
      {
        type: 'p',
        text: 'Tinte zeichnet eine feste, deckende Form über die ursprünglichen Pixel. Es gibt keinen Farbverlauf, den man umkehren, und kein Muster, das man analysieren könnte. Sie ist aus gutem Grund der Standard in diesem Editor. Ein Punkt verdient Aufmerksamkeit: die Abdeckung. Machen Sie den Kasten etwas größer als den Text und zoomen Sie hinein, um sicherzustellen, dass keine Oberlänge und kein Satzzeichen außerhalb des Kastens bleibt.',
      },
      {
        type: 'h2',
        text: 'Verpixeln',
      },
      {
        type: 'p',
        text: 'Beim Verpixeln wird ein Bereich durch große Farbblöcke ersetzt. Das wirkt entschieden, doch die Blöcke sind Durchschnittswerte der ursprünglichen Pixel. Bei geringer Blockanzahl oder kurzem Text kann die Form der Buchstaben erhalten bleiben. Nutzen Sie es zur dekorativen Verschleierung, nicht für eine Ausweisnummer oder eine E-Mail-Adresse.',
      },
      {
        type: 'h2',
        text: 'Weichzeichnen',
      },
      {
        type: 'p',
        text: 'Weichzeichnen ist die natürlichste Option und die schwächste Garantie. Ein leichter Gauß-Weichzeichner erhält das Layout und oft die Wortformen. Gesichter können selbst bei überraschend starkem Weichzeichnen erkennbar bleiben. Für ein Gesicht in einer Menschenmenge ist es eine vernünftige Wahl, wenn das Bild klein bleibt und die Person nicht das Motiv ist – und eine schlechte Wahl für ein Passfoto oder einen Kontoauszug.',
      },
      {
        type: 'h2',
        text: 'Emoji-Sticker',
      },
      {
        type: 'p',
        text: 'Der Emoji-Stil in diesem Editor ist kein schwebendes, transparentes Zeichen. Er zeichnet zuerst eine deckende weiße Fläche und dann das Emoji darüber. Das bedeutet: Der Bereich ist abgedeckt, selbst wenn das Emoji kleiner als der Kasten ist. Ein freundlicher Look für ein Gesicht in einem Gruppenchat – vorausgesetzt, der Kasten deckt das Gesicht und jeden Namen in der Nähe vollständig ab.',
      },
      {
        type: 'h2',
        text: 'Der Stil, der immer gewinnt: der Zuschnitt',
      },
      {
        type: 'p',
        text: 'Wenn ein Detail für Ihre Aussage nicht nötig ist, entfernen Sie es ganz aus dem Bild. Schneiden Sie den Screenshot auf die Nachricht, die Summe oder die eine wichtige Zeile zu. Ein Zuschnitt lässt sich nicht wieder weichzeichnen. Außerdem wird das Bild kleiner und leichter zu lesen.',
      },
      {
        type: 'h2',
        text: 'Eine einfache Regel',
      },
      {
        type: 'ul',
        items: [
          'Identität, Geld oder Kontozugang: Tintenschwarz oder Zuschnitt.',
          'Ein Gesicht in einer öffentlichen Szene: nur dann weichzeichnen, wenn das Gesicht nicht das Motiv ist und das Bild klein bleibt; ansonsten Tinte.',
          'Unkritische Bilddetails: Verpixeln oder Emoji.',
          'Alles, was in ein öffentliches Profil kommt: erst zuschneiden, dann prüfen, zuletzt posten.',
        ],
      },
      {
        type: 'p',
        text: 'Eine Schwärzung kann im Editor bei 40 % Zoom überzeugend aussehen. Prüfen Sie die exportierte Datei bei 100 %. Wenn Sie sie lesen können, gehen Sie davon aus, dass es andere auch können.',
      },
    ],
    takeaways: [
      'Tinte und Zuschnitt sind die einzigen Stile, die Informationen zuverlässig entfernen.',
      'Weichzeichnen und Verpixeln können Text und Gesichter preisgeben.',
      'Beurteilen Sie den fertigen Export in voller Größe, nicht die Vorschau im Editor.',
    ],
  },
  {
    slug: 'redact-an-id-card',
    title: 'Ausweis schwärzen: Diese Felder sollten Sie niemals weitergeben',
    description:
      'Ein Foto eines Ausweises ist ein Paket voller Identitätsdaten. Hier erfahren Sie, was Sie abdecken, was Sie zuschneiden und was Sie fragen sollten, bevor Sie eine Kopie versenden.',
    category: 'Ausweise & Dokumente',
    readingTime: '6 Min. Lesezeit',
    date: 'Sep 24, 2026',
    dateISO: '2026-09-24',
    cover: '/samples/id-redacted.svg',
    coverAlt:
      'Eine Studentenkarte mit schwarzen Balken über Foto, Name, Geburtsdatum, Ausweisnummer, Adresse, Barcode und QR-Code.',
    intro:
      'Ein Ausweis ist darauf ausgelegt, von Maschinen gelesen und von Menschen vertraut zu werden. Genau deshalb ist ein Foto davon für die falsche Person so wertvoll.',
    blocks: [
      {
        type: 'p',
        text: 'Verifizierungsanfragen sind alltäglich: eine Wohnung mieten, ein Konto eröffnen, ein Paket abholen oder einen Studentenrabatt nachweisen. Die Anfrage ist oft berechtigt. Die Standardantwort – ein sauberes Foto der ganzen Karte senden – muss es nicht sein.',
      },
      {
        type: 'h2',
        text: 'Vorder- und Rückseite zählen beide',
      },
      {
        type: 'p',
        text: 'Die Rückseite eines Ausweises enthält oft einen Barcode, eine maschinenlesbare Zone, eine Unterschrift oder eine Adresse. Wenn Sie nur die Vorderseite schwärzen, bleibt eine zweite Kopie derselben Daten erhalten. Wenn Sie die Rückseite nicht brauchen, fotografieren Sie sie nicht.',
      },
      {
        type: 'h2',
        text: 'Decken Sie diese Felder ab',
      },
      {
        type: 'ul',
        items: [
          'Die Ausweisnummer. Sie ist der Schlüssel, der die Karte mit Datenbanken und Support-Systemen verbindet.',
          'Das Geburtsdatum. Ein zentraler Identitätsfaktor, der bei der Kontowiederherstellung verwendet wird.',
          'Die Wohnadresse. Oft ausreichend, um eine Person zu finden oder Sicherheitsfragen zu beantworten.',
          'Das Foto. Biometrische Daten verdienen einen eigenen Schutz.',
          'Barcode, QR-Code oder maschinenlesbare Zone. Darin können dieselben Felder in einer leicht kopierbaren Form gespeichert sein.',
          'Unterschrift und alle handschriftlichen Markierungen.',
          'Ablaufdatum, Ausstellungsdatum und Staatsangehörigkeit, wenn sie für die Prüfung nicht benötigt werden.',
        ],
      },
      {
        type: 'p',
        text: 'Ihr Name allein ist meist kein Geheimnis. Die Kombination ist es. Wenn ein Formular den Namen abgleichen muss, lassen Sie den Namen sichtbar und decken Sie alles ab, was daraus einen Identitätsdatensatz macht.',
      },
      {
        type: 'h2',
        text: 'Schneiden Sie auf das Nötigste zu',
      },
      {
        type: 'p',
        text: 'Fragen Sie, was der Empfänger tatsächlich braucht. Ein Hotel benötigt vielleicht einen Namen und den Aufenthaltszeitraum. Ein Versorgungsunternehmen braucht vielleicht einen Namen und die Versorgungsadresse. Ein Support-Mitarbeiter, der die Inhaberschaft prüft, braucht möglicherweise nur den Kartentyp und die letzten vier Ziffern eines Kontos. Eine Gehaltsabrechnung oder eine Versorgungsrechnung ist oft besser geeignet als ein vollständiger Ausweis.',
      },
      {
        type: 'h2',
        text: 'Verwenden Sie Tinte, nicht Weichzeichnen',
      },
      {
        type: 'p',
        text: 'Ausweise sind kontrastreiche Dokumente mit großer Schrift. Weichzeichnen und Verpixeln passen besonders schlecht: Das Format ist vorhersehbar, daher lassen sich Teilformen leichter rekonstruieren. Verwenden Sie deckende Kästen, die jedes Feld leicht überragen.',
      },
      {
        type: 'h2',
        text: 'Ergänzen Sie Kontext auf der Kopie',
      },
      {
        type: 'p',
        text: 'Wenn Sie „zur Verifizierung bei Acme, 20. Oktober“ auf eine Kopie schreiben möchten, verwenden Sie das Markup-Werkzeug Ihres Smartphones oder einen separaten Editor. Dieses Schwärzungswerkzeug fügt noch keinen Text hinzu. Halten Sie die Notiz von den sensiblen Feldern fern und geben Sie das Originalbild nicht weiter.',
      },
      {
        type: 'callout',
        title: 'Einmal senden, nicht zweimal',
        tone: 'warning',
        text: 'Wenn Sie eine geschwärzte Kopie senden und danach „nur zur Sicherheit“ das Original hinterherschicken, war die Schwärzung sinnlos. Entscheiden Sie vor der ersten Nachricht, was nötig ist. Sie können später jederzeit mehr teilen.',
      },
      {
        type: 'h2',
        text: 'Bevor Sie auf Senden klicken',
      },
      {
        type: 'ul',
        items: [
          'Ausweisnummer, Geburtsdatum, Adresse und Unterschrift sind abgedeckt.',
          'Jeder Barcode, QR-Code oder jede maschinenlesbare Zone ist vollständig verborgen.',
          'Das Foto ist abgedeckt, wenn der Empfänger es nicht benötigt.',
          'Beide Seiten der Karte wurden geprüft.',
          'Das exportierte Bild ist die einzige Version, die Sie weitergegeben haben.',
        ],
      },
    ],
    takeaways: [
      'Decken Sie Ausweisnummer, Geburtsdatum, Adresse, Foto und maschinenlesbare Codes ab.',
      'Fragen Sie, was der Empfänger braucht, und schneiden Sie genau darauf zu.',
      'Verwenden Sie deckende Tinte, prüfen Sie das Ergebnis und senden Sie nur die geschwärzte Kopie.',
    ],
  },
];
