import React from 'react';

// This is a simple, reusable Card component.
// It takes any content you put inside it (children)
// and applies consistent styling.
function Card({ children, className }) {
  // We combine default styles with any extra styles you want to add
  const cardClasses = `bg-white text-black rounded-xl border border-gray-200 p-6 shadow-md w-full max-w-lg ${className || ''}`;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}

export default Card;