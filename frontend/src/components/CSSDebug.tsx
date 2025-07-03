import React from 'react';
import './CSSDebug.css';

const CSSDebug: React.FC = () => {
  return (
    <div className="css-debug-container">
      <h2>CSS Debug Component</h2>
      <div className="css-test-box">
        <p>This should have a red background and white text</p>
      </div>
      <div className="tailwind-test-box">
        <p>This should have a blue background and white text</p>
      </div>
      <div className="custom-test-box">
        <p>This should have a green background and white text</p>
      </div>
    </div>
  );
};

export default CSSDebug; 