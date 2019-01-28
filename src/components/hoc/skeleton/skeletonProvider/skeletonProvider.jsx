import React, { Component } from 'react';
import { Context } from '../skeleton.context';

const skeletonProvider = (
  dummyData,
  predicate,
  styling,
) => (WrappedComponent) => {
  class ExportedComponent extends Component {

    render() {
      let component;
      // Append dummy data only if the condition defined by the predicate are met,
      // by default if there is no predicate, append the data
      if (predicate ? predicate(this.props) : true) {
        // Either call the dummyData as a function or assign dummyData to data
        const data = typeof dummyData === 'function' ? dummyData(this.props) : dummyData;

        component = <WrappedComponent {...this.props} {...data} />;
      }

      component = <WrappedComponent {...this.props} />;
      return (
        <Context.Provider
          value={{ skeletor: { isPending: predicate(this.props), styling } }}
        >
          {component}
        </Context.Provider>
      );
    }
  }


  return ExportedComponent;
};

export default skeletonProvider;
