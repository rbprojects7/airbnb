import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

const CreateListingType = new ObjectType({
  name: 'CreateListing',
  fields: {
    id: { type: IntType },
    roomType: { type: StringType },
    houseType: { type: StringType },
    residenceType: { type: StringType },
    bedrooms: { type: StringType },
    buildingSize: { type: StringType },
    bedType: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    bathroomType: { type: StringType },
    // country: { type: StringType },
    // street: { type: StringType },
    // buildingName: { type: StringType },
    // city: { type: StringType },
    // state: { type: StringType },
    // zipcode: { type: StringType },
     status: { type: StringType },
    // lat: { type: FloatType },
    // lng: { type: FloatType },
    // age: {type: new List(IntType)},
    minimumAge: { type: IntType },
    maximumAge: { type: IntType },
    title: { type: StringType },
    description: { type: StringType },
    spaces: { type: new List(IntType)},
    personalDescribe: { type: StringType },
    maximumSize: { type: IntType },
    minimumSize: { type: IntType },
    
  },
});

export default CreateListingType;
