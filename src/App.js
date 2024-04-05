import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Images } from './components/Images';
import PerformanceModal from './components/PerformanceModal'; 
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [performanceData, setPerformanceData] = useState({
    timingData: {},
    resourceData: []
  });

  const fetchAPI = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/?client_id=&per_page=10&page=${page}`);
      setImages(prev => [...prev, ...response.data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        fetchAPI();
      }
    }, { threshold: 1 });

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [images]);

 
  useEffect(() => {
    const timingData = performance.getEntriesByType('navigation')[0]?.toJSON();
    const resourceData = performance.getEntriesByType('resource').map(entry => entry.toJSON());
    setPerformanceData({ timingData, resourceData });
  }, []);

  return (
    <div className="container">
      <button onClick={() => setShowPerformanceModal(true)}>Show Performance Data</button>
      {showPerformanceModal && 
        <PerformanceModal 
          timingData={performanceData.timingData} 
          resourceData={performanceData.resourceData} 
        />}
      <div className="photos">
        {images.length > 0 && <Images images={images}/>}
        <div ref={loaderRef} style={{ height: '100px', margin: '10px' }}>Loading more...</div>
      </div>
    </div>
  );
}

export default App;
