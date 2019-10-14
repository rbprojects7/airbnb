// GrpahQL
import {
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
  } from 'graphql';
  
  import userAccountType from '../types/userAccountType';
  
  // Sequelize models
  import { UserProfile } from '../../data/models';
  
  const sendMessage = {
  
    type: userAccountType,
  
    args: {
        isNewsLetterAccepted: { type: IntType },
    },
  
    async resolve({ request, response }, {
        isNewsLetterAccepted
    }) {
  
      // Check if user already logged in
      if(request.user && !request.user.admin) {
  
          const userId = request.user.id;
  
          const updateUserProfile = await UserProfile.update({
            isNewsLetterAccepted
          },
            {
              where: {
                userId
              }
            }
          );
  
          if(updateUserProfile){
            return {
                status: 'success'
            };
          } else {
            return {
              status: 'failed to create thread items'
            }
          }
  
      } else {
          return {
            status: "notLoggedIn",
          };
      }
    },
  };
  
  export default sendMessage;
  