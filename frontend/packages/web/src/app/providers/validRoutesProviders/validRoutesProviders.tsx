import { useParams, useNavigate, Outlet } from "react-router-dom";
import { useLanguageFromParams } from "./useLanguageFromParams";
import { useEffect } from "react";
import { useLocales } from "../../../shared/hooks/useLocales";
import { IntlProvider } from "react-intl";
import { translationMessages } from "../../config/i18n";

export const ValidRoutesProviders = () => {
  useLanguageFromParams();

  const params = useParams();
  const navigate = useNavigate();

  const {
    locales: { language },
  } = useLocales();

  useEffect(() => {
    if (language && params.lang === undefined) {
      const url = `/${language}/${params["*"]}`;
      navigate(url, { replace: true });
    }
  }, [language, params, navigate]);

  return !language ? null : (
    <IntlProvider
      key={language}
      locale={language}
      messages={translationMessages[language]}
    >
      <>
        <Outlet />
      </>
    </IntlProvider>
  );
};
