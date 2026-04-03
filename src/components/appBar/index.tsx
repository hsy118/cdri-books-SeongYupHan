import { Link, useLocation } from "react-router-dom";
import { MENU_ITEMS } from "@/components/constants/menus";

export default function AppBar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 items-center h-[80px] w-full px-36 bg-white">
      <Link to="/" className="text-title-lg">
        CERTICOS BOOKS
      </Link>
      <nav className="flex justify-center gap-6">
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
      <div />
    </header>
  );
}
