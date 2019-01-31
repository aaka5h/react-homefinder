import React from 'react';
// import PropTypes from 'prop-types';

//
// const contextTypes = {
//   skeletor: PropTypes.shape({
//     isPending: PropTypes.bool,
//     styling: PropTypes.oneOfType([
//       PropTypes.func,
//       PropTypes.string,
//       PropTypes.object,
//     ]),
//   }),
// };

const context = React.createContext({
  skeletor: {
    isPending: false,
    styling: {},
  },
});

export default context;
