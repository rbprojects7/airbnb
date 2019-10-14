import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
} from 'graphql';

const UserRegister = new ObjectType({
  name: 'userRegister',
  fields: {
    firstName: { type: StringType },
    lastName: { type: StringType },
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    dateOfBirth: { type: StringType },
    status: {type: StringType},
    emailToken: {type: StringType},
    isNewsLetterAccepted: { type: IntType },
  },
});

export default UserRegister;
