// GrpahQL
import {GraphQLList as List,} from 'graphql';
// Sequelize models
import {SessionTime} from '../../../data/models';
// Types
import {Session, SessionTimeType} from '../../types/SessionTimeType'

const CreateSessions = {

  type: SessionTimeType,

  args: {
    sessionList: {type: new List(Session)},
  },

  async resolve({request, response}, {
    sessionList
  }) {
    // Check if user already logged in
    if (request.user || request.user.admin) {
      const promises = [];
      for (let session of sessionList) {
        if(session.id) {
          promises.push(SessionTime.update({
            startTime: session.startTime,
            endTime: session.endTime
          },{
            where:{
              id:session.id
            },
          }))
        } else {
        promises.push(SessionTime.create(session));
        }
      }
      const response = await Promise.all(promises);

      if (response) {
        return {
          status: 'success'
        };
      } else {
        return {
          status: 'failed to create sessionTime'
        }
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  }
};

export default CreateSessions;

/**
 mutation CreateSessions(
 $sessionList: [Session]!,
 ){
    CreateSessions(
      sessionList: $sessionList,
    ) {
      status
    }
}
 **/
