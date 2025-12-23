import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen w-full bg-pageColors-purple flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-pageColors-purple mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;