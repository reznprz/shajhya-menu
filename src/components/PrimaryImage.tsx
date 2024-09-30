import React from "react";

interface PrimaryImageProps {
  src: string;
  alt?: string;
  mobileHeight?: string; // optional height for mobile
  desktopHeight?: string; // optional height for desktop
  objectFit?: "cover" | "contain"; // allows choosing between object-cover or object-contain
}

const PrimaryImage: React.FC<PrimaryImageProps> = ({
  src,
  alt = "Image",
  mobileHeight = "175px",
  desktopHeight = "300px",
  objectFit = "cover",
}) => {
  return (
    <div className="relative w-screen h-auto">
      <img
        src={src}
        alt={alt}
        className={`w-full h-[${mobileHeight}] md:h-[${desktopHeight}] object-${objectFit}`} // Responsive height and object fit
      />
    </div>
  );
};

export default PrimaryImage;
