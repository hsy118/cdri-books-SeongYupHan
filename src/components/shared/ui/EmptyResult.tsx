import iconBook from "@/assets/images/images_books.svg";

interface Props {
  message: string;
}

function EmptyResult({ message }: Props) {
  return (
    <div className="flex flex-col items-center h-[120px] justify-between ">
      <img src={iconBook} alt="" width={80} height={80} />
      <p className="text-caption-md text-fg-secondary">{message}</p>
    </div>
  );
}

export default EmptyResult;
