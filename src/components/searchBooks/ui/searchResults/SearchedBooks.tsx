import type { RefObject } from "react";
import FetchingIndicator from "@/components/shared/ui/FetchingIndicator";
import type { KakaoBookDocument } from "../../types/searchBooks";
import BookCard from "@/components/shared/ui/bookCard";
import EmptyResult from "@/components/shared/ui/EmptyResult";

interface Props {
  books: KakaoBookDocument[];
  sentinelRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetching: boolean;
}

function SearchedBooks({ books, sentinelRef, hasNextPage, isFetching }: Props) {
  if (books.length > 0) {
    return (
      <>
        <ul className="mt-12">
          {books.map((book: KakaoBookDocument) => (
            <BookCard key={book.isbn || book.title} book={book} />
          ))}
        </ul>
        {hasNextPage && <div ref={sentinelRef} />}
        {isFetching && <FetchingIndicator variant="inline" />}
      </>
    );
  }

  if (isFetching) {
    return <FetchingIndicator variant="panel" />;
  }

  return <EmptyResult message="검색된 결과가 없습니다." />;
}

export default SearchedBooks;
