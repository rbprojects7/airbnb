// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewParentReview.css';

// Component
import Loader from '../../components/Loader';
import ParentReview from '../../components/ViewParentReview/ParentReview';

// // Graphql
import getParentReviewQuery from './getParentReview.graphql';

class viewParentReview extends React.Component {
    static propTypes = {
        reservationId: PropTypes.number.isRequired,
        getParentReview: PropTypes.shape({
            loading: PropTypes.bool,
            getParentReview: PropTypes.object
        }),
    };

    static defaultProps = {};

    render() {
        const { getParentReview } = this.props;
        const { reservationId } = this.props;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <ParentReview data={getParentReview} reservationId={reservationId} />
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(s),
    graphql(getParentReviewQuery,
        {
            name: 'getParentReview',
            options: (props) => ({
                variables: {
                    reservationId: props.reservationId,
                },
                fetchPolicy: 'network-only',
            })
        }
    ),
)(viewParentReview);
