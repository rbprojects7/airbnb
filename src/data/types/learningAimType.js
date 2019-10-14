import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const LearningAimType = new ObjectType({
  name: 'LearningAim',
  fields: {
    id: { type: new NonNull(ID) },
    listId: {type: IntType},
    parentId: { type: StringType },
    value: { type: StringType },
    learningAimId: { type: new NonNull(ID) }
  },
});

export default LearningAimType;
