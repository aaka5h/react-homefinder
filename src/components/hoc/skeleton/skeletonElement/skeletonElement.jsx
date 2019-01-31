import React from 'react';
import Context from '../skeleton.context';


const unwrapStyle = style => ((typeof style === 'function') ? style() : style || undefined);

const createClassName = classes => classes.filter(Boolean).join(' ');


export const createSkeletonElement = (type, pendingStyle) => {
  const ExportElement = (props) => {
    const consumerMethod = ({ skeletor }) => {
      console.log('context:', skeletor);
      const { isPending = false, styling = undefined } = skeletor || {};
      const [contextStyle, propStyle] = [styling, pendingStyle].map(unwrapStyle);
      const newProps = { ...props };
      console.log(isPending);
      if (isPending) {
        /* newProps.style = [
           ...props.style,
           typeof contextStyle !== 'string' && (contextStyle || undefined),
           typeof propStyle !== 'string' && (propStyle || undefined),
         ];
         */
        newProps.className = createClassName([
          props.className,
          typeof contextStyle === 'string' && (contextStyle || undefined),
          typeof propStyle === 'string' && (propStyle || undefined),
        ]);

        newProps['aria-hidden'] = true;
        newProps.skeleton = true;
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
