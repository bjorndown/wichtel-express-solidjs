import { A, Outlet } from "@solidjs/router"
import styles from "./(app).module.css"

const Layout = () => {
  return (
    <div class={styles.container}>
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
        <A href="https://github.com/bjorndown/wichtel-express">Quellcode</A>
      </footer>
    </div>
  )
}

export default Layout
