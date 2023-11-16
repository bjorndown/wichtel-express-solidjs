import { A, Outlet } from "@solidjs/router"
import styles from "./(app).module.css"
import { Trans } from "@mbarzda/solid-i18next"
import { LanguageSwitcher } from "~/components/LanguageSwitcher"

const Layout = () => {
  return (
    <>
      <header>
        <div class={styles.languageSwitcher}>
          <LanguageSwitcher />
        </div>
        <div class={styles.logo}>
          <h1>
            <A href="/">
              Wichtel<span class={styles.flipped}>🚄</span>
            </A>
          </h1>
          <span class={styles.claim}>
            <Trans key="claim" />
          </span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <A href="/imprint">
          <Trans key="imprintLink" />
        </A>
      </footer>
    </>
  )
}

export default Layout
