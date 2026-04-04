import { Link, useLocation } from "react-router-dom";
import { PATH_NAMES } from "@/routes/types/routes";
import { MENU_ITEMS } from "./constant/appBar";

function AppBar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 flex h-[80px] w-full items-center px-[160px] py-[24px] bg-white">
      <div className="flex min-w-0 flex-1 items-center gap-[400px]">
        <Link to={PATH_NAMES.home} className="text-title-lg w-fit shrink-0">
          CERTICOS BOOKS
        </Link>
        <nav className="flex gap-[56px]">
          {MENU_ITEMS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-body-lg pb-1 border-b-2 ${
                pathname === to ? "border-primary" : "border-transparent"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default AppBar;
