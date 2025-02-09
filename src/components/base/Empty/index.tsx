import React from 'react';

type EmptyProps = {};

const Empty: React.FC<EmptyProps> = () => {
  return <p className="typo-header-semi text-center px-16 py-12">No data</p>;
};

export default Empty;
