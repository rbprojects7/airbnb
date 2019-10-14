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

import messages from '../../../../locale/messages';

//Action
import { closeAddChildModal } from '../../../../actions/modalActions';


//Internal component

import EditChildProfileForm from '../../../EditChildProfileForm';



class ModalForm extends Component {
  static propTypes = {
    isNewsLetterAccepted: PropTypes.bool,
  };

  static defaultProps = {
    // showModal: false
  };

  constructor(props){
    super(props);
    // this.state = {
    //   showModal: false,
    // }
    this.handleClose = this.handleClose.bind(this);
  }


  async handleClose() {
    const { closeAddChildModal } = this.props;
    await closeAddChildModal();
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
    const { showModal } = this.props;
    return (
      <div >
        <Modal show={showModal} dialogClassName={s.logInModalContainer} className='modelNewsLetter' onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className={s.modelHeader}>Add Child</Modal.Title>
          </Modal.Header>
          <Modal.Body bsClass={s.logInModalBody}>
            <div className={s.root}>
              <div className={s.container}>
                 <EditChildProfileForm fromPage={"paymentPage"}/> 
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
  showModal: state.modalStatus.addChildModalOpen,
});

const mapDispatch = {
  closeAddChildModal,
};

ModalForm = reduxForm({
  form: 'ModalForm', // a unique name for this form
  // validate
})(ModalForm);

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ModalForm)));
