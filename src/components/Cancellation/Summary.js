import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row,
  FormGroup,
  Col,
  FormControl,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Cancellation.css';

// Locale
import messages from '../../locale/messages';

//Redux from
import { Field, FieldArray, initialize, change } from 'redux-form';

// Internal Components
import CustomCheckbox from '../CustomCheckbox';
import Link from '../Link';

//Redux
import { connect } from 'react-redux';

class Summary extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.func,
        userType: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        guests: PropTypes.number.isRequired,
        nights: PropTypes.number.isRequired,
        interval: PropTypes.number.isRequired,
        cancelData: PropTypes.shape({
            remainingNights: PropTypes.number,
        }).isRequired
    };

    static defaultProps = {
        cancellation: [],
    };

    constructor(props){
        super(props);
    // this.handleDates = this.handleDates.bind(this);
    }

    renderCancellationDetails = ({input, fields, options }) => {
        let data;
        return (
            <div>
                {
              fields.map((item, index) => {
                  data = fields.get(index);
                  return (
                      <div>
                          <span className={cx(s.checkBoxSection, s.checkBoxLabel)}>
                              <label className={cx(s.checkboxLabel, s.noPadding)}>{`${data.firstName} ${data.lastName}`}</label>
                          </span>
                          <FieldArray name={`${item}.dates`} component={this.renderDates} />
                      </div>
                  );

              })
            }
            </div>

        );
    }

    renderDates = ({ fields, options, input, name }) => {
        const { change } = this.props;
        let data;
        return (
            <div>
                {
          fields.map((item, index) => {
              data = fields.get(index);
              return (
                  <div key={index}>
                      <span className={s.checkBoxSection}>
                          <CustomCheckbox
                            name={name}
                            value
                            checked={data.isSelected == true}
                            disabled={data.isDisabled}
                            onChange={(e) => {
                                change('CancellationForm', `${item}.isSelected`, e);
                            }}
                          />
                      </span>
                      {!data.isDisabled && <span className={cx(s.checkboxLabel, s.checkBoxSection)}>{data.date}</span>}
                      {data.isDisabled && <span className={cx(s.checkboxLabel, s.checkBoxSection, s.strikedText)}>{data.date}</span>}
                  </div>
              );

          })
        }
            </div>
        );
    }


    render() {
        const {userType, firstName, guests, nights, interval} = this.props;
    // const {cancelData: {remainingNights}} = this.props;
        const { formatMessage } = this.props.intl;
        const { experienceType, cancellationDescription, cancellationPolicy, sessionTimes, isParentEnable, childParentData, guestName } = this.props;
        const { cancellation } = this.props;
        let started;
    // if(remainingNights > 0){
    //   started = nights - remainingNights;
    // } else {
    //   started = interval;
    // }

        return (
            <div>
                {
          userType === 'guest' &&
          <h3 className={cx(s.landingContentTitle, s.space5)}>
              <FormattedMessage {...messages.cancelYourTrip} />
          </h3>
        }
                {
          userType === 'host' &&
          <h3 className={cx(s.landingContentTitle, s.space5)}>
              <FormattedMessage {...messages.cancelYourLearning} />
          </h3>
        }
                {
          userType === 'guest' && <p>
              <span>
                  <FormattedMessage {...messages.guestCancelText1} />{' '}

                  <a target={'_blank'} href={'/terms'}>
                      <FormattedMessage {...messages.termsOfService} />{'. '}
                  </a>

                  <FormattedMessage {...messages.guestCancelText2} />{' '}

                  <a target={'_blank'} href={'/privacy'}>
                      <FormattedMessage {...messages.privacyPolicy} />{'. '}
                  </a>

                  <FormattedMessage {...messages.guestCancelText3} />{' '}

                  <a target={'_blank'} href={'/cancellationProcess'}>
                      <FormattedMessage {...messages.viewDetails} />{'.'}
                  </a>
              </span>
          </p>
        }
                {
          userType === 'guest' && <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                  {
                experienceType && <div>
                    <p className={s.textMuted}><FormattedMessage {...messages.mentorCancellationPolicy} /></p>
                    <p>
                        <span className={cx(s.text)}>
                            {
                        experienceType === '1' && <FormattedMessage {...messages.experienceType1} />
                      }
                            {
                        experienceType === '2' && <FormattedMessage {...messages.experienceType2} />
                      }
                        </span>
                    </p>
                </div>
              }
                  {
                cancellationPolicy && cancellationPolicy.length > 0 && cancellationPolicy.map((item, key) => (
                    <ul className={s.unorderPaddingLeft}>
                        <li>
                            <p key={key}>
                                <span className={cx(s.text)}>{item.policy.policyContent}</span>
                            </p>
                        </li>
                    </ul>
                  ))
              }
                  {
                cancellationDescription && cancellationDescription != '' && <p>
                    <span className={cx(s.text)}>{cancellationDescription}</span>
                </p>
              }
              </Col>
          </Row>
        }


                {
          userType === 'host' && <div>
              {/* <h3 className={cx(s.landingContentTitle, s.space5)}>
              <FormattedMessage {...messages.cancelYourReservation} />
            </h3> */}
              {/* <span className={cx(s.landingSubTitle, s.space5)}>
              <FormattedMessage {...messages.consider} />{' '}{firstName}'s{' '}
              <FormattedMessage {...messages.tripBeforeCanceling} />
            </span> */}
              <span>
                  <FormattedMessage {...messages.pleaseRead} />{' '}
                  <Link
                    to={"/cancellationprocess"}
                    className={cx(s.sectionCaptionLink)}
                  >
                      <FormattedMessage {...messages.viewDetails} />
                  </Link>
              </span>
              <p className={cx(s.landingStep, s.space3, s.spaceTop2)}>
                  <span>
                      <FormattedMessage {...messages.cancellingInfo} />
                  </span>
              </p>
              <p className={cx(s.landingStep, s.space3, s.spaceTop2)}>
                  <span>
                      <FormattedMessage {...messages.hostCancelMessage} />
                  </span>
              </p>
          </div>
        }
                {/* <Row>
          <Col xs={6} sm={6} md={6} lg={6}>
            {
              remainingNights > 0 && <div>
                <span className={s.textBold}><FormattedMessage {...messages.started} /></span><br />
                <span>{started} {started > 1 ? formatMessage(messages.howManydays) : formatMessage(messages.howManyday)} ago</span>
              </div>
            }

            {
              (remainingNights === undefined || remainingNights === 0) && <div>
                <span className={s.textBold}><FormattedMessage {...messages.startIn} /></span><br />
                <span>{interval} {interval > 1 ? formatMessage(messages.howManydays) : formatMessage(messages.howManyday)}</span>
              </div>
            }
          </Col>
          <Col xs={6} sm={6} md={6} lg={6}>
            <span className={s.textBold}><FormattedMessage {...messages.travelingWith} /></span><br />
            <span>{guests} {guests > 1 ? formatMessage(messages.guest) : formatMessage(messages.howManyGuest)}</span>
          </Col>
        </Row>
        <Row className={cx(s.space4,s.spaceTop3)}>
          <Col xs={6} sm={6} md={6} lg={6}>
            <span className={s.textBold}><FormattedMessage {...messages.stayingFor} /></span><br />
            <span>{nights} {nights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</span>
          </Col>
        </Row> */}

                {
          userType === "guest" && <div>
              <h3 className={cx(s.landingContentTitle, s.space5)}>
                  <FormattedMessage {...messages.selectSession} />
              </h3>
              <div>
                  <FieldArray className={s.space3} name="cancellation" component={this.renderCancellationDetails} />
              </div>
          </div>
        }

                {
          userType === 'guest' && <div>
              <div className={s.space1}>
                  {/* <span className={cx(s.landingSubTitle)}> */}
                  <FormattedMessage {...messages.guestCancelMessage1} />
                  {/* </span> */}
              </div>
          </div>
        }

                {/* {
          userType === 'host' && <div>
            <div className={s.space1}>
                <FormattedMessage {...messages.hostCancelMessage1} />
            </div>
          </div>
        } */}

            </div>
        );
    }
}

const mapState = state => ({

});

const mapDispatch = {
    initialize,
    change
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Summary)));
