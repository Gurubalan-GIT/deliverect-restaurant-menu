import Image, { StaticImageData } from "next/image";

type EmptyProps = {
  image: string | StaticImageData;
  text: string;
};

const Empty: React.FC<EmptyProps> = ({ image, text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Image src={image} alt="Empty State" width={125} height={125} />
      <p className="mt-2 text-gray-500 text-lg">{text}</p>
    </div>
  );
};

export default Empty;
