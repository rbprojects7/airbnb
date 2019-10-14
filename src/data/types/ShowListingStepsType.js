import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

// Models
import { Listing } from '../models';
import ShowListingType from './ShowListingType';
import { LearningAim } from '../models';
import LearningAimType from './learningAimType';

const ShowListingStepsType = new ObjectType({
  name: 'ShowListingSteps',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    step1: { type: StringType },
    step2: { type: StringType },
    step3: { type: StringType },
    listing: {
      type: ShowListingType,
      resolve(userListingSteps) {
        return Listing.findOne({ where: { id: userListingSteps.listId } });
      }
    },
    learningAimCount: {
      type: IntType,
      async resolve(listing) {
        const count = await LearningAim.findAll({
          where: {
            listId: listing.listId
          }
        });
        return count.length;
      }
    },
    currentStep: { type: IntType },
    status: { type: StringType },
  },
});

export default ShowListingStepsType;
