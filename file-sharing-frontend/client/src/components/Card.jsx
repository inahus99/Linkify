import React from 'react';

function Card({ children, className }) {

  const cardClasses = `bg-white text-black rounded-xl border border-gray-200 p-6 shadow-md w-full max-w-lg ${className || ''}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

export default Card;