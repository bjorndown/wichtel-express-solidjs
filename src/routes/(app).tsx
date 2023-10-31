import { A, Outlet } from "@solidjs/router"
import styles from "./(app).module.css"

const Layout = () => {
  return (
    <>
      <header>
        <h1>
          <A href="/">
            Wichtel<span class={styles.flipped}>🚄</span>
          </A>
        </h1>
        <span class={styles.claim}>Auslosen ohne Anmeldung</span>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <A href="/impressum">Impressum</A>
      </footer>
    </>
  )
}

export default Layout
