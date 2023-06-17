import { useParams } from "react-router-native";
import { DEFAULT_LOCALE, Locale } from "../../../app/config/i18n";

export type LanguagePathParams = {
  lang: Locale;
};

export const useLocale = () => {
  const { lang } = useParams<LanguagePathParams>();
  return lang ?? DEFAULT_LOCALE;
};
