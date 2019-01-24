import React, { Component } from 'react';

import SearchBox from './SearchBox/SearchBox';
import HomeList from './HomeList/HomeList';
import { findHomes } from './HomeFinder.service';

class HomeFinder extends Component {
  state = {
    form: {
      minPrice: {
        value: null,
      },
    },
    homes: [],
    pagesLoaded: 0,
    pageSize: 10,
    searching: false,
    loadingMore: false,
  };

  componentDidMount() {
    this.loadHomes();
  }

  search = (event) => {
    event.preventDefault();
    this.setState({searching: true});
    this.loadHomes()
      .then(() => {
        this.setState({searching: false});
      });
  };

  /**
   * Loads homes with current filter state
   * @returns Promise
   */
  loadHomes = () => findHomes({page: this.state.pagesLoaded + 1})
    .then((newHomes) => {
      console.log(newHomes);
      const currentHomes = [...this.state.homes];
      const curr = currentHomes.concat(newHomes);
      this.setState(prevState => ({
        homes: curr,
        pagesLoaded: prevState.pagesLoaded + 1,
      }));
      return Promise.resolve();
    });


  loadPage = () => null;

  scrollFinished = () => {

  };

  render() {
    return (
      <>
        <SearchBox search={this.search} formValues={this.state.form} />
        <HomeList
          searching={this.state.searching}
          loading={this.state.loadingMore}
          homes={this.state.homes}
          scrolled={this.scrollFinished}
        />
      </>
    );
  }
}


export default HomeFinder;
