import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from './CancelByBlock.css';
import {
    Button,
    Form,
    Grid,
    Row, FormGroup,
    Col,
    ControlLabel,
    FormControl,
    FieldGroup,
    Panel
} from 'react-bootstrap';

//Locale
import messages from '../../locale/messages';
import cx from 'classnames';

//redux form
import { Field } from 'react-redux';

//Internal Components
import { Block } from '../ListPlaceStep1/AvailabilityAndPrice/Block';
import Link from '../Link';

//css
import AvailabilityAndPriceStyle from '../ListPlaceStep1/AvailabilityAndPrice/AvailabilityAndPrice.scss';



class CancelByBlock extends Component {

    static propTypes = {
        formatMessage: PropTypes.func,
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            reservationItemCount: PropTypes.number.isRequired,
            reservationItem: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
            })),
            sessionTime: PropTypes.arrayOf(PropTypes.shape({
                date: PropTypes.string.isRequired,
            })),
        })),
    }

    render() {
        const { data } = this.props;
        let title = 'Cancel Booked Blocks';

        return (
            <div>
                <Grid>
                    <Row className={cx(s.landingContainer)}>
                        <Col lg={12} md={12} sm={12} xs={12} >
                            <Panel className={s.panelHeader} header={title}>
                                {
                                    data && data.length > 0 && data.map((item, index) => {
                                        return (
                                            item && item.reservationItemCount > 0 && <div className={AvailabilityAndPriceStyle.block} key={index}>
                                                <Panel className={s.panelHeader} header={'Block ' + (index + 1)}>
                                                    {
                                                        // item && item.reservationItemCount > 0 && <div>
                                                        //     <p>Block {index + 1}</p>
                                                        //     <p>{item.id}</p>
                                                        // </div>
                                                    }
                                                    {/* {
                                                        item && item.reservationItemCount > 0 && item.sessionTime.map((values, key) => {

                                                            return (
                                                                <div key={key}>
                                                                    <p> {values.date}</p>
                                                                </div>
                                                            )
                                                        })
                                                    } */}
                                                    {
                                                        item && item.reservationItemCount > 0 && <ul className={s.datesContainer}>
                                                            {
                                                                item && item.reservationItemCount > 0 && item.sessionTime.map((values, key) => {
                                                                    return (
                                                                        <li key={key}>
                                                                            <p> {values.date}</p>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    }
                                                    {/* {
                                                        item && item.reservationItemCount > 0 && <a href={"/block-cancellation/" + item.blockUniqueId} >
                                                            <FormattedMessage {...messages.cancel} />
                                                        </a>
                                                    } */}
                                                    {
                                                        item && item.reservationItemCount > 0 && <Link to={"/block-cancellation/" + item.blockUniqueId} 
                                                            className={cx(s.button, s.btnPrimary)}>
                                                            <FormattedMessage {...messages.cancel} />
                                                        </Link>
                                                    }
                                                </Panel>
                                            </div>
                                        )
                                    })
                                }
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

    }

}

export default injectIntl(withStyles(s)(CancelByBlock));