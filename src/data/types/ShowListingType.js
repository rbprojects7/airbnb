import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import moment from 'moment';

import sequelize from '../sequelize';


import UserVerifiedInfoType from './UserVerifiedInfoType';
import CancellationType from './CancellationType';
import ListCalendarType from './ListCalendarType';
import StarLearningType from './StarLearningType';
import { BlockLisitingType } from './BlockType'
import ReviewsType from './ReviewsType';
import LearningAimType from './learningAimType';
import CancellationPolicyType from './CancellationPolicyType';

import { Cancellation, Reviews, ListCalendar, WishList, Listing, StarListing, Block, LearningAim, UserCancellationType, Reservation, SessionTime } from '../models';

const Profile = new ObjectType({
  name: 'profile',
  fields: {
    profileId: {
      type: IntType,
    },
    firstName: {
      type: StringType,
    },
    lastName: {
      type: StringType,
    },
    displayName: {
      type: StringType,
    },
    dateOfBirth: {
      type: StringType,
    },
    picture: {
      type: StringType,
    },
    location: {
      type: StringType,
    },
    info: {
      type: StringType,
    },
    homeTown: {
      type: StringType
    },
    createdAt: {
      type: StringType,
    }
  }
});

const StarType = new ObjectType({
  name: 'starList',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    verbalStrength: { type: IntType },
    logicStrength: { type: IntType },
    visualStrength: { type: IntType },
    musicalStrength: { type: IntType },
    bodyStrength: { type: IntType },
    peopleStrength: { type: IntType },
    innerStrength: { type: IntType },
    nauralisticStrength: { type: IntType },
    verbalDescription: { type: StringType },
    logicDescription: { type: StringType },
    visualDescription: { type: StringType },
    musicalDescription: { type: StringType },
    bodyDescription: { type: StringType },
    peopleDescription: { type: StringType },
    innerDescription: { type: StringType },
    nauralisticDescription: { type: StringType },
  },
});

const User = new ObjectType({
  name: 'user',
  fields: {
    email: {
      type: StringType,
      resolve(user) {
        return user.email;
      }
    },
    profile: {
      type: Profile,
      resolve(user) {
        return user.getProfile();
      }
    },
    verification: {
      type: UserVerifiedInfoType,
      resolve(user) {
        return user.getUserVerifiedInfo();
      }
    }
  }
});


const ListSettingsTypes = new ObjectType({
  name: 'listSettingsTypes',
  fields: {
    id: { type: IntType },
    typeName: { type: StringType },
    typeLabel: { type: StringType },
    step: { type: StringType },
    fieldType: { type: StringType },
    isEnable: { type: StringType },
    status: { type: StringType },
  },
});

const ListSettings = new ObjectType({
  name: 'listSettings',
  fields: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    settingsType: {
      type: ListSettingsTypes,
      resolve(listSettings) {
        return listSettings.getListSettingsTypes();
      }
    },
  }
});

const UserAmenities = new ObjectType({
  name: 'userAmenities',
  fields: {
    amenitiesId: {
      type: StringType,
      resolve(userAmenities) {
        return userAmenities.amenitiesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve(userAmenities) {
        return userAmenities.getListSettings();
      }
    },
  }
});

const UserSafetyAmenities = new ObjectType({
  name: 'userSafetyAmenities',
  fields: {
    safetyAmenitiesId: {
      type: StringType,
      resolve(userSafetyAmenities) {
        return userSafetyAmenities.safetyAmenitiesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve(userSafetyAmenities) {
        return userSafetyAmenities.getListSettings();
      }
    },
  }
});

// Spaces
const UserSpaces = new ObjectType({
  name: 'userSpaces',
  fields: {
    spacesId: {
      type: StringType,
      resolve(userSpaces) {
        return userSpaces.spacesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve(userSpaces) {
        return userSpaces.getListSettings();
      }
    },
  }
});

// House Rules
const UserHouseRules = new ObjectType({
  name: 'userHouseRules',
  fields: {
    id: {
      type: IntType,
    },
    houseRulesId: {
      type: StringType,
      resolve(userHouseRules) {
        return userHouseRules.houseRulesId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve(userHouseRules) {
        return userHouseRules.getListSettings();
      }
    },
  }
});

// List Blocked Dates
const ListBlockedDates = new ObjectType({
  name: 'listBlockedDates',
  fields: {
    blockedDates: {
      type: StringType,
      resolve(listBlockedDates) {
        return listBlockedDates.blockedDates;
      }
    },
    reservationId: {
      type: IntType,
      resolve(listBlockedDates) {
        return listBlockedDates.reservationId;
      }
    }
  }
});

// Listing More Data
const ListingData = new ObjectType({
  name: 'listingData',
  fields: {
    bookingNoticeTime: { type: StringType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    maxDaysNotice: { type: StringType },
    minNight: { type: IntType },
    maxNight: { type: IntType },
    basePrice: { type: StringType },
    cleaningPrice: { type: IntType },
    currency: { type: StringType },
    weeklyDiscount: { type: IntType },
    monthlyDiscount: { type: IntType },
    experienceType: { type: StringType },
    cancellationDescription: { type: StringType },
    cancellation: {
      type: CancellationType,
      resolve(listingData) {
        return Cancellation.findOne({
          where: {
            id: listingData.cancellationPolicy,
            isEnable: true
          }
        });
      }
    }
  }
});

// User Listing Data
const UserListingData = new ObjectType({
  name: 'userListingData',
  fields: {
    id: {
      type: IntType,
      resolve(userListingData) {
        return userListingData.id;
      }
    },
    settingsId: {
      type: IntType,
      resolve(userListingData) {
        return userListingData.settingsId;
      }
    },
    listsettings: {
      type: ListSettings,
      resolve(userListingData) {
        return userListingData.getListSettings();
      }
    },
  }

});

// Listing Steps
const UserListingSteps = new ObjectType({
  name: 'userListingSteps',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    step1: { type: StringType },
    step2: { type: StringType },
    step3: { type: StringType },
    currentStep: { type: IntType },
    status: { type: StringType },
  },
});

// Recommended Listing
const Recommend = new ObjectType({
  name: 'recommend',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    status: { type: StringType },
  },
});

// Listing Photos
const ListPhotos = new ObjectType({
  name: 'listPhotos',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    name: { type: StringType },
    type: { type: StringType },
    status: { type: StringType },
  },
});



const ShowListingType = new ObjectType({
  name: 'ShowListing',
  fields: {
    id: { type: IntType },
    userId: { type: StringType },
    title: { type: StringType },
    description: { type: StringType },
    bedrooms: { type: StringType },
    residenceType: { type: StringType },
    buildingSize: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    minAge: { type: IntType },
    maxAge: { type: IntType },
    personalDescribe: { type: StringType },
    maximumSize: { type: IntType },
    minimumSize: { type: IntType },
    minimumAge: {
      type: IntType,
      resolve(listing) {
        return listing.minAge
      }
    },
    maximumAge: {
      type: IntType,
      resolve(listing) {
        return listing.maxAge
      }
    },
    coverPhoto: { type: IntType },
    listPhotos: {
      type: new List(ListPhotos),
      resolve(listing) {

        return listing.getListPhotos()
        //return listing.getById(listing.coverPhoto)
      }
    },
    learningAim: {
      type: new List(LearningAimType),
      async resolve(listing) {
        return await LearningAim.findAll({
          where: {
            listId: listing.id,
          }
        })
      }
    },
    isMapTouched: { type: BooleanType },
    bookingType: { type: StringType },
    isPublished: { type: BooleanType },
    isReady: { type: BooleanType },
    status: { type: StringType },
    updatedAt: { type: StringType },
    createdAt: { type: StringType },
    publishDate: { type: StringType },
    isDeleted: { type: BooleanType },
    count: { type: IntType },
    user: {
      type: User,
      resolve(listing) {
        return listing.getUser();
      }
    },
    userAmenities: {
      type: new List(UserAmenities),
      resolve(listing) {
        return listing.getUserAmenities();
      }
    },
    userSafetyAmenities: {
      type: new List(UserSafetyAmenities),
      resolve(listing) {
        return listing.getUserSafetyAmenities();
      }
    },
    userSpaces: {
      type: new List(UserSpaces),
      resolve(listing) {
        return listing.getUserSpaces();
      }
    },
    settingsData: {
      type: new List(UserListingData),
      resolve(listing) {
        return listing.getUserListingData();
      }
    },
    houseRules: {
      type: new List(UserHouseRules),
      resolve(listing) {
        return listing.getUserHouseRules();
      }
    },
    listingData: {
      type: ListingData,
      resolve(listing) {
        return listing.getListingData();
      }
    },
    blocks: {
      type: new List(BlockLisitingType),
      async resolve(listing) {
        return await Block.findAll({
          include: [{
            model: SessionTime,
            as: 'sessionTime',
            required: true,
            duplicating: true
          }],
          where: {
            listId: listing.id
          },
          order: [
            [ sequelize.col('sessionTime.date'), 'ASC'],
          ],
        })
      }
    },
    blockedDates: {
      type: new List(ListBlockedDates),
      async resolve(listing) {
        return await listing.getListBlockedDates();
      }
    },
    listingSteps: {
      type: UserListingSteps,
      resolve(listing) {
        return listing.getUserListingSteps();
      }
    },
    recommend: {
      type: Recommend,
      resolve(listing) {
        return listing.getRecommend();
      }
    },
    reviewsCount: {
      type: IntType,
      async resolve(listing) {
        return await Reviews.count({
          where: {
            listId: listing.id,
            userId: listing.userId
          }
        });
      }
    },
    reviewsStarRating: {
      type: IntType,
      async resolve(listing) {
        return await Reviews.sum('rating', {
          where: {
            listId: listing.id,
            userId: listing.userId
          }
        });
      }
    },
    reviews: {
      type: new List(ReviewsType),
      async resolve(listing) {
        return await Reviews.findAll({
          where: {
            listId: listing.id,
            userId: listing.userId
          },
          limit: 1
        });
      }
    },
    calendars: {
      type: new List(ListCalendarType),
      async resolve(listing) {
        return await ListCalendar.findAll({
          where: {
            listId: listing.id,
          },
        });
      }
    },
    wishListStatus: {
      type: BooleanType,
      async resolve(listing, { }, request) {
        let userId = (request && request.user) ? request.user.id : undefined;
        let count = await WishList.count({
          where: {
            listId: listing.id,
            userId
          },
        });

        return (count) ? true : false
      }
    },
    isListOwner: {
      type: BooleanType,
      async resolve(listing, { }, request) {
        let userId = (request && request.user) ? request.user.id : undefined;
        let count = await Listing.count({
          where: {
            id: listing.id,
            userId
          },
        });

        return (count) ? true : false;
      }
    },
    starList: {
      type: StarType,
      async resolve(listing) {
        return await StarListing.findOne({
          where: {
            listId: listing.id,
          },
        });
      }
    },
    learningAimCount: {
      type: IntType,
      async resolve(listing) {
        const count = await LearningAim.findAll({
          where: {
            listId: listing.id
          }
        });
        return count.length;
      }
    },

    cancellationPolicy: {
      type: new List(CancellationPolicyType),
       resolve(listing) {
        return listing.getUserCancellationType(); 
      }
    },

    reservationForListing: {
      type: IntType,
        async resolve(listing) {
          return await Reservation.count({
            where: {
              listId: listing.id,
              reservationState: {
                $in: ['pending','approved']
              },
              // checkIn: {
              //   $gt:moment(moment(new Date())).format("yyyy-mm-dd"),
              // }
            }
          })
        }
    },

  },
});

export default ShowListingType;
