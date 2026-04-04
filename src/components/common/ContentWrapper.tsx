import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PATH_NAMES } from "@/routes/types/routes";
import {
  APP_BAR_TO_FAVORITES_CONTENT_PX,
  APP_BAR_TO_SEARCH_DEFAULT_PX,
  APP_BAR_TO_SEARCH_WITH_RESULTS_PX,
} from "./constant/contentLayout";
import { SearchPageTopSpacingContext } from "./searchPageTopSpacingContext";

interface ContentWrapperProps {
  children: ReactNode;
}

function ContentWrapper({ children }: ContentWrapperProps) {
  const { pathname } = useLocation();
  const [compactSearchTop, setCompactSearchTop] = useState(false);

  useEffect(() => {
    if (pathname !== PATH_NAMES.home) {
      setCompactSearchTop(false);
    }
  }, [pathname]);

  const spacingValue = useMemo(
    () => ({ setCompactSearchTop }),
    [],
  );

  const paddingTopPx =
    pathname === PATH_NAMES.myFavorites
      ? APP_BAR_TO_FAVORITES_CONTENT_PX
      : compactSearchTop
        ? APP_BAR_TO_SEARCH_WITH_RESULTS_PX
        : APP_BAR_TO_SEARCH_DEFAULT_PX;

  return (
    <SearchPageTopSpacingContext.Provider value={spacingValue}>
      <div
        className={cn(
          "w-full px-[max(160px,calc((100%-960px)/2))] pb-16 transition-[padding-top] duration-300 ease-in-out",
        )}
        style={{ paddingTop: paddingTopPx }}
      >
        <main className="mx-auto w-full max-w-[960px]">{children}</main>
      </div>
    </SearchPageTopSpacingContext.Provider>
  );
}

export default ContentWrapper;