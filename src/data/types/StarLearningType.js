import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

const starLeraningType = new ObjectType({
  name: 'StarLearning',
  fields: {
    id: { type: IntType },
    listId: {type: IntType},
    verbalStrength: { type: IntType },
    logicStrength: { type: IntType},
    visualStrength: { type: IntType},
    musicalStrength: { type: IntType},
    bodyStrength: { type: IntType},
    peopleStrength: { type: IntType}, 
    innerStrength: { type: IntType},
    nauralisticStrength: { type: IntType},
    verbalDescription: { type: StringType },
    logicDescription: { type: StringType },
    visualDescription: { type: StringType },
    musicalDescription: { type: StringType },
    bodyDescription: { type: StringType },
    peopleDescription: { type: StringType },
    innerDescription: { type: StringType },
    nauralisticDescription: { type: StringType },
    status: { type: StringType }
    },
});

export default starLeraningType;
