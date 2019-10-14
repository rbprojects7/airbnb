import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MapResults.css';
import cx from 'classnames';

// Redux
import { connect } from 'react-redux';

// Redux form
import { formValueSelector } from 'redux-form';

// Google Places Map Component
import GoogleMapLoader from "react-google-maps-loader";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// Assets
import mapPinIcon from './map-pin.png';
import mapPinIcon2 from './map-pin2.png';
import mapPinIcon3 from './map-pin3.png';

// Constants
import { googleMapAPI } from '../../../config';

// Component
import MapListingItem from '../MapListingItem';

const GoogleMapPlace =
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      ref={(map) => props.handleFitBounds(map)}
      center={props.center}
      onClick={props.onMapClick}
      onDragStart={(event) => props.handleOnDragStart(event)}
      defaultOptions={{
        maxZoom: 14,
        backgroundColor: '',
        streetViewControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        mapTypeControl: false,
      }}
    >

      {
        props.markers.map((marker, key) => (
          <Marker
            position={marker.position}
            clickable={true}
            icon={{
              url: mapPinIcon,
              scale: 5,
            }}
            key={key}
            onClick={() => props.onMarkerClick(marker)}
          >
            {
              marker.showInfo && (
                <InfoWindow
                  onCloseClick={() => props.onMarkerClose(marker)}
                  options={{
                    maxWidth: 262,
                    closeBoxURL: "",
                    closeBoxMargin: "",
                    pixelOffset: new google.maps.Size(0, 0),
                    disableAutoPan: false,
                    infoBoxClearance: new google.maps.Size(1, 1),
                    boxStyle: { width: "240px" }
                  }}
                >
                  <MapListingItem
                    id={marker.id}
                    basePrice={marker.basePrice}
                    currency={marker.currency}
                    title={marker.title}
                    beds={marker.beds}
                    personCapacity={marker.personCapacity}
                    // roomType={marker.roomType}
                    coverPhoto={marker.coverPhoto}
                    listPhotos={marker.listPhotos}
                    bookingType={marker.bookingType}
                    reviewsCount={marker.reviewsCount}
                    reviewsStarRating={marker.reviewsStarRating}
                    wishListStatus={marker.wishListStatus}
                    isListOwner={marker.isListOwner}
                  />
                </InfoWindow>
              )
            }
          </Marker>
        ))
      }
    </GoogleMap>
  ));

class MapResults extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
      personCapacity: PropTypes.number,
      dates: PropTypes.string
    }),
    searchSettings: PropTypes.shape({
      minPrice: PropTypes.number.isRequired,
      maxPrice: PropTypes.number.isRequired,
      priceRangeCurrency: PropTypes.string.isRequired,
      defaultLocation: PropTypes.string.isRequired,
      defaultLat: PropTypes.number.isRequired,
      defaultLng: PropTypes.number.isRequired
    }).isRequired,
    chosenLat: PropTypes.number,
    chosenLng: PropTypes.number,
    total: PropTypes.number,
    results: PropTypes.array,
    personalized: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      zoom: 10,
      center: {
        lat: 0,
        lng: 0
      },
      markers: [],
      bounds: {}
    };
    this.onMapClick = this.onMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleFitBounds = this.handleFitBounds.bind(this);
  }

  componentDidMount() {
    const { results, initialFilter, searchSettings, personalized } = this.props;
    const { center } = this.state;
    var bounds = new google.maps.LatLngBounds();

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        data["lat"] = item.lat,
        data["lng"] = item.lng,
        data["position"] = new google.maps.LatLng(item.lat, item.lng);
        data["id"] = item.id;
        data["basePrice"] = item.listingData.basePrice;
        data["currency"] = item.listingData.currency;
        data["title"] = item.title;
        data["beds"] = item.beds;
        data["personCapacity"] = item.personCapacity;
        // data["roomType"] = item.settingsData[0].listsettings.itemName;
        data["coverPhoto"] = item.coverPhoto;
        data["listPhotos"] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data["reviewsCount"] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data["wishListStatus"] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        positions.push(data);
        bounds.extend(new google.maps.LatLng(item.lat, item.lng));
      })
      this.setState({ markers: positions, bounds });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { results, personalized, initialFilter } = nextProps;
    const { center } = this.state;
    var bounds = new google.maps.LatLngBounds();

    if (results && results.length > 0) {
      let positions = [];

      results.map((item) => {
        let data = {};
        let position = new google.maps.LatLng(item.lat, item.lng);
        data["lat"] = item.lat,
        data["lng"] = item.lng,
        data["position"] = new google.maps.LatLng(item.lat, item.lng);
        bounds.extend(position);
        data["id"] = item.id;
        data["basePrice"] = item.listingData.basePrice;
        data["currency"] = item.listingData.currency;
        data["title"] = item.title;
        data["beds"] = item.beds;
        data["personCapacity"] = item.personCapacity;
        // data["roomType"] = item.settingsData[0].listsettings.itemName;
        data["coverPhoto"] = item.coverPhoto;
        data["listPhotos"] = item.listPhotos;
        data['bookingType'] = item.bookingType;
        data["reviewsCount"] = item.reviewsCount;
        data['reviewsStarRating'] = item.reviewsStarRating;
        data["wishListStatus"] = item.wishListStatus;
        data['isListOwner'] = item.isListOwner;
        positions.push(data);
      });
      this.setState({
        markers: positions,
        bounds
      });
    } else {
      let defaultCordinates;
      if (personalized && personalized.lat && personalized.lng) {
        let centerValue = {
          lat: personalized.lat,
          lng: personalized.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else if (initialFilter && initialFilter.lat && initialFilter.lng) {
        let centerValue = {
          lat: initialFilter.lat,
          lng: initialFilter.lng
        };
        defaultCordinates = new google.maps.LatLng(centerValue.lat, centerValue.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds, center: centerValue });
      } else {
        let defaultCordinates = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(defaultCordinates);
        this.setState({ markers: [], bounds });
      }
    }
  }

  handleFitBounds(map) {
    const { bounds, markers } = this.state;
    if (map != null && markers && markers.length > 0 && bounds != null) {
      map.fitBounds(bounds);
    }
  }

  onMapClick() {
    const { markers } = this.state;
    if (markers.length > 0) {
      this.setState({
        markers: markers.map(marker => {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon2
          };
          return marker;
        })
      });
    }
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
            icon: mapPinIcon
          };
        } else {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon
          };
        }
        return marker;
      }),
      center: {
        lat: targetMarker.lat,
        lng: targetMarker.lng
      },
      bounds: null
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
            icon: mapPinIcon
          };
        }
        return marker;
      }),
    });
  }

  handleOnDragStart(event) {
    console.log("Map is dragging by aliens", event);
  }


  render() {
    const { center, markers, bounds, zoom } = this.state;
    return (
      <div className={cx(s.mapCanvas)}>
        <GoogleMapPlace
          containerElement={
            <div style={{ width: '100%', height: '100%' }} />
          }
          mapElement={
            <div style={{ width: '100%', height: '100%' }} />
          }
          center={center}
          markers={markers}
          onMapClick={this.onMapClick}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          handleOnDragStart={this.handleOnDragStart}
          handleFitBounds={this.handleFitBounds}
        />
      </div>
    );
  }
}

const selector = formValueSelector('SearchForm');

const mapState = (state) => ({
  results: state.search.data,
  total: state.search.count,
  personalized: state.personalized,
  //chosenLat: selector(state, 'lat'),
  //chosenLng: selector(state, 'lng'),
});

const mapDispatch = {
};

export default GoogleMapLoader(withStyles(s)(connect(mapState, mapDispatch)(MapResults)), {
  libraries: ["places", "geometry", "markerwithlabel"],
  region: "US",
  language: "en",
  key: googleMapAPI,
});
