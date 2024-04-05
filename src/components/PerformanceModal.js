import React from 'react';

const PerformanceModal = ({ timingData, resourceData }) => {
  return (
    <div style={{ background: 'white', padding: '20px', position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', overflow: 'scroll' }}>
      <h2>Navigation Timing</h2>
      <ul>
        {Object.entries(timingData).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
      <h2>Resource Timing</h2>
      <ul>
        {resourceData.map((resource, index) => (
          <li key={index}>{resource.name}: {resource.duration}</li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceModal;
