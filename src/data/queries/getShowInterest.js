import ShowInterestType from '../types/ShowInterestType';
import { ShowInterest } from '../models';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const getShowInterest = {

    type:  new List(ShowInterestType),

    args: {
        listId: { type:IntType }
    },

    async resolve({ request }, { listId }) {
     

        const userData = await ShowInterest.findAll({
                where: {
                    listId,
                }
            });
            return userData;
    }
}

export default getShowInterest;

/*

query getShowInterest ($listId: Int!){
    getShowInterest(listId: $listId){
        id
        listId
         beforeSunday
         middleSunday
         afterSunday
         beforeMonday
         middleMonday
         afterMonday
         beforeTuesday
         middleTuesday
         afterTuesday
         beforeWednesday
         middleWednesday
         afterWednesday
         beforeThursday
         middleThursday
         afterThursday
         beforeFriday
         middleFriday
         afterFriday
         beforeSaturday
         middleSaturday
         afterSaturday
    }
}

*/