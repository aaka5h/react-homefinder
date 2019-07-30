import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBox from './SearchBox/SearchBox';
import HomeList from './HomeList/HomeList';
import { fetchMoreHomes, searchHomes, loadFacets } from '../../actions/HomeFinder/index';
import FacetsAdapter from './SearchBox/facet.model.adapter';
import HomeFinderQueryFactory from './HomeFinderQuery.factory';
import Query from './Query.model';
import skeletonProvider from '../hoc/skeleton/skeletonProvider/skeletonProvider';

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
    },
  };

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  componentDidMount() {
    console.log('[DidMount] HomeFinder');
    this.props.loadFacets();
    this.search();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.setFormOptions();
    if (this.props.facetsLoaded && !this.facetsLoaded) {
      this.setFormOptions();
      this.facetsLoaded = true;
    }
  }

  setFormOptions() {
    const searchBoxAdapter = this.props.facets;
    const PriceOptions = searchBoxAdapter.buildPriceOptions();
    const BathroomOptions = searchBoxAdapter.buildBathroomOptions();

    const { form } = this.state;
    const newOpts = form.minPrice.config.options.concat(PriceOptions);
    form.minPrice.config.options = newOpts;
    form.maxPrice.config.options = newOpts;
    form.bathrooms.config.options = form.bathrooms.config.options.concat(BathroomOptions);
    form.bedrooms.config.options =
      form.bedrooms.config.options.concat(searchBoxAdapter.buildBedroomOptions());
    this.setState({ form });
  }

  searchClicked = (event) => {
    event.preventDefault();
    this.search();
  }

  search = () => {
    const query = this.createQuery();
    // TODO: if(search Params changed)
    this.props.search(HomeFinderQueryFactory('api', query));
  };

  createQuery = () => {
    const query = new Query();
    const { form } = this.state;
    Object.keys(form).forEach((key) => {
      query[key] = form[key].value || null;
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
    const query = this.createQuery();
    query.page = this.props.page + 1;
    this.props.loadHomes(HomeFinderQueryFactory('api', query)).then((data) => {
      console.log('action finished:', data);
    });
  };

  render() {
    const { searching, loading, homes } = this.props;
    const { form } = this.state;
    const totalResults = this.props.facetsLoaded ? this.props.resultSummary.totalResults : 0;
    return (
      <>
        <SearchBox search={this.searchClicked} valueChanged={this.valueChanged} form={form} />
        {!loading ? `${totalResults} Homes found.` : null}
        <HomeList
          listRef={this.listRef}
          loadMore={this.loadMore}
          searching={searching}
          homes={homes}
          scrolled={this.scrollFinished}
          totalResults={totalResults}
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
  resultSummary: state.homeFinder.resultSummary,
});

const mapDispatchToProps = dispatch => ({
  loadHomes: q => dispatch(fetchMoreHomes(q)),
  search: q => dispatch(searchHomes(q)),
  loadFacets: () => dispatch(loadFacets()),
});


const test = props => props.loading || props.searching;

const skeleton = skeletonProvider(null, test, null)(HomeFinder);

export default connect(mapStateToProps, mapDispatchToProps)(skeleton);
