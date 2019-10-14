import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Redux Form
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { scroller, Element } from 'react-scroll';
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
import * as FontAwesome from 'react-icons/lib/fa';
import logoUrl from './logo-small.jpg';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import { convert } from '../../../helpers/currencyConvertion';

// Helpers
import validate from './validate';
import submit from './submit';
import CustomCheckbox from '../../CustomCheckbox';

// Component
import HouseRules from './HouseRules';
import Loader from '../../Loader';
import Card from '../Card';
import ModalForm from './ModalForm/ModalForm';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

//Action
import { openAddChildModal } from '../../../actions/modalActions';

const onSubmitFail = (errors) => {
    if (errors.parent) scroller.scrollTo('e1');
    else if (errors.message) scroller.scrollTo('e2');
    else if (errors.cardNumber || errors.cvv || errors.expiryDate || errors.expiryYear || errors.name) scroller.scrollTo('e3');
};

class PaymentForm extends Component {
    static propTypes = {
        houseRules: PropTypes.arrayOf(PropTypes.shape({
            listsettings: PropTypes.shape({
                itemName: PropTypes.string.isRequired
            })
        })),
        hostDisplayName: PropTypes.string.isRequired,
        allowedPersonCapacity: PropTypes.number.isRequired,
        initialValues: PropTypes.shape({
            listId: PropTypes.number.isRequired,
            listTitle: PropTypes.string.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.object.isRequired,
            checkOut: PropTypes.object.isRequired,
            guests: PropTypes.number.isRequired,
            basePrice: PropTypes.number.isRequired,
            cleaningPrice: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            weeklyDiscount: PropTypes.number,
            monthlyDiscount: PropTypes.number,
            paymentType: PropTypes.number,
        }).isRequired,
        paymentCurrencyList: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            symbol: PropTypes.string.isRequired,
            isEnable: PropTypes.bool.isRequired,
            isPayment: PropTypes.bool.isRequired
        })),
        paymentLoading: PropTypes.bool,
        formatMessage: PropTypes.func,
    // total: PropTypes.number,
        priceForDays: PropTypes.number.isRequired,
        discount: PropTypes.number,
        account: PropTypes.shape({
            userId: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            picture: PropTypes.string,
            displayName: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            verification: PropTypes.shape({
                isEmailConfirmed: PropTypes.bool.isRequired
            })
        }),
        children: PropTypes.shape({
            id: PropTypes.string.isRequired,
            parentId: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,

        }),
        serviceFees: PropTypes.shape({
            guest: PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }).isRequired,
            host: PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }).isRequired
        }).isRequired,
    };

    static defaultProps = {
        paymentCurrencyList: [],
        paymentLoading: false,
        account: {
            email: null,
            displayName: null,
            firstName: null,
            picture: null,
            verification: {
                isEmailConfirmed: false
            }
        },
        children: {
            firstName: null,
            lastName: null
        },
        child: [],
    // parent: false
    };

    constructor(props) {
        super(props);
        this.state = {
            childData: [],
        };
        this.renderpaymentCurrencies = this.renderpaymentCurrencies.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        const { children, guests, basePrice, change, childId } = this.props;
        this.setState({childData: children});
    }

    componentWillReceiveProps(nextProps) {
        const { children, guests, childId, basePrice } = nextProps;
        this.setState({childData: children});
    }

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className, disabled }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl disabled={disabled} componentClass="select" {...input} className={className} >
                    {children}
                </FormControl>
            </div>
        );
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const { formatMessage } = this.props.intl;
        return (
            <FormGroup>
                {touched && error && <Element name="e2"><span className={s.errorMessage}>{formatMessage(error)}</span></Element>}
                <FormControl
                  {...input}
                  className={className}
                  componentClass="textarea"
                  placeholder={label}
                >
                    {children}
                </FormControl>
            </FormGroup>
        );
    }

    renderGuests(personCapacity) {
        const rows = [];
        for (let i = 1; i <= personCapacity; i++) {
            rows.push(<option key={i} value={i}>{i} {i > 1 ? 'guests' : 'guest'}</option>);
        }
        return rows;
    }

    renderpaymentCurrencies() {
        const { paymentCurrencyList } = this.props;
        const rows = [];

        if (paymentCurrencyList != null && paymentCurrencyList.length > 0) {
            paymentCurrencyList.map((item, index) => {
                if (item.isEnable && item.isPayment) {
                    rows.push(<option key={index} value={item.symbol}>{item.symbol}</option>);
                }
            });
        }
        return rows;
    }

    renderFormControlCheck = ({ input, meta: { touched, error }, label, name }) => {
        const { formatMessage } = this.props.intl;
        return (
            <div>
                {touched && error && <Element name="e1"><span className={s.errorMessage}>{formatMessage(error)}</span></Element>}
                <div className={cx(s.checkBoxLabelCell, s.checkBoxLabelCellIcon, s.checkBoxLabelCellInput)}>
                    <span className={s.checkBoxSection}>
                        <CustomCheckbox
                          name={name}
                          value
                          checked={input.value == true}
                          onChange={(event) => {
                              this.handleChange(event, input.name);
                              return input.onChange(event);
                          }}
                        />
                    </span>
                    <span className={cx(s.checkboxLabel, s.checkBoxSection)}>{label}</span>
                </div>
            </div>
        );
    }

    rendercheckboxGroup = ({ label, name, options, input, gender }) => (
        <Row>
            {
          options && options.length > 0 && options.map((child, index) => (
              <div>
                  <Col lg={12} md={12} sm={12} xs={12} key={index}>
                      <span className={cx(s.checkBoxSection)}>
                          <CustomCheckbox
                            name={`${input.name}[${index}]`}
                            value={child.childId}
                            checked={input.value.indexOf(child.childId) !== -1}
                            onChange={(event) => {
                                const newValue = [...input.value];
                                if (event === true) {
                                    newValue.push(child.childId);
                                } else {
                                    newValue.splice(newValue.indexOf(child.childId), 1);
                                }
                                this.handleChange(newValue, input.name);
                                return input.onChange(newValue);
                            }}
                          />
                          {/* </div> */}
                          <span className={cx(s.checkboxLabel)} >
                              <span >{child.firstName}</span>
                          </span>
                      </span>
                  </Col>
              </div>
            ))
        }
        </Row>
    );

    async handleChange(event, type) {
        const { change, total } = this.props;
        const { basePrice, cleaningPrice, discount, parent, child, guests } = this.props;
        const { serviceFees, base, rates, currency } = this.props;
        let totalParent = 0,
            totalChild = 0,
            priceForDays = 0,
            count = 0,
            totalGuests = 0,
            countChild = 0,
            childCount = 0,
            countParent = 0,
            guestServiceFee = 0,
            hostServiceFee = 0,
            totalCount = 0;
        if (parent == true) {
            count += 1;
        }

        if (child.length > 0) {
            childCount += child.length;
        }
        if (type == 'parent') {
            if (event == true) {
                countParent = childCount + countParent + 1;
                priceForDays = Number(basePrice) * Number(countParent);
                totalParent = (priceForDays + cleaningPrice) - discount;
                if (serviceFees) {
                    if (serviceFees.guest.type === 'percentage') {
                        guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
                    } else {
                        guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
                    }
                    await change('guestServiceFee', guestServiceFee);
                    if (serviceFees.host.type === 'percentage') {
                        hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
                    } else {
                        hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
                    }
                    await change('hostServiceFee', hostServiceFee);
                }
            } else {
                countParent = childCount;
                priceForDays = Number(basePrice) * Number(countParent);
                totalParent = (priceForDays + cleaningPrice) - discount;
                if (serviceFees) {
                    if (serviceFees.guest.type === 'percentage') {
                        guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
                    } else {
                        guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
                    }
                    await change('guestServiceFee', guestServiceFee);

                    if (serviceFees.host.type === 'percentage') {
                        hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
                    } else {
                        hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
                    }
                    await change('hostServiceFee', hostServiceFee);

                }
            }
        }
        if ((type == 'child')) {
            if (event.length > 0) {
                countChild = countChild + count + event.length;
                priceForDays = Number(basePrice) * Number(countChild);
                totalChild = (priceForDays + cleaningPrice) - discount;
                if (serviceFees) {
                    if (serviceFees.guest.type === 'percentage') {
                        guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
                    } else {
                        guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
                    }
                    await change('guestServiceFee', guestServiceFee);

                    if (serviceFees.host.type === 'percentage') {
                        hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
                    } else {
                        hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
                    }
                    await change('hostServiceFee', hostServiceFee);

                }
            } else {
                countChild = count;
                priceForDays = Number(basePrice) * Number(countChild);
                totalChild = (priceForDays + cleaningPrice) - discount;
                if (serviceFees) {
                    if (serviceFees.guest.type === 'percentage') {
                        guestServiceFee = priceForDays * (Number(serviceFees.guest.value) / 100);
                    } else {
                        guestServiceFee = convert(base, rates, serviceFees.guest.value, serviceFees.guest.currency, currency);
                    }
                    await change('guestServiceFee', guestServiceFee);

                    if (serviceFees.host.type === 'percentage') {
                        hostServiceFee = priceForDays * (Number(serviceFees.host.value) / 100);
                    } else {
                        hostServiceFee = convert(base, rates, serviceFees.host.value, serviceFees.host.currency, currency);
                    }
                    await change('hostServiceFee', hostServiceFee);

                }
            }
        }
        totalGuests = totalParent + totalChild;
        totalCount = countParent + countChild;
        await change('total', totalGuests);
        await change('guests', totalCount);
    }

    async openModal() {
        const { openAddChildModal } = this.props;
        await openAddChildModal();
    }

    render() {
        const { hostDisplayName, houseRules, allowedPersonCapacity, paymentLoading } = this.props;
        const { handleSubmit, submitting, error, pristine, paymentType, total, initialValues } = this.props;
        const { formatMessage } = this.props.intl;
        const { account, children } = this.props;
        let parent;
        if(account.firstName != null){
            parent = account.firstName;
        } else {
            parent = account.email;
        }

        const { childData } = this.state;


        return (
            <div className={cx(s.bookItPanel, s.spaceTop2)}>
                <form onSubmit={handleSubmit(submit)}>
                    <Row>
                        <Col md={10} className={cx(s.textLeft)}>
                            <div className={s.h3}>1. Who's Learning</div>
                            <div className={cx(s.bookItDetails, s.spaceTop2, s.space4)}>
                                <Row className={s.spaceTop2}>
                                    <Col md={12} lg={5}>
                                        <Col xs={12} sm={12} md={12} lg={12} className={s.landingContent}>
                                            <div>
                                                <FormGroup className={s.formGroup}>
                                                    <Field
                                                      name="parent"
                                                      component={this.renderFormControlCheck}
                                                      className={s.space1}
                                                      label={parent}
                                                    />
                                                    <Field
                                                      name="child"
                                                      component={this.rendercheckboxGroup}
                                                      className={s.space1}
                                                      options={children}
                                                    />

                                                </FormGroup>

                                                <Link onClick={this.openModal} className={s.addChildText}> Add your child’s details </Link>
                                                <ModalForm />
                                            </div>
                                        </Col>
                                        {/* <ListPlaceTips /> */}

                                    </Col>
                                </Row>
                            </div>
                            <div >
                                <span>The mentor will confirm your booking once they have the minimum numbers. You will be refunded automatically if the mentor declines your booking.</span>
                            </div>
                        </Col>
                        <Col md={10} className={cx(s.textLeft)}>
                            <section>
                                <header className={s.paymentHeader}>
                                    <Row>
                                        <Col md={10} className={cx(s.textLeft)}>
                                            <h3 className={s.pullLeft}>2. Message to mentor</h3>
                                        </Col>
                                    </Row>
                                </header>
                            </section>
                            <div>
                                <Field
                                  className={s.textArea}
                                  name="message"
                                  component={this.renderFormControlTextArea}
                                  label="Please add a warm message to your mentor or any other details about the learner"
                                />
                            </div>
                        </Col>
                        <Col md={10} className={cx(s.textLeft)}>
                            <section>
                                <header className={s.paymentHeader}>
                                    <Row>
                                        <Col md={10} className={cx(s.textLeft)}>
                                            <h3 className={s.pullLeft}>3. <FormattedMessage {...messages.payment} /></h3>
                                        </Col>
                                    </Row>
                                </header>
                            </section>
                            <Row className={s.space4}>
                                <Col xs={12}>
                                    <span className={s.textLight}>The mentor will confirm your booking once they have the minimum numbers. You will be refunded automatically if the mentor declines your booking.</span>
                                </Col>
                            </Row>
                            <Row className={s.space4}>
                                <Col xs={12} sm={12} md={12} lg={12} className={s.countryName}>
                                    <span className={s.textRegular}>
                                        <Field name="paymentType" component="input" type="radio" value="2" className={s.cursorPointer} /> <FormattedMessage {...messages.creditCard} />
                                    </span>
                                </Col>
                                <Col xs={12} sm={12} md={10} lg={10}>
                                    <Element name="e3"><Card paymentType={paymentType} /></Element>
                                </Col>
                            </Row>
                            <Row className={s.space4}>
                                <Col xs={12} sm={12} md={12} lg={12}>
                                    <Loader
                                      type={"button"}
                                      buttonType={"submit"}
                                      className={cx(s.button, s.btnPrimary, s.btnlarge)}
                                      disabled={pristine || submitting || error}
                                      show={paymentLoading}
                                      label={formatMessage(messages.payNow)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

PaymentForm = reduxForm({
    form: 'PaymentForm', // a unique name for this form
    validate,
    onSubmitFail,
})(PaymentForm);

// Decorate with connect to read form values
const selector = formValueSelector('PaymentForm'); // <-- same as form name

const mapState = state => ({
    paymentCurrencyList: state.currency.availableCurrencies,
    paymentLoading: state.book.paymentLoading,
    paymentType: selector(state, 'paymentType'),
    account: state.account.data,
    children: state.children,
    parent: selector(state, 'parent'),
    child: selector(state, 'child'),
});

const mapDispatch = {
    change,
    openAddChildModal,
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(PaymentForm)));
