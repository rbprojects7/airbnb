import React, { Component } from 'react'
import PropTypes from 'prop-types';
// Redux Form
import { Field, reduxForm, FieldArray } from 'redux-form';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Button,
  Form,
  Row, FormGroup,
  Col,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Grid,
  InputGroup,
  Radio,
  Panel
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import * as FontAwesome from 'react-icons/lib/fa';
// Locale
import messages from '../../../locale/messages';
import ListCoverPhoto from '../../ListCoverPhoto';
import Avatar from '../../Avatar';

class ExperienceDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { sessionTimes, getBlockListMeta } = this.props;
    console.log("getBlockListMeta", getBlockListMeta.getBlockListMeta);
    let coverPhoto, listPhotos = [];
    let listTitle, city, state, country, hostDisplayName, hostPicture;

    if (getBlockListMeta && getBlockListMeta.getBlockListMeta) {
      listPhotos = getBlockListMeta.getBlockListMeta.listPhotos;
      coverPhoto = getBlockListMeta.getBlockListMeta.coverPhoto;
      listTitle = getBlockListMeta.getBlockListMeta.title;
      city = getBlockListMeta.getBlockListMeta.city;
      state = getBlockListMeta.getBlockListMeta.state;
      country = getBlockListMeta.getBlockListMeta.country;
      hostDisplayName = getBlockListMeta.getBlockListMeta.user.profile.firstName;
      hostPicture = getBlockListMeta.getBlockListMeta.user.profile.picture;
    }

    console.log("hhkjkk", listTitle);
    return (

      <Grid>
        <Row>
          <Col md={5} mdPush={7}>
            <div className={cx(s.summaryCard, s.colCenter)}>

              {coverPhoto && listPhotos &&
                <ListCoverPhoto
                  className={cx(s.bannerImage, s.backgroundCover)}
                  coverPhoto={coverPhoto}
                  listPhotos={listPhotos}
                  photoType={"x_medium"}
                  bgImage
                />
              }
              <div className={cx(s.hostProfilePhoto, s.pullRight, s.space3)}>
                {hostPicture && hostDisplayName &&
                  <div className={cx(s.profileAvatarLink, s.profileAvatarSection)}>
                    <Avatar
                      source={hostPicture}
                      title={hostDisplayName}
                      className={s.profileAvatar}
                    />
                  </div>
                }
              </div>
              <Panel className={s.panelHeader}>
                { hostDisplayName && <div className={cx(s.textMuted, s.space2)}>
                  <span><FormattedMessage {...messages.hostedBy} /> {hostDisplayName}</span>
                </div>}
                {listTitle &&
                  <div className={cx(s.textLarge, s.space1)}>
                    <span>{listTitle}</span>
                  </div>
                }
                {city && state && country &&
                  <div className={cx(s.textMuted)}>
                    <div> {city}, {state}, {country} </div>
                  </div>
                }
                <div className={s.spaceTop2}>
                  <hr className={s.horizondalLine} />
                  {
                    sessionTimes.map((item, key) => {
                      return (
                        <Row key={key}>
                          <Col sm={8} md={8} lg={8}>
                            <p >{item.date}</p>
                          </Col>
                          <Col sm={2} md={2} lg={2}>
                            <p>{item.startTime}</p>
                          </Col>
                          <Col sm={2} md={2} lg={2}>
                            <p>{item.endTime}</p>
                          </Col>
                        </Row>
                      )
                    })
                  }
                  <hr className={s.horizondalLine} />
                </div>
              </Panel>
              <Panel className={s.panelHeader}>
                {
                  <Row>
                    <Col xs={12} sm={12} md={8} lg={8}>
                      {
                        <div>
                          <p className={s.textMuted}><FormattedMessage {...messages.mentorCancellationPolicy} /></p>
                          <p>
                            <span className={cx(s.text)}>
                              {
                                <FormattedMessage {...messages.experienceType1} />
                              }
                              {
                                <FormattedMessage {...messages.experienceType2} />
                              }
                            </span>
                          </p>
                        </div>
                      }

                    </Col>
                  </Row>
                }
              </Panel>
            </div>
          </Col>

        </Row>
      </Grid>

    );
  }
}

ExperienceDetails = reduxForm({
  form: 'ExperienceDetails', // a unique name for this form
  // validateChild
})(ExperienceDetails);

export default compose(
  injectIntl,
  withStyles(s)
)(ExperienceDetails);
