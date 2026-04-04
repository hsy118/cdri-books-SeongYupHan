import { Routes, Route, Navigate } from "react-router-dom";
import SearchBooks from "../components/searchBooks";
import MyFavorites from "../components/myfavorites";
import ContentWrapper from "../components/common/ContentWrapper";
import { PATH_NAMES } from "./types/routes";

export default function ContentRouter() {
  return (
    <ContentWrapper>
      <Routes>
        <Route path={PATH_NAMES.home} element={<SearchBooks />} />
        <Route path={PATH_NAMES.myFavorites} element={<MyFavorites />} />
        <Route path="*" element={<Navigate to={PATH_NAMES.home} replace />} />
      </Routes>
    </ContentWrapper>
  );
}
