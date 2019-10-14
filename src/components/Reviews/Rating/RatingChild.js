import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
// Components
import Loader from '../../Loader';
import RatingForm from './RatingForm';
import RatingChildForm from './RatingChildForm';
import RatingConfirmation from './RatingConfirmation';
import NotFound from '../../../routes/notFound/NotFound';
import getReservationBlockLearningAim from './getReservationBlockLearningAim.graphql';
import getChildData from './getChildData.graphql';
import getProfileData from './getProfileData.graphql';
import { initialize, change } from 'redux-form';

import {getBlockData} from '../../../actions/Reviews/getBlockData';

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
        this.printItemBlock = this.printItemBlock.bind(this);
    }

    printItemBlock() {
        const { getReservationBlockLearningAim, getBlockData } = this.props;
        getBlockData(getReservationBlockLearningAim);
       // const data = await this.getItemBlock();
        //return data;
      }


    render() {
        const { blockUniqueId, formPageId, formBaseURI, getdata, childId, parentId, prevId, nextId } = this.props;
        console.log("sec",blockUniqueId);
        const { getReservationBlockLearningAim } = this.props;
        if(getReservationBlockLearningAim)
        {
            if(getReservationBlockLearningAim.getReservationBlockLearningAim)
            {
                this.printItemBlock();
            }
          
            //console.log("sec",getReservationBlockLearningAim.getReservationBlockLearningAim);
        }
        
        const { getChildData } = this.props;
        const { getProfileData } = this.props;
        // let initialValues = {
        //       //blockUniqueId,
        //       getReservationBlockLearningAim
        //       //receiverId: isHost ? guestId : hostId,
        //     //   childId,
        //     //   parentId,
        //     //   prevId,
        //     //   nextId
        //     };
        

        return <RatingChildForm prevId={prevId} nextId={nextId} getChildData={getChildData} getProfileData={getProfileData} blockUniqueId={blockUniqueId}/>
        //return <NotFound />

    }
}

const mapState = (state) => ({
    //userId: state.account.data.userId,
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
    graphql(getReservationBlockLearningAim,
        {
            name: 'getReservationBlockLearningAim',
            options: (props) => ({
                variables: {
                    blockUniqueId: props.blockUniqueId
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