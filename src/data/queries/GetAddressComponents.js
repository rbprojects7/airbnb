import GetAddressComponentsType from '../types/GetAddressComponentsType';

import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import fetch from '../../core/fetch';

// Constants
import { googleMapAPI } from '../../config';

const GetAddressComponents = {

  type: GetAddressComponentsType,

  args: {
    address: { type: StringType },
  },

  async resolve({ request }, { address }) {

    const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + googleMapAPI;
    const resp = await fetch(URL);
    const data = await resp.json();
    let locationData = {};
    let addressComponents;

    if(data) {
      data.results.map((value, key) => {
        value.address_components.map((item, key) => {
          if(item.types[0] == "administrative_area_level_1") {
            locationData["administrative_area_level_1_short"] = item.short_name;
            locationData["administrative_area_level_1_long"] = item.long_name;
          } else if(item.types[0] == "country") {
              locationData[item.types[0]] = item.short_name;
          } else {
              locationData[item.types[0]] = item.long_name;
          }
        });
      });

       

      addressComponents = JSON.stringify(locationData);
      
      return {
        addressComponents,
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng
      }
    }

  },
};

export default GetAddressComponents;
