import { useCallback } from "react";
import { generatePath } from "react-router-dom";

import { useLocale } from "../useLocale";
import { getLocalePath } from "../../../utils";

export const useGenerateLocalePath = () => {
  const lang = useLocale();

  return useCallback(
    (path: string, params: Record<string, string | number> = {}) =>
      generatePath(getLocalePath(path), { ...params, lang }),
    [lang]
  );
};

export type GenerateLocalePath = ReturnType<typeof useGenerateLocalePath>;
