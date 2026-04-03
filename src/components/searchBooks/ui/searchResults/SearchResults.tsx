function SearchResults() {
  return (
    <section className="mt-7">
      <header className="flex items-center gap-4 h-6 text-caption-md">
        <h2>도서 검색 결과</h2>
        <p>
          총 <span className="text-primary">12</span>건
        </p>
      </header>
      <ul>{/* 검색 결과 리스트 */}</ul>
    </section>
  );
}

export default SearchResults;
