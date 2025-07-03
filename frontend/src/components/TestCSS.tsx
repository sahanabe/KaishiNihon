import React from 'react';

const TestCSS: React.FC = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      left: '10px', 
      zIndex: 9999,
      background: 'red',
      color: 'white',
      padding: '20px',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: '2px solid white'
    }}>
      <h2>CSS Test Component</h2>
      <p>If you can see this with red background and white text, CSS is working!</p>
      <div style={{
        background: 'blue',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        margin: '10px 0'
      }}>
        <p>If you can see this with blue background, basic CSS is working!</p>
      </div>
      <div className="test-css">
        <p>This should also be red (CSS class test)</p>
      </div>
      <div className="tailwind-test">
        <p>This should be blue (Tailwind class test)</p>
      </div>
    </div>
  );
};

export default TestCSS; 