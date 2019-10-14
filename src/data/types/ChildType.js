import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,

} from 'graphql';

const ChildType = new ObjectType({
  name: 'Child',
  fields: {
    id: { type: new NonNull(ID) },
    parentId: { type: StringType },
    email: { type: StringType },
    preferredName: { type: StringType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    birthday: { type: StringType },
    preferences: { type: StringType },
    childId: { type: new NonNull(ID) }
  },
});

export default ChildType;
