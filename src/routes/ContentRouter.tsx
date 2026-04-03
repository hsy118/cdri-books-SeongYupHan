import { Routes, Route, Navigate } from "react-router-dom";
import SearchBooks from "../components/searchBooks";
import MyFavorites from "../components/myfavorites";

export default function ContentRouter() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<SearchBooks />} />
        <Route path="/my-favorite" element={<MyFavorites />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
