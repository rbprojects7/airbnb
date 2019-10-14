// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MentorReview.css';
// Component
import Loader from '../../components/Loader';
import RatingChild from '../../components/Reviews/Mentor/RatingChild'
import MentorReviews from '../../components/MentorReviews';

// Graphql
import getParentChildQuery from './getParentChild.graphql';
import getReservationBlockLearningAim from './getReservationBlockLearningAim.graphql';
import getBlockSession from './getBlockSession.graphql';


class MentorReview extends React.Component {
  static propTypes = {
    blockUniqueId: PropTypes.number.isRequired,
    getParentChildData: PropTypes.shape({
      loading: PropTypes.bool,
      getParentChild: PropTypes.any
    }),
    learningAimData: PropTypes.shape({
      loading: PropTypes.bool,
      getReservationBlockLearningAim: PropTypes.any
    }),
    getBlockSessionData: PropTypes.shape({
      loading: PropTypes.bool,
      getBlockSession: PropTypes.any
    }),
  };

  static defaultProps = {
    getParentChildData: {
      loading: true
    },
    learningAimData: {
      loading: true
    },
    getBlockSessionData: {
      loading: true
    }
  };

  render() {
    const { getParentChildData, getParentChildData: { getParentChild } } = this.props;
    const { learningAimData, learningAimData: { getReservationBlockLearningAim } } = this.props;
    const { getBlockSessionData, getBlockSessionData: { getBlockSession } } = this.props;
    const { blockUniqueId, formPageId, formBaseURI } = this.props;
    let loading = true, listId = null, reservationId = null;
    let parentId = null, childId = null;
    let isParentEnable = false;

    if (getParentChildData && !getParentChildData.loading && getParentChild
      && learningAimData && !learningAimData.loading && getReservationBlockLearningAim
      && getBlockSessionData && !getBlockSessionData.loading && getBlockSession) {
        loading = false;
    }

    if (loading) {
      return (
        <div>
          <Loader type="text" />
        </div>
      )
    }

    if (!loading) {
      listId = getReservationBlockLearningAim && getReservationBlockLearningAim[0].listId ? getReservationBlockLearningAim[0].listId : null;
      isParentEnable = getParentChild.isParent;
      parentId = getParentChild.userId;
      childId = getParentChild.childId;
      reservationId = getParentChild.reservationId;
      return (
        <div className={s.root}>
          <div className={s.container}>
            <MentorReviews 
              blockUniqueId={blockUniqueId}
              formPageId={formPageId}
              formBaseURI={formBaseURI}
              userData={getParentChild} 
              learningAimData={getReservationBlockLearningAim}
              blockSessionData={getBlockSession}
              listId={listId}
              parentId={parentId}
              childId={childId}
              reservationId={reservationId}
              isParentEnable={isParentEnable}
            />    
          </div>
        </div>
      );
    }
  }
}

export default compose(
  withStyles(s),
  graphql(getParentChildQuery,
    {
      name: 'getParentChildData',
      options: (props) => ({
        variables: {
          blockUniqueId: props.blockUniqueId,
          id: props.formPageId,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
  graphql(getReservationBlockLearningAim,
    {
      name: 'learningAimData',
      options: (props) => ({
        variables: {
          blockUniqueId: props.blockUniqueId
          //blockUniqueId: 172
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
  graphql(getBlockSession,
    {
      name: 'getBlockSessionData',
      options: (props) => ({
        variables: {
          blockUniqueId: props.blockUniqueId
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(MentorReview);
