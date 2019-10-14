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
  
  // Sequelize models
  import {
    Listing,
    UserAmenities,
    UserSafetyAmenities,
    UserSpaces,
    UserListingSteps,
    UserListingData,
    StarListing,
    LearningAim
  } from '../../data/models';
  
  const updateListingStep1 = {
  
    type: EditListingType,
  
    args: {
      id: { type: IntType },
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
      amenities: { type: new List(IntType) },
      safetyAmenities: { type: new List(IntType) },
      spaces: { type: new List(IntType) },
      minimumAge: {type: IntType},
      maximumAge: {type: IntType},   
      title: { type: StringType },
      description: { type: StringType },
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
      // learningAims: { type: StringType},
  
    },
  
    async resolve({ request, response }, {
      id,
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
      amenities,
      safetyAmenities,
      spaces,
      minimumAge,
      maximumAge,    
      title,
      description,
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
      
      let isListUpdated = false;
      let learningUpdated = false;
      //  let  learningAimsData;
  
  
      let minAge = minimumAge;
      let maxAge = maximumAge;
      if (request.user || request.user.admin) {
  
        let where = { id };
        if (!request.user.admin) {
          where = {
            id,
            userId: request.user.id
          }
        };
  
        const doUpdateListing = await Listing.update({
          residenceType: residenceType,
          bedrooms: bedrooms,
          bedType: bedType,
          beds: beds,
          personCapacity: personCapacity,
          bathrooms: bathrooms,
          minAge,
          maxAge,
          title: title,
          description: description,
        },
          {
            where
          })
          .spread(function (instance) {
            // Check if any rows are affected
            if (instance > 0) {
              isListUpdated = true;
            }
          });
  
        // User Settings Data
        if (isListUpdated) {
          const removeUserSettingsData = await UserListingData.destroy({
            where: {
              listId: id
            }
          });
  
          // let otherListSettings = [
          //   { settingsId: roomType, listId: id },
          //   { settingsId: houseType, listId: id },
          //   { settingsId: buildingSize, listId: id },
          //   { settingsId: bedType, listId: id },
          //   { settingsId: bathroomType, listId: id },
            
          // ];
          // // Bulk create on UserListingData to store other settings of this listingSteps
          // const createOtherSettings = await UserListingData.bulkCreate(otherListSettings);
  
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
  
          // Spaces
          if (spaces != null && spaces != undefined) {
            const removeSpaces = await UserSpaces.destroy({
              where: {
                listId: id
              }
            });
            spaces.map(async (item, key) => {
              let updateUserSpaces = await UserSpaces.create({
                listId: id,
                spacesId: item
              })
            });
          }
  
          // learningAimsData = JSON.parse(learningAims);
  
          // if (learningAimsData != null && learningAimsData != undefined) {
          //   const removelearningAims = await LearningAim.destroy({
          //     where: {
          //       listId: id
          //     }
          //   });
  
          //   await Promise.all(learningAimsData.map(async (item, key) => {
          //       let updatelearningAims = await LearningAim.create({
          //         listId: id,
          //         value: item.value,
                  
          //       })
          //     })
          //   );
          // }
  
          const islearningAvailable = await StarListing.findOne({ where: { listId: id } });
          if (islearningAvailable != null) {
            // Update Record
            const updateLearning = StarListing.update({
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
            },
              {
                where: {
                  listId: id              }
              });
              learningUpdated = true;
          } else {
            // Create New Record
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
            if (createLearning) {
              learningUpdated = true;
             }
          
          }
  
        }
  
  
  
  
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
  
  export default updateListingStep1;
  