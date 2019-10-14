// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLObjectType as ObjectType
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';
import { BlockType } from '../types/BlockType'

// Sequelize models
import {
  Listing,
  UserListingSteps,
  UserHouseRules,
  ListingData,
  ListBlockedDates,
  ListPhotos,
  UserCancellationType
} from '../../data/models';

const updateListingStep3 = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    houseRules: { type: new List(IntType) },
    bookingNoticeTime: { type: StringType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    maxDaysNotice: { type: StringType },
    minNight: { type: IntType },
    maxNight: { type: IntType },
    basePrice: { type: FloatType },
    cleaningPrice: { type: FloatType },
    currency: { type: StringType },
    weeklyDiscount: { type: IntType },
    monthlyDiscount: { type: IntType },
    blockedDates: { type: new List(StringType) },
    bookingType: { type: new NonNull(StringType) },
    cancellationPolicy: { type: new List(IntType) },
    experienceType: { type: StringType },
    cancellationDescription: { type: StringType}
  },

  async resolve({ request, response }, {
    id,
    houseRules,
    bookingNoticeTime,
    checkInStart,
    checkInEnd,
    maxDaysNotice,
    minNight,
    maxNight,
    basePrice,
    cleaningPrice,
    currency,
    weeklyDiscount,
    monthlyDiscount,
    blockedDates,
    bookingType,
    cancellationPolicy,
    experienceType,
    cancellationDescription
   }) {

    let isListUpdated = false;

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      // Confirm whether the Listing Id is available
      const isListingAvailable = await Listing.findById(id);

      if (isListingAvailable != null) {

        // Update Booking Type
        if (bookingType) {
          const updateBookingType = await Listing.update({
            bookingType
          }, {
              where
            })
        }

        // House Rules
        if (houseRules) {
          const removeHouseRules = await UserHouseRules.destroy({
            where: {
              listId: id
            }
          });
          if (houseRules.length > 0) {
            houseRules.map(async (item, key) => {
              let updateHouseRules = await UserHouseRules.create({
                listId: id,
                houseRulesId: item
              })
            });
          }
        }

        // Cancellation Policies
        if (cancellationPolicy) {
          const removeHouseRules = await UserCancellationType.destroy({
            where: {
              listId: id
            }
          });
          if (cancellationPolicy.length > 0) {
            cancellationPolicy.map(async (item, key) => {
              let updateHouseRules = await UserCancellationType.create({
                listId: id,
                cancellationType: item
              })
            });
          }
        }


        // Blocked Dates
        if (blockedDates) {
          // Collect all records of Blocked Dates except Reservation Dates
          const blockedDatesData = await ListBlockedDates.findAll({
            where: {
              listId: id,
              reservationId: {
                $eq: null
              },
              calendarId: {
                $ne: null
              },
            }
          });

          // Remove all the blocked dates except reservation dates
          const removeBlockedDates = await ListBlockedDates.destroy({
            where: {
              listId: id,
              reservationId: {
                $eq: null
              }
            }
          });

          //if(blockedDates.length > 0) {
          if (blockedDatesData.length > 0) {
            let blockedDatesItems = [];
            blockedDatesData.map((item, key) => {
              blockedDatesItems[key] = new Date(item.blockedDates);
            });
            blockedDates.map(async (item, key) => {
              let day = new Date(item);
              let blockedItem = blockedDatesItems.map(Number).indexOf(+day);
              if (blockedItem > -1) {
                /*let createRecord = await ListBlockedDates.create({
                  listId: id,
                  blockedDates: item,
                  calendarId: blockedDatesData[blockedItem].calendarId
                });*/
                let createRecord = await ListBlockedDates.findOrCreate({
                  where: {
                    listId: id,
                    blockedDates: item,
                    calendarId: blockedDatesData[blockedItem].calendarId
                  },
                  defaults: {
                    //properties you want on create
                    listId: id,
                    blockedDates: item,
                    calendarId: blockedDatesData[blockedItem].calendarId
                  }
                });
              } else {
                /*let createRecord = await ListBlockedDates.create({
                  listId: id,
                  blockedDates: item,
                });*/
                let createRecord = await ListBlockedDates.findOrCreate({
                  where: {
                    listId: id,
                    blockedDates: item
                  },
                  defaults: {
                    //properties you want on create
                    listId: id,
                    blockedDates: item,
                  }
                });
              }
            });
          } else {
            blockedDates.map(async (item, key) => {
              let updateBlockedDates = await ListBlockedDates.findOrCreate({
                where: {
                  listId: id,
                  blockedDates: item
                },
                defaults: {
                  //properties you want on create
                  listId: id,
                  blockedDates: item
                }
              });
            });
          }
          //}
        }

        // Check if record already available for this listing
        const isListingIdAvailable = await ListingData.findOne({ where: { listId: id } });

        if (isListingIdAvailable != null) {
          // Update Record
          const updateData = ListingData.update({
            bookingNoticeTime: bookingNoticeTime,
            checkInStart: checkInStart,
            checkInEnd: checkInEnd,
            maxDaysNotice: maxDaysNotice,
            minNight: minNight,
            maxNight: maxNight,
            basePrice: basePrice,
            cleaningPrice: cleaningPrice,
            currency: currency,
            weeklyDiscount,
            monthlyDiscount,
            experienceType,
            cancellationDescription
          },
            {
              where: {
                listId: id
              }
            });
          isListUpdated = true;
        } else {
          // Create New Record
          const createData = ListingData.create({
            listId: id,
            bookingNoticeTime: bookingNoticeTime,
            checkInStart: checkInStart,
            checkInEnd: checkInEnd,
            maxDaysNotice: maxDaysNotice,
            minNight: minNight,
            maxNight: maxNight,
            basePrice: basePrice,
            cleaningPrice: cleaningPrice,
            currency: currency,
            weeklyDiscount: weeklyDiscount,
            monthlyDiscount: monthlyDiscount,
            experienceType,
            cancellationDescription
          });

          if (createData) {
            isListUpdated = true;
          }
        }


        if (isListUpdated) {
          const photosCount = await ListPhotos.count({ where: { listId: id } });
          if (photosCount > 0) {
            const updateListingStatus = await Listing.update({
              isReady: true
            }, {
                where: { id }
              });
          }
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
          status: 'notAvailable'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListingStep3;
