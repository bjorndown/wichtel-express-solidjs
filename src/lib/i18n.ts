import i18next, { i18n } from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"

export const getResolvedLanguage = (i18next: i18n): SupportedLanguages => {
  // TODO make this nice
  const searchElement = i18next.resolvedLanguage ?? ""
  return supportedLanguages.includes(searchElement as SupportedLanguages)
    ? (searchElement as SupportedLanguages)
    : supportedLanguages[0]
}

export const lookupQuerystring = "lang"

export const configureI18next = () =>
  i18next.use(LanguageDetector).init({
    detection: {
      lookupQuerystring,
      order: [
        "querystring",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
      ],
    },
  })

export const supportedLanguages = ["de", "en"] as const
export type SupportedLanguages = (typeof supportedLanguages)[number]

export const translations = {
  de: {
    translation: {
      title: "Wichtel",
      imprintLink: "Impressum",
      claim: "Auslosen ohne Anmeldung",
      drawNamesButton: "Auslosen",
      deleteButton: "Löschen",
      formTopText: "Erfassen Sie alle Personen",
      personInputTitle:
        "Name der Person. Der Name muss mindestens drei Zeichen lang sein. Die meisten Sonderzeichen und Emojis werden nicht unterstützt.",
      personInputAriaLabel: "Name der Person $$index$$",
      personInputLabel: "Person $$index$$",
      addPersonButton: "Person hinzufügen",
      secretLinksTopText:
        "Versenden Sie nun die persönlichen Links per e-Mail, SMS, WhatsApp, Signal etc.",
      copySingleLinkButton: "Link für $$name$$ kopieren",
      copyAllLinksButton: "Alle Namen und Links kopieren",
      redrawNamesButton: "Erneut auslosen",
      revealMiddleText: "du bist der Wichtel von",
      revealButton: "Enthülle den Namen",
      validationErrorNameTooShort:
        "Der Name muss mindestens drei Zeichen lang sein",
      validationErrorNameContainsInvalidChars:
        "Der Name kann keine Sonderzeichen oder Emojis enthalten.",
      validationErrorNamesNotUnique:
        "Namen der Teilnehmer:innen müssen eindeutig sein.",
      validationErrorNotEnoughNames:
        "Es müssen mindestens zwei Teilnehmer:innen eingegeben werden.",
      errorHeadline: "Unerwarteter Fehler",
    },
  },
  fr: {
    translation: {
      title: "SecretSanta",
      imprintLink: "Mentions légales",
      claim: "Tirez au sort des noms simplement",
      drawNamesButton: "Tire au sort",
      deleteButton: "Supprime",
      formTopText: "Erfassen Sie alle Personen",
      personInputTitle:
        "Name der Person. Der Name muss mindestens drei Zeichen lang sein. Die meisten Sonderzeichen und Emojis werden nicht unterstützt.",
      personInputAriaLabel: "Nom de personne $$index$$",
      personInputLabel: "Personne $$index$$",
      addPersonButton: "Ajout une personne",
      secretLinksTopText:
        "Versenden Sie nun die persönlichen Links per e-Mail, SMS, WhatsApp, Signal etc.",
      copySingleLinkButton: "Link für $$name$$ kopieren",
      copyAllLinksButton: "Alle Namen und Links kopieren",
      redrawNamesButton: "Erneut auslosen",
      revealMiddleText: "du bist der Wichtel von",
      revealButton: "Enthülle den Namen",
      errorHeadline: "Unerwarteter Fehler",
    },
  },
  en: {
    translation: {
      title: "SecretSanta",
      imprintLink: "Imprint",
      claim: "Draw names without sign-up",
      drawNamesButton: "Draw",
      deleteButton: "Delete",
      formTopText: "Name all people",
      personInputTitle:
        "The person's name. It must be at least three letters long. Most special characters and emojis are not allowed.",
      personInputAriaLabel: "Name of person $$index$$",
      personInputLabel: "Person $$index$$",
      addPersonButton: "Add person",
      secretLinksTopText:
        "Now you can distribute the links via e-mail, SMS, WhatsApp, Signal etc.",
      copySingleLinkButton: "Copy link for $$name$$",
      copyAllLinksButton: "Copy all names and links",
      redrawNamesButton: "Re-draw",
      revealMiddleText: "you are the Secret Santa of",
      revealButton: "Reveal the name",
      validationErrorNameTooShort: "Name must be at least three letters long.",
      validationErrorNameContainsInvalidChars:
        "Name cannot contain some special chars and no emojis.",
      validationErrorNamesNotUnique: "Names must be unique.",
      validationErrorNotEnoughNames:
        "There must be at least three names to draw.",
      errorHeadline: "Unexpected error",
    },
  },
}
