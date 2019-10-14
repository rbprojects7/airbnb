import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancelBlock.css';

// Component
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import CancelByBlock from '../../components/CancelByBlock';

// Graphql
import CancelBlockQuery from './CancelBlock.graphql';

class CancelBlock extends React.Component {
    static propTypes = {
        listId: PropTypes.number.isRequired,
        cancellationBlockData: PropTypes.shape({
            loading: PropTypes.bool,
            getBlockByReservation: PropTypes.array
        }).isRequired
    };

    static defaultProps = {
        cancellationBlockData: {
            loading: true,
            getBlockByReservation: {
                sessionTime: [],
                reservationItem: [],
            }
        },
    };

    render() {
        const { cancellationBlockData: { loading, getBlockByReservation }, listId } = this.props;

        // let initialValue = { cancellation: cancellation };

        if (loading) {
            return (
                <div className={s.space4}>
                    <Loader type="text" />
                </div>
            );
        }

        if (getBlockByReservation === null || getBlockByReservation === undefined) {
            return <NotFound />;
        }

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <CancelByBlock data={getBlockByReservation}  />
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(s),
    graphql(CancelBlockQuery,
        {
            name: 'cancellationBlockData',
            options: (props) => ({
                variables: {
                    listId: props.listId,
                },
                fetchPolicy: 'network-only',
            })
        }
    ),
)(CancelBlock);

// export default withStyles(s)(CancelBlock);