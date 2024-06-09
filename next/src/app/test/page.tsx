// pages/index.tsx

import React from 'react';

interface PageHomeProps {
  data: any;
}

const PageHome: React.FC<PageHomeProps> = () => {
  return (
    <main className="main container-fluid">
      <h1>Data from API</h1>
    </main>
  );
};

