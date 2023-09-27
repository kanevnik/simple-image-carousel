import React, { useEffect, useRef } from "react";

interface ImageCarouselProps {
  images: string[];
  height?: string;
  width?: string;
  imageFit?: "cover" | "contain";
  customClass?: string;
}

const fitMapper = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

const PRE_LOAD_IMAGES = 10;
const CONSECUTIVE_LOAD_IMAGES = 10;
const SCROLL_THRESHOLD_PERCENTAGE = 0.5; // every 5th photo

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  height = "h-full",
  width = "w-full",
  imageFit = "cover",
  customClass = "",
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const currentThreshHold = useRef<number>(1);
  const loadedImagesSetRef = useRef(new Set<string>());

  const preloadImages = (imageUrls: string[]) => {
    imageUrls.forEach((url) => {
      if (!loadedImagesSetRef.current.has(url)) {
        const img = new Image();
        img.src = url;
        loadedImagesSetRef.current.add(url);
      }
    });
  };

  useEffect(() => {
    if (images.length === 0) return;

    const fromStart = images.slice(0, PRE_LOAD_IMAGES);
    const fromEnd = images.slice(-2);
    const combined = [...fromStart, ...fromEnd];
    preloadImages(Array.from(new Set<string>(combined)));
  }, []);

  useEffect(() => {
    if (carouselRef.current && images.length > 0) {
      const imageWidth =
        (carouselRef.current.firstChild as HTMLElement)?.clientWidth || 0;
      carouselRef.current.scrollLeft = imageWidth;
    }
  }, []);

  useEffect(() => {
    const curr = carouselRef.current;

    //Currently can pre-load only moving forward
    const handleScroll = () => {
      if (curr) {
        const currentScrollLeft = curr.scrollLeft;
        const containerWidth = curr.clientWidth;

        const shouldLoadMoreForwardImages =
          curr.clientWidth *
            currentThreshHold.current *
            PRE_LOAD_IMAGES *
            SCROLL_THRESHOLD_PERCENTAGE <
          curr.scrollLeft;

        const hasAlreadyLooped =
          currentThreshHold.current > images.length / CONSECUTIVE_LOAD_IMAGES;

        if (shouldLoadMoreForwardImages && !hasAlreadyLooped) {
          const fromIndex = currentThreshHold.current * CONSECUTIVE_LOAD_IMAGES;
          const toIndex =
            (currentThreshHold.current + 1) * CONSECUTIVE_LOAD_IMAGES;

          const imageUrls = images.slice(fromIndex, toIndex);

          preloadImages(imageUrls);

          currentThreshHold.current++;
        }

        if (currentScrollLeft === (images.length + 1) * containerWidth) {
          curr.scrollLeft = containerWidth;
        } else if (currentScrollLeft === 0) {
          curr.scrollLeft = images.length * containerWidth;
        }
      }
    };

    curr?.addEventListener("scroll", handleScroll);
    return () => {
      curr?.removeEventListener("scroll", handleScroll);
    };
  }, [images]);

  const imgClass = `${width} ${height} ${fitMapper[imageFit]} snap-always snap-start bg-gray-200 shrink-0 ${customClass}`;

  return (
    <div
      ref={carouselRef}
      className="flex snap-x snap-mandatory h-full w-full mx:auto overflow-x-auto overscroll-y-none"
    >
      <img
        src={images[images.length - 1]}
        alt="Duplicate Last"
        className={imgClass}
        loading="lazy"
      />
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={` ${index + 1}`}
          className={imgClass}
          loading="lazy"
        />
      ))}
      <img
        src={images[0]}
        alt="Duplicate First"
        className={imgClass}
        loading="lazy"
      />
    </div>
  );
};

export default ImageCarousel;
