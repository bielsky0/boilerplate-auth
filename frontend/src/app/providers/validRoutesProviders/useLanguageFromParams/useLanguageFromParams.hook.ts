import { useEffect } from "react";
import { useLocale } from "../../../../shared/hooks/useLocale";
import { useLocales } from "../../../../shared/hooks/useLocales";

export const useLanguageFromParams = () => {
  const { setLanguage } = useLocales();
  const lang = useLocale();

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);
};
