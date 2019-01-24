import React, {Component} from 'react';
import types from 'prop-types';

class Layout extends Component {
  render() {
    const {children} = this.props;
    return (
      <div>
        {children}
      </div>
    );
  }
}

Layout.state = {};
Layout.propTypes = {
  children: types.any,
}

export default Layout;
