import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import {
  Grid,
  Row,
  Col 
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReviewsContainer.css';

// Component
import Loader from '../../components/Loader';
import Reviews from '../../components/Reviews';
import SideMenuTrips from '../../components/ManageListing/SideMenuTrips';

// Graphql
import UserReviewsQuery from './UserReviews.graphql';
import PendingReviewsQuery from './PendingReviews.graphql';
//import GetLearningAimsQuery from './GetLearningAims.graphql';

class ReviewsContainer extends React.Component {
	static propTypes = { 
    userReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      userReviews: PropTypes.array
    }),
    pendingReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      pendingReviews: PropTypes.array
    })
    // getLearningAimsData: PropTypes.shape({
    //   loading: PropTypes.bool,
    //   getLearningAims: PropTypes.array
    // })
	};

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(ownerType){
    const { userReviewsData: { userReviews, fetchMore } } = this.props;
    fetchMore({
      query: UserReviewsQuery,
      variables: {
        ownerType,
        offset: userReviews.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }

        return {
            userReviews: [...previousResult.userReviews, ...fetchMoreResult.userReviews],
        };
      },
    });
  }

	render() {
    const {userReviewsData, pendingReviewsData} = this.props;

		return (
			<div className={s.container}>
            <Grid>
              <Row className={cx(s.landingContainer)}>
              <SideMenuTrips />
                {/* <Col xs={12} sm={3} md={3} lg={3} className={s.smPadding}>
                  <SideMenuTrips />
                </Col> */}
                <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
                  <Reviews 
                    reviewsData={userReviewsData} 
                    pendingData={pendingReviewsData} 
                    loadMore={this.loadMore}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
		);
	}
}

export default compose(
    withStyles(s),
    graphql(UserReviewsQuery,
      {
        name: 'userReviewsData',
        options: (props) => ({
          variables: {
            ownerType: 'others',
          },
          fetchPolicy: 'network-only',
        })
      }      
    ),
    graphql(PendingReviewsQuery,
      {
        name: 'pendingReviewsData',
        options: (props) => ({
          fetchPolicy: 'network-only',
        })
      }
    )
  //  graphql(GetLearningAimsQuery,
  //     {
  //       name: 'getLearningAimsData',
  //       options: (props) => ({
  //         variables: {
  //           listId: listId
  //         },
  //         fetchPolicy: 'network-only',
  //       })
  //     }      
  //   ),
)(ReviewsContainer);
