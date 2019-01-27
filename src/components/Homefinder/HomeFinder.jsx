import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBox from './SearchBox/SearchBox';
import HomeList from './HomeList/HomeList';
import { fetchMoreHomes, searchHomes, loadFacets } from '../../actions/HomeFinder/index';
import FacetsAdapter from './SearchBox/facet.model.adapter';
import HomeFinderQueryFactory from './HomeFinderQuery.factory';
import Query from './Query.model';

class HomeFinder extends Component {
  facetsLoaded = false;

  state = {
    form: {
      minPrice: {
        label: 'Minimum Price',
        type: 'select',
        touched: false,
        value: null,
        valid: false,
        config: { options: [{ value: '', label: 'Select' }] },
      },
      maxPrice: {
        label: 'Maximum Price',
        type: 'select',
        touched: false,
        value: null,
        valid: false,
        config: { options: [{ value: '', label: 'Select' }] },
      },
      bedrooms: {
        label: 'Beds',
        type: 'select',
        touched: false,
        value: null,
        valid: false,
        config: { options: [{ value: '', label: 'Select' }] },
      },
      bathrooms: {
        label: 'Baths',
        type: 'select',
        touched: false,
        value: null,
        valid: false,
        config: { options: [{ value: '', label: 'Select' }] },
      },
      stories: {
        label: 'Stories',
        type: 'select',
        touched: false,
        value: null,
        valid: false,
        config: { options: [{ value: '', label: 'Select' }] },
      },
    },
  };

  componentDidMount() {
    this.props.loadFacets();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.setFormOptions();
    if (this.props.facetsLoaded && !this.facetsLoaded) {
      this.setFormOptions();
      this.facetsLoaded = true;
    }
  }

  setFormOptions() {
    if (this.loadedOnce) return;
    const searchBoxAdapter = this.props.facets;
    const PriceOptions = searchBoxAdapter.buildPriceOptions();

    const { form } = this.state;
    const newOpts = form.minPrice.config.options.concat(PriceOptions);
    form.minPrice.config.options = newOpts;
    form.maxPrice.config.options = newOpts;
    this.setState({ form });
  }

  search = (event) => {
    event.preventDefault();
    const query = this.createQuery();
    // TODO: if(search Params changed)
    this.props.search(HomeFinderQueryFactory('api', query));
  };

  createQuery = () => {
    const query = new Query();
    const { form } = this.state;
    Object.keys(form).forEach((key) => {
      query[key] = form[key].value;
    });
    return query;
  };

  valueChanged = (event, inputName) => {
    const value = event.target.value;
    console.log(value, event, inputName);

    const { form } = this.state;
    const formItem = { ...form[inputName] };
    formItem.value = value;
    form[inputName] = formItem;
    this.setState({ form });
  };

  scrollFinished = () => {

  };

  loadMore = () => {
    const quert = this.createQuery();
    quert.page = this.props.page + 1;
    this.props.loadHomes(quert);
  };

  render() {
    return (
      <>
        <SearchBox search={this.search} valueChanged={this.valueChanged} form={this.state.form} />
        <HomeList
          loadMore={this.loadMore}
          searching={this.props.searching}
          loading={this.props.loadingMore}
          homes={this.props.homes}
          scrolled={this.scrollFinished}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  homes: state.homeFinder.homes,
  page: state.homeFinder.pagesLoaded,
  searching: state.homeFinder.searching,
  loading: state.homeFinder.loadingMore,
  facets: new FacetsAdapter(state.homeFinder.facets),
  facetsLoaded: state.homeFinder.facetsLoaded,
});

const mapDispatchToProps = dispatch => ({
  loadHomes: q => dispatch(fetchMoreHomes(q)),
  search: q => dispatch(searchHomes(q)),
  loadFacets: () => dispatch(loadFacets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFinder);
