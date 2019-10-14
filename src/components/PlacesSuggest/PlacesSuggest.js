// General
import React from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect, change } from 'react-redux';

// Redux actions
import { getLocationData } from '../../actions/getLocation';

// Google Places Suggest Component
import GoogleMapLoader from "react-google-maps-loader";
import Geosuggest from "react-geosuggest";

// Styles
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormControl } from 'react-bootstrap';
import cx from 'classnames';


// Constants
import { googleMapAPI } from '../../config';

//action
import { setListingAddressValues } from '../../actions/Listing/ListingAddress';


class PlacesSuggest extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    className: PropTypes.string,
    change: PropTypes.func,
    googleMaps: PropTypes.object,
    setListingAddressValues: PropTypes.func,
    listingAddress: PropTypes.shape({
      location: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  };

  static defaultProps = {
    listingAddress: {
      location: null
    }
  };

  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectSuggest = this.handleSelectSuggest.bind(this);
  }

  handleSearchChange = (value) => {
    const { setListingAddressValues } = this.props;
    setListingAddressValues({ name: 'location', value });
    setListingAddressValues({ name: 'lat', value: null });
    setListingAddressValues({ name: 'lng', value: null });
    setListingAddressValues({ name: 'geography', value: null });
    return value;
  }

  async handleSelectSuggest(data, suggest, coordinate) {
    const { change, handleSubmit, setListingAddressValues } = this.props;
    if (data && data.gmaps) {
      this.props.getLocationData(data.label);
      return data.label;
    }
  }


  render() {

    const { label, className, containerClassName, listingAddress } = this.props;

    return (
        <Geosuggest
        ref={input => this._geoSuggest = input}
        //ref={el => this.geosuggest = el}
        placeholder={label}
        inputClassName={className}
        className={cx(containerClassName, 'placeSuggest')}
        initialValue={listingAddress.location}
        onChange={this.handleSearchChange}
        onSuggestSelect={this.handleSelectSuggest}
        country="uk"
      //types={['(regions)']}
      >
          <FormControl
            type="text"
            placeholder={label}
            onChange={(e) => onChange(this.handleSearchChange(e))}
            className={className}
          />
        </Geosuggest>
    );
  }
}

const mapState = (state) => ({
  listingAddress: state.listingAddress
});

const mapDispatch = {
  change,
  setListingAddressValues,
  getLocationData
};

export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(PlacesSuggest)), {
  libraries: ["places"],
  region: "UK",
  language: "en",
  key: googleMapAPI,
});
