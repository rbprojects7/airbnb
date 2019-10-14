import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

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
  Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';

// Component
import Avatar from '../../Avatar';
import { single } from 'rxjs/operator/single';

class FromMessage extends Component {
  static propTypes = {
    profileId: PropTypes.number.isRequired,
    picture: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  };

  static defaultProps = {
    createdAt: null
  };

  render() {
    const { profileId, picture, displayName, content, createdAt } = this.props;
    const { cancellationDetails, learners, guestName, hostName, listTitle, userType } = this.props;
    let date = createdAt != null ? moment(createdAt).format('D MMM YYYY') : '';
    let singleLearner;
    return (
      <Row className={cx(s.space5)}>
        <Col xs={4} sm={4} md={3} lg={2} className={'text-left'}>
          <div className={s.profileAvatarSection}>
            <Avatar
              source={picture}
              height={70}
              width={70}
              title={displayName}
              className={s.profileAvatar}
              withLink
              linkClassName={s.profileAvatarLink}
              profileId={profileId}
            />
          </div>
        </Col>
        <Col xs={8} sm={8} md={9} lg={10}>
          <Panel className={cx(s.panelBubble, s.panelDark, s.panelBubbleLeft)}>
            {!cancellationDetails && !learners && <span>
              {content}
            </span>}
            {
             userType === "host" && cancellationDetails && cancellationDetails.length > 0 && learners && learners.length > 0 && <div>
                <span>
                  Dear {hostName},
                      <p>We are sorry to tell you that {guestName} has made a cancellation.</p>

                  <p>{listTitle} </p>
                  {
                    cancellationDetails && cancellationDetails.length > 0 && <p>Date of cancellation: {moment(cancellationDetails[0].createdAt).format('DD MM YYYY')} </p>
                  }
                  {/* {console.log('lklklk',cancellationDetails)} */}
                </span>
                {
                  cancellationDetails && cancellationDetails.length > 0 && learners && learners.length > 0 && learners.map((item, index) => {
                    // console.log('item', item)

                    singleLearner = cancellationDetails.filter(function (element) {
                      return element.learnerId === item.id;
                    });
                    // console.log('lelele', singleLearner);
                    //  let cancelledDate = moment(singleLearner[0].createdAt).format("DD MM YYYY");
                    return (
                      <div>
                        {singleLearner && singleLearner.length > 0 && <span>
                          <p> {item.name} has cancelled the following sessions: </p> 
                        </span>}
                        {
                          singleLearner && singleLearner.length > 0 && singleLearner.map((values, x) => {
                            // console.log('values', values)
                            return (
                              <p>
                               {'-'} {values.sessionTime.date}{' '}{values.sessionTime.startTime}{' - '}{values.sessionTime.endTime}<br />
                              </p>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
                <span>
                  <p> {guestName} sent this message: </p>
                  <p> {content} </p>
                </span>
                <span>
                  <p>You don't need to do anything. Someone from TutorHere will contact you shortly to confirm if a refund will be made according to the cancellation policy.</p>
                </span>
              </div>
            }
            {
              userType === "guest" && cancellationDetails && cancellationDetails.length > 0 && learners && learners.length > 0 && <div>
                <span>
                  Dear {hostName},
                      <p>We are sorry to tell you that {hostName} has had to make a cancellation.</p>

                  <p>{listTitle} </p>
                  {
                    cancellationDetails && cancellationDetails.length > 0 && <p>Date of cancellation: {moment(cancellationDetails[0].createdAt).format('DD MM YYYY')} </p>
                  }
                  {/* {console.log('lklklk',cancellationDetails)} */}
                  <p>Cancelled session(s) are:</p>
                </span>
                {
                  cancellationDetails && cancellationDetails.length > 0 && learners && learners.length > 0 && learners.map((item, index) => {
                    // console.log('item', item)

                    singleLearner = cancellationDetails.filter(function (element) {
                      return element.learnerId === item.id;
                    });
                    // console.log('lelele', singleLearner);
                    //  let cancelledDate = moment(singleLearner[0].createdAt).format("DD MM YYYY");
                    return (
                      <div>
                        {singleLearner && singleLearner.length > 0 && <span>
                          <p> {item.name} </p>
                        </span>}
                        {
                          singleLearner && singleLearner.length > 0 && singleLearner.map((values, x) => {
                            // console.log('values', values)
                            return (
                              <p>
                                {'-'} {values.sessionTime.date}{' '}{values.sessionTime.startTime}{' - '}{values.sessionTime.endTime}<br />
                              </p>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
                <span>
                  <p> {hostName} sent this message: </p>
                  <p> {content} </p>
                </span>
                <span>
                  <p>You will receive a full refund for all the sessions cancelled.</p>

                  <p>We really hope your schedule is not too disrupted.</p>
                </span>
              </div>
            }
            <div className={cx(s.timeText, s.spaceTop2)}>
              <span>{date}</span>
            </div>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default withStyles(s)(FromMessage);