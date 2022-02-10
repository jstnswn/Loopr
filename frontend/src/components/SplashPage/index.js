import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, config, animated } from 'react-spring';
import { getSplashAlbums } from '../../store/splash';
import ImageCarousel from './ImageCarousel';
import ImageCarousel2 from './ImageCarousel2';
import Selector from './Selector';

import './Splash.css'


export default function SplashPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [key, setKey] = useState(1);

  const albums = useSelector(({ splash }) => splash.albums);
  useEffect(() => {
    dispatch(getSplashAlbums())
      .then(() => setIsLoaded(true));
  }, [dispatch])


  useEffect(() => {
    if (isLoaded) {
      setImages(albums[key]?.images)
    }
  }, [isLoaded, albums, key])

  // if (!images) return <h2>Sorry, there has been a database error</h2>
  return images && (
    <div className='splash-container'>
      {/* <ImageCarousel images={images}/> */}

      {key === 1 && <ImageCarousel2 images={images} />}
      {key === 2 && <ImageCarousel2 images={images} />}

      <Selector albums={Object.values(albums)} setKey={setKey} />
    </div>
  );
}























// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSplashImages } from '../../store/splash';

// import './Splash.css'


// export default function SplashPage() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);
//   const images = useSelector(({ splash }) => splash.carouselImages);
//   // console.log(images)
//   useEffect(() => {
//     dispatch(getSplashImages())
//       .then(() => setIsLoaded(true));
//   }, [dispatch])


//   useEffect(() => {
//     if (isLoaded) {
//       const domImages = document.querySelectorAll('.splash-image');
//       startImageTransition(domImages)
//     }
//   }, [isLoaded])

//   const startImageTransition = (images) => {
//     images.forEach(image => image.style.opacity = 1);
//     let topZIndex = 1;
//     let curr = images.length - 1;

//     setInterval(changeImage, 4000);

//     async function changeImage() {
//       let nextImage = (1 + curr) % images.length;

//       images[curr].style.zIndex = topZIndex + 1;
//       images[nextImage].style.zIndex = topZIndex;

//       await transition();

//       images[curr].style.zIndex = topZIndex
//       images[nextImage].style.zIndex = topZIndex + 1;

//       topZIndex = topZIndex + 1;

//       images[curr].style.opacity = 1;

//       curr = nextImage;
//     };

//     function transition() {
//       return new Promise(function (res, _rej) {
//         let del = 0.01;

//         let id = setInterval(changeOpacity, 10);

//         function changeOpacity() {
//           images[curr].style.opacity -= del;
//           if (images[curr].style.opacity <= 0) {
//             clearInterval(id);
//             res();
//           }
//         }
//       })
//     }
//   };

//   return images && (
//     <div className='splash-image-container'>
//       {images.map(image => (
//         <img key={image.id} className='splash-image' src={image.imageUrl} alt={image.title}></img>
//       ))}
//     </div>
//   );
// }
