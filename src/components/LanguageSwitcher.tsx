import { useTransContext } from "@mbarzda/solid-i18next"
import { createSignal, For } from "solid-js"
import { supportedLanguages } from "~/lib/i18n"
import classNames from "classnames"
import styles from "./LanguageSwitcher.module.css"

export const LanguageSwitcher = () => {
  const [, { changeLanguage, getI18next }] = useTransContext()
  const [resolvedLanguage, setResolvedLanguage] = createSignal(
    getI18next().resolvedLanguage,
  )

  return (
    <ul>
      <For each={supportedLanguages}>
        {language => (
          <li>
            <button
              class={classNames(
                styles.language,
                "plausible-event-name=changeLanguage",
                `plausible-event-selectedLanguage=${language}`,
                {
                  [styles.activeLanguage]: language === resolvedLanguage(),
                },
              )}
              onclick={() => {
                changeLanguage(language).then(() =>
                  setResolvedLanguage(getI18next().resolvedLanguage),
                )
              }}
            >
              {language}
            </button>
          </li>
        )}
      </For>
    </ul>
  )
}
