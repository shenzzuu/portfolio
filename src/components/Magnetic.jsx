import React, { useRef, useState } from 'react';

const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s linear',
        display: 'inline-block'
      }}
    >
      {children}
    </div>
  );
};

export default Magnetic;
