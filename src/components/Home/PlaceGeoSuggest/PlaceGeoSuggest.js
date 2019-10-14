import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Google Places Suggest Component
import GoogleMapLoader from "react-google-maps-loader";

// Constants
import { googleMapAPI } from '../../../config';
import locationIcon from './location_icon.svg';

import Geosuggest from 'react-geosuggest';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader/!css-loader!react-geosuggest/module/geosuggest.css';
import sx from './styles.css';
// Redux  Action
import { setPersonalizedValues } from '../../../actions/personalized';

class PlaceGeoSuggest extends Component {

    static propTypes = {
        label: PropTypes.string,
        className: PropTypes.string,
        containerClassName: PropTypes.string,
        setPersonalizedValues: PropTypes.func,
        googleMaps: PropTypes.object,
        personalized: PropTypes.shape({
            location: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number,
            geography: PropTypes.string
        })
    };

    static defaultProps = {
        personalized: {
            location: null
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false
        },
        this.onSuggestSelect = this.onSuggestSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleFocus() {
        this.setState({ isFocused: true });
    }

    handleBlur() {
        this.setState({ isFocused: false });
    }

    onSuggestSelect(data) {
        const { setPersonalizedValues } = this.props;
        const locationData = {};
        if (data && data.gmaps) {
            data.gmaps.address_components.map((item, key) => {
                if (item.types[0] == "administrative_area_level_1") {
                    locationData.administrative_area_level_1_short = item.short_name;
                    locationData.administrative_area_level_1_long = item.long_name;
                } else if (item.types[0] == "country") {
                    locationData[item.types[0]] = item.short_name;
                } else {
                    locationData[item.types[0]] = item.long_name;
                }
            });
            setPersonalizedValues({ name: 'geography', value: JSON.stringify(locationData) });
            setPersonalizedValues({ name: 'location', value: data.label });
            setPersonalizedValues({ name: 'lat', value: data.location.lat });
            setPersonalizedValues({ name: 'lng', value: data.location.lng });
            setPersonalizedValues({ name: 'chosen', value: 1 });
        }
    }

    onChange(value) {
        const { setPersonalizedValues } = this.props;
        setPersonalizedValues({ name: 'location', value });
        setPersonalizedValues({ name: 'chosen', value: null });
        setPersonalizedValues({ name: 'geography', value: null });
    }

    render() {
        const { label, className, containerClassName, personalized } = this.props;
        const { isFocused } = this.state;
        return (
            <div className={sx.geoSuggestContainer}>
                <div className="visible-xs visible-sm">
                    <img alt="location_icon" src={locationIcon} style={{ left: 30, zIndex: 99, height: 18, top: 13, position: 'absolute' }} />
                </div>
                <div className="visible-md visible-lg">
                    <img alt="location_icon" src={locationIcon} style={{ paddingLeft: 11, zIndex: 99, height: 18, top: 28, position: 'absolute' }} />
                </div>
                <Geosuggest
                  ref={el => this._geoSuggest=el}
                  placeholder="Choose location"
                  inputClassName={className}
                //   className={containerClassName}
                  initialValue={personalized.location}
                  onChange={this.onChange}
                  onSuggestSelect={this.onSuggestSelect}
                  country="UK"
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                />
            </div>
        );
    }
}

const mapState = state => ({
    personalized: state.personalized
});

const mapDispatch = {
    setPersonalizedValues
};

export default GoogleMapLoader(withStyles(s, sx)(connect(mapState, mapDispatch)(PlaceGeoSuggest)), {
    libraries: ["places"],
    region: "UK",
    language: "en",
    key: googleMapAPI,
});
