import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 p-4 mt-8">
      <div className="container mx-auto text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} YTU Matematik Mühendisliği. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
