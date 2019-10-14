import { SessionTime, Reservation, Listing } from "../models";
import { SessionTimeType } from "./SessionTimeType";
import  ReservationType  from "./ReservationType";
import ShowListingType from './ShowListingType';

import moment from 'moment';

import {
    GraphQLInt as IntType,
    GraphQLObjectType as ObjectType,
    GraphQLInputObjectType,
    GraphQLString as StringType,
    GraphQLID as IdType,
    GraphQLNonNull as NonNull,
    GraphQLList as List
} from 'graphql';

const BlockByReservationType = new ObjectType({
    name: 'BlockByReservationType',
  fields: {
    id: { type: new NonNull(IdType) },
    listId: { type: IntType },
    price: { type: StringType },
    blockUniqueId: { type: new NonNull(IdType) },
    reservationItem: {
      type: new List(ReservationType),
      async resolve(block) {
        const response = await Reservation.findAll(
          {
            where: {
              blockId: block.id,
              reservationState: {
                $in: ['pending','approved']
              },
              checkIn: {
                $gt: new Date()
              },
              checkOut: {
                $gt: new Date()
              }
            }
          });
        return response;
      }
    },
    reservationItemCount: {
      type: IntType,
      async resolve(block) {
        const response = await Reservation.count(
          {
            where: {
              blockId: block.id,
              reservationState: {
                $in: ['pending', 'approved']
              },
              checkIn: {
                $gt: new Date()
              },
              checkOut: {
                $gt: new Date()
              }
            }
          });
        return response;
      }
    },
    sessionTime: {
      type: new List(SessionTimeType),
      async resolve(block) {
        const response = await SessionTime.findAll(
          {
            where: {
              blockId: block.id
            }
          });
        return response;
      }
    },
    listingItem: {
      type: ShowListingType,
      async resolve(block) {
        const response = await Listing.findOne(
          {
            where: {
              id: block.listId
            }
          });
        return response;
      }
    },
  }
});

export default BlockByReservationType;