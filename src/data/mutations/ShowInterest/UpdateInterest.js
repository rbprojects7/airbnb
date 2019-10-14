import ShowInterestType from '../../types/ShowInterestType';
import { ShowInterest } from '../../models';
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const UpdateInterest = {
  type: ShowInterestType,
  args: {
    listId: { type: new NonNull(IntType) },
    interestName: { type: new NonNull(StringType) },
    interestCount: { type: new NonNull(StringType) },
  },
  async resolve({ request }, {
    listId,
    interestName,
    interestCount,
  }) {

    // if (request.user && !request.user.admin) {
    const isShowInterestAvailable = await ShowInterest.findOne({
      where: { listId }
    });

    let updateShowInterest, currentValue;
    if (isShowInterestAvailable != null) {
      currentValue = isShowInterestAvailable.dataValues && isShowInterestAvailable.dataValues[interestName] ? Number(isShowInterestAvailable.dataValues[interestName]) + 1 : 1;
      updateShowInterest = await ShowInterest.update({
        [interestName]: currentValue
      }, {
          where: {
            listId
          }
        });

    } else {
      const createShowInterest = await ShowInterest.create({
        listId:listId,
        [interestName]: 1
      }, 
      );
       if (createShowInterest) {
      return {
        status: "success"
      };
    }
    }
    if (updateShowInterest) {
      return {
        status: "success"
      };
    } else {
      return {
        status: "failed"
      };
    }
    //} 
  },
};

export default UpdateInterest;
/**
mutation UpdateInterest($listId: Int!, $interestName: String!, $interestCount: String!) {
    UpdateInterest(listId: $listId, interestName: $interestName, interestCount: $interestCount) {
        status
    }
}
 */
