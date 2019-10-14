import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLBoolean as BooleanType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLNonNull as NonNull,
    GraphQLList as List,
  } from 'graphql';
  
  const ShowInterestType = new ObjectType({
    name: 'ShowInterestType',
    fields: {
      id: { type: IntType },

      listId: {type: IntType },

      beforeSunday:{type: IntType},
    
      middleSunday:{type: IntType},

      afterSunday:{type: IntType},

      beforeMonday:{type: IntType},
    
      middleMonday:{type: IntType},

      afterMonday:{type: IntType},
    
      beforeTuesday:{type: IntType},
    
      middleTuesday:{type: IntType},

      afterTuesday:{type: IntType},
    
      beforeWednesday:{type: IntType},
    
      middleWednesday:{type: IntType},

      afterWednesday:{type: IntType},
    
      beforeThursday:{type: IntType},
    
      middleThursday:{type: IntType},

      afterThursday:{type: IntType},
    
      beforeFriday:{type: IntType},
    
      middleFriday:{type: IntType},

      afterFriday:{type: IntType},
    
      beforeSaturday:{type: IntType},
      
      middleSaturday:{type: IntType},

      afterSaturday:{type: IntType},

      status: { type: StringType },
    },
  });
  
  export default ShowInterestType;
  