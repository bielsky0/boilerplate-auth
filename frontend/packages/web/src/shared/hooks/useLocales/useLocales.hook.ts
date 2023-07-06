import { useCallback, useContext } from "react";
import { Locale } from "../../../app/config/i18n";
import { LocalesContext } from "../../../app/providers/localesProvider/localesProvider.context";

export const useLocales = () => {
  const context = useContext(LocalesContext);

  if (!context) throw new Error("LocalesContext used outside of Provider");

  const { locales, dispatch } = context;

  const setLanguage = useCallback(
    (language: Locale) => {
      dispatch({ type: "SET_LANGUAGE", payload: language });
    },
    [dispatch]
  );

  return { locales, setLanguage };
};
