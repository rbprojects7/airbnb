import {
    GraphQLObjectType as ObjectType,
    GraphQLInt as IntType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
} from 'graphql';

const ReservationLearningAimType = new ObjectType({
    name: 'ReservationLearningAim',
    fields: {
        id: { type: new NonNull(ID) },
        hostId: { type: StringType },
        guestId: { type: StringType },
        reservationId: { type: IntType },
        listId: { type: IntType },
        learningAimId: { type: IntType },
        value: { type: StringType },
        blockId: { type: StringType },
        blockUniqueId: { type: IntType }
    },
});

export default ReservationLearningAimType;
