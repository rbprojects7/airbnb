import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IdType,
  GraphQLInputObjectType,
  GraphQLInt as IntType,

} from 'graphql';

const SessionTimeType = new ObjectType({
  name: 'SessionTimeType',
  fields: {
    startTime: { type: StringType },
    endTime: { type: StringType },
    date: { type: StringType },
    id: { type: IdType },
    blockId: { type: StringType },
    status: { type: StringType },
    reservationId: { type: IntType },
    blockUniqueId: { type: IntType },
  }
});

const Session = new GraphQLInputObjectType({
  name: 'Session',
  fields: {
    startTime: { type: StringType },
    endTime: { type: StringType },
    date: { type: StringType },
    id: { type: IdType },
    blockId: { type: StringType },
    blockUniqueId: { type: IdType },
  }
});

export { SessionTimeType, Session };
