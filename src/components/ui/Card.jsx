import React from 'react';

const Card = ({ children, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl border border-pageColors-border overflow-hidden shadow-soft transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-md' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 bg-pageColors-cardHeader border-b border-pageColors-border/60 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export { Card, CardHeader, CardContent };