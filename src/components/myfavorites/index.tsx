import BookCard from "@/components/shared/ui/BookCard";
import EmptyResult from "@/components/shared/ui/EmptyResult";
import useFavorites from "./hooks/useFavorites";

function MyFavorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <h1 className="text-title-lg">내가 찜한 책</h1>
      <section className="mt-7">
        <header className="flex items-center gap-4 h-6 text-caption-md mb-[117px]">
          <h2>찜한 책</h2>
          <p>
            총 <span className="text-primary">{favorites.length}</span>건
          </p>
        </header>
        {favorites.length > 0 ? (
          <ul className="mt-12">
            {favorites.map((book) => (
              <BookCard key={book.isbn || book.title} book={book} />
            ))}
          </ul>
        ) : (
          <EmptyResult message="찜한 책이 없습니다." />
        )}
      </section>
    </>
  );
}

export default MyFavorites;
