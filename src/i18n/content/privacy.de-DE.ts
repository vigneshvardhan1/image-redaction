import type { PrivacyContent } from './types';

export const privacyDeDE: PrivacyContent = {
  meta: {
    title: 'Datenschutz — Redact',
    description:
      'Ihre Bild- oder PDF-Datei wird nie hochgeladen. Sehen Sie genau, was in Ihrem Browser läuft, welche OCR- und PDF-Anfragen offengelegt sind und wie Sie die Aussagen selbst überprüfen.',
    keywords: [
      'datenschutz bildschwärzung',
      'datenschutz pdf schwärzen',
      'bildschwärzung im browser',
      'bildeditor ohne upload',
      'überprüfen kein upload',
    ],
  },
  hero: {
    eyebrow: 'Datenschutz',
    title: 'Die Datei verlässt diesen Tab nie.',
    lead: 'Nicht nach der Verarbeitung. Nicht zur Moderation. Nicht als anonymes Analyseereignis. Ihr Browser liest die Datei — Bild oder PDF —, schwärzt sie und schreibt eine neue.',
    primaryCta: 'Editor öffnen',
    secondaryCta: 'Selbst überprüfen',
  },
  policyNotice:
    'Diese Seite erklärt, wie der Editor mit Ihrer Datei umgeht. Die formelle Richtlinie — Cookies, Hosting-Protokolle und Ihre Rechte — finden Sie in der Datenschutzerklärung.',
  badges: [
    'Keine Bild- oder PDF-Uploads',
    'Kein Konto',
    'Ein funktionales Cookie',
    'Werbung nur mit Zustimmung',
  ],
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
        copy: 'Ein Bild wird auf einen Canvas im Arbeitsspeicher gezeichnet; PDF-Seiten werden von der mitgelieferten PDF-Engine einzeln gerendert. Es werden keine Dateidaten irgendwohin gesendet.',
      },
      {
        icon: 'square',
        title: 'Sie zeichnen die Rahmen',
        copy: 'Die Schwärzungen werden über die lokalen Pixel gezeichnet. Der Verlauf zum Rückgängigmachen liegt im JavaScript-Speicher, nicht in einer Datenbank.',
      },
      {
        icon: 'download',
        title: 'Der Editor exportiert eine neue Datei',
        copy: 'Bild-Exporte werden aus dem Canvas neu kodiert; PDF-Exporte werden Seite für Seite als Bilder neu aufgebaut. Keiner von beiden enthält die ursprünglichen EXIF-, GPS- oder Dokumentmetadaten.',
      },
    ],
    noServerTitle: 'Kein Server dazwischen.',
    noServerCopy: 'Es gibt keinen Endpunkt, der eine Datei empfängt, also gibt es nichts, was aufbewahrt, protokolliert, moderiert oder verkauft werden könnte. Beim Schließen des Tabs wird die Arbeitskopie aus dem Speicher gelöscht.',
    requestLabel: 'Beispielhafte Anfrage',
    requestText: 'POST /upload',
    requestResult: '→ 404 Not Found',
    requestNote: 'Auf imageredaction.com gibt es keinen solchen Endpunkt.',
  },
  network: {
    eyebrow: 'Netzwerkanfragen',
    title: 'Die ehrliche Liste.',
    copy: 'Der Editor lädt seinen Grundcode beim Öffnen. Intelligente Erkennung und PDF-Unterstützung rufen zusätzlichen Code nur bei Bedarf ab. Hier ist jede Anfrage, die der Editor stellen kann.',
    columns: { request: 'Anfrage', when: 'Wann', contains: 'Was sie enthält' },
    rows: [
      {
        request: 'Diese Seite und ihre Schrift',
        when: 'Beim Öffnen der Website',
        contains: 'HTML, CSS, JavaScript und die selbst gehostete Schrift Inter. Keine Dateidaten.',
      },
      {
        request: 'Google AdSense (wenn aktiviert)',
        when: 'Nach dem Laden der Seite, wenn Werbung konfiguriert ist',
        contains:
          'Das Anzeigenskript, die Anzeigenflächen und Consent-Signale. Nach Ihrer Zustimmung im Consent-Banner können Cookies gesetzt oder gelesen werden. Keine Dateidaten.',
      },
      {
        request: 'Tesseract.js',
        when: 'Beim ersten Ausführen der intelligenten Erkennung',
        contains: 'Die OCR-Bibliothek von jsDelivr. Keine Dateidaten.',
      },
      {
        request: 'OCR-Kern und englisches Modell',
        when: 'Bei der ersten intelligenten Erkennung in einem Browser',
        contains: 'Von Tesseract.js angeforderte WebAssembly- und Sprachdaten. Keine Dateidaten.',
      },
      {
        request: 'MediaPipe-Gesichtserkennung',
        when: 'Beim ersten Ausführen von „Gesichter erkennen“',
        contains: 'Die Gesichtserkennungsbibliothek und WebAssembly-Laufzeit von jsDelivr. Keine Dateidaten.',
      },
      {
        request: 'BlazeFace-Modell',
        when: 'Bei der ersten Gesichtserkennung in einem Browser',
        contains: 'Ein kleines Gesichtserkennungsmodell von Google Cloud Storage. Keine Dateidaten.',
      },
      {
        request: 'PDF-Engine und Assets',
        when: 'Beim ersten Öffnen einer PDF',
        contains: 'Der selbst gehostete PDF.js-Worker, Schriften und WebAssembly-Module. Keine Dateidaten.',
      },
      {
        request: 'Ihr Bild oder PDF',
        when: 'Nie',
        contains: 'Nichts. Es gibt keinen Upload-Endpunkt, der es empfangen könnte.',
        never: true,
      },
    ],
    whenLabel: 'Wann:',
    noteTitle: 'Was „auf dem Gerät“ hier bedeutet',
    noteCopy:
      'Die OCR-Engine, die Gesichtserkennung und die PDF-Unterstützung sind heruntergeladener Code, und Texterkennung, Gesichtserkennung und Rendering laufen in Ihrem Browser. Ihre Datei wird nicht mit diesen Anfragen gesendet. Der statische Host, das CDN und Google Cloud Storage können für die tatsächlich stattfindenden Anfragen gewöhnliche Zugriffsprotokolle führen, wie jede Website und jedes CDN. Diese Protokolle enthalten die Anfrage-URL, nicht Ihre Datei.',
  },
  verify: {
    eyebrow: 'Selbst überprüfen',
    title: 'Verlassen Sie sich nicht auf die Aussagen dieser Seite.',
    copy: 'Die Behauptung lässt sich in etwa zwei Minuten testen. Wenn Sie eine Anfrage finden, die Ihre Datei enthält, ist das ein Fehler, der gemeldet werden sollte.',
    cta: 'Problem melden',
    steps: [
      'Öffnen Sie die Entwicklertools Ihres Browsers und wechseln Sie zum Netzwerk-Tab. Leeren Sie die Liste.',
      'Laden Sie ein Bild oder eine PDF und zeichnen Sie ein paar Rahmen. Beobachten Sie die Anfrageliste: Es erscheint keine Upload-Anfrage.',
      'Starten Sie die intelligente Erkennung, „Gesichter erkennen“ oder öffnen Sie eine PDF. Sie sehen Anfragen für die OCR-, Gesichts- oder PDF-Engine. Ihre Datei ist nicht dabei.',
      'Prüfen Sie die vollständige Anfrageliste auf einen Upload. Die einzigen Anfragen gelten Code, Schriften, Modellen und — falls Werbung aktiviert ist — Google AdSense. Ihre Datei ist nie dabei.',
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
      copy: 'Der Editor besteht aus einfachem JavaScript und Canvas. Es gibt keine versteckte native Ebene. Nutzen Sie den Netzwerk-Tab, lesen Sie die Anfrageliste und beobachten Sie, was die Seite abruft.',
    },
  ],
  faq: {
    eyebrow: 'Datenschutzfragen',
    title: 'Die Kurzfassung, noch einmal.',
    copy: 'Dieselben Antworten wie in den FAQ, mit Fokus darauf, wohin die Datei geht und was die Seite verlässt.',
  },
  cta: {
    eyebrow: 'Überzeugen Sie sich selbst',
    title: 'Bringen Sie eine Datei mit. Beobachten Sie den Netzwerk-Tab.',
    copy: 'Der Editor ist der Beweis. Laden Sie einen Screenshot oder eine PDF, schwärzen Sie sie, exportieren Sie sie und prüfen Sie die Datei. Nichts muss den Tab verlassen.',
    primary: 'Editor öffnen',
    secondary: 'Leitfäden lesen',
    secondaryHref: '/guides',
  },
};
