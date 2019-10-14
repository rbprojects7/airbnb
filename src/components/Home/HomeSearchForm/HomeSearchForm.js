
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeSearchForm.css';

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
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// History
import history from '../../../core/history';

// Components
import DateRange from '../DateRange';
import PlaceGeoSuggest from '../PlaceGeoSuggest';
import MobileDateRange from '../MobileDateRange';
import CustomAge from '../CustomAge';

// Redux Action
import { getSpecificSettings } from '../../../actions/getSpecificSettings';
import { setPersonalizedValues } from '../../../actions/personalized';
import { getListingFields } from '../../../actions/getListingFields';

// Helper
import detectMobileBrowsers from '../../../helpers/detectMobileBrowsers';
// Locale
import messages from '../../../locale/messages';


class HomeSearchForm extends React.Component {
    static propTypes = {
        setPersonalizedValues: PropTypes.func.isRequired,
        getSpecificSettings: PropTypes.func.isRequired,
        personalized: PropTypes.shape({
            location: PropTypes.string,
            lat: PropTypes.number,
            lng: PropTypes.number,
            chosen: PropTypes.number,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
            personCapacity: PropTypes.number,
            formatMessage: PropTypes.func,
            maximumAge: PropTypes.number,
            minimumAge: PropTypes.number,
        }),
        settingsData: PropTypes.shape({
            listSettings: PropTypes.array.isRequired
        }).isRequired,
        change: PropTypes.func,

    };

    static defaultProps = {
        personalized: {
            location: null,
            lat: null,
            lng: null,
            startDate: null,
            endDate: null,
            personCapacity: null,
            chosen: null,
            minimumAge: 0,
            maximumAge: 18,
        },
        settingsData: {
            listSettings: []
        },
        minimumAge: 0,
        maximumAge: 18,
    };

    constructor(props) {
        super(props);
        this.state = {
            mobileDevice: false,
      // minimumAge: 0,
      // maximumAge: 18,
        };
        this.handleClick = this.handleClick.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    }

    componentWillMount() {
        const { getSpecificSettings, ageRangeLabel } = this.props;
    // Get PersonCapacity Settings Data
    //getSpecificSettings(2);
        if (detectMobileBrowsers.isMobile() === true) {
            this.setState({ mobileDevice: true });
        }

    }


    handleClick() {

        const { personalized } = this.props;

        let updatedURI,
            uri = '/s?';

        if (personalized.chosen != null) {
            uri = `${uri}&address=${personalized.location}&chosen=${personalized.chosen}`;
        } else if (personalized.location != null) {
            uri = `${uri}&address=${personalized.location}`;
        }

        if (personalized.startDate != null && personalized.endDate != null) {
            uri = `${uri}&startDate=${personalized.startDate}&endDate=${personalized.endDate}`;
        }

        if (personalized.minimumAge != null && personalized.maximumAge != null) {
            uri = `${uri}&minimumAge=${personalized.minimumAge}&maximumAge=${personalized.maximumAge}`;
        }

        if (personalized.personCapacity != null && !isNaN(personalized.personCapacity)) {
            uri = `${uri}&guests=${personalized.personCapacity}`;
        }

        updatedURI = encodeURI(uri);
        history.push(updatedURI);
    }

    renderRange = ({ input, label, meta: { touched, error }, className, min, max }) => {
        const { formatMessage } = this.props.intl;
        const { change } = this.props;

        return (
            <div>
                <CustomAge
                  {...input}
                  min={min}
                  max={max}
                />
            </div>
        );
    }
    render() {
        const { error, handleSubmit, submitting, dispatch, nextPage, previousPage } = this.props;

        const { location, dates, settingsData, setPersonalizedValues, personalized, ageRangeLabel } = this.props;
        const { formatMessage } = this.props.intl;
    // let rows = [];
        const isBrowser = typeof window !== 'undefined';
    // for (let i= 1; i <= 16; i++) {
    //   rows.push(<option value={i} key={i}>{i} {i>1 ? 'guests' : 'guest'}</option>);
    // }
        const { maximumAge, minimumAge } = this.props;

        const smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;

        return (
            <Grid fluid>
                <Row>
                    <div xs={12} sm={12} md={12} lg={12}>
                        <form >
                            <div className={cx(s.searchFormInputs, 'homeSearchForm')}>
                                <div className={cx(s.table)}>
                                    <div className={cx(s.tableCell, s.location)}>
                                        <PlaceGeoSuggest
                                          label={formatMessage(messages.location)}
                                          className={cx(s.formControlInput, s.input)}
                                          containerClassName={s.geoSuggestContainer}
                                        />
                                    </div>
                                    <div className={cx(s.tableCell, s.ages)}>
                                        <div>
                                            <Col lg={12} md={12} sm={12} xs={12} className={cx(s.sliderBackground, s.smBottom)}>
                                                <div className={cx(s.subText, s.lableWidth)}>for ages</div>
                                                <div className={s.sliderWidth}>
                                                    <Field
                                                      name="age"
                                                      component={this.renderRange}
                                                      min={minimumAge}
                                                      max={maximumAge}
                                                    />
                                                    <div className={s.ageRangeMinLabel}>
                                                        <span>{minimumAge}
                                                        </span>
                                                    </div>
                                                    <div className={s.ageRangeMaxLabel}>
                                                        <span>{maximumAge}</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx(s.tableCell, s.search)}>
                                    <Button className={cx(s.btn, s.btnPrimary, s.btnBlock, s.searchButton, s.btnSm)} onClick={() => this.handleClick()}>
                                        <span className={cx('hidden-lg hidden-xs')}><FontAwesome.FaSearch className={s.searchIcon} /></span>
                                        <span className={cx('hidden-md hidden-sm')}>
                                            <FormattedMessage {...messages.goSearch} />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Row>
            </Grid>
        );
    }
}
HomeSearchForm = reduxForm({
    form: 'HomeSearchForm', // a unique name for this form
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(HomeSearchForm);

const selector = formValueSelector('HomeSearchForm');

const mapState = state => ({
    personalized: state.personalized,
    settingsData: state.viewListing.settingsData,
    minimumAge: selector(state, 'minimumAge'),
    maximumAge: selector(state, 'maximumAge'),
    listingFields: state.listingFields.data,
    ageRangeLabel: selector(state, 'ageRangeLabel'),

});

const mapDispatch = {
    getSpecificSettings,
    setPersonalizedValues,
    change

};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HomeSearchForm)));
