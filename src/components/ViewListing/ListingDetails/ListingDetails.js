import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { contactHostOpen } from '../../../actions/message/contactHostModal';

// Helper functions
import { formattingTime, checkIn, checkValue } from './helper';

// Internal Component
import ListItem from './ListItem';
import EnhancedDBSListItem from './EnhancedDBSListItem';
import Link from '../../Link';
import AboutMyDetails from '../AboutMyDetails';
import LearningItem from './LearningItem';
import SocialShare from '../SocialShare';
import ViewCount from '../ViewCount';
import { check } from 'graphql-anywhere';

class ListingDetails extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            listingData: PropTypes.shape({
                cancellation: PropTypes.shape({
                    policyName: PropTypes.string.isRequired,
                    policyContent: PropTypes.string.isRequired
                })
            })
        }),
        getSpecificSettings: PropTypes.func,
        settingsData: PropTypes.object,
        isHost: PropTypes.bool.isRequired,
        formatMessage: PropTypes.func,
    };

    static defaultProps = {
        isHost: false
    };

    render() {
        const { data, contactHostOpen, isHost } = this.props;
        const { formatMessage } = this.props.intl;
        let minNight,
            maxNight,
            checkInStart,
            checkInEnd,
            propertyType,
            roomType;
        let userAmenities = [],
            userSafetyAmenities = [],
            amenities = [];
        let sharedSpaces = [],
            houseRules = [],
            learningAim;
        let description,
            personCapacity,
            bathrooms,
            bedrooms,
            beds;
        let personalDescribe,
            minAge,
            maxAge,
            maximumSize,
            minimumSize;
        let cancellationPolicy = [];
        let cancellationDescription,
            experienceType;

        if (data.listingData != undefined) {
            minNight = checkValue(data.listingData.minNight, 0);
            maxNight = checkValue(data.listingData.maxNight, 0);
            checkInStart = checkValue(data.listingData.checkInStart, '');
            checkInEnd = checkValue(data.listingData.checkInEnd, '');
            cancellationDescription = checkValue(data.listingData.cancellationDescription, '');
            experienceType = checkValue(data.listingData.experienceType, '1');
        }

    // if (data.settingsData != undefined) {
    //   propertyType = checkValue(data.settingsData[1].listsettings.itemName, '');
    //   roomType = checkValue(data.settingsData[0].listsettings.itemName, '');
    // }

        sharedSpaces = checkValue(data.userSpaces, []);
        houseRules = checkValue(data.houseRules, []);
        userAmenities = checkValue(data.userAmenities, []);
        userSafetyAmenities = checkValue(data.userSafetyAmenities, []);
        description = checkValue(data.description, '');
        personCapacity = checkValue(data.personCapacity, 0);
        bathrooms = checkValue(data.bathrooms, 0);
        bedrooms = checkValue(data.bedrooms, 0);
        beds = checkValue(data.beds, 0);
        personalDescribe = checkValue(data.personalDescribe, '');
        minAge = checkValue(data.minAge, '');
        maxAge = checkValue(data.maxAge, '');
        minimumSize = checkValue(data.minimumSize, '');
        maximumSize = checkValue(data.maximumSize, '');
        learningAim = checkValue(data.learningAim, []);
        cancellationPolicy = checkValue(data.cancellationPolicy, []);
        return (
            <Row className={cx(s.pageContent)}>
                <Col
                  xs={12} sm={12} md={8} lg={8}
                  className={cx(s.spaceTop4, s.horizontalLineThrough, 'visible-xs visible-sm')}
                >
                    <div style={{ paddingBottom: 24 }}>
                        <SocialShare listId={data.id} />
                    </div>

                    {/* <div className={cx(s.spaceTop2, s.space3,'text-center')}>
            <ViewCount
              listId={data.id}
              isHost={isHost}
            />
          </div> */}
                </Col>
                <Col
                  xs={12} sm={12} md={8} lg={8}
                  className={cx(s.spaceTop4, s.horizontalLineThrough)}
                >

                    <h2 className={cx(s.sectionTitleText)}>
                        <FormattedMessage {...messages.aboutListing} />
                    </h2>
                    <p className={s.space3}>
                        {
              description && (description.trim()).split("\n").map((item, index) => (
                  <span key={index}>
                      {item}
                      <br />
                  </span>
                ))
            }
                    </p>

                </Col>


                {
          personalDescribe &&
          <Col
            xs={12} sm={12} md={8} lg={8}
            className={cx(s.mentorBorderBottom)}
          >
              <h2 className={cx(s.sectionTitleText, s.spaceTop4)}>
                  <FormattedMessage {...messages.aboutYourMentor} />
              </h2>

              <p>
                  <span>
                      {personalDescribe}
                  </span>
              </p>

          </Col>
        }

                <Col
                  xs={12} sm={12} md={8} lg={8}
                  className={cx(s.horizontalLineThrough, s.spaceTop2, s.space2)}
                >
                    <AboutMyDetails
                      data={data}
                    />
                </Col>


                {/* {
            !isHost && <p className={s.space2}>
              <a href="javascript:void(0)" className={cx(s.sectionCaptionLink)} onClick={() => contactHostOpen(data.id)} >
                <FormattedMessage {...messages.contactHost} />
              </a>
            </p>
          } */}


                {/* <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
          <Row>
            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space2, s.spaceTop2)}>
              <p className={s.textMuted}><FormattedMessage {...messages.theSpace} /></p>
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={cx(s.spaceTop2)}>
              <Row>
                <Col md={6} lg={6}>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.accommodates} />: <strong>{personCapacity}</strong>
                    </span>
                  </p>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.bathrooms} />: <strong>{bathrooms}</strong>
                    </span>
                  </p>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.bedrooms} />: <strong>{bedrooms}</strong>
                    </span>
                  </p>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.beds} />: <strong>{beds}</strong>
                    </span>
                  </p>
                </Col>
                <Col md={6} lg={6}>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.checkIn} />: <strong>{checkIn(checkInStart, checkInEnd)}</strong>
                    </span>
                  </p>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.propertyType} />: <strong>{propertyType}</strong>
                    </span>
                  </p>
                  <p>
                    <span className={cx(s.text)}>
                      <FormattedMessage {...messages.roomType} />: <strong>{roomType}</strong>
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col> */}

                <Col
                  xs={12} sm={12} md={8} lg={8}
                  className={cx(s.space2, s.horizontalLineThrough)}
                >
                    <Row className={cx(s.listingMargin)}>
                        <Col
                          xs={12} sm={3} md={3} lg={3}
                          className={cx(s.space2, s.titleMargin)}
                        >
                            {
                (minAge >= 0) && maxAge && <p className={s.textMuted}>
                    <FormattedMessage {...messages.agesViewListing} />
                </p>
              }
                        </Col>
                        <Col
                          xs={12} sm={9} md={9} lg={9}
                          className={cx(s.space1)}
                        >
                            <Row>
                                <Col md={6} lg={6}>
                                    {
                    (minAge >= 0) && maxAge && <p>
                        <FormattedMessage {...messages.minViewListing} />
                        {' '}
                        {
                        minAge == 0 && <span>
                            {minAge} {' '}
                            {minAge = 0 ? formatMessage(messages.yearsOldViewListing) : formatMessage(messages.yearOldViewListing)}
                        </span>

                      }
                        {
                        minAge >= 1 && <span>
                            {' '} {minAge} {' '}
                            {minAge > 1 ? formatMessage(messages.yearsOldViewListing) : formatMessage(messages.yearOldViewListing)}
                        </span>

                      }
                    </p>
                  }
                                    <p>
                                        <FormattedMessage {...messages.maxViewListing} />
                                        {' '} {maxAge} {' '}
                                        {maxAge > 0 ? formatMessage(messages.yearsOldViewListing) : formatMessage(messages.yearOldViewListing)}
                                    </p>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                {
          learningAim && learningAim.length > 0 && <LearningItem
            itemList={learningAim}
            label={formatMessage(messages.learningAimsTab)}
          />
        }

                {
          sharedSpaces && sharedSpaces.length > 0 && <ListItem
            itemList={sharedSpaces}
            label={formatMessage(messages.parents)}
          />
        }


                <Col
                  xs={12} sm={12} md={8} lg={8}
                  className={cx(s.space2, s.horizontalLineThrough)}
                >
                    <Row>
                        <Col
                          xs={12} sm={3} md={3} lg={3}
                          className={cx(s.space2, s.titleMargin)}
                        >
                            {
                maximumSize && minimumSize && <p className={s.textMuted}>
                    <FormattedMessage {...messages.groupSizeViewLising} />
                </p>
              }
                        </Col>
                        <Col
                          xs={12} sm={9} md={9} lg={9}
                          className={cx(s.space1)}
                        >
                            <Row >
                                <Col md={6} lg={6}>
                                    {
                    maximumSize && minimumSize && <span><p>
                        <FormattedMessage {...messages.maximumSize} />
                        {' '} {maximumSize} </p>
                        <p>
                            <FormattedMessage {...messages.minimumSize} />
                            {' '} {minimumSize}
                        </p></span>
                  }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>


                {
          userSafetyAmenities && userSafetyAmenities.length > 0 && <ListItem
            itemList={userSafetyAmenities}
            label={formatMessage(messages.aminitiesViewListing)}
          />
        }
                {
          userAmenities && userAmenities.length > 0 && <EnhancedDBSListItem
            itemList={userAmenities}
            label={formatMessage(messages.safetyViewListing)}
          />
        }
                {
          houseRules.length > 0 && <ListItem
            itemList={houseRules}
            label={formatMessage(messages.houseRules)}
          />
        }
                {
                    <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>

                        <Row>
                            <Col xs={12} sm={11} md={11} lg={11} className={s.titleMargin}>
                                <p style={{ color: '#FF5F6C' }}><FormattedMessage {...messages.safetyMeasure} /></p>
                            </Col>
                        </Row>
                    </Col>
        }
                {
          data &&
          <Col xs={12} sm={12} md={8} lg={8}>
              {
              data && data.listingData && data.listingData.experienceType && <Row>
                  <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.titleMargin)}>
                      <Row>
                          <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1)}>
                              <p className={s.textMuted}><FormattedMessage {...messages.cancellations} /></p>
                          </Col>
                      </Row>
                  </Col>


                  <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space2)}>
                      <Row>
                          <Col md={12} lg={12}>
                              {
                        experienceType && <p>
                            <span className={cx(s.text)}>
                                {
                              experienceType === '1' && <FormattedMessage {...messages.experienceType1} />
                          }
                                {
                              experienceType === '2' && <FormattedMessage {...messages.experienceType2} />
                            }
                            </span>
                        </p>
                      }
                          </Col>
                      </Row>
                  </Col>
              </Row>
            }
              {
              data && data.cancellationPolicy && <Row>
                  <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.titleMargin)}>
                      <Row>
                          <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1)} />
                      </Row>
                  </Col>

                  <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space2)}>
                      <Row>
                          <Col md={12} lg={12}>
                              {/* <p>
                      <span className={cx(s.text)}><strong>{data.listingData.cancellation.policyName}</strong></span>
                    </p> */}
                              {
                        cancellationPolicy && cancellationPolicy.length > 0 && cancellationPolicy.map((item, key) => (
                            <ul className={s.unorderPaddingLeft} key={key}>
                                <li>
                                    <p>
                                        <span className={cx(s.text)}>{item.policy.policyContent}</span>
                                    </p>
                                </li>
                            </ul>
                          ))
                    }
                              <div>
                                  <Link
                                    to={"/cancellationprocess"}
                                    className={cx(s.sectionCaptionLink)}
                                  >
                                      <FormattedMessage {...messages.viewDetails} />
                                  </Link>
                              </div>
                          </Col>
                      </Row>
                  </Col>
              </Row>
            }
              {
              data && data.listingData && data.listingData.cancellationDescription && data.listingData.cancellationDescription != '' && <Row>
                  <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.titleMargin)}>
                      <Row>
                          <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1)}>
                              {/* <p className={s.textMuted}><FormattedMessage {...messages.tabDescription} /></p> */}
                          </Col>
                      </Row>
                  </Col>


                  <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space2)}>
                      <Row>
                          <Col md={12} lg={12}>
                              {/* <p>
                      <span className={cx(s.text)}><strong>{data.listingData.cancellation.policyName}</strong></span>
                    </p> */}
                              {
                        cancellationDescription && cancellationDescription != '' && <p>
                            <span className={cx(s.text)}>{cancellationDescription}</span>
                        </p>
                      }
                          </Col>
                      </Row>
                  </Col>
              </Row>
            }
          </Col>

        }


                {
          ((minNight != null && minNight) || (maxNight != null && maxNight > 0)) && <Col xs={12} sm={12} md={8} lg={8} className={s.space2}>
              <Row>
                  <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.spaceTop1)}>
                      <p className={s.textMuted}> <FormattedMessage {...messages.availability} /> </p>
                  </Col>
                  <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1, s.spaceTop1)}>
                      <Row>
                          <Col md={6} lg={6}>
                              {
                      minNight != null && minNight > 0 &&
                      <p><span className={cx(s.text)}> <strong>{minNight} {minNight > 1 ? 'nights' : 'night'}{' '}</strong>
                          <FormattedMessage {...messages.minimumStay} />
                      </span>
                      </p>
                    }
                              {
                      maxNight != null && maxNight > 0 &&
                      <p><span className={cx(s.text)}> <strong>{maxNight} {maxNight > 1 ? 'nights' : 'night'}{' '}</strong>
                          <FormattedMessage {...messages.maximumNightStay} />
                      </span>
                      </p>
                    }
                          </Col>
                      </Row>
                  </Col>
              </Row>
          </Col>
        }
            </Row>
        );
    }
}

const mapState = state => ({
    settingsData: state.viewListing.settingsData,
});

const mapDispatch = {
    getSpecificSettings,
    contactHostOpen
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ListingDetails)));
