// Erwartungswert und Standardabweichung der Binomialverteilung. Alle Werte mit Python nachgerechnet.
// stufe: 1 = μ und σ, 2 = n und p bestimmen, 3 = Probieren mit kumulierten Wahrscheinlichkeiten.
// diagramm: {n, p, regler?: "n"|"p", min, max, schritt} → Histogramm mit μ-Linie.
// zeige: {von?, bis?, sigma?, n?, p?} → markiert Balken und/oder das σ-Intervall (sigma: 1 oder 2).
// tabelle: {titel, kopf, zeilen, hinweis} → feste Tabelle statt Diagramm; Rechner ist dann gesperrt.
// probier: {var: "n"|"p", titel, spalten: [{label, f(v, B)}]} → Probierzeile, die eine Tabelle füllt.
// erg: Ergebnisprüfung; tol: erlaubte Abweichung (Standard 0,0006); ganzzahl: exakte ganze Zahl.
const t = String.raw;
const ALLE = Infinity;

export const AUFGABEN = [
  // ───────────── Stufe 1: μ und σ ─────────────
  {
    nr: 1,
    stufe: 1,
    titel: "Sonnenblumen keimen",
    bild: "01-sonnenblumen",
    text: t`Auf der Samentüte steht: „Keimrate 85 %“. Mia sät 40 Sonnenblumenkerne. \(X\) ist die Anzahl der Kerne, die keimen.`,
    diagramm: { n: 40, p: 0.85 },
    teile: [
      {
        frage: t`Wie viele keimende Kerne kann Mia erwarten? Berechne \(\mu\).`,
        erg: 34, tol: 0.001,
        loesung: [t`\mu = n\cdot p = 40\cdot 0{,}85 = 34`, t`p:Mia kann mit etwa 34 keimenden Kernen rechnen.`],
      },
      {
        frage: t`Berechne die Standardabweichung \(\sigma\) (zwei Nachkommastellen).`,
        erg: 2.2583, tol: 0.01,
        zeige: { sigma: 1 },
        loesung: [t`\sigma = \sqrt{n\cdot p\cdot(1-p)} = \sqrt{40\cdot 0{,}85\cdot 0{,}15} = \sqrt{5{,}1} \approx 2{,}26`],
      },
      {
        frage: t`Gib das \(1\sigma\)-Intervall \([\mu-\sigma;\ \mu+\sigma]\) an. Welche Anzahlen \(k\) liegen darin? Berechne \(P(\mu-\sigma\le X\le\mu+\sigma)\).`,
        erg: 0.7344,
        zeige: { von: 32, bis: 36, sigma: 1 },
        tipp: t`Nur ganze Zahlen zählen. Von \(31{,}74\) aufrunden, von \(36{,}26\) abrunden.`,
        loesung: [
          t`[\mu-\sigma;\ \mu+\sigma] = [31{,}74;\ 36{,}26]`,
          t`p:Darin liegen die Anzahlen 32, 33, 34, 35 und 36.`,
          t`P(32\le X\le 36) = F_{40;0{,}85}(36) - F_{40;0{,}85}(31) \approx 0{,}7344`,
          t`p:Das passt zur Faustregel: Im \(1\sigma\)-Intervall liegen ungefähr 68 %.`,
        ],
      },
      {
        frage: t`Wie viele Anzahlen liegen im \(2\sigma\)-Intervall? Berechne \(P(\mu-2\sigma\le X\le\mu+2\sigma)\).`,
        erg: 0.958,
        zeige: { von: 30, bis: 38, sigma: 2 },
        loesung: [
          t`[\mu-2\sigma;\ \mu+2\sigma] = [29{,}48;\ 38{,}52] \;\Rightarrow\; k = 30,\dots,38`,
          t`P(30\le X\le 38) = F_{40;0{,}85}(38) - F_{40;0{,}85}(29) \approx 0{,}9580`,
          t`p:Die Faustregel sagt etwa 95 %.`,
        ],
      },
    ],
  },
  {
    nr: 2,
    stufe: 1,
    titel: "Freiwürfe im Training",
    bild: "02-freiwurf",
    text: t`Lena trifft einen Freiwurf mit der Wahrscheinlichkeit 75 %. Im Training wirft sie 20 Freiwürfe. \(X\) zählt die Treffer.`,
    diagramm: { n: 20, p: 0.75 },
    teile: [
      {
        frage: t`Mit wie vielen Treffern kann Lena rechnen?`,
        erg: 15, tol: 0.001,
        loesung: [t`\mu = 20\cdot 0{,}75 = 15`],
      },
      {
        frage: t`Berechne \(P(X=15)\). Begründe am Histogramm, warum die Säule bei \(k = 15\) die höchste ist.`,
        erg: 0.2023,
        zeige: { von: 15, bis: 15 },
        loesung: [
          t`P(X=15) = \binom{20}{15}\cdot 0{,}75^{15}\cdot 0{,}25^{5} \approx 0{,}2023`,
          t`p:Der Erwartungswert \(\mu = 15\) ist ganzzahlig. Dann ist \(\mu\) die wahrscheinlichste Trefferzahl, die Säule bei 15 ist die höchste.`,
          t`p:Trotzdem trifft Lena nur in etwa jedem fünften Training genau 15-mal.`,
        ],
      },
      {
        frage: t`Berechne \(\sigma\) (zwei Nachkommastellen).`,
        erg: 1.9365, tol: 0.01,
        zeige: { sigma: 1 },
        loesung: [t`\sigma = \sqrt{20\cdot 0{,}75\cdot 0{,}25} = \sqrt{3{,}75} \approx 1{,}94`],
      },
      {
        frage: t`Lenas Trainer sagt: „Du triffst meistens zwischen 14 und 16 Mal.“ Passt das zu \(\sigma\)?`,
        zeige: { von: 14, bis: 16, sigma: 1 },
        loesung: [
          t`[\mu-\sigma;\ \mu+\sigma] = [13{,}06;\ 16{,}94] \;\Rightarrow\; k = 14,\ 15,\ 16`,
          t`P(14\le X\le 16) \approx 0{,}1686 + 0{,}2023 + 0{,}1897 = 0{,}5606`,
          t`p:Nur gut die Hälfte der Trainings liegt in diesem Bereich. „Meistens“ stimmt knapp. Bei kleinem \(n\) enthält das \(1\sigma\)-Intervall nur wenige ganze Zahlen, darum ist der Anteil hier kleiner als 68 %.`,
        ],
      },
    ],
  },
  {
    nr: 3,
    stufe: 1,
    titel: "Raten im Multiple-Choice-Test",
    bild: "03-multiplechoice",
    text: t`Ein Test hat 30 Fragen mit je vier Antworten. Genau eine ist richtig. Tim hat nicht gelernt und kreuzt rein zufällig an. \(X\) ist die Anzahl richtiger Antworten.`,
    diagramm: { n: 30, p: 0.25 },
    teile: [
      {
        frage: t`Berechne \(\mu\) und deute den Wert.`,
        erg: 7.5, tol: 0.001,
        loesung: [
          t`\mu = 30\cdot 0{,}25 = 7{,}5`,
          t`p:Im Mittel hat ein Rater 7 bis 8 richtige Antworten. Genau 7,5 kann nicht vorkommen. Die wahrscheinlichsten Anzahlen sind 7 und 8.`,
        ],
      },
      {
        frage: t`Berechne \(\sigma\) (zwei Nachkommastellen).`,
        erg: 2.3717, tol: 0.01,
        zeige: { sigma: 1 },
        loesung: [t`\sigma = \sqrt{30\cdot 0{,}25\cdot 0{,}75} = \sqrt{5{,}625} \approx 2{,}37`],
      },
      {
        frage: t`Berechne die Wahrscheinlichkeit, dass Tims Anzahl im \(2\sigma\)-Intervall liegt.`,
        erg: 0.9678,
        zeige: { von: 3, bis: 12, sigma: 2 },
        loesung: [
          t`[\mu-2\sigma;\ \mu+2\sigma] = [2{,}76;\ 12{,}24] \;\Rightarrow\; k = 3,\dots,12`,
          t`P(3\le X\le 12) = F_{30;0{,}25}(12) - F_{30;0{,}25}(2) \approx 0{,}9678`,
        ],
      },
      {
        frage: t`Ab 15 richtigen Antworten gibt es die Note „ausreichend“. Wie wahrscheinlich schafft Tim das durch Raten?`,
        erg: 0.0027,
        zeige: { von: 15, bis: ALLE, sigma: 2 },
        loesung: [
          t`P(X\ge 15) = 1 - F_{30;0{,}25}(14) \approx 0{,}0027`,
          t`p:15 liegt weit rechts vom \(2\sigma\)-Intervall. Durch Raten schafft man das fast nie.`,
        ],
      },
    ],
  },
  {
    nr: 4,
    stufe: 1,
    titel: "Blutgruppe 0",
    bild: "04-blutspende",
    text: t`In Deutschland haben 41 % der Menschen die Blutgruppe 0. Zu einem Blutspendetermin kommen 50 Personen. \(X\) zählt die Spender mit Blutgruppe 0.`,
    diagramm: { n: 50, p: 0.41 },
    teile: [
      {
        frage: t`Berechne \(\mu\).`,
        erg: 20.5, tol: 0.001,
        loesung: [t`\mu = 50\cdot 0{,}41 = 20{,}5`],
      },
      {
        frage: t`Berechne \(\sigma\) (zwei Nachkommastellen).`,
        erg: 3.4778, tol: 0.01,
        zeige: { sigma: 1 },
        loesung: [t`\sigma = \sqrt{50\cdot 0{,}41\cdot 0{,}59} = \sqrt{12{,}095} \approx 3{,}48`],
      },
      {
        frage: t`An einem Termin haben 30 Spender die Blutgruppe 0. Der Arzt sagt: „Das ist ungewöhnlich viel.“ Hat er recht? Nutze das \(2\sigma\)-Intervall.`,
        zeige: { von: 30, bis: ALLE, sigma: 2 },
        loesung: [
          t`\mu + 2\sigma = 20{,}5 + 2\cdot 3{,}48 \approx 27{,}46`,
          t`p:30 liegt deutlich über \(\mu + 2\sigma\). Werte außerhalb des \(2\sigma\)-Intervalls kommen nur in etwa 5 % der Fälle vor. Der Arzt hat recht.`,
        ],
      },
      {
        frage: t`Berechne \(P(X\ge 30)\).`,
        erg: 0.0052,
        zeige: { von: 30, bis: ALLE, sigma: 2 },
        loesung: [t`P(X\ge 30) = 1 - F_{50;0{,}41}(29) \approx 0{,}0052`],
      },
    ],
  },
  {
    nr: 5,
    stufe: 1,
    titel: "Sechsen würfeln",
    bild: "05-wuerfel",
    text: t`Beim Spieleabend wird oft gewürfelt. \(X\) zählt die Sechsen bei \(n\) Würfen. Verschiebe den Regler und beobachte \(\mu\) und \(\sigma\) unter dem Diagramm.`,
    diagramm: { n: 60, p: 1 / 6, regler: "n", min: 6, max: 300, schritt: 6 },
    teile: [
      {
        frage: t`Berechne \(\sigma\) für \(n = 60\) Würfe (zwei Nachkommastellen).`,
        erg: 2.8868, tol: 0.01,
        zeige: { n: 60, sigma: 1 },
        loesung: [t`\mu = 60\cdot\tfrac16 = 10,\qquad \sigma = \sqrt{60\cdot\tfrac16\cdot\tfrac56} = \sqrt{8{,}\overline{3}} \approx 2{,}89`],
      },
      {
        frage: t`Berechne \(\sigma\) für \(n = 240\) Würfe.`,
        erg: 5.7735, tol: 0.01,
        zeige: { n: 240, sigma: 1 },
        loesung: [t`\mu = 40,\qquad \sigma = \sqrt{240\cdot\tfrac16\cdot\tfrac56} = \sqrt{33{,}\overline{3}} \approx 5{,}77`],
      },
      {
        frage: t`Die Wurfzahl wurde vervierfacht. Um welchen Faktor wächst \(\sigma\)?`,
        erg: 2, tol: 0.01,
        loesung: [
          t`\frac{\sigma_{240}}{\sigma_{60}} = \sqrt{\frac{240}{60}} = \sqrt4 = 2`,
          t`p:\(\mu\) wächst mit \(n\), \(\sigma\) nur mit \(\sqrt n\). Das Histogramm wird breiter, aber im Verhältnis zu \(\mu\) schmaler.`,
        ],
      },
    ],
  },

  // ───────────── Stufe 2: n und p bestimmen ─────────────
  {
    nr: 6,
    stufe: 2,
    titel: "Krumme Schrauben",
    bild: "06-schrauben",
    text: t`Eine Maschine stellt Schrauben her. Ein Teil ist krumm. In einer Kontrolle prüft man immer gleich viele Schrauben. Die Anzahl \(X\) der krummen Schrauben hat den Erwartungswert \(\mu = 12\) und die Standardabweichung \(\sigma = 3\).`,
    diagramm: { n: 48, p: 0.25 },
    teile: [
      {
        frage: t`Bestimme den Anteil \(p\) der krummen Schrauben.`,
        erg: 0.25,
        tipp: t`Teile \(\sigma^2 = n\cdot p\cdot(1-p)\) durch \(\mu = n\cdot p\).`,
        loesung: [
          t`\frac{\sigma^2}{\mu} = \frac{n\cdot p\cdot(1-p)}{n\cdot p} = 1-p`,
          t`1-p = \frac{9}{12} = 0{,}75 \;\Rightarrow\; p = 0{,}25`,
        ],
      },
      {
        frage: t`Wie viele Schrauben werden pro Kontrolle geprüft?`,
        erg: 48, ganzzahl: true,
        loesung: [t`n = \frac{\mu}{p} = \frac{12}{0{,}25} = 48`],
      },
      {
        frage: t`Mit welcher Wahrscheinlichkeit sind genau 12 Schrauben krumm?`,
        erg: 0.132,
        zeige: { von: 12, bis: 12, sigma: 1 },
        loesung: [t`P(X=12) = \binom{48}{12}\cdot 0{,}25^{12}\cdot 0{,}75^{36} \approx 0{,}1320`],
      },
    ],
  },
  {
    nr: 7,
    stufe: 2,
    titel: "Umfrage in der Fußgängerzone",
    bild: "07-umfrage",
    text: t`Ein Team fragt Passanten, ob sie für eine autofreie Innenstadt sind. Bei jeder Befragungsrunde erwartet es 36 Zustimmungen, die Standardabweichung beträgt 4,8.`,
    diagramm: { n: 100, p: 0.36 },
    teile: [
      {
        frage: t`Welcher Anteil \(p\) der Passanten stimmt zu?`,
        erg: 0.36,
        loesung: [
          t`1-p = \frac{\sigma^2}{\mu} = \frac{4{,}8^2}{36} = \frac{23{,}04}{36} = 0{,}64`,
          t`p = 0{,}36`,
        ],
      },
      {
        frage: t`Wie viele Personen werden pro Runde befragt?`,
        erg: 100, ganzzahl: true,
        loesung: [t`n = \frac{36}{0{,}36} = 100`],
      },
      {
        frage: t`Berechne die Wahrscheinlichkeit, dass die Zahl der Zustimmungen im \(1\sigma\)-Intervall liegt.`,
        erg: 0.6515,
        zeige: { von: 32, bis: 40, sigma: 1 },
        loesung: [
          t`[36-4{,}8;\ 36+4{,}8] = [31{,}2;\ 40{,}8] \;\Rightarrow\; k = 32,\dots,40`,
          t`P(32\le X\le 40) = F_{100;0{,}36}(40) - F_{100;0{,}36}(31) \approx 0{,}6515`,
        ],
      },
    ],
  },
  {
    nr: 8,
    stufe: 2,
    titel: "Die Torwand",
    bild: "08-torwand",
    text: t`Am Schulfest schießt jedes Kind 25-mal auf die Torwand. \(X\) zählt die Treffer. Das Histogramm zeigt die Verteilung, aber \(p\) ist verdeckt. Die höchste Säule liegt bei \(k = 10\), \(\mu\) ist ganzzahlig. Stell \(p\) mit dem Regler ein.`,
    diagramm: { n: 25, p: 0.2, regler: "p", min: 0.04, max: 0.96, schritt: 0.04 },
    teile: [
      {
        frage: t`Bestimme die Trefferwahrscheinlichkeit \(p\).`,
        erg: 0.4,
        tipp: t`Wenn \(\mu\) ganzzahlig ist, liegt dort die höchste Säule.`,
        loesung: [t`\mu = 10 = 25\cdot p \;\Rightarrow\; p = \frac{10}{25} = 0{,}4`],
      },
      {
        frage: t`Berechne \(\sigma\) (zwei Nachkommastellen).`,
        erg: 2.4495, tol: 0.01,
        zeige: { p: 0.4, sigma: 1 },
        loesung: [t`\sigma = \sqrt{25\cdot 0{,}4\cdot 0{,}6} = \sqrt6 \approx 2{,}45`],
      },
      {
        frage: t`Ein Kind trifft höchstens 8-mal und ist enttäuscht. Wie wahrscheinlich ist das?`,
        erg: 0.2735,
        zeige: { p: 0.4, von: 0, bis: 8 },
        loesung: [t`P(X\le 8) = F_{25;0{,}4}(8) \approx 0{,}2735`, t`p:Das passiert jedem vierten Kind. Es ist also kein Grund zur Enttäuschung.`],
      },
    ],
  },
  {
    nr: 9,
    stufe: 2,
    titel: "Der Regionalzug",
    bild: "09-regionalzug",
    text: t`Ein Regionalzug ist an 90 % der Tage pünktlich. Ein Pendler zählt über mehrere Tage die pünktlichen Fahrten \(X\). Er erwartet 54 pünktliche Fahrten.`,
    diagramm: { n: 60, p: 0.9 },
    teile: [
      {
        frage: t`Über wie viele Tage zählt der Pendler?`,
        erg: 60, ganzzahl: true,
        loesung: [t`n = \frac{\mu}{p} = \frac{54}{0{,}9} = 60`],
      },
      {
        frage: t`Berechne \(\sigma\) (zwei Nachkommastellen).`,
        erg: 2.3238, tol: 0.01,
        zeige: { sigma: 1 },
        loesung: [t`\sigma = \sqrt{60\cdot 0{,}9\cdot 0{,}1} = \sqrt{5{,}4} \approx 2{,}32`],
      },
      {
        frage: t`Über wie viele Tage müsste er zählen, damit \(\sigma = 3\) ist?`,
        erg: 100, ganzzahl: true,
        loesung: [t`\sigma^2 = n\cdot 0{,}9\cdot 0{,}1 = 9 \;\Rightarrow\; n = \frac{9}{0{,}09} = 100`],
      },
      {
        frage: t`In 60 Tagen waren nur 50 Fahrten pünktlich. Wie wahrscheinlich sind höchstens 50 pünktliche Fahrten?`,
        erg: 0.0731,
        zeige: { von: 0, bis: 50, sigma: 2 },
        loesung: [
          t`P(X\le 50) = F_{60;0{,}9}(50) \approx 0{,}0731`,
          t`p:Das \(2\sigma\)-Intervall ist \([54 - 2\cdot 2{,}32;\ 54 + 2\cdot 2{,}32] = [49{,}35;\ 58{,}65]\). 50 liegt knapp darin. Das ist selten, aber noch nicht auffällig.`,
        ],
      },
    ],
  },
  {
    nr: 10,
    stufe: 2,
    titel: "Die Losbude",
    bild: "10-losbude",
    text: t`An der Losbude gewinnt jedes fünfte Los. \(X\) zählt die Gewinne beim Kauf von \(n\) Losen. Mit dem Regler stellst du \(n\) ein.`,
    diagramm: { n: 25, p: 0.2, regler: "n", min: 5, max: 200, schritt: 5 },
    teile: [
      {
        frage: t`Wie viele Lose muss man kaufen, damit \(\sigma = 2\) ist?`,
        erg: 25, ganzzahl: true,
        loesung: [t`n\cdot 0{,}2\cdot 0{,}8 = 0{,}16\,n = 4 \;\Rightarrow\; n = 25`],
      },
      {
        frage: t`Wie viele Lose muss man kaufen, damit \(\sigma = 4\) ist?`,
        erg: 100, ganzzahl: true,
        zeige: { n: 100, sigma: 1 },
        loesung: [t`0{,}16\,n = 16 \;\Rightarrow\; n = 100`, t`p:Doppelte Standardabweichung heißt vierfache Anzahl Lose.`],
      },
      {
        frage: t`Wie viele Gewinne erwartet man bei diesen 100 Losen?`,
        erg: 20, tol: 0.001,
        loesung: [t`\mu = 100\cdot 0{,}2 = 20`],
      },
    ],
  },

  // ───────────── Stufe 3: Probieren und Tabellen ─────────────
  {
    nr: 11,
    stufe: 3,
    titel: "Äpfel mit Druckstellen",
    bild: "11-aepfel",
    text: t`Bei der Ernte hat ein bestimmter Anteil der Äpfel Druckstellen. Eine Kiste enthält 25 Äpfel. \(X\) zählt die Äpfel mit Druckstellen und ist binomialverteilt. Der Erwartungswert ist ganzzahlig. Die Tabelle zeigt einen Teil der Verteilung.`,
    ohneRechner: true,
    tabelle: {
      titel: t`Teil der Verteilung, \(n = 25\)`,
      kopf: ["k", "P(X = k)"],
      zeilen: [["0", "0,0409"], ["1", "0,1395"], ["2", "0,2283"], ["3", "0,2387"], ["4", "0,1790"], ["5", "0,1025"], ["6", "0,0466"]],
      senkrecht: true,
      hinweis: "So kann eine Tabelle in der Klausur aussehen. Der Rechner ist hier gesperrt.",
    },
    teile: [
      {
        frage: t`Lies den Erwartungswert ab und bestimme \(p\).`,
        erg: 0.12,
        tipp: t`Bei ganzzahligem \(\mu\) ist \(P(X=\mu)\) der größte Wert in der Tabelle.`,
        loesung: [
          t`p:Der größte Wert steht bei \(k = 3\). Weil \(\mu\) ganzzahlig ist, gilt \(\mu = 3\).`,
          t`p = \frac{\mu}{n} = \frac{3}{25} = 0{,}12`,
          t`p:Probe: \(P(X=0) = 0{,}88^{25} \approx 0{,}0409\). Das passt.`,
        ],
      },
      {
        frage: t`Berechne mit der Tabelle \(P(2\le X\le 4)\).`,
        erg: 0.646,
        loesung: [t`P(2\le X\le 4) = 0{,}2283 + 0{,}2387 + 0{,}1790 = 0{,}6460`],
      },
      {
        frage: t`Berechne mit der Tabelle die Wahrscheinlichkeit, dass mindestens 2 Äpfel Druckstellen haben.`,
        erg: 0.8196,
        tipp: t`Die Tabelle endet bei \(k = 6\). Nimm das Gegenereignis.`,
        loesung: [t`P(X\ge 2) = 1 - P(X=0) - P(X=1) = 1 - 0{,}0409 - 0{,}1395 = 0{,}8196`],
      },
    ],
  },
  {
    nr: 12,
    stufe: 3,
    titel: "Beschädigte Pakete",
    bild: "12-paketzentrum",
    text: t`Im Paketzentrum sind 4 % der Pakete beschädigt. Eine Prüferin nimmt Pakete vom Band. Sie will mit hoher Sicherheit beschädigte Pakete finden. Mit der Probierzeile legst du dir selbst eine Tabelle an.`,
    probier: {
      var: "n",
      titel: t`Probieren: \(p = 0{,}04\)`,
      spalten: [
        { label: t`P(X\ge 1)`, f: (n, B) => 1 - B.F(n, 0.04, 0) },
        { label: t`P(X\ge 2)`, f: (n, B) => 1 - B.F(n, 0.04, 1) },
      ],
      start: [50, 100],
    },
    teile: [
      {
        frage: t`Wie viele Pakete muss sie mindestens prüfen, damit mit mindestens 95 % Wahrscheinlichkeit wenigstens ein beschädigtes dabei ist?`,
        erg: 74, ganzzahl: true,
        tipp: t`Probiere \(n\) aus und schau auf die Spalte \(P(X\ge 1)\). Du kannst auch \(1 - 0{,}96^n\ge 0{,}95\) mit dem Logarithmus lösen.`,
        loesung: [
          t`P(X\ge 1) = 1 - 0{,}96^n \ge 0{,}95 \;\Leftrightarrow\; 0{,}96^n\le 0{,}05`,
          t`n \ge \frac{\ln 0{,}05}{\ln 0{,}96} \approx 73{,}4`,
          t`p:Probe: \(n = 73\): \(0{,}9492\) (zu wenig), \(n = 74\): \(0{,}9512\). Sie muss mindestens 74 Pakete prüfen.`,
        ],
      },
      {
        frage: t`Wie viele Pakete muss sie mindestens prüfen, damit mit mindestens 90 % Wahrscheinlichkeit wenigstens zwei beschädigte dabei sind?`,
        erg: 96, ganzzahl: true,
        tipp: t`Hier hilft der Logarithmus nicht mehr. Probiere in der Spalte \(P(X\ge 2)\), erst in großen, dann in kleinen Schritten.`,
        loesung: [
          t`P(X\ge 2) = 1 - F_{n;0{,}04}(1) \ge 0{,}9`,
          t`p:Probieren: \(n = 95\): \(0{,}8974\) (zu wenig), \(n = 96\): \(0{,}9007\).`,
          t`p:Sie muss mindestens 96 Pakete prüfen.`,
        ],
      },
    ],
  },
  {
    nr: 13,
    stufe: 3,
    titel: "Überbuchung am Flughafen",
    bild: "13-flughafen",
    text: t`Ein Flugzeug hat 100 Plätze. Erfahrungsgemäß erscheinen nur 90 % der Fluggäste. Die Airline verkauft deshalb mehr als 100 Tickets. \(X\) ist die Anzahl der erscheinenden Fluggäste bei \(n\) verkauften Tickets.`,
    ohneRechner: true,
    tabelle: {
      titel: t`\(F_{n;\,0{,}9}(100) = P(X\le 100)\)`,
      kopf: ["n", "F(100)"],
      zeilen: [["103", "0,9985"], ["104", "0,9943"], ["105", "0,9833"], ["106", "0,9602"], ["107", "0,9194"], ["108", "0,8571"], ["109", "0,7729"]],
      senkrecht: true,
      hinweis: "Der Rechner ist hier gesperrt. Arbeite nur mit der Tabelle.",
    },
    teile: [
      {
        frage: t`Die Airline verkauft 106 Tickets. Berechne \(\mu\) und \(\sigma\). Gib \(\sigma\) ein (zwei Nachkommastellen).`,
        erg: 3.0887, tol: 0.01,
        loesung: [t`\mu = 106\cdot 0{,}9 = 95{,}4,\qquad \sigma = \sqrt{106\cdot 0{,}9\cdot 0{,}1} = \sqrt{9{,}54} \approx 3{,}09`],
      },
      {
        frage: t`Das Risiko, dass ein erscheinender Fluggast keinen Platz bekommt, soll höchstens 5 % betragen. Wie viele Tickets darf die Airline höchstens verkaufen?`,
        erg: 106, ganzzahl: true,
        tipp: t`Alle bekommen einen Platz, wenn höchstens 100 erscheinen. Gesucht ist das größte \(n\) mit \(F_{n;0{,}9}(100)\ge 0{,}95\).`,
        loesung: [
          t`p:Niemand bleibt ohne Platz, wenn \(X\le 100\). Also muss gelten: \(P(X\le 100)\ge 0{,}95\).`,
          t`p:In der Tabelle: \(n = 106\): \(0{,}9602\ge 0{,}95\), aber \(n = 107\): \(0{,}9194 < 0{,}95\).`,
          t`p:Die Airline darf höchstens 106 Tickets verkaufen.`,
        ],
      },
      {
        frage: t`Mit welcher Wahrscheinlichkeit bleibt bei 106 verkauften Tickets mindestens ein Fluggast ohne Platz?`,
        erg: 0.0398,
        loesung: [t`P(X\ge 101) = 1 - F_{106;0{,}9}(100) = 1 - 0{,}9602 = 0{,}0398`],
      },
    ],
  },
  {
    nr: 14,
    stufe: 3,
    titel: "Akkus für E-Bikes",
    bild: "14-akkus",
    text: t`Ein Händler bestellt Lieferungen von 50 E-Bike-Akkus. Er verlangt: Mit mindestens 90 % Wahrscheinlichkeit sind höchstens 2 Akkus einer Lieferung defekt. Wie groß darf der Anteil \(p\) defekter Akkus höchstens sein? Probiere \(p\) in ganzen Prozent.`,
    probier: {
      var: "p",
      titel: t`Probieren: \(n = 50\)`,
      spalten: [
        { label: t`F_{50;p}(2)`, f: (p, B) => B.F(50, p, 2) },
        { label: t`\mu`, f: (p) => 50 * p, zahl: true },
      ],
      start: [0.05],
    },
    teile: [
      {
        frage: t`Gib den größten Anteil \(p\) in ganzen Prozent an, der die Bedingung erfüllt (nur die Zahl, z. B. 7).`,
        erg: 2, ganzzahl: true,
        tipp: t`Je größer \(p\), desto kleiner wird \(F_{50;p}(2)\). Fang bei 5 % an und geh nach unten.`,
        loesung: [
          t`F_{50;p}(2) = P(X\le 2)\ge 0{,}9`,
          t`p:Probieren: \(p = 3\,\%\): \(0{,}8108\) (zu wenig), \(p = 2\,\%\): \(0{,}9216\).`,
          t`p:Der Anteil defekter Akkus darf höchstens 2 % betragen.`,
        ],
      },
      {
        frage: t`Wie viele defekte Akkus erwartet man bei diesem Anteil in einer Lieferung?`,
        erg: 1, tol: 0.001,
        loesung: [t`\mu = 50\cdot 0{,}02 = 1`],
      },
    ],
  },
  {
    nr: 15,
    stufe: 3,
    titel: "Waffel oder Becher?",
    bild: "15-eisdiele",
    text: t`In einer Eisdiele nehmen 80 % der Kundschaft eine Waffel. An einem Nachmittag kommen 50 Kunden. \(X\) zählt die verkauften Waffeln. Die Tabelle zeigt die kumulierte Verteilung.`,
    ohneRechner: true,
    tabelle: {
      titel: t`\(F_{50;\,0{,}8}(k) = P(X\le k)\)`,
      kopf: ["k", "F(k)"],
      zeilen: [
        ["33", "0,0144"], ["34", "0,0308"], ["35", "0,0607"], ["36", "0,1106"], ["37", "0,1861"],
        ["38", "0,2893"], ["39", "0,4164"], ["40", "0,5563"], ["41", "0,6927"], ["42", "0,8096"],
        ["43", "0,8966"], ["44", "0,9520"], ["45", "0,9815"], ["46", "0,9943"], ["47", "0,9987"],
      ],
      senkrecht: true,
      hinweis: "Der Rechner ist hier gesperrt. Arbeite mit der Tabelle und dem WTR.",
    },
    teile: [
      {
        frage: t`Berechne \(\mu\) und \(\sigma\). Gib \(\sigma\) an (zwei Nachkommastellen).`,
        erg: 2.8284, tol: 0.01,
        loesung: [t`\mu = 50\cdot 0{,}8 = 40,\qquad \sigma = \sqrt{50\cdot 0{,}8\cdot 0{,}2} = \sqrt8 \approx 2{,}83`],
      },
      {
        frage: t`Berechne mit der Tabelle die Wahrscheinlichkeit für das \(1\sigma\)-Intervall.`,
        erg: 0.6235,
        tipp: t`\(P(a\le X\le b) = F(b) - F(a-1)\)`,
        loesung: [
          t`[40-2{,}83;\ 40+2{,}83] = [37{,}17;\ 42{,}83] \;\Rightarrow\; k = 38,\dots,42`,
          t`P(38\le X\le 42) = F(42) - F(37) = 0{,}8096 - 0{,}1861 = 0{,}6235`,
        ],
      },
      {
        frage: t`Berechne mit der Tabelle die Wahrscheinlichkeit für das \(2\sigma\)-Intervall.`,
        erg: 0.9507,
        loesung: [
          t`[34{,}34;\ 45{,}66] \;\Rightarrow\; k = 35,\dots,45`,
          t`P(35\le X\le 45) = F(45) - F(34) = 0{,}9815 - 0{,}0308 = 0{,}9507`,
        ],
      },
      {
        frage: t`Wie viele Waffeln muss die Eisdiele vorbereiten, damit sie mit mindestens 95 % Wahrscheinlichkeit reichen?`,
        erg: 44, ganzzahl: true,
        tipp: t`Die Waffeln reichen, wenn \(X\le k\). Suche das kleinste \(k\) mit \(F(k)\ge 0{,}95\).`,
        loesung: [
          t`p:Gesucht ist das kleinste \(k\) mit \(F_{50;0{,}8}(k)\ge 0{,}95\).`,
          t`p:\(F(43) = 0{,}8966\) ist zu klein, \(F(44) = 0{,}9520\) reicht.`,
          t`p:Die Eisdiele sollte 44 Waffeln vorbereiten.`,
        ],
      },
    ],
  },
];
