// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Locale
import messages from '../../locale/messages';


// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  Grid,
  Button,
  Form,
  Row,
  FormGroup,
  Col,
  ControlLabel,
  FormControl } from 'react-bootstrap';
import s from './ListPlaceStep1.css';

// Internal Component
import PhotosUpload from '../PhotosUpload';

import updateStep2 from './updateStep2';

class Photos extends Component {

  static propTypes = {
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    listId: PropTypes.number.isRequired,
    photosCount: PropTypes.number,
  };

  constructor (props) {
    super(props);
    this.state = {
      isAvailable: false
    };
  }

  componentWillMount () {
    const { photosCount } = this.props;

    if(photosCount > 0){
      this.setState({ isAvailable: true });
    }
  }

  componentWillReceiveProps (nextProps) {
    const { photosCount } = nextProps;

    if(photosCount > 0){
      this.setState({ isAvailable: true });
    } else {
      this.setState({ isAvailable: false });
    }
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, listId } = this.props;
    const { isAvailable } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Grid fluid>
        <Row className={cx(s.landingContainer, s.landingContent )}>
              <div>
                <Col sm={12} lg={12} xs={12} md={12}  >
              <h3 className={cx(s.landingContentTitle, s.textBold,  s.landingTitleMargin)}><FormattedMessage {...messages.photos} /></h3>
                </Col>
                <Col sm={6} md={6} lg={6} xs={6}>
                   <p><span className={s.photosLandingContentSubTitle}><FormattedMessage {...messages.photosSubTitle1}/></span></p>
                    <ul className={cx(s.photosListStyle, s.noPadding)}>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent1}/></li>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent2}/></li>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent3}/></li>
                    </ul>
                </Col>
                <Col sm={6} md={6} lg={6} xs={6}>
                    <p><span className={s.photosLandingContentSubTitle}><FormattedMessage {...messages.photosSubTitle}/></span></p>
                    <ul className={cx(s.photosListStyle, s.noPadding)}>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent4}/></li>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent5}/></li>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent6}/></li>
                      <li className={s.photosListMarginBottom}><FormattedMessage {...messages.photosListContent7}/></li>
                    </ul>
                </Col>
              </div>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div>
              <form>
                <div className={s.landingMainContent}>
                  <FormGroup className={s.formGroup}>
                  
                    <PhotosUpload listId={listId} 
                      placeholder={formatMessage(messages.photosPlaceholder)}
                     />
                 
                  </FormGroup> 
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                    <Button className={cx(s.button, s.btnPrimaryBorder, s.btnlarge, s.pullLeft)} onClick={() => previousPage("map")}>
                      <FormattedMessage {...messages.back} />
                    </Button>
                    {
                      !isAvailable && <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("spaces")}>
                        <FormattedMessage {...messages.skip} />
                      </Button>
                    }
                    {
                      isAvailable && <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} onClick={() => nextPage("cover-photo")}>
                        <FormattedMessage {...messages.next} />
                      </Button>
                    }
                  </Col>
                </FormGroup>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Photos = reduxForm({
  form: 'ListPlaceStep2', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: updateStep2
})(Photos);

const mapState = (state) => ({
  photosCount: state.location.photosCount
});
const mapDispatch = {};

export default injectIntl(withStyles(s) (connect(mapState, mapDispatch)(Photos)));







