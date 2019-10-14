import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector } from 'redux-form';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ModalForm.css';
import {
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  Checkbox,
  Modal,
  Row,
  ControlLabel,
} from 'react-bootstrap';

import { FormattedMessage, injectIntl } from 'react-intl';

import messages from '../../../locale/messages';

//action
import { newsLetterAction } from '../../../actions/newsLetterAction';


class ModalForm extends Component {
  static propTypes = {
    isNewsLetterAccepted: PropTypes.bool,
  };

  static defaultProps = {
    // showModal: false
  };

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
    }
    this.checkboxAction = this.checkboxAction.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    const { account: { isNewsLetterAccepted }} = this.props;
    if(isNewsLetterAccepted === "0") {
      this.setState({showModal: true});
    } else {
      this.setState({showModal: false});
    }
  }

  componentWillReceiveProps(nextProps) {
    const { account: { isNewsLetterAccepted }} = nextProps;
    if(isNewsLetterAccepted === "0") {
      this.setState({showModal: true});
    } else {
      this.setState({showModal: false});
    }
  }

  async checkboxAction(e) {
    const { newsLetterAction } = this.props;
    let value= e.target.value;
    await newsLetterAction(value);
  }

  async handleClose() {
    const { newsLetterAction } = this.props;
    this.setState({ showModal:false });
    await newsLetterAction(3);
  }

  renderCheckbox = ({ input, type, label, meta: { touched, error } }) => {
    const { formatMessage } = this.props.intl;

    return (
      <span>
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        <input
          {...input}
          type={type}
          placeholder={label}
        />
      </span>
    )
  }


  render() {
    const { showModal } = this.state;
    return (
      <div >
        <Modal show={showModal} dialogClassName={s.logInModalContainer} className='modelNewsLetter' onHide={this.handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title className={s.modelHeader}>Newsletter</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                  <Row className={s.rowMarginBottom}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <span className={s.modelRadio}><Field name="isNewsLetterAccepted" component="input" type="radio" value="1" component={this.renderCheckbox} onChange={this.checkboxAction}
                       /></span>
                      <span className={cx(s.captionTextAlignment, s.captionTextPadding)}>
                       <p className={s.noMargin}><FormattedMessage {...messages.acceptNewsLetterText} /></p>
                      </span>
                    </Col>
                  </Row>
                  <Row className={s.rowMarginBottom}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                     <span className={s.modelRadio}><Field name="isNewsLetterAccepted" component="input" type="radio" value="2" component={this.renderCheckbox} onChange={this.checkboxAction}
                      /></span>
                      <span className={cx(s.captionTextAlignment, s.captionTextPadding)}>
                       <p className={s.noMargin}><FormattedMessage {...messages.rejectNewsLetterText} /></p>
                      </span>
                    </Col>
                  </Row>
              </div>
            </div>
          </Modal.Body>
        </Modal >
      </div >
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
});

const mapDispatch = {
  newsLetterAction
};

ModalForm = reduxForm({
  form: 'ModalForm', // a unique name for this form
  // validate
})(ModalForm);

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ModalForm)));
