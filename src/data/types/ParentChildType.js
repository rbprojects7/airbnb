import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
  GraphQLList as List,

} from 'graphql';

import { UserProfile, Child, ReservationLearningAim } from '../models';

import ProfileType from './ProfileType';

import ChildType from './ChildType';
import ReservationLearningAimType from './ReservationLearningAimType';

const parentChildType = new ObjectType({
  name: 'parentChild',
  fields: {
    id: { type: IntType },
    userId: { type: StringType },
    reservationId: { type: IntType },
    isParent: { type: BooleanType },
    childId: { type: ID },
    blockUniqueId: { type: IntType },
    createdAt: { type: StringType },
    updatedAt: { type: StringType },
    status: { type: StringType },
    count: { type: IntType },
    prevId: { type: IntType },
    nextId: { type: IntType },
    learnerName: { type: StringType },
    learnerDOB : { type: StringType },
    isReview : { type: BooleanType },
    childName: {
      type: new List(ChildType),
      async resolve(parent) {
        let convertedNameResponse = [];
        const listingNameData = await Child.findAll({
          where: {
            //id: parent.childId
            childId: parent.childId
          }
        });

        if (listingNameData && listingNameData.length > 0) {
          Promise.all(listingNameData.map((item) => {
            convertedNameResponse.push({
              "id": item.id,
              "childId": item.childId,
              "firstName": item.firstName,
              "lastName": item.lastName,
              "preferredName": item.preferredName,
              "birthday": item.birthday,
              "preferences": item.preferences
            });
          }));
          return convertedNameResponse;
        }
        else {
          return await [];
        }
      }
    }

    // reservationLearningAim: {
    //   type: new List(ReservationLearningAimType),
    //   async resolve(parent) {
    //     let convertedLearningResponse = [];
    //     const learningData = await ReservationLearningAim.findAll({
    //       where: {
    //         blockUniqueId: parent.blockUniqueId
    //       }
    //     });
    //     console.log("ddd===",parent.blockUniqueId)
    //     console.log("yyyyy===",learningData)
    //     if (learningData && learningData.length > 0) {
    //       Promise.all(learningData.map((item) => {
    //         convertedLearningResponse.push({
    //           "id": item.id,
    //           "hostId": item.hostId,
    //           "guestId": item.guestId,
    //           "reservationId": item.reservationId,
    //           "value": item.value,
    //           "blockId": item.blockId,
    //           "blockUniqueId": item.blockUniqueId
    //         });
    //       }));
    //       return convertedLearningResponse;
    //     }
    //     else {
    //       return await [];
    //     }
    //   }
    // },

  },
});

export default parentChildType;
