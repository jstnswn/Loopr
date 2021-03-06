import React, { useEffect, useState } from 'react';

export default function ImageCarousel2({ images }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const domImages = document.querySelectorAll('.splash-image');

      // TODO: modify to reset z index after full cycle

      domImages.forEach(image => image.style.opacity = 1);
      let topZIndex = 1;
      let current = domImages.length - 1;

      const interval = setInterval(async () => {
        let nextImage = (current + 1) % domImages.length;

        domImages[current].style.zIndex = topZIndex + 1;
        domImages[nextImage].style.zIndex = topZIndex;

        await transition();

        domImages[current].style.zIndex = topZIndex
        domImages[nextImage].style.zIndex = topZIndex + 1;

        topZIndex++;

        domImages[current].style.opacity = 1;

        current = nextImage;
      }, 4000)

      function transition() {
        return new Promise(function (res, _rej) {
          let id = setInterval(() => {
            domImages[current].style.opacity -= 0.01;
            if (domImages[current].style.opacity <= 0) {
              clearInterval(id);
              res();
            }
          }, 5)
        });
      };

      return () => clearInterval(interval);
    }
  }, [isLoaded, images])

  return (
    <div className='splash-image-container'>
      {images.map(image => (

          <img key={image.id} className='splash-image' src={image.imageUrl} alt={image.title}></img>
          // {/* <div className='splash-image-info'> */}
            // {/* <p>{image.title}</p> */}
            // {/* <p></p> */}
          // {/* </div> */}

      ))}
    </div>
  )
}
