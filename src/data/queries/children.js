import ChildType from '../types/ChildType';
import { Child } from "../models";
import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';


const children = {

  type: new List(ChildType),
  args: {
    parentId: { type: StringType }
  },

  async resolve(root, { parentId }) {

    if(parentId) {

      return await Child.all({
        where: {
          parentId
        },
        order: [['createdAt', 'ASC']],
      });

    } else {
      return {
        status: "failed"
      }
    }
  },
};

export default children;
