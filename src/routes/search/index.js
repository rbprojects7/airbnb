import React from 'react';
import FooterLessLayout from '../../components/Layout/FooterLessLayout';
import Search from './Search';
import fetch from '../../core/fetch';

import { searchListing } from '../../actions/searchListing';
import { getListingFields } from '../../actions/getListingFields';

import { showLoading, hideLoading } from 'react-redux-loading-bar'

const title = 'Search';

export default {

  path: '/s',

  async action({ params, store, query }) {

    store.dispatch(showLoading());

    // Fetch Search Settings
    const searchQuery = `
      {
        getSearchSettings {
          minPrice
          maxPrice
          priceRangeCurrency
        }
      }
    `;

    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();
    // From Redux Store
    const geographyData = store.getState().personalized.geography;
    const personCapacityData = store.getState().personalized.personCapacity;
    const startDateData = store.getState().personalized.startDate;
    const endDateData = store.getState().personalized.endDate;
    const minimumAgeData = store.getState().personalized.minimumAge;
    const maximumAgeData = store.getState().personalized.maximumAge;
    //console.log("min", minimumAgeData);
    let personCapacity, dates, geography, currentPage = 1, minimumAge, maximumAge;
    let initialFilter = {};

    // Geography Data
    if (geographyData != undefined && geographyData != null) {
      geography = geographyData;
    } else {
      if ("address" in query && query.address) {
        let latAndLngQuery = `
            query ($address: String) {
              GetAddressComponents (address:$address) {
                addressComponents
                lat
                lng
              }
            }
          `;
        const locationResp = await fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: latAndLngQuery,
            variables: { address: query.address }
          }),
          credentials: 'include',
        });

        const { data } = await locationResp.json();
        initialFilter["address"] = query.address;
        initialFilter["geography"] = data.GetAddressComponents.addressComponents;
        initialFilter["lat"] = data.GetAddressComponents.lat;
        initialFilter["lng"] = data.GetAddressComponents.lng;
        geography = data.GetAddressComponents.addressComponents;
      }
    }

    // PersonCapacity
    if (personCapacityData != undefined && personCapacityData != null) {
      personCapacity = personCapacityData;
    } else {
      if ("guests" in query && query.guests) {
        initialFilter["personCapacity"] = Number(query.guests);
        personCapacity = Number(query.guests);
      }
    }

    if (startDateData != undefined && startDateData != null && endDateData != undefined && endDateData != null) {
      dates = `'${startDateData}' AND '${endDateData}'`;
    } else {
      if ("startDate" in query && "endDate" in query && query.startDate && query.endDate) {
        initialFilter["startDate"] = query.startDate;
        initialFilter["endDate"] = query.endDate;
        dates = `'${query.startDate}' AND '${query.endDate}'`;
      }
    }

    if (minimumAgeData && maximumAgeData) {
      minimumAge = minimumAgeData;
      maximumAge = maximumAgeData;
      // ageRange = `'${minimumAgeData}' AND '${maximumAgeData}'`;
    } else {
      if ("minimumAge" in query && "maximumAge" in query && query.minimumAge && query.maximumAge) {
        initialFilter["minimumAge"] = Number(query.minimumAge);
        initialFilter["maximumAge"] = Number(query.maximumAge);
        minimumAge = Number(query.minimumAge);
        maximumAge = Number(query.maximumAge);
      }
    }


    await store.dispatch(searchListing({ personCapacity, dates, geography, currentPage, minimumAge, maximumAge }))

    return {
      title,
      component: <FooterLessLayout><Search initialFilter={initialFilter} searchSettings={data.getSearchSettings} /></FooterLessLayout>,
    };
  },

};