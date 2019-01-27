import React, { Component } from 'react';
import { getHomeDetails } from "./HomeDetail.service";

class HomeDetail extends Component {
  state = {
    home: {},
  };

  componentDidMount() {
    console.log('[DidMount] homeCard detail');
    console.log(this.props);
    getHomeDetails({planid: this.props.match.params.id}).then((data) => {
      this.setState({home: data});
    }).catch();
  }

  render() {
    return (
      <>
        <p>Home detail:</p>
        <pre>
        { JSON.stringify(this.state.home, undefined, 2)}
        </pre>
      </>
    );
  }
}

export default HomeDetail;
