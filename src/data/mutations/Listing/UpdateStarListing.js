import StarLearningType from '../../types/StarLearningType';
import { StarListing } from '../../models';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UpdateStarListing = {
  type: StarLearningType,
  args: {
    listId: { type: new NonNull(IntType) },
    strengthName: { type: new NonNull(StringType) },
    strengthValue: { type: new NonNull(StringType) }
  },
  async resolve({ request }, { listId, strengthName, strengthValue }) {
     if (request.user && !request.user.admin) {
      const isStartLearningAvailable = await StarListing.findOne({
        where: { listId }
      });
      let updateStarListing;
      if (isStartLearningAvailable) {
        if (strengthName =="verbalDescription"){
            updateStarListing = await StarListing.update({
               verbalDescription: strengthValue
              }, {
                  where: {
                    listId
                  }
                });
        } else if (strengthName == "logicDescription") {
          updateStarListing = await StarListing.update({
            logicDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        } else if (strengthName == "visualDescription") {
          updateStarListing = await StarListing.update({
            visualDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        } else if (strengthName == "musicalDescription") {
          updateStarListing = await StarListing.update({
            musicalDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        } else if (strengthName == "bodyDescription") {
          updateStarListing = await StarListing.update({
            bodyDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        } else if (strengthName == "peopleDescription") {
          updateStarListing = await StarListing.update({
            peopleDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        }
        else if (strengthName == "innerDescription") {
          updateStarListing = await StarListing.update({
            innerDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        } else if (strengthName == "nauralisticDescription") {
          updateStarListing = await StarListing.update({
            nauralisticDescription: strengthValue
          }, {
              where: {
                listId
              }
            });
        }
       if (updateStarListing) {
          return {
            status: "success"
          };
        } else {
          return {
            status: "failed"
          };
        }
      }
    } else {
      return {
        status: "notLoggedIn"
      };
    }
  },
};

export default UpdateStarListing;
/**
mutation UpdateStarListing($listId: Int!, $strengthName: String!, $strengthValue: String!) {
    UpdateStarListing(listId: $listId, strengthName: $strengthName, strengthValue: $strengthValue) {
        status
    }
}
 */
