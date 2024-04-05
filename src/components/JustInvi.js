import React, { useRef, useEffect, useState } from 'react';

const JustInvi = ({ image }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); 

    const currentElement = imgRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.disconnect();
      }
    };
  }, [imgRef]);

  return (
    <div className="photo">
      {isVisible ? (
        <img
          ref={imgRef}
          src={image.urls.small}
          alt={image.description || 'Unsplash Image'}
          style={{ width: '100%', height: 'auto' }}
        />
      ) : (
        <div
          ref={imgRef}
          style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0' }}
        ></div>
      )}
    </div>
  );
};

export default JustInvi;
