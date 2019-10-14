import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { submit, getFormSyncErrors } from 'redux-form';
import { 
	Nav,
  NavItem,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SaveButton.css';
import { updateListingMap } from '../../../actions/updateListingMap';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';


class SaveButton extends Component {
    static propTypes = {
			formatMessage: PropTypes.func,
			updateListing: PropTypes.bool,
	    step: PropTypes.number.isRequired,
	    submit: PropTypes.func.isRequired,
	    formPage: PropTypes.string.isRequired,
	    updateListingMap: PropTypes.func.isRequired,
	    listingSteps: PropTypes.shape({
		    step1: PropTypes.string,
		    step2: PropTypes.string,
		    step3: PropTypes.string
	    }),
	    className: PropTypes.string,
	    step1Errors: PropTypes.object,
	    step2Errors: PropTypes.object,
	    step3Errors: PropTypes.object,
	};

  	static defaultProps = {
			updateListing: false,
	    listingSteps: {
	      step1: 'inactive',
	      step2: 'inactive',
	      step3: 'inactive'
	    }
  	};

  	constructor(props) {
	    super(props);
	    this.handleSubmit = this.handleSubmit.bind(this);
  	}

  	async handleSubmit(){
	    const { submit, updateListingMap, step, formPage } = this.props;
	    const { step1Errors, step2Errors, step3Errors } = this.props;

	    if(step === 1 && step1Errors === undefined){
				if(formPage === 'location'){
					let isHeader = true;
					await updateListingMap(isHeader);
				} else {
					await submit('ListPlaceStep1');
				}
	    } else if(step === 2 && step2Errors === undefined){
	    	await submit('ListPlaceStep2');
	    } else if(step === 3 && step3Errors === undefined){
	    	await submit('ListPlaceStep3');
	    }
  	}

    render() {
			const { step, listingSteps, className, updateListing } = this.props;
			const { formatMessage } = this.props.intl;
	    let visible = false;

	    if(step === 1){
	      if(listingSteps.step1 != undefined && listingSteps.step1 === "completed") {
	        visible = true;
	      } 
	    }
	    if(step === 2){
	      if(listingSteps.step2 != undefined && listingSteps.step2 === "completed") {
	        visible = true;
	      } 
	    }
	    if(step === 3){
	      if(listingSteps.step3 != undefined && listingSteps.step3 === "completed") {
	        visible = true;
	      } 
	    }

	    if(!visible){
	    	return <span />
	    }

	    return (
			<NavItem eventKey={2} onClick={this.handleSubmit}>
		        <span className={className}>
							{
								updateListing && <span className={s.saveBtn}>
									<Loader loadingText={formatMessage(messages.savingButton)} type={"text"} />
								</span>
							}
							{
								!updateListing && <span>
									<FormattedMessage {...messages.saveAndExit} />
								</span>
							}
							
		        </span>
	        </NavItem>
	    );
    }
}

const mapState = (state) => ({
	updateListing: state.loader.updateListing,
  listingSteps: state.location.listingSteps,
  step1Errors: getFormSyncErrors('ListPlaceStep1')(state),
  step2Errors: getFormSyncErrors('ListPlaceStep2')(state),
  step3Errors: getFormSyncErrors('ListPlaceStep3')(state),
});

const mapDispatch = {
  submit,
  updateListingMap
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SaveButton)));
