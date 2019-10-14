import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
  } from 'graphql';
  
  const CheckSessionType = new ObjectType({
    name: 'CheckSession',
    fields: {
      status: { type: StringType }
    },
  });
  
  export default CheckSessionType;
  