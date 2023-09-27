# React Image Carousel

A responsive and efficient image carousel component built using React. It's designed to handle a wide range of use cases, from a dozen images to 1000+ images. The carousel preloads images to ensure a smooth user experience, and it's optimized for both mobile and desktop devices.

## Features

- **Responsive Design**: Works seamlessly on devices with different screen sizes.
- **Efficient Image Loading**: Only loads images that are currently visible and the ones that are about to be visible.
- **Customizable**: Accepts props for customizability, including image fit (`cover` or `contain`), height, width, and custom classes.
- **Mobile and Desktop Friendly**: On the web, it uses horizontal scrolling, and on mobile devices, it supports swipe gestures.

## Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:

   ```bash
   cd [project-directory]
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the project:
   ```bash
   npm start
   ```

## Usage

To use the `ImageCarousel` component in your React application:

```jsx
import ImageCarousel from "./components/ImageCarousel";

function YourComponent() {
  const images = [
    "url1",
    "url2",
    // ... other image URLs
  ];

  return <ImageCarousel images={images} />;
}
```

### Props

- `images`: An array of image URLs.
- `height`: (Optional) Height of the carousel. Default is `h-full`.
- `width`: (Optional) Width of the carousel. Default is `w-full`.
- `imageFit`: (Optional) How the image should fit in the container. Can be either `cover` or `contain`. Default is `cover`.
- `customClass`: (Optional) Custom CSS classes for further styling.

## Notes

- This carousel can use drag-and-drop and scroll.
- If the goal is to create a slot reel, the approach would differ.
- Possible improvements include adding loading indicators, index indicators, more customization options, and abstracting the carousel to accept components instead of just images.

## License

[MIT](LICENSE)
