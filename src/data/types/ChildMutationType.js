import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ChildMutationType = new ObjectType({
  name: 'ChildMutation',
  fields: {
    id: { type: new NonNull(ID) },
    parentId: { type: StringType },
    email: { type: StringType },
    preferredName: { type: StringType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    birthday: { type: StringType },
    preferences: { type: StringType },
    status: { type: StringType }
  },
});

export default ChildMutationType;
