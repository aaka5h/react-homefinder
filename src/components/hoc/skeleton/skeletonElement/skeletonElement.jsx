import React, { Component } from 'react';
import { Context } from '../skeleton.context';

export const createSkeletonElement = (type, pendingStyle) => {
  const ExportElement = props => (
    <Context.Consumer>
      {({ skeletor }) => {
        console.log('context:', skeletor);
        const { isPending = false, styling = undefined } = skeletor || {};
        const newProps = { ...props };
        console.log(isPending);
        if (isPending) {
          // do something with newProps
        }
        return React.createElement(type, newProps);
      }}
    </Context.Consumer>
  );

  return ExportElement;
};
