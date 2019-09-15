import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => (
  <>
    <div className="mb-6">
      <Skeleton width={150} height={30} />
      {[1, 2, 3].map((each, index) => (
        <div key={each} className="py-3 border-b border-dotted">
          <Skeleton height={20} />
        </div>
      ))}
    </div>
  </>
);

export default Loading;
