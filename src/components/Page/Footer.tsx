import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center bg-gray-900 text-white">
      <div className="justify-items-center pt-6">
        <p className="text-xl">
          Made with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by{' '}
        </p>
      </div>

      <div className="justify-items-center p-4">© 2022 - FI-Sweets</div>
    </footer>
  );
};

export default Footer;
