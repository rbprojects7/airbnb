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
import CreateListingType from '../types/CreateListingType';

// Sequelize models
import {
  Listing, UserListingSteps, UserListingData, UserSpaces, StarListing, LearningAim 
} from '../../data/models';

import fetch from '../../core/fetch';

const createListing = {

  type: CreateListingType,

  args: {
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    // country: { type: StringType },
    // street: { type: StringType },
    // buildingName: { type: StringType },
    // city: { type: StringType },
    // state: { type: StringType },
    // zipcode: { type: StringType },
    // lat: { type: FloatType },
    // lng: { type: FloatType },
    minimumAge: { type: IntType },
    maximumAge: { type: IntType },
    title: { type: StringType },
    description: { type: StringType },
    spaces: { type: new List(IntType) },
    personalDescribe: { type: StringType },
    maximumSize: { type: IntType },
    minimumSize: { type: IntType },
    verbalStrength: { type: IntType },
    logicStrength: { type: IntType},
    visualStrength: { type: IntType},
    musicalStrength: { type: IntType},
    bodyStrength: { type: IntType},
    peopleStrength: { type: IntType}, 
    innerStrength: { type: IntType},
    nauralisticStrength: { type: IntType},
    verbalDescription: { type: StringType },
    logicDescription: { type: StringType },
    visualDescription: { type: StringType },
    musicalDescription: { type: StringType },
    bodyDescription: { type: StringType },
    peopleDescription: { type: StringType },
    innerDescription: { type: StringType },
    nauralisticDescription: { type: StringType },
    // learningAims: { type: StringType },

  },

  async resolve({ request, response }, {
    roomType,
    houseType,
    residenceType,
    bedrooms,
    buildingSize,
    bedType,
    beds,
    personCapacity,
    bathrooms,
    bathroomType,
    // country,
    // street,
    // buildingName,
    // city,
    // state,
    // zipcode,
    // lat,
    // lng,
    minimumAge,
    maximumAge,
    title,
    description,
    spaces,
    personalDescribe,
    maximumSize,
    minimumSize,
    verbalStrength,
    logicStrength,
    visualStrength,
    musicalStrength,
    bodyStrength,
    peopleStrength, 
    innerStrength,
    nauralisticStrength,
    verbalDescription,
    logicDescription,
    visualDescription,
    musicalDescription,
    bodyDescription,
    peopleDescription,
    innerDescription,
    nauralisticDescription,
    // learningAims
  }) {

    if (request.user && request.user.admin != true) {

      let minAge = minimumAge;
      let maxAge = maximumAge;
      // let learningAimsData;

      const doCreateListing = await Listing.create({
        userId: request.user.id,
        residenceType: residenceType,
        bedrooms: bedrooms,
        beds: beds,
        personCapacity: personCapacity,
        bathrooms: bathrooms,
        // country: country,
        // street: street,
        // buildingName: buildingName,
        // city: city,
        // state: state,
        // zipcode: zipcode,
        // lat: latValue,
        // lng: lngValue,
        minAge,
        maxAge,
        title: title,
        description: description,
        personalDescribe: personalDescribe,
        maximumSize: maximumSize,
        minimumSize: minimumSize
      });

      if (doCreateListing) {

        // Recently added list id
        const id = doCreateListing.dataValues.id;
     // Assign other settings values in here
        let otherListSettings = [
          { settingsId: roomType, listId: id },
          { settingsId: houseType, listId: id },
          { settingsId: buildingSize, listId: id },
          { settingsId: bedType, listId: id },
          { settingsId: bathroomType, listId: id }
        ];

        // Bulk create on UserListingData to store other settings of this listingSteps
        const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);

        if (spaces) {
          spaces.map(async (item) => {
            await UserSpaces.create({
              listId: id,
              spacesId: item
            })
          });
        }
      

        // learningAimsData = JSON.parse(learningAims);

        // if(learningAimsData && learningAimsData.length > 0){
        //   await Promise.all(learningAimsData.map(async (item, key) => {
        //     await LearningAim.create({
        //       listId: id,
        //       value: item.value,
        //     })
        //   })
        // )
        // }
      

        const createLearning = StarListing.create({
          listId: id,
          verbalStrength: verbalStrength,
          logicStrength: logicStrength,
          visualStrength: visualStrength,
          musicalStrength: musicalStrength,
          bodyStrength: bodyStrength,
          peopleStrength: peopleStrength, 
          innerStrength: innerStrength,
          nauralisticStrength: nauralisticStrength,
          verbalDescription: verbalDescription,
          logicDescription: logicDescription,
          visualDescription: visualDescription,
          musicalDescription: musicalDescription,
          bodyDescription: bodyDescription,
          peopleDescription: peopleDescription,
          innerDescription: innerDescription,
          nauralisticDescription: nauralisticDescription,
        });

        return {
          status: "success",
          id: id
        };
      } else {
        return {
          status: "failed",
        };
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default createListing;
