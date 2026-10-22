import type { PrivacyContent } from './types';

export const privacyDeDE: PrivacyContent = {
  meta: {
    title: 'Datenschutz — Redact',
    description:
      'Ihr Screenshot wird nie hochgeladen. Sehen Sie genau, was in Ihrem Browser läuft, welche offengelegte CDN-Anfrage für die optionale OCR nötig ist und wie Sie die Aussagen selbst überprüfen.',
    keywords: [
      'datenschutz bildschwärzung',
      'bildschwärzung im browser',
      'bildeditor ohne upload',
      'überprüfen kein upload',
    ],
  },
  hero: {
    eyebrow: 'Datenschutz',
    title: 'Das Bild verlässt diesen Tab nie.',
    lead: 'Nicht nach der Verarbeitung. Nicht zur Moderation. Nicht als anonymes Analyseereignis. Ihr Browser liest die Datei, schwärzt sie und schreibt eine neue.',
    primaryCta: 'Editor öffnen',
    secondaryCta: 'Selbst überprüfen',
  },
  policyNotice:
    'Diese Seite erklärt, wie der Editor mit Ihrem Bild umgeht. Die formelle Richtlinie — Cookies, Hosting-Protokolle und Ihre Rechte — finden Sie in der Datenschutzerklärung.',
  badges: ['Keine Bild-Uploads', 'Kein Konto', 'Keine Analysedienste', 'Keine Tracking-Cookies'],
  flow: {
    eyebrow: 'Datenfluss',
    title: 'Die gesamte Reise findet innerhalb der Seite statt.',
    copy: 'Es gibt keine Verarbeitungswarteschlange, keinen temporären Speicher und kein „Wir löschen es nach 24 Stunden“-Versprechen, dem man vertrauen müsste. Die Datei wird von Ihrem Browser dekodiert.',
    localTitle: 'In diesem Browser-Tab',
    localBadge: 'Nur lokal',
    steps: [
      {
        icon: 'file',
        title: 'Sie wählen eine Datei',
        copy: 'Eine Dateiauswahl, ein Einfügen oder ein Ablegen. Der Browser erstellt eine lokale Objekt-URL — keine Anfrage verlässt die Seite.',
      },
      {
        icon: 'monitor',
        title: 'Der Browser dekodiert sie',
        copy: 'Das Bild wird auf einen Canvas im Arbeitsspeicher gezeichnet. Es ist dieselbe Canvas-API, die jeder Bildeditor verwendet.',
      },
      {
        icon: 'square',
        title: 'Sie zeichnen die Rahmen',
        copy: 'Die Schwärzungen werden über die lokalen Pixel gezeichnet. Der Verlauf zum Rückgängigmachen liegt im JavaScript-Speicher, nicht in einer Datenbank.',
      },
      {
        icon: 'download',
        title: 'Canvas exportiert ein neues Bild',
        copy: 'Der Download ist eine frisch aus dem Canvas kodierte Datei. Sie enthält keine EXIF-, GPS- oder Gerätemetadaten.',
      },
    ],
    noServerTitle: 'Kein Server dazwischen.',
    noServerCopy: 'Es gibt keinen Endpunkt, der ein Bild empfängt, also gibt es nichts, was aufbewahrt, protokolliert, moderiert oder verkauft werden könnte. Beim Schließen des Tabs wird die Arbeitskopie aus dem Speicher gelöscht.',
    requestLabel: 'Beispielhafte Anfrage',
    requestText: 'POST /upload',
    requestResult: '→ 404 Not Found',
    requestNote: 'Auf imageredaction.com gibt es keinen solchen Endpunkt.',
  },
  network: {
    eyebrow: 'Netzwerkanfragen',
    title: 'Die ehrliche Liste.',
    copy: 'Die intelligente Erkennung ist optional und die einzige Funktion, die nach dem Laden der Seite Code abrufen muss. Hier ist jede Anfrage, die der Editor stellen kann.',
    columns: { request: 'Anfrage', when: 'Wann', contains: 'Was sie enthält' },
    rows: [
      {
        request: 'Diese Seite und ihre Schrift',
        when: 'Beim Öffnen der Website',
        contains: 'HTML, CSS, JavaScript und die selbst gehostete Schrift Inter. Kein Bild.',
      },
      {
        request: 'Tesseract.js',
        when: 'Beim ersten Ausführen der intelligenten Erkennung',
        contains: 'Die OCR-Bibliothek von jsDelivr. Kein Bild.',
      },
      {
        request: 'OCR-Kern und englisches Modell',
        when: 'Bei der ersten intelligenten Erkennung in einem Browser',
        contains: 'Von Tesseract.js angeforderte WebAssembly- und Sprachdaten. Kein Bild.',
      },
      {
        request: 'Ihr Screenshot',
        when: 'Nie',
        contains: 'Nichts. Es gibt keinen Upload-Endpunkt, der ihn empfangen könnte.',
        never: true,
      },
    ],
    whenLabel: 'Wann:',
    noteTitle: 'Was „auf dem Gerät“ hier bedeutet',
    noteCopy:
      'Die OCR-Engine ist heruntergeladener Code, und die Erkennung läuft in Ihrem Browser. Ihr Bild wird nicht mit der Anfrage gesendet. Der statische Host und das CDN können für die tatsächlich stattfindenden Anfragen gewöhnliche Zugriffsprotokolle führen, wie jede Website und jedes CDN. Diese Protokolle enthalten die Anfrage-URL, nicht Ihren Screenshot.',
  },
  verify: {
    eyebrow: 'Selbst überprüfen',
    title: 'Verlassen Sie sich nicht auf die Aussagen dieser Seite.',
    copy: 'Die Behauptung lässt sich in etwa zwei Minuten testen. Wenn Sie eine Anfrage finden, die Ihr Bild enthält, ist das ein Fehler, der gemeldet werden sollte.',
    cta: 'Problem melden',
    steps: [
      'Öffnen Sie die Entwicklertools Ihres Browsers und wechseln Sie zum Netzwerk-Tab. Leeren Sie die Liste.',
      'Laden Sie ein Bild und zeichnen Sie ein paar Rahmen. Beobachten Sie die Anfrageliste: Es erscheint keine Bildanfrage.',
      'Starten Sie die intelligente Erkennung. Sie sehen Anfragen für die OCR-Bibliothek und das Modell. Der Screenshot ist nicht dabei.',
      'Trennen Sie die Internetverbindung. Manuelles Schwärzen, Kopieren und Herunterladen funktionieren weiterhin, weil die Pixel bereits lokal sind.',
      'Öffnen Sie die Eigenschaften der heruntergeladenen Datei. Sie finden kein Kamera-, GPS- oder Gerätemetadatenfeld.',
    ],
  },
  cards: [
    {
      icon: 'monitor',
      title: 'Ihr Gerät, Ihre Verantwortung',
      copy: 'Browser-Erweiterungen, Zwischenablage-Manager und Tools zur Bildschirmaufzeichnung können lesen, was in einem Tab passiert. Wenn Ihr Bedrohungsmodell einen kompromittierten Browser umfasst, verwenden Sie ein sauberes Profil oder ein separates Gerät.',
    },
    {
      icon: 'shield',
      title: 'Kein Konto, kein Profil',
      copy: 'Es gibt keine Anmeldung, keine E-Mail-Erfassung und keinen benutzerspezifischen Speicher. Der Editor hat keine Ahnung, wer Sie sind. Deshalb gibt es auch keinen Nutzungsverlauf zum Exportieren.',
    },
    {
      icon: 'code',
      title: 'Offen für die Prüfung',
      copy: 'Der Editor besteht aus einfachem JavaScript und Canvas. Es gibt keine versteckte native Ebene. Nutzen Sie den Netzwerk-Tab, lesen Sie die Anfrageliste und testen Sie das Offline-Verhalten.',
    },
  ],
  faq: {
    eyebrow: 'Datenschutzfragen',
    title: 'Die Kurzfassung, noch einmal.',
    copy: 'Dieselben Antworten wie in den FAQ, mit Fokus darauf, wohin das Bild geht und was die Seite verlässt.',
  },
  cta: {
    eyebrow: 'Überzeugen Sie sich selbst',
    title: 'Bringen Sie ein Bild mit. Beobachten Sie den Netzwerk-Tab.',
    copy: 'Der Editor ist der Beweis. Laden Sie einen Screenshot, schwärzen Sie ihn, exportieren Sie ihn und prüfen Sie die Datei. Nichts muss den Tab verlassen.',
    primary: 'Editor öffnen',
    secondary: 'Leitfäden lesen',
    secondaryHref: '/guides',
  },
};
