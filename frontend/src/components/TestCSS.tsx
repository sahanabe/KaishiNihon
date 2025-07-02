import React from 'react';

const TestCSS: React.FC = () => {
  return (
    <div className="test-css">
      <h2>CSS Test Component</h2>
      <p>If you can see this with red background and white text, CSS is working!</p>
      <div className="tailwind-test">
        <p>If you can see this with blue background, Tailwind CSS is working!</p>
      </div>
    </div>
  );
};

export default TestCSS; 