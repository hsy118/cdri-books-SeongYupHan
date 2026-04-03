import iconBook from "@/assets/images/icon_book.svg";

function NoSearchedBooks() {
  return (
    <div className="flex flex-col items-center h-[120px] justify-between mt-40">
      <img src={iconBook} alt="" width={80} height={80} />
      <p className="text-caption-md text-[#6d7582]">검색된 결과가 없습니다.</p>
    </div>
  );
}

export default NoSearchedBooks;
