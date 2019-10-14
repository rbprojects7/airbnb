// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
  } from 'graphql';
  
  import ThreadItemsType from '../../types/ThreadItemsType';
  import {ThreadItems} from '../../models';
  
  const getAllThreadItemsChild = {
  
      type: new List(ThreadItemsType),
  
      args: {
        threadId: { type: new NonNull(IntType)},
        reservationId: { type:IntType},
        offset: { type: IntType},
         },
  
      async resolve({request}, {threadId, reservationId, offset}) {
        const limit = 5;
          // Check if user already logged in
          if(request.user && !request.user.admin) {
  
          return await ThreadItems.findAll({ 
            where: {threadId, reservationId },
            order: [['createdAt', 'DESC']],
            limit,
            offset
           });
  
          } else {
              return {
                status: "notLoggedIn",
              };
          }
      }
  };
  
  export default getAllThreadItemsChild;