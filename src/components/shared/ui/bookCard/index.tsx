import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { KakaoBookDocument } from "@/components/shared/types/book";
import RectangleButton from "@/components/common/atoms/rectangleButton/RectangleButton";
import { formatPrice } from "@/components/common/utils/format";
import useFavorites from "@/components/myfavorites/hooks/useFavorites";
import BookThumbnail from "./BookThumbnail";
import PriceSummary from "./PriceSummary";

interface Props {
  book: KakaoBookDocument;
}

function BookCard({ book }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  const isLiked = checkIsFavorite(book);
  const authorsText = book.authors.join(", ");
  const hasSalePrice = book.sale_price > 0 && book.sale_price !== book.price;
  const displayPrice = book.sale_price > 0 ? book.sale_price : book.price;
  const formattedDisplayPrice = `${formatPrice(displayPrice)}원`;
  const hasThumbnail = Boolean(book.thumbnail);

  const handlePurchase = () => {
    window.open(book.url, "_blank", "noopener,noreferrer");
  };

  const handleToggleLike = () => {
    toggleFavorite(book);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <li className="border-b border-gray">
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "0fr" : "1fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex h-[100px] items-center justify-between pt-[16px] pr-[16px] pb-[15px] pl-[48px]">
            <div className="flex min-w-0 items-center gap-[48px]">
              {hasThumbnail && (
                <BookThumbnail
                  thumbnail={book.thumbnail}
                  title={book.title}
                  isLiked={isLiked}
                  onToggleLike={handleToggleLike}
                  containerClassName="relative h-[68px] w-[48px] shrink-0"
                  imageClassName="h-full w-full rounded object-cover"
                  favoriteButtonStyle={{
                    top: 1.77,
                    right: 1.33,
                    width: 13.33,
                    height: 12.23,
                  }}
                />
              )}
              <div className="line-clamp-2 min-w-0 w-[408px] shrink-0">
                <span className="text-title-sm text-fg-primary">{book.title}</span>
                <span className="ml-[16px] text-body-md text-fg-secondary">
                  {authorsText}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center">
              <span className="mr-[56px] whitespace-nowrap text-title-sm text-fg-primary">
                {formattedDisplayPrice}
              </span>
              <div className="flex items-center gap-[8px]">
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
                  onClick={handleExpand}
                >
                  상세보기
                  <ChevronDown size={24} className="text-gray" />
                </RectangleButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex gap-6 pt-[24px] pr-[16px] pb-[40px] pl-[54px]">
            {hasThumbnail && (
              <BookThumbnail
                thumbnail={book.thumbnail}
                title={book.title}
                isLiked={isLiked}
                onToggleLike={handleToggleLike}
                containerClassName="relative h-[280px] w-[210px] shrink-0"
                imageClassName="h-full w-full rounded object-cover"
                favoriteButtonStyle={{
                  top: 12,
                  right: 10,
                  width: 20,
                  height: 17.16,
                }}
              />
            )}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="mb-[16px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-title-sm text-fg-primary">
                    {book.title}
                  </span>
                  <span className="text-body-md text-fg-secondary">
                    {authorsText}
                  </span>
                </div>
                <RectangleButton
                  variant="default"
                  size="medium"
                  color="light-gray"
                  fixedWidth={115}
                  onClick={handleCollapse}
                >
                  상세보기
                  <ChevronUp size={24} className="text-gray" />
                </RectangleButton>
              </div>
              <div className="flex min-w-0 flex-1 gap-[48px]">
                <div className="w-[360px] shrink-0">
                  <h4 className="mb-2 text-body-md-bold text-fg-primary">책 소개</h4>
                  <p className="text-small-md text-fg-secondary leading-[16px]">
                    {book.contents}
                  </p>
                </div>
                <div className="flex flex-1 flex-col items-end justify-end gap-[28px]">
                  <div className="text-right">
                    <PriceSummary
                      price={book.price}
                      displayPrice={displayPrice}
                      hasSalePrice={hasSalePrice}
                    />
                  </div>
                  <RectangleButton
                    variant="default"
                    size="medium"
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
