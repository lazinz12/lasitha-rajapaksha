
interface TradingIdeaImagesProps {
  mainImage: string;
  title: string;
  additionalImages?: string[] | null;
}

const TradingIdeaImages = ({ mainImage, title, additionalImages }: TradingIdeaImagesProps) => {
  return (
    <div className="px-6">
      <img
        src={mainImage}
        alt={title}
        className="w-full h-auto rounded-md mb-6"
      />
      
      {additionalImages && additionalImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {additionalImages.map((image, index) => (
            <img 
              key={index}
              src={image}
              alt={`${title} - Additional image ${index + 1}`}
              className="w-full h-auto rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TradingIdeaImages;
