import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import Loader from '../../components/Loader';
// Redux
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Redux Form
import { formValueSelector } from 'redux-form';
import {
    Button,
    Form,
    Grid,
    Row, FormGroup,
    Col,
    ControlLabel,
    FormControl,
    FieldGroup,
    Panel,
    Label,
} from 'react-bootstrap';

import s from './MentorReviews.css';

// Component
import BookingDetails from './BookingDetails';
import MentorReviewForm from './MentorReviewForm';

// GraphQL
import getListingQuery from '../../routes/mentorReview/getListingData.graphql';
import getMentorReviewsQuery from './getMentorReviews.graphql';

// History
import history from '../../core/history';

class MentorReviews extends Component {
    static propTypes = {
        account: PropTypes.shape({
            userId: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            picture: PropTypes.string,
            displayName: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            verification: PropTypes.shape({
                isEmailConfirmed: PropTypes.bool.isRequired
            })
        }),

    };

    static defaultProps = {
        account: {
            email: null,
            displayName: null,
            firstName: null,
            picture: null,
            verification: {
                isEmailConfirmed: false
            }
        },
        listingData: {
            loading: true,
            getMentorListing: null
        },
        getMentorReviewsData: {
            loading: true,
            getMentorReviews: null
        }
    };

    constructor(props) {
        super(props);
        this.handleNavigate = this.handleNavigate.bind(this);
    }
    
    handleNavigate(request) {
        const { blockUniqueId, formPageId, formBaseURI } = this.props;
        if (request && Number(request) !== Number(formPageId)) {
            history.push(formBaseURI + '/' + blockUniqueId + '/' + request);
        }
    }

    render() {
        const { account } = this.props;
        const { blockUniqueId, formPageId, formBaseURI, listId, parentId, childId, reservationId, isParentEnable } = this.props;
        const { userData, learningAimData, blockSessionData } = this.props;
        const { listingData: { loading, getMentorListing } } = this.props;
        const { getMentorReviewsData, getMentorReviewsData: { getMentorReviews } } = this.props;
        
        let learningAimDataValue = [];
        if (learningAimData && learningAimData.length > 0) {
            learningAimDataValue = learningAimData.slice(0);
        }

        
        let disabled = false, obj = {}, selectedIndex;
        
        if (getMentorReviews && getMentorReviews.length > 0 && learningAimData && learningAimData.length > 0) {
            // New
            learningAimDataValue = [];
            learningAimData.map((itemValue, index) => {
               selectedIndex = getMentorReviews.findIndex(o => Number(o.reservationlearningId) === Number(itemValue.id));
               if (selectedIndex >= 0) {
                    disabled = true;
                    obj = {};
                    obj['blockId'] = itemValue.blockId;
                    obj['blockUniqueId'] = itemValue.blockUniqueId;
                    obj['guestId'] = itemValue.userId;
                    obj['hostId'] = itemValue.hostId;
                    obj['id'] = itemValue.id;
                    obj['listId'] = itemValue.listId;
                    obj['reservationId'] = itemValue.reservationId;
                    obj['value'] = itemValue.value;
                    obj['rating'] = getMentorReviews[selectedIndex].learningAimReviewRating.toString();
                    learningAimDataValue.push(obj);
                    
                }
            })
        }

        if (getMentorReviewsData && getMentorReviewsData.loading) {
            return <Loader type={"text"} />
        }
        

        let initialValues = {
            learningAims: learningAimDataValue,
            userData: userData
        };

        return (
            <Grid fluid>
                <Row>
                    <BookingDetails
                        listingData={getMentorListing}
                        loading={loading}
                        blockSessionData={blockSessionData}
                    />

                    <MentorReviewForm
                        loading={loading}
                        initialValues={initialValues}
                        userData={userData}
                        prevId={userData.prevId}
                        nextId={userData.nextId}
                        learnerName={userData.learnerName}
                        learnerDOB={userData.learnerDOB}
                        handleNavigate={this.handleNavigate}
                        isParentEnable={isParentEnable}
                        disabled={disabled}
                        blockUniqueId={blockUniqueId}
                        listId={listId}
                        parentId={parentId}
                        childId={childId}
                        reservationId={reservationId}
                    />
                </Row>
            </Grid>
        );
    }
}

// Decorate with connect to read form values
const selector = formValueSelector('MentorReviewsForm'); // <-- same as form name

const mapState = (state) => ({
    account: state.account.data
});

const mapDispatch = {

};

export default compose(
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(getListingQuery,
        {
            name: 'listingData',
            options: (props) => ({
                variables: {
                    listId: (props.listId).toString(),
                   // preview: true
                },
                fetchPolicy: 'network-only',
            })
        }
    ),
    graphql(getMentorReviewsQuery,
        {
            name: 'getMentorReviewsData',
            options: (props) => ({
                variables: {
                    blockUniqueId: props.blockUniqueId,
                    listId: props.listId,
                    parentId: props.parentId,
                    childId: props.childId,
                    reservationId: props.reservationId,
                    isParentEnable: props.isParentEnable
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(MentorReviews);
