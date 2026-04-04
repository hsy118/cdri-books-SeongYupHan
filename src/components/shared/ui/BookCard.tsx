import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { KakaoBookDocument } from "@/components/shared/types/book";
import RectangleButton from "@/components/common/atoms/rectangleButton/RectangleButton";
import { formatPrice } from "@/components/common/utils/format";
import useFavorites from "@/components/myfavorites/hooks/useFavorites";
import iconHeartLine from "@/assets/icons/icon-heart-line.svg";
import iconHeartFill from "@/assets/icons/icon-heart-fill.svg";

interface Props {
  book: KakaoBookDocument;
}

function BookCard({ book }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  const isLiked = checkIsFavorite(book);
  const hasSalePrice = book.sale_price > 0 && book.sale_price !== book.price;
  const displayPrice = book.sale_price > 0 ? book.sale_price : book.price;

  const handlePurchase = () => {
    window.open(book.url, "_blank", "noopener,noreferrer");
  };

  const handleToggleLike = () => {
    toggleFavorite(book);
  };

  return (
    <li className="border-t border-gray">
      {/* compact row: 접힘 시 1fr, 펼침 시 0fr */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "0fr" : "1fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex items-center justify-between h-[100px] px-4 py-4">
            <div className="flex items-center gap-4 min-w-0">
              {book.thumbnail && (
                <div className="relative w-[48px] h-[68px] shrink-0">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer"
                    style={{ top: 1.77, right: 1.33, width: 13.33, height: 12.23 }}
                    onClick={handleToggleLike}
                  >
                    <img
                      src={isLiked ? iconHeartFill : iconHeartLine}
                      alt="찜하기"
                      className="w-full h-full"
                    />
                  </button>
                </div>
              )}
              <div className="min-w-0 line-clamp-2">
                <span className="text-title-sm text-fg-primary">
                  {book.title}
                </span>
                <span className="text-body-md text-fg-secondary ml-2">
                  {book.authors.join(", ")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-6">
              <span className="text-title-sm text-fg-primary whitespace-nowrap mr-11">
                {formatPrice(displayPrice)}원
              </span>
              <RectangleButton
                variant="default"
                size="medium"
                color="primary"
                fixedWidth={115}
                onClick={handlePurchase}
              >
                구매하기
              </RectangleButton>
              <RectangleButton
                variant="default"
                size="medium"
                color="light-gray"
                fixedWidth={115}
                onClick={() => setIsExpanded(true)}
              >
                상세보기
                <ChevronDown size={24} className="text-gray" />
              </RectangleButton>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 영역: 접힘 시 0fr, 펼침 시 1fr */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex gap-6 px-4 pt-4 pb-6">
            {book.thumbnail && (
              <div className="relative w-[210px] h-[280px] shrink-0">
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute cursor-pointer"
                  style={{ top: 12, right: 10, width: 20, height: 17.16 }}
                  onClick={handleToggleLike}
                >
                  <img
                    src={isLiked ? iconHeartFill : iconHeartLine}
                    alt="찜하기"
                    className="w-full h-full"
                  />
                </button>
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-title-sm text-fg-primary">
                    {book.title}
                  </span>
                  <span className="text-body-md text-fg-secondary">
                    {book.authors.join(", ")}
                  </span>
                </div>
                <RectangleButton
                  variant="default"
                  size="medium"
                  color="light-gray"
                  fixedWidth={115}
                  onClick={() => setIsExpanded(false)}
                >
                  상세보기
                  <ChevronUp size={24} className="text-gray" />
                </RectangleButton>
              </div>
              <div className="flex flex-1 gap-6">
                <div className="w-[360px] shrink-0">
                  <h4 className="text-body-md-bold text-fg-primary mb-2">
                    책 소개
                  </h4>
                  <p className="text-small-md text-fg-secondary leading-4">
                    {book.contents}
                  </p>
                </div>
                <div className="flex flex-1 flex-col items-end justify-end gap-4">
                  <div className="text-right">
                    {hasSalePrice ? (
                      <>
                        <p className="mb-1">
                          <span className="text-small-md text-fg-subtitle mr-2">
                            원가
                          </span>
                          <span
                            className="text-fg-primary line-through"
                            style={{ fontSize: 18, fontWeight: 350 }}
                          >
                            {formatPrice(book.price)}원
                          </span>
                        </p>
                        <p>
                          <span className="text-small-md text-fg-subtitle mr-2">
                            할인가
                          </span>
                          <span className="text-title-sm text-fg-primary">
                            {formatPrice(displayPrice)}원
                          </span>
                        </p>
                      </>
                    ) : (
                      <p>
                        <span className="text-title-sm text-fg-primary">
                          {formatPrice(book.price)}원
                        </span>
                      </p>
                    )}
                  </div>
                  <RectangleButton
                    variant="default"
                    size="large"
                    color="primary"
                    fixedWidth={240}
                    onClick={handlePurchase}
                  >
                    구매하기
                  </RectangleButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default BookCard;
