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
        <A title="Anleitung & Page" href="/impressum">
          ?
        </A>
        <span class={styles.claim}>Auslosen ohne Anmeldung</span>
      </header>
      <Outlet />
    </div>
  )
}

export default Layout
