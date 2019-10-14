// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux Form
import { Field, reduxForm } from 'redux-form';

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
  FormControl
} from 'react-bootstrap';
import s from './ListPlaceStep1.css';
import validate from './validate';
import update from './update';

// Component
import ListPlaceTips from '../ListPlaceTips';

class MakeDescription extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,

  };
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
    }
  }

  componentDidMount() {
    const { valid } = this.props;

    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { valid } = nextProps;
    if (valid) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }
  renderFormControl = ({ input, label, type, meta: { touched, error }, className }) => {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl {...input} placeholder={label} type={type} className={className} />
      </div>
    )
  }

  renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <FormControl
          {...input}
          className={className}
          placeholder={label}
          componentClass={"textarea"}
        />

      </div>
    )
  }

  render() {
    const { error, handleSubmit, submitting, dispatch, nextPage, previousPage, valid } = this.props;
    const { formatMessage } = this.props.intl;
    const { isDisabled } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} sm={6} md={6} lg={6} className={s.landingContent}>
            <Col xs={12}  sm={12}  md={12}  lg={12}>
              <h3 className={cx(s.landingContentTitle, s.landingTitleMargin, s.landingContentNoMarginBottom)}><FormattedMessage {...messages.descriptionTitle} /></h3>
              <form onSubmit={handleSubmit}>
                <div className={s.landingMainContent}>
                  <p className={cx(s.landingStep2, s.subHeaderMargin, s.spaceTop1)}><span><FormattedMessage {...messages.descriptionTitle1} /></span></p>
                  <FormGroup className={cx(s.formGroup, s.space6)}>
                    <Field name="title"
                      type="text"
                      component={this.renderFormControl}
                      label={formatMessage(messages.titleLabel1)}
                      className={cx(s.formControlInput, s.jumboInput, s.formControlMuted)}
                    />
                  </FormGroup>
                  <div className={cx(s.spaceTop3, s.space3)}>
                    <h3 className={s.landingContentTitle}><span><FormattedMessage {...messages.descriptionTitle2} /></span></h3>
                    <FormGroup className={s.formGroup}>
                      <Field name="description"
                        component={this.renderFormControlTextArea}
                        className={cx(s.textareaInput, s.formControlMuted)}
                        label={formatMessage(messages.descriptionLabel1)}
                      />
                    </FormGroup>
                  </div>
                </div>

                <hr className={s.horizontalLineThrough} />

                <FormGroup className={s.formGroup}>
                  <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight)} disabled={isDisabled} onClick={() => nextPage("ages")}>
                    <FormattedMessage {...messages.next} />
                  </Button>
                </FormGroup>
              </form>
            </Col>
          </Col>
          <ListPlaceTips page={'description'} />
        </Row>
      </Grid>
    )
  }
}

MakeDescription = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  onSubmit: update
})(MakeDescription);

const mapState = (state) => ({

});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MakeDescription)));
