// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Apollo
import { graphql, gql, compose } from 'react-apollo';

// Redux form
import { Field, reduxForm } from 'redux-form';

// Locale
import messages from '../../locale/messages';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './WishListModalForm.css';
import {
  Button,
  FormGroup,
  Col,
  FormControl,
  Checkbox,
} from 'react-bootstrap';

// Components
import CustomCheckbox from '../CustomCheckbox';
import Link from '../Link';

// Redux Action
import { closeWishListModal } from '../../actions/WishList/modalActions';

// GraphQL Query
import getAllWishListGroupQuery from '../WishListModal/getAllWishListGroup.graphql';

class WishListModalForm extends Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    data: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  async submitForm(values, dispatch) {
    const { closeWishListModal, mutate, profileId } = this.props;
    const { data } = await mutate({
      variables: values,
      refetchQueries: [{
        query: getAllWishListGroupQuery,
        variables: {
          profileId
        }
      }]
    });

    if (data.CreateWishLists.status == 'success') {
      dispatch(closeWishListModal);
    }

  }

  checkboxGroup = ({ label, name, options, input, listId }) => (
    <ul className={s.listContainer}>
      {
        options.wishListGroupData.map((option, index) => {
          return (
            <li className={s.listContent} key={index}>
              <div className={cx(s.labelSection, s.checkBoxLabel)}>
                <label className={cx(s.checkboxLabel, s.noPadding)}>{option.name}</label>
              </div>
              <div className={cx(s.checkBoxSection)}>
                <CustomCheckbox
                  name={`${input.name}[${index}]`}
                  value={option.id}
                  checked={input.value.indexOf(option.id) !== -1 }
                  onChange={event => {
                    const newValue = [...input.value];
                    if (event === true) {
                      newValue.push(option.id);
                    } else {
                      newValue.splice(newValue.indexOf(option.id), 1);
                    }
                    return input.onChange(newValue);
                  }}
                />
              </div>
            </li>
          )
        })
      }
    </ul>
  );

  render() {
    const { error, handleSubmit, submitting, dispatch, closeWishListModal } = this.props;
    const { formatMessage } = this.props.intl;
    const { data, data: { getAllWishListGroup }, listId } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
        {
          getAllWishListGroup.status == 'success' && getAllWishListGroup.count > 0 && <div>
            <FormGroup className={cx(s.formGroup)}>
              <Field name="wishListGroups" component={this.checkboxGroup} 
                options={getAllWishListGroup} listId={listId} />
            </FormGroup>

            <FormGroup className={cx(s.formGroup, s.noMargin)}>
              <Button className={cx(s.button, s.btnPrimary)} type="submit" disabled={submitting}>
                {formatMessage(messages.save)}
              </Button>
            </FormGroup>
          </div>  
        }  
        {
          getAllWishListGroup.status == 'success' && getAllWishListGroup.count == 0 && <div>
            <Col lg={12} md={12} sm={12} xs={12}>
              <p className={cx(s.landingCaption, s.modalCaptionLinkLarge, s.spaceTop3)}>
                <FormattedMessage {...messages.noWishlists} />
              </p>
              <p className={cx(s.landingCaption, s.modalCaptionLinkLarge)}>
                <Link to={"/wishlists"} onClick={() => closeWishListModal()} className={s.modalCaptionLink}>
                  <FormattedMessage {...messages.createWishList} />
                </Link>
              </p>
            </Col>  
          </div>  
        }
      </form>
    );
  }

}

WishListModalForm = reduxForm({
  form: 'WishListModalForm',
  destroyOnUnmount: true
})(WishListModalForm);

const mapState = state => ({
  listId: state.modalStatus.listId,
  profileId: state.account.data.profileId,
});

const mapDispatch = {
  closeWishListModal
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
    mutation CreateWishLists(
      $listId: Int!,
      $wishListGroups: [Int],
    ){
      CreateWishLists(
          listId: $listId,
          wishListGroups: $wishListGroups
      ) {
          status
      }
    }
  `)
)(WishListModalForm);
