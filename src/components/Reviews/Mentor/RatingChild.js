import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import moment from 'moment';
// Components
import Loader from '../../Loader';
import RatingChildForm from './RatingChildForm';
import NotFound from '../../../routes/notFound/NotFound';
import getChildData from './getChildData.graphql';
import getProfileData from './getProfileData.graphql';
import getBlockListMeta from './getBlockListMeta.graphql';
import { initialize } from 'redux-form';
import { getBlockData } from '../../../actions/Reviews/getBlockData';

class RatingChild extends React.Component {

    static propTypes = {
        blockUniqueId: PropTypes.number,
        formPageId: PropTypes.number,
        prevId: PropTypes.number,
        nextId: PropTypes.number,
        formBaseURI: PropTypes.string,
        getdata: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            getChildData: [],
            getProfileData: [],
            getBlockListMeta: []
        };
    }

    componentDidMount() {
        //console.log('Parent did mount.');
        const { getChildData, getProfileData, getBlockListMeta } = this.props;
        if (getChildData) {
            this.setState({
                getChildData: getChildData,
                getProfileData: getProfileData,
                getBlockListMeta: getBlockListMeta
            });
        }
    }

    render() {
        const { blockUniqueId, formPageId, formBaseURI, getParentChild, childId, parentId, prevId, nextId, learningData, getBlockData, listId } = this.props;
        const { getChildData } = this.props;
        const { getProfileData } = this.props;
        const { sessionTimes } = this.props;
        const { getBlockListMeta } = this.props;
       
        let initialValues = {
            //blockUniqueId,
            learningData
            //receiverId: isHost ? guestId : hostId,
        };
        getBlockData(learningData);
        return <RatingChildForm prevId={prevId} nextId={nextId} getChildData={getChildData} getProfileData={getProfileData} blockUniqueId={blockUniqueId} initialValues={initialValues} sessionTimes={sessionTimes} getBlockListMeta={getBlockListMeta}/>
        //return <NotFound />
    }
}

const mapState = (state) => ({
    // initialValues: {
    //     initialValues
    // }
});

const mapDispatch = {
    getBlockData
};

export default compose(
    connect(mapState, mapDispatch),
    graphql(getChildData,
        {
            name: 'getChildData',
            options: (props) => ({
                variables: {
                    childId: props.childId
                },
                fetchPolicy: 'network-only',
            })
        }
    ),
    graphql(getBlockListMeta,
        {
            name: 'getBlockListMeta',
            options: (props) => ({
              variables: {
                listId: props.listId
              },
              fetchPolicy: 'network-only',
            })
          }
    ),
    graphql(getProfileData,
        {
            name: 'getProfileData',
            options: (props) => ({
                variables: {
                    blockUniqueId: props.parentId
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(RatingChild);