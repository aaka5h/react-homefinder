import React from 'react';
import Context from '../skeleton.context';

const skeletonProvider = (dummyData, predicate, styling) => (
  WrappedComponent,
) => {
  const SkeletonProvider = (props) => {
    let component;
    // Append dummy data only if the condition defined by the predicate are met,
    // by default if there is no predicate, append the data
    if (predicate ? predicate(props) : true) {
      // Either call the dummyData as a function or assign dummyData to data
      const data =
        typeof dummyData === 'function' ? dummyData(props) : dummyData;

      component = <WrappedComponent {...props} {...data} />;
    } else component = <WrappedComponent {...props} />;
    return (
      <Context.Provider
        value={{ skeletor: { isPending: predicate(props), styling } }}
      >
        {component}
      </Context.Provider>
    );
  };

  return SkeletonProvider;
};

export default skeletonProvider;
