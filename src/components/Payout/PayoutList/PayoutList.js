import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

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
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Payout.css';

// Redirection
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

// Redux actions
import {removePayout} from '../../../actions/Payout/removePayoutAction';
import {setDefaultPayout} from '../../../actions/Payout/setDefaultPayout';

class PayoutList extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            methodId: PropTypes.number.isRequired,
            paymentMethod: PropTypes.shape({
                name: PropTypes.string.isRequired
            }),
            payEmail: PropTypes.string.isRequired,
            currency: PropTypes.string.isRequired,
            default: PropTypes.bool.isRequired,
            last4Digits: PropTypes.number
        })),
        removePayout: PropTypes.func.isRequired,
        setDefaultPayout: PropTypes.func.isRequired,
        formatMessage: PropTypes.func,
    };

    handleClick(){
        history.push('/user/addpayout');
    }

    render() {
        const { data, removePayout, setDefaultPayout } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <Panel className={s.panelHeader} header="Payout Bank Account" >
                <div className={s.panelBody}>
                    <p className={s.payoutIntro}>We release payments for sessions you have provided 24 hours after each session. We call that payment to you a “payout”. You may set up and edit your bank account here. Stripe quote 7-10 days for payouts to reach your account from when we issue them.</p>
                    <table className={cx('table', s.noBorder)}>
                        <thead>
                            <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                                <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle} /></th>
                                <th className={s.noBorder}><FormattedMessage {...messages.payoutTitle4} /></th>
                                <th className={s.noBorder}><FormattedMessage {...messages.status} /></th>
                                <th className={s.noBorder}><FormattedMessage {...messages.options} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                      data.length > 0 && data.map((item, index) => (
                          <tr className={cx(s.rowBorder, s.sectionTitleLight)} key={index}>
                              <td>{item.paymentMethod.name} {item.default && <Label bsStyle="success"><FormattedMessage {...messages.default} /></Label>}</td>
                              <td>
                                  {
                                  item.methodId == 1 && <span>
                                      { item.payEmail }
                                  </span>
                                }
                                  {
                                item.methodId == 2 && <span>
                                  ******{item.last4Digits}
                                </span>
                              }
                                ({item.currency})
                              </td>
                              <td><FormattedMessage {...messages.ready} /></td>
                              <td className={s.textTruncate}>
                                  {
                                !item.default && <a href="javascript:void(0)" onClick={() => setDefaultPayout(item.id)}><FormattedMessage {...messages.setDefault} /></a>
                                }
                                  {
                                  !item.default && <a
                                    className={s.textSpace}
                                    href="javascript:void(0)"
                                    onClick={() => removePayout(item.id)}
                                  >
                                      <FormattedMessage {...messages.remove} />
                                  </a>
                                }

                              </td>
                          </tr>
                          ))
                    }
                        </tbody>
                    </table>
                    <div className={cx(s.sectionTitleLight)}>
                        <Button className={cx(s.button, s.btnlarge, s.btnPrimary, )} onClick={this.handleClick}>
                            Add Payout Account
                        </Button>
                    </div>
                </div>
            </Panel>

        );
    }
}

const mapState = state => ({
});

const mapDispatch = {
    removePayout,
    setDefaultPayout
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PayoutList)));
