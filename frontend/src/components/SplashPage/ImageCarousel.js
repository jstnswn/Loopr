import React, { useState, useEffect } from 'react';
import { useTransition, config, animated } from 'react-spring';

export default function ImageCarousel({ images }) {
  console.log(images)
  const [index, setIndex] = useState(0);
  const transitions = useTransition(index, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 },
    exitBeforeEnter: true,
  });
  console.log(transitions);

  useEffect(() => {
    const interval = setInterval(() => setIndex(state => (state + 1) % images.length), 4000);

    return () => clearInterval(interval);
  }, [images])
  return (
    <div className='splash-image-container'>
      {transitions((style, i) => (
        <animated.div
          className='splash-image'
          style={{ ...style, backgroundImage: `url(${images[i].imageUrl}` }}
        />
      ))}
    </div>
  )
}
