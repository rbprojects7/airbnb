// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

import fetch from '../../core/fetch';


// Sequelize models
import {
  Listing,
  UserListingSteps,
  ListPhotos,
  UserAmenities,
  UserSafetyAmenities,
  UserListingData,
} from '../../data/models';

const updateListingStep2 = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    isMapTouched: { type: BooleanType },
    title: { type: StringType },
    description: { type: StringType },
    coverPhoto: { type: IntType },
    amenities: { type: new List(IntType) },
    safetyAmenities: { type: new List(IntType) },
  },

  async resolve({ request, response }, {
    id,
    country,
    street,
    buildingName,
    city,
    state,
    zipcode,
    lat,
    lng,
    isMapTouched,
    title,
    description,
    coverPhoto,
    amenities,
    safetyAmenities,
  }) {

    let isListUpdated = false;

    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      const address = street + ", " + city + ", " + state + ", " + country + ", " + zipcode;

      const query = `
        query ($address: String) {
          locationItem(address: $address) {
            street
            city
            state
            country
            zipcode
            lat
            lng
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
          query: query,
          variables: { address: address }
        }),
        credentials: 'include',
      });

      const { data } = await resp.json();
      let latValue = lat;
      let lngValue = lng;

      if (data.locationItem != null) {
        latValue = data.locationItem.lat;
        lngValue = data.locationItem.lng;
      }


      const doUpdateListing = await Listing.update({
        country: country,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        zipcode: zipcode,
        lat: lat,
        lng: lng,
        isMapTouched: isMapTouched,
        title,
        description,
        coverPhoto
      },
        {
          where
        })
        .then(function (instance) {
          // Check if any rows are affected
          if (instance > 0) {
            isListUpdated = true;
          }
        });

      // if (isListUpdated) {
      //   const removeUserSettingsData = await UserListingData.destroy({
      //     where: {
      //       listId: id
      //     }
      //   });
      // Amenities
      if (amenities != null && amenities != undefined) {
        const removeAmenities = await UserAmenities.destroy({
          where: {
            listId: id
          }
        });
        amenities.map(async (item, key) => {
          let updateAmenities = await UserAmenities.create({
            listId: id,
            amenitiesId: item
          })
        });
      }

      // Safety Amenities
      if (safetyAmenities != null && safetyAmenities != undefined) {
        const removeSafetyAmenities = await UserSafetyAmenities.destroy({
          where: {
            listId: id
          }
        });
        safetyAmenities.map(async (item, key) => {
          let updateSafetyAmenities = await UserSafetyAmenities.create({
            listId: id,
            safetyAmenitiesId: item
          })
        });
      }
      // }
      if (isListUpdated) {
        return {
          status: 'success'
        }
      } else {
        return {
          status: 'failed'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListingStep2;