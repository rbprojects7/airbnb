// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

// Redux Form
import { Field, reduxForm, initialize, change } from 'redux-form';
import submit from './submit';
import validate from './validate';

// Locale
import messages from '../../locale/messages';

// Redux
import { connect } from 'react-redux';

// Helper
import PopulateData from '../../helpers/populateData';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './EditChildProfileForm.css';
import {
  Button,
  Form,
  Row,
  Col,
  ControlLabel,
  FormControl,
  Panel
} from 'react-bootstrap';

class EditChildProfileForm extends Component {

    static propTypes = {
        loadAccount: PropTypes.func,
        formatMessage: PropTypes.func,
        EditChildProfileForm: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            dateOfBirthData: {}
        };
    }

    componentWillMount() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const years = PopulateData.generateData(1920, currentYear, "desc");
        const days = PopulateData.generateData(1, 31);
        const months = PopulateData.generateData(0, 11);
        const { initialize } = this.props;
        const { fromPage } = this.props;
        if(fromPage === 'paymentPage') {
            const initialData = {
                childSelect: 'Add Child',
            };
            initialize(initialData, true);
        }
        this.setState({ dateOfBirthData: {
            years,
            months,
            days
        }});
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const {formatMessage} = this.props.intl;

        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                  {...input}
                  className={className}
                  componentClass="textarea"
                  placeholder={label}
                >
                    {children}
                </FormControl>
            </div>
        );
    };

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
            </div>
        ); 
    };

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl componentClass="select" {...input} className={className} >
                    {children}
                </FormControl>
            </div>
        );
    };

    childSelectChanged = (e) => {
        const { initialize } = this.props;
        if(this.props) {
            if (e.target.value === 'Add Child') {
        //this.props.reset("EditChildProfileForm");
                initialize("EditChildProfileForm", {}, true);
            }else {
                const selectedChild = this.props.children.find(child => child.id === e.target.value);
                Object.keys(selectedChild).forEach(key => this.props.change(key, selectedChild[key]));
                const birthday = selectedChild.birthday.split('-');
                this.props.change('year', birthday[0]);
                this.props.change('month', birthday[1]);
                this.props.change('day', birthday[2]);
            }
        }
    }

    renderFormControlTextArea = ({ input, label, meta: { touched, error }, children, className }) => {
        const {formatMessage} = this.props.intl;

        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl
                  {...input}
                  className={className}
                  componentClass="textarea"
                  placeholder={label}
                >
                    {children}
                </FormControl>
            </div>
        );
    };

    renderFormControl = ({ input, label, type, meta: { touched, error }, className, isDisabled }) => {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <FormControl {...input} placeholder={label} type={type} className={className} disabled={isDisabled} />
            </div>
        );
    };

    renderFormControlSelect = ({ input, label, meta: { touched, error }, children, className }) => {
        const {formatMessage} = this.props.intl;
        return (
            <div>
                {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <select id={className} {...input} className={className} >
                    {children}
                </select>
            </div>
        );
    };

    childSelectChanged = (e) => {
        const { initialize } = this.props;
        let formValues = {};
        if(this.props) {
            if (e.target.value === 'Add Child') {
        //this.props.reset("EditChildProfileForm");
                initialize({}, true);
            }else {
                const selectedChild = this.props.children.find(child => child.id === e.target.value);
                Object.keys(selectedChild).forEach(key => this.props.change(key, selectedChild[key]));
                const birthday = selectedChild.birthday.split('-');
                this.props.change('year', birthday[0]);
                this.props.change('month', birthday[1] - 1);
                this.props.change('day', birthday[2]);
            }
        }
    };


    render() {

        const { error, handleSubmit, submitting, children, initialValues } = this.props;
        const { formatMessage } = this.props.intl;
        const { dateOfBirthData } = this.state;
        const { fromPage } = this.props;
        let hideForMobile;

        if(fromPage) {
            hideForMobile = s.hideForSm;
        }

        const title = <h3>{formatMessage(messages.childEditTitle)}</h3>;

        if(fromPage){
            return (
            <div>
                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    <Form onSubmit={handleSubmit(submit, this.props)}>

                        <Row className={cx(s.formGroup, hideForMobile)}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={cx(s.labelText, hideForMobile)} >{formatMessage(messages.childSelectTitle)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <div className={s.select}>
                                    <Field name="childSelect" className={s.formControlSelect} onChange={this.childSelectChanged} component={this.renderFormControlSelect} >
                                        {/* <option value="Choose Child">{formatMessage(messages.childSelect)}</option> */}
                                        <option value="Add Child">{"Add Child"}</option>

                                        {
                    children instanceof Array && children.map((child, key) =>
                        <option key={key} value={child.id}>{child.firstName}</option>
                      )

                    }


                                    </Field>
                                    <p className={s.labelText}>{formatMessage(messages.childSelectInfo)}</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={cx(s.labelText, hideForMobile)} >{formatMessage(messages.firstName)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="firstName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.firstName)}
                                  className={s.formControlInput}
                                />
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={cx(s.labelText, hideForMobile)} >{formatMessage(messages.lastName)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="lastName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.lastName)}
                                  className={s.formControlInput}
                                />
                                <p className={cx(s.labelText, hideForMobile)}>{formatMessage(messages.lastNameInfo)}</p>
                            </Col>
                        </Row>

                        <Row className={cx (s.formGroup, s.marginBottomMobile)}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={cx(s.labelText, hideForMobile)} >{formatMessage(messages.preferredName)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9} className={s.preferredMobile}>
                                <Field
                                  name="preferredName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.preferredName)}
                                  className={s.formControlInput}
                                />
                                <p className={cx(s.labelText, hideForMobile)}>{formatMessage(messages.preferredNameInfo)}</p>
                            </Col>
                        </Row>

                        <Row className={cx (s.formGroup, s.marginBottomMobile)}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={cx(s.textAlign, s.birthdayMargin)}>
                                <label className={cx (s.labelText, s.labelMobile)} >{formatMessage(messages.dateOfBirth)}</label>
                            </Col>

                            <Col xs={12} sm={9} md={9} lg={9} className={s.preferredMobile}>

                                <div className={s.select}>
                                    <Field name="day" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.day)}</option>
                                        {
                      dateOfBirthData.days.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                                </div>

                                <div className={s.select}>
                                    <Field name="month" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.month)}</option>
                                        {
                      dateOfBirthData.months.map((item, key) => (
                          <option key={key} value={item}>{item + 1}</option>
                        ))
                    }
                                    </Field>
                                </div>

                                <div className={cx(s.select, s.smSpace)}>
                                    <Field name="year" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.year)}</option>
                                        {
                      dateOfBirthData.years.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                                </div>

                            </Col>

                        </Row>

                        <Row className={cx(s.formGroup, hideForMobile)}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={cx (s.labelText, s.labelMobile)} >{formatMessage(messages.childEmail)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="email"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.childEmail)}
                                  className={s.formControlInput}
                                />
                                <p className={s.labelText}>{formatMessage(messages.childEmailInfo)}</p>
                            </Col>
                        </Row>

                        <Row className={cx (s.formGroup, s.marginBottomMobile)}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={cx(s.textAlign, s.birthdayMargin)}>
                                <label className={cx (s.labelText, s.labelMobile)} >{formatMessage(messages.childInfo)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9} className={s.marginBottomMobile}>
                                <Field
                                  name="preferences"
                                  component={this.renderFormControlTextArea}
                                  className={cx(s.formControlInput, s.childProfileNotes)}
                                  label={formatMessage(messages.childMobilePlaceholder)}
                                />
                                <p className={cx (s.labelText, s.marginBottomMobile)}>{formatMessage(messages.childMobileInfoDescription)}</p>
                            </Col>
                        </Row>

                        <Row className={cx (s.formGroup, s.preferredMobile)}>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx (s.spaceTop3, s.spaceTopMobile)}>
                                <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge, s.buttonForSm)} type="submit" disabled={submitting} >
                                    {formatMessage(messages.save)}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
            </div>
        );
    } else {
        return(
            <div>
                {error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                <Panel className={s.panelHeader} header={title}>
                    <Form onSubmit={handleSubmit(submit, this.props)}>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.childSelectTitle)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <div className={s.select}>
                                    <Field name="childSelect" className={s.formControlSelect} onChange={this.childSelectChanged} component={this.renderFormControlSelect} >
                                        {/* <option value="Choose Child">{formatMessage(messages.childSelect)}</option> */}
                                        <option value="Add Child">{"Add Child"}</option>

                                        {
                    children instanceof Array && children.map((child, key) =>
                        <option key={key} value={child.id}>{child.firstName}</option>
                      )

                    }


                                    </Field>
                                    <p className={s.labelText}>{formatMessage(messages.childSelectInfo)}</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.firstName)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="firstName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.firstName)}
                                  className={s.formControlInput}
                                />
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.lastName)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="lastName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.lastName)}
                                  className={s.formControlInput}
                                />
                                <p className={s.labelText}>{formatMessage(messages.lastNameInfo)}</p>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.preferredName)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="preferredName"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.preferredName)}
                                  className={s.formControlInput}
                                />
                                <p className={s.labelText}>{formatMessage(messages.preferredNameInfo)}</p>
                            </Col>
                        </Row>

                        <Row className={cx (s.formGroup, 'hidden-xs')}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.dateOfBirth)}</label>
                            </Col>

                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                          
                                <div className={s.select}>
                                    <Field name="day" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.day)}</option>
                                        {
                      dateOfBirthData.days.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                                </div>
                               
                               
                                <div className={s.select}>
                                    <Field name="month" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.month)}</option>
                                        {
                      dateOfBirthData.months.map((item, key) => (
                          <option key={key} value={item}>{item + 1}</option>
                        ))
                    }
                                    </Field>
                                </div>
                               
                                <div className={cx(s.select, s.smSpace)}>
                                    <Field name="year" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.year)}</option>
                                        {
                      dateOfBirthData.years.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                                </div>
                                

                            </Col>

                        </Row>
                        <Row className={cx (s.formGroup, 'visible-xs')}>
                           <div className={s.MobileBirthday}>
                           <label className={s.labelText} >{formatMessage(messages.dateOfBirth)}</label>
                           <div className={s.mobileDay}>
                           <Col xs={12} className={s.noPadding}>
                           <Col xs={3}>
                           <div className={s.birthdayContent}>
                           Day
                           </div>
                           </Col>
                           <Col xs={9}>
                           <div className={s.selectMobile}>
                                    <Field name="day" className={cx (s.formControlSelect, s.widthMobile)} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.day)}</option>
                                        {
                      dateOfBirthData.days.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                                </div>
                           </Col>
                          
                           </Col>
                           <Col xs={12} className={s.noPadding}>
                           <Col xs={3}>
                           <div className={s.birthdayContentTwo}>
                           Month
                           </div>
                           </Col>
                           <Col xs={9}>
                           <div className={s.selectMobileTWo}>
                           <Field name="month" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.month)}</option>
                                        {
                      dateOfBirthData.months.map((item, key) => (
                          <option key={key} value={item}>{item + 1}</option>
                        ))
                    }
                                    </Field>
                                </div>
                           </Col>
                          
                           </Col>
                           <Col xs={12} className={s.noPadding}>
                           <Col xs={3}>
                           <div className={s.birthdayContentTwo}>
                           Year
                           </div>
                           </Col>
                           <Col xs={9}>
                           <div className={s.selectMobileTWo}>
                           <Field name="year" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.year)}</option>
                                        {
                      dateOfBirthData.years.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                                </div>
                           </Col>
                          
                           </Col>
                         
                           {/* <div className={s.leftOne}>
                           <Field name="day" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.day)}</option>
                                        {
                      dateOfBirthData.days.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                           </div>
                           <div className={s.leftOne}>
                           <Field name="month" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.month)}</option>
                                        {
                      dateOfBirthData.months.map((item, key) => (
                          <option key={key} value={item}>{item + 1}</option>
                        ))
                    }
                                    </Field>
                           </div>
                           <div className={s.leftOne}>
                           <Field name="year" className={s.formControlSelect} component={this.renderFormControlSelect} >
                                        <option value="">{formatMessage(messages.year)}</option>
                                        {
                      dateOfBirthData.years.map((item, key) => (
                          <option key={key} value={item}>{item}</option>
                        ))
                    }
                                    </Field>
                           </div> */}
                           </div>
                           </div>

                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.childEmail)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="email"
                                  type="text"
                                  component={this.renderFormControl}
                                  label={formatMessage(messages.childEmail)}
                                  className={s.formControlInput}
                                />
                                <p className={s.labelText}>{formatMessage(messages.childEmailInfo)}</p>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col componentClass={ControlLabel} xs={12} sm={3} md={3} lg={3} className={s.textAlign}>
                                <label className={s.labelText} >{formatMessage(messages.childInfo)}</label>
                            </Col>
                            <Col componentClass={ControlLabel} xs={12} sm={9} md={9} lg={9}>
                                <Field
                                  name="preferences"
                                  component={this.renderFormControlTextArea}
                                  className={s.formControlInput}
                                  label={formatMessage(messages.childPlaceholder)}
                                />
                                <p className={s.labelText}>{formatMessage(messages.childInfoDescription)}</p>
                            </Col>
                        </Row>

                        <Row className={s.formGroup}>
                            <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop3}>
                                <Button bsSize="small" className={cx(s.button, s.btnPrimary, s.btnlarge)} type="submit" disabled={submitting} >
                                    {formatMessage(messages.save)}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </div>
        );
    }
    }

}
EditChildProfileForm = reduxForm({
    form: 'EditChildProfileForm', // a unique name for this form
    validate
})(EditChildProfileForm);


const mapState = state => ({
    account: state.account,
    children: state.children,
    EditChildProfileForm: state.form.EditChildProfileForm,
});

const mapDispatch = {
    initialize
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(EditChildProfileForm)));
