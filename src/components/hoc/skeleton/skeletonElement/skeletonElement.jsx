import React, { Component } from 'react';
import { Context } from '../skeleton.context';

export const createSkeletonElement = (type, pendingStyle) => {
  const ExportElement = (props) => {
    const consumerMethod = ({ skeletor }) => {
      console.log('context:', skeletor);
      const { isPending = false, styling = undefined } = skeletor || {};
      const newProps = { ...props };
      console.log(isPending);
      if (isPending) {
        // do something with newProps
      }
      return React.createElement(type, newProps);
    };


    return (
      <Context.Consumer>
        {consumerMethod}
      </Context.Consumer>
    );
  };

  return ExportElement;
};
