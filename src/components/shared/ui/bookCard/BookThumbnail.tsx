import type { CSSProperties } from "react";
import iconHeartLine from "@/assets/icons/icon-heart-line.svg";
import iconHeartFill from "@/assets/icons/icon-heart-fill.svg";

interface Props {
  thumbnail: string;
  title: string;
  isLiked: boolean;
  onToggleLike: () => void;
  containerClassName: string;
  imageClassName: string;
  favoriteButtonStyle: CSSProperties;
}

function BookThumbnail({
  thumbnail,
  title,
  isLiked,
  onToggleLike,
  containerClassName,
  imageClassName,
  favoriteButtonStyle,
}: Props) {
  return (
    <div className={containerClassName}>
      <img src={thumbnail} alt={title} className={imageClassName} />
      <button
        type="button"
        className="absolute cursor-pointer"
        style={favoriteButtonStyle}
        onClick={onToggleLike}
      >
        <img
          src={isLiked ? iconHeartFill : iconHeartLine}
          alt="찜하기"
          className="h-full w-full"
        />
      </button>
    </div>
  );
}

export default BookThumbnail;
