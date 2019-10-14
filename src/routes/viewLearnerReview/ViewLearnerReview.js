// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewLearnerReview.css';

// Component
import Loader from '../../components/Loader';
import LearnerReviews from '../../components/ViewLearnerReview/LearnerReviews';

// // Graphql
import getLearnerReviewQuery from './getLearnerReview.graphql';
import getReservationBlockLearningAim from './getReservationBlockLearningAim.graphql';
import getBlockSession from './getBlockSession.graphql';
import learnerReviewsQuery from './learnerReviews.graphql';


class ViewLearnerReview extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    getLearnerReviewData: PropTypes.shape({
      loading: PropTypes.bool,
      getLearnerReview: PropTypes.any
    }),
    learningAimData: PropTypes.shape({
      loading: PropTypes.bool,
      getReservationBlockLearningAim: PropTypes.any
    }),
    getBlockSessionData: PropTypes.shape({
      loading: PropTypes.bool,
      getBlockSession: PropTypes.any
    }),
    learnerReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      learnerReviews: PropTypes.any
    }),
  };

  static defaultProps = {
    learningAimData: {
      loading: true
    },
    getBlockSessionData: {
      loading: true
    },
    learnerReviewsData: {
      loading: true
    },
  };

  render() {
    const { learningAimData, learningAimData: { getReservationBlockLearningAim } } = this.props;
    const { getBlockSessionData, getBlockSessionData: { getBlockSession } } = this.props;
    const { getLearnerReviewData, getLearnerReviewData: { getLearnerReview } } = this.props;
    const { learnerReviewsData, learnerReviewsData: { learnerReviews } } = this.props;
    const { reservationId } = this.props;
    const { blockUniqueId, formPageId, formBaseURI } = this.props;
    
    let loading = true, listId = null;
    let parentId = null, childId = null;
    let isParentEnable = false;
    if (learningAimData && !learningAimData.loading && getReservationBlockLearningAim
      && getBlockSessionData && !getBlockSessionData.loading && getBlockSession && 
      getLearnerReview && !getLearnerReview.loading && 
      learnerReviewsData && !learnerReviewsData.loading && learnerReviews) {
        loading = false;
    }

    if (loading) {
      return (
        <div>
          <Loader type="text" />
        </div>
      )
    }
    if(!loading){
    listId = getReservationBlockLearningAim && getReservationBlockLearningAim[0].listId ? getReservationBlockLearningAim[0].listId : null;
    isParentEnable = learnerReviews.isParent;
    parentId = learnerReviews.userId;
    childId = learnerReviews.childId;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <LearnerReviews
            blockUniqueId={blockUniqueId}
            formPageId={formPageId}
            formBaseURI={formBaseURI}
            userData={learnerReviews}
            learningAimData={getReservationBlockLearningAim}
            blockSessionData={getBlockSession}
            listId={listId}
            parentId={parentId}
            childId={childId}
            reservationId={reservationId}
            isParentEnable={isParentEnable}
            getLearnerReview={getLearnerReview}
          />
        </div>
      </div>
    );
    }
  }
}

export default compose(
  withStyles(s),
  graphql(getLearnerReviewQuery,
    {
      name: 'getLearnerReviewData',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId,
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
  graphql(learnerReviewsQuery,
    {
      name: 'learnerReviewsData',
      options: (props) => ({
        variables: {
          blockUniqueId: props.blockUniqueId,
          id: props.formPageId,
          reservationId: props.reservationId,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(ViewLearnerReview);
