import { useEffect, useState } from "react";
import ImageCarousel from "./components/ImageCarousel";

type Image = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

enum LoadingState {
  IDLE,
  LOADING,
  LOADED,
  ERROR,
}

/*
  - Work with images of different sizes and aspect ratios -> the carousel can take prop (imageFit) which can be "cover" or "contain" and will be applied to the images
  - Work on devices with different screen sizes  -> the carousel can take props for height and width and will be applied to the carousel container
  - Work on both mobile and desktop -> the carousel is responsive and will take the full width of the parent container
  - Work equally well with a dozen of images, as well as 1000+ images -> the carousel will only load the images that are currently visible and the ones that are about to be visible 
  (e.g. if the user is scrolling to the right, the carousel will load the images that are to the right of the current image)

  - Be reusable -> accepts props for customizability and does not use any hardcoded values

  SIDE NOTE:if the goal is a slot reel the approach would be different 
  
  Possible improvements if not affecting scope:

  1. tanstack could be used for bundling together loding, error, and data states 
  2. add an indicator or skeleton loader for when images are loading
  3. add index indicator to show which image is currently being viewed (e.g. 1/80) or with dots or progress bar
  4. provide more custom ways to display the images (e.g. pre-set designs, custom css classes, etc.)
  5. abstract the carousel to expect components and not just images (will have to do custom handlers for on click events of the provided components)
*/

const AMOUNT_OF_IMAGES = 100;

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>(
    LoadingState.IDLE
  );

  const fetchImages = async () => {
    setLoadingState(LoadingState.LOADING);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=1&limit=${AMOUNT_OF_IMAGES}`
      );

      const data = await response.json();

      const imageUrls = data.map((item: Image) => item.download_url);

      setImages(imageUrls);
      setLoadingState(LoadingState.LOADED);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoadingState(LoadingState.ERROR);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loadingState === LoadingState.IDLE) return null;

  if (loadingState === LoadingState.LOADING) return <div>Loading...</div>;

  if (loadingState === LoadingState.ERROR)
    return <div>Error loading images. Please try again later.</div>;

  return (
    <div className="flex justify-center items-center">
      <div className="h-screen w-screen">
        <ImageCarousel images={images} />
      </div>
    </div>
  );
}

export default App;
