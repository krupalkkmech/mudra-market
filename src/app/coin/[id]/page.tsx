import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const CoinDetails: React.FC<Props> = ({ params }) => {
  const { id } = params;
  return <div>CoinDetails {id}</div>;
};

export default CoinDetails;
