import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTransition, config, animated } from 'react-spring';
import { getSplashImages } from '../../store/splash';
import ImageCarousel from './ImageCarousel';
import ImageCarousel2 from './ImageCarousel2';

import './Splash.css'


export default function SplashPage() {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  const [splashAlbum, setSplashAlbum] = useState();

  // Create button to toggle splashAlbum state


  const images = useSelector(({ splash }) => splash.carouselImages);
  // console.log(images)
  useEffect(() => {
    dispatch(getSplashImages())
      // .then(() => setIsLoaded(true));
  }, [dispatch])




  // useEffect(() => {
  //   if (isLoaded) {
  //     const domImages = document.querySelectorAll('.splash-image');
  //     startImageTransition(domImages)
  //   }
  // }, [isLoaded])





  return images && (
    <div className='splash-image-container'>
      {/* <ImageCarousel images={images}/> */}
      <ImageCarousel2 images={images} />
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
