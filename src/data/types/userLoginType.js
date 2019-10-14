import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
} from 'graphql';

const UserLogin = new ObjectType({
  name: 'userLogin',
  fields: {
    email: { type: StringType },
    password: { type: StringType },
    status: {type: StringType},
    emailToken: {type: StringType},
    isNewsLetterAccepted: { type: IntType },
  },
});

export default UserLogin;
