"use client";

import Image from "next/image";

const AnimatedImageGallery = () => {
  // Using the existing images from public/Images
  const leftColumnImages = [
    "/Images/Hero Image 1.jpg",
    "/Images/Hero Image 2.jpg",
    "/Images/Hero Image 3.jpg",
  ];

  const rightColumnImages = [
    "/Images/Hero Image 2.jpg",
    "/Images/Hero Image 3.jpg",
    "/Images/Hero Image 1.jpg",
  ];

  // For seamless infinite scroll, we need to duplicate the set
  // The animation will translate by exactly one set's height
  const leftImages = [...leftColumnImages, ...leftColumnImages];
  const rightImages = [...rightColumnImages, ...rightColumnImages];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Gradient Overlays - Enhanced for better fade effect */}
      <div className="absolute top-0 left-0 right-0 h-40 z-10 gradient-overlay-top pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-10 gradient-overlay-bottom pointer-events-none" />

      {/* Image Columns */}
      <div className="flex gap-3 sm:gap-4 h-full">
        {/* Left Column - Scroll Up */}
        <div className="flex-1 relative h-full overflow-hidden">
          <div className="flex flex-col gap-3 sm:gap-4 animate-scroll-up" style={{ willChange: 'transform' }}>
            {leftImages.map((src, index) => (
              <div
                key={`left-${index}`}
                className="relative w-full aspect-[4/5] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={src}
                  alt={`Hero image ${(index % 3) + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scroll Down */}
        <div className="flex-1 relative h-full overflow-hidden">
          <div className="flex flex-col gap-3 sm:gap-4 animate-scroll-down" style={{ willChange: 'transform' }}>
            {rightImages.map((src, index) => (
              <div
                key={`right-${index}`}
                className="relative w-full aspect-[4/5] flex-shrink-0 rounded-xl overflow-hidden shadow-lg"
              >
                <Image
                  src={src}
                  alt={`Hero image ${(index % 3) + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedImageGallery;

