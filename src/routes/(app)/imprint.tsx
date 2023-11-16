const Imprint = () => {
  return (
    <article>
      <h2>Kontakt</h2>
      <p>
        Bei Fragen, Problemen und Verbesserungsvorschlägen:{" "}
        <a href="mailto:hallo@wichtel.express">hallo@wichtel.express</a>
      </p>

      <h2>Datenschutz</h2>
      <p>
        Wichtel.express speichert keine der eingegebenen Namen oder persönlichen
        Links. Die Auslosung findet nur im Browser auf Ihrem Gerät statt, es ist
        kein entfernter Dienst involviert.
      </p>
      <p>
        Um zu verstehen, ob und wie diese Applikation verwendet wird, setzt
        wichtel.express <a href="https://plausible.io">plausible.io</a> ein. Die
        von plausible gesammelten Daten sind öffentlich zugänglich unter{" "}
        <a href="https://plausible.io/wichtel.express/">
          plausible.io/wichtel.express
        </a>
        .
      </p>
      <p>
        Dabei werden keine Cookies gesetzt oder persönliche Daten gesammelt. Es
        ist mit plausible nicht möglich, sie über Geräte oder Websites hinweg zu
        verfolgen. Mehr dazu, wie plausible funktioniert, unter{" "}
        <a href="https://plausible.io/data-policy">plausible.io/data-policy</a>{" "}
        (nur in Englisch).
      </p>

      <p>
        Zur Fehleranalyse verwendet wichtel.express{" "}
        <a href="https://sentry.io/">sentry.io</a>. Falls Sie die Applikation
        verwenden, können die von Ihnen aufgerufene Adresse, der Name des
        Betriebssystem, der Name des Browsers, sowie die IP-Adresse des Geräts
        aufgezeichnet werden. Diese Daten werden nach 30 Tagen gelöscht.
      </p>

      <h2>Quellcode</h2>
      <p>
        Der Quellcode ist öffentlich einzusehen unter{" "}
        <a href="https://github.com/bjorndown/wichtel-express-solidjs">
          github.com/bjorndown/wichtel-express-solidjs
        </a>
      </p>
    </article>
  )
}

export default Imprint
