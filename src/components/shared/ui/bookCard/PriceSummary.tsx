import { formatPrice } from "@/components/common/utils/format";

interface Props {
  price: number;
  displayPrice: number;
  hasSalePrice: boolean;
}

function PriceSummary({ price, displayPrice, hasSalePrice }: Props) {
  if (!hasSalePrice) {
    return (
      <p>
        <span className="text-title-sm text-fg-primary">
          {formatPrice(price)}원
        </span>
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-[8px]">
      <p>
        <span className="mr-2 text-small-md text-fg-subtitle">원가</span>
        <span
          className="text-fg-primary line-through"
          style={{ fontSize: 18, fontWeight: 350 }}
        >
          {formatPrice(price)}원
        </span>
      </p>
      <p>
        <span className="mr-2 text-small-md text-fg-subtitle">할인가</span>
        <span className="text-title-sm text-fg-primary">
          {formatPrice(displayPrice)}원
        </span>
      </p>
    </div>
  );
}

export default PriceSummary;
