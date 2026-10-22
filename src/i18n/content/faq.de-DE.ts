import type { FaqItem } from '../../data/faq';

export const faqsDeDE: FaqItem[] = [
  {
    question: 'Welche Stile zum Schwärzen gibt es?',
    answer:
      'Redact hat vier Stile zum Schwärzen von Bildern: Tintenschwarz, Verpixeln, Weichzeichnen und Emoji-Sticker. Tintenschwarz ersetzt den Bereich durch undurchsichtige Pixel und ist die sicherste Wahl für Namen, Kartennummern, Ausweise, Adressen, QR-Codes und alles Finanzielle. Verpixeln und Weichzeichnen sind sanftere Optionen für Gesichter und beiläufige Screenshots, während der Emoji-Sticker eine undurchsichtige Fläche malt und ein Emoji daraufsetzt. Alle vier funktionieren mit rechteckigen oder ovalen Auswahlen.',
  },
  {
    question: 'Ist diese Schwärzung wirklich dauerhaft?',
    answer:
      'Ja — in der Datei, die Sie herunterladen. Der Export ist ein neues, abgeflachtes Bild, die Schwärzungen sind also in die Pixel eingebrannt und nicht als entfernbare Ebene, Maske oder Metadaten-Tag gespeichert. Das Originalbild auf Ihrem Gerät bleibt unberührt. Verwenden Sie für Details, die niemals wiederhergestellt werden dürfen, Tintenschwarz statt Weichzeichnen oder Verpixeln, und prüfen Sie die Ränder, bevor Sie die Datei teilen.',
  },
  {
    question: 'Kann jemand die Schwärzung rückgängig machen?',
    answer:
      'Nicht im exportierten Bild. Der Download enthält keine versteckte Ebene, keinen Rückgängig-Verlauf und keine Originalpixel, und die erneute Canvas-Kodierung entfernt EXIF- und GPS-Metadaten. Weichzeichnen und Verpixeln verdienen mehr Vorsicht: Untersuchungen haben gezeigt, dass leicht verdeckte Texte und Gesichter manchmal teilweise rekonstruiert werden können. Tintenschwarz entfernt die zugrunde liegenden Pixel vollständig, weshalb es der empfohlene Stil für Identitäts- und Finanzdaten ist.',
  },
  {
    question: 'Wie kann ich ein Bild schwärzen?',
    answer:
      'Öffnen Sie den Redact-Editor und ziehen Sie ein Bild hinein, fügen Sie es ein oder wählen Sie eines aus. Starten Sie die intelligente Erkennung, um wahrscheinlich sensible Texte zu finden, oder „Gesichter erkennen“, um Gesichter vorzuschlagen; zeichnen Sie dann ein Rechteck oder Oval über alles, was die Scans übersehen, wählen Sie einen Stil zum Schwärzen und passen Sie die Ränder des Rahmens an. Nutzen Sie die Überprüfung, um das abgeflachte Ergebnis erneut zu scannen, und laden Sie dann ein PNG, JPG oder WebP herunter. Alles läuft in Ihrem Browser, und das Bild wird nie hochgeladen.',
  },
  {
    question: 'Erkennt es Gesichter?',
    answer:
      'Ja. „Gesichter erkennen“ führt MediaPipes BlazeFace-Modell in Ihrem Browser aus und schlägt einen etwas größeren Rahmen um jedes gefundene Gesicht vor. Nichts wird hochgeladen, das Modell wird einmal heruntergeladen. Am besten funktioniert es bei klaren, frontalen Gesichtern auf Fotos; kleine, abgewandte, stark verdeckte oder gezeichnete Gesichter können übersehen werden. Prüfen Sie die Rahmen deshalb immer. Ihr aktueller Schwärzungsstil wird beim Übernehmen angewendet.',
  },
  {
    question: 'Kann ich eine Schwärzung nach dem Zeichnen rückgängig machen?',
    answer:
      'Ja, solange Sie noch bearbeiten. Verwenden Sie die Schaltfläche „Rückgängig“ oder Strg/Cmd + Z, um einen Schritt zurückzugehen, „Wiederholen“, um eine Änderung wiederherzustellen, oder wählen Sie einen Rahmen aus und drücken Sie Entf, um ihn zu entfernen. Der Rückgängig-Verlauf existiert nur im aktuellen Browser-Tab und wird gelöscht, wenn Sie die Seite schließen oder neu laden. Nach dem Export ist die Schwärzung in das neue Bild eingebrannt und kann in dieser Datei nicht rückgängig gemacht werden.',
  },
  {
    question: 'Welche Bildformate werden unterstützt?',
    answer:
      'Sie können PNG-, JPG-, WebP-, GIF-, BMP- und AVIF-Bilder bis 25 MB schwärzen. Animierte GIFs werden auf ihr erstes Einzelbild reduziert, und sehr große Bilder werden auf eine lange Kante von 5.200 px skaliert, damit der Editor reaktionsfähig bleibt. Geschwärzte Bilder können als PNG, JPG oder WebP ohne EXIF- oder GPS-Metadaten exportiert werden.',
  },
  {
    question: 'Hat Redact Zugriff auf mein Bild?',
    answer:
      'Nein. Ihr Browser liest das Bild und zeichnet es in Ihrem Tab auf einen lokalen Canvas. Es gibt keinen Upload-Endpunkt, die Datei wird also nie an einen Server gesendet, gespeichert, protokolliert oder von uns geprüft. Die intelligente Erkennung lädt beim ersten Einsatz eine OCR-Engine, ein englisches Modell und ein Gesichtsmodell herunter, aber Ihr Bild ist nicht Teil dieser Anfrage. Beides können Sie im Netzwerk-Tab Ihres Browsers bestätigen.',
  },
  {
    question: 'Kann ich auch andere Dinge als Gesichter schwärzen?',
    answer:
      'Ja. Sie können alles abdecken, was in einem Bild sichtbar ist: Gesichter, Namen, E-Mail-Adressen, Telefonnummern, Kartennummern, Ausweisnummern, Adressen, QR-Codes, Barcodes, Logos, Kontonamen und mehr. Die intelligente Erkennung schlägt automatisch Texte vor, die wie E-Mails, Kartennummern, Telefonnummern, amtliche Ausweise, Adressen und Daten aussehen, und „Gesichter erkennen“ schlägt Gesichter vor. QR-Codes, Barcodes, MRZ-Zeilen und Logos brauchen weiterhin einen manuellen Rahmen.',
  },
  {
    question: 'Verwendet Redact Cookies oder verfolgt es mich?',
    answer:
      'Nur ein funktionales. Redact hat keine Analysedienste, Werbepixel oder Tracker von Drittanbietern, und Ihr Bild wird nie hochgeladen. Das eine Cookie speichert Ihre Einstellung für das helle oder dunkle Design, zusammen mit einer Kopie im lokalen Speicher, damit die Seite bei Ihrem nächsten Besuch nicht kurz das falsche Design zeigt. Es enthält keine personenbezogenen Daten, wird nie an einen Server gesendet und kann jederzeit in Ihren Browsereinstellungen gelöscht werden.',
  },
];

export const privacyFaqsDeDE: FaqItem[] = [
  {
    question: 'Werden meine Bilder wirklich nie hochgeladen?',
    answer:
      'Richtig. Ihr Browser liest die Datei, zeichnet sie auf einen lokalen Canvas und hält sie im Arbeitsspeicher. Es gibt keinen Upload-Endpunkt — Sie können den Netzwerk-Tab beobachten, während Sie arbeiten. Die intelligente Erkennung lädt beim ersten Einsatz eine OCR-Engine, ein englisches Textmodell und ein Gesichtsmodell herunter, aber das Bild selbst bleibt im Tab.',
  },
  {
    question: 'Ist es kostenlos? Brauche ich ein Konto?',
    answer:
      'Es ist kostenlos, ohne Konto und ohne Wasserzeichen. Öffnen Sie den Editor und verwenden Sie ihn. Es gibt keinen kostenpflichtigen Export, keinen Guthabenzähler und keinen Grund, vor dem Start eine E-Mail-Adresse herauszugeben.',
  },
  {
    question: 'Wie funktioniert die intelligente Erkennung?',
    answer:
      'Sie führt Tesseract OCR in einem Web Worker in Ihrem Browser aus und wendet dann Musterprüfungen an: E-Mails, Luhn-gültige Kartennummern, SSNs, Aadhaar-Nummern, PANs, GSTINs, IBANs, Telefonnummern, IP-Adressen, Daten, Adressstichwörter und wahrscheinliche Namen. „Gesichter erkennen“ nutzt MediaPipes BlazeFace-Modell, ebenfalls auf dem Gerät. Jeder Fund ist ein Vorschlag, den Sie einbeziehen oder ausschließen können. Beide Detektoren liefern bestmögliche Ergebnisse, prüfen Sie daher die Rahmen und nutzen Sie die Überprüfung.',
  },
  {
    question: 'Funktioniert es offline?',
    answer:
      'Der Editor schon. Sobald die Seite geöffnet ist, können Sie ohne Netzwerkverbindung weiter schwärzen. Die intelligente Erkennung benötigt beim ersten Einsatz die OCR-Engine, das englische Modell und das Gesichtsmodell; Ihr Browser kann sie zwischenspeichern, aber verlassen Sie sich bei einem ersten Offline-Lauf nicht darauf. Manuelles Schwärzen, Kopieren und Exportieren funktionieren alle offline.',
  },
  {
    question: 'Werden EXIF- und GPS-Daten entfernt?',
    answer:
      'Ja. Der Canvas-Export kodiert die Pixel neu, daher reisen Kamerametadaten, GPS-Koordinaten, Gerätedetails und der ursprüngliche Dateiname nicht mit der neuen Datei. Screenshots haben oft von vornherein keine EXIF-Daten; die erneute Kodierung normalisiert außerdem PNG-, JPG- und WebP-Exporte.',
  },
  {
    question: 'Kann ich die exportierte Datei kleiner machen?',
    answer:
      'Ja. Der Bereich „Größe“ im Editor misst den tatsächlichen Export, bevor Sie ihn herunterladen: Senken Sie die Qualität für JPG und WebP oder begrenzen Sie die längste Kante, um das abgeflachte Bild zu skalieren. Sie sehen die tatsächliche Byte-Anzahl und den eingesparten Prozentsatz. PNG ist verlustfrei, daher gilt die Qualität dafür nicht — nutzen Sie die Größenbegrenzung oder wählen Sie WebP. Die Schwärzungen bleiben in jedem Fall eingebrannt.',
  },
];
