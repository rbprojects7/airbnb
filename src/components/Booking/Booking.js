import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';

// Redux Form
import { formValueSelector } from 'redux-form';

// Redux actions
import {resendEmailVerification} from '../../actions/manageUserVerification';

// Component
import Meetup from './Meetup';
import Verification from './Verification';
import Payment from './Payment';
import AvatarUpload from './AvatarUpload';

class Booking extends Component {
    static propTypes = {
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
    	bookingData: PropTypes.shape({
            id: PropTypes.number.isRequired,
    		title: PropTypes.string.isRequired,
    		coverPhoto: PropTypes.number,
    		city: PropTypes.string.isRequired,
    		state: PropTypes.string.isRequired,
    		country: PropTypes.string.isRequired,
            personCapacity: PropTypes.number.isRequired,
            bookingType: PropTypes.string.isRequired,
    		user: PropTypes.shape({
    			email: PropTypes.string.isRequired,
    			profile: PropTypes.shape({
    				profileId: PropTypes.number.isRequired,
					displayName: PropTypes.string.isRequired,
					firstName: PropTypes.string.isRequired,
    				picture: PropTypes.string
    			})
    		}),
    		settingsData: PropTypes.arrayOf( PropTypes.shape({
    			listsettings: PropTypes.shape({
    				itemName: PropTypes.string.isRequired
    			})
    		})),
    		houseRules: PropTypes.arrayOf( PropTypes.shape({
    			listsettings: PropTypes.shape({
    				itemName: PropTypes.string.isRequired
    			})
    		})),
            listingData: PropTypes.shape({
                basePrice: PropTypes.number.isRequired,
                cleaningPrice: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired,
                weeklyDiscount: PropTypes.number,
                monthlyDiscount: PropTypes.number,
                cancellation: PropTypes.shape({
                    policyName: PropTypes.string.isRequired
				}),
				experienceType: PropTypes.number.isRequired,
				cancellationDescription: PropTypes.string.isRequired,
            }),
            listPhotos: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired
			})),
			cancellationPolicy: PropTypes.arrayOf( PropTypes.shape({
				policy: PropTypes.shape({
					policyContent: PropTypes.string
				})
			})),
    	}),
    	resendEmailVerification: PropTypes.func.isRequired,
        bookDetails: PropTypes.shape({
            startDate: PropTypes.object.isRequired,
            endDate: PropTypes.object.isRequired,
			guests: PropTypes.number.isRequired,
			chosenBlock: PropTypes.array,
        }),
        serviceFees: PropTypes.object.isRequired,
        base: PropTypes.string.isRequired,
		rates: PropTypes.object.isRequired,
    };

    static defaultProps = {
    	account: {
    		email: null,
			displayName: null,
			firstName: null,
    		picture: null,
    		verification: {
    			isEmailConfirmed: false
    		}
    	},
    	bookingData: {
    		title: null,
            personCapacity: 0,
    		coverPhoto: null,
    		city: null,
    		state: null,
    		country: null,
    		user: {
    			profile: {
					displayName: null,
					firstName: null,
    				picture: null
    			}
    		},
    		settingsData: [{
    			listsettings: {
    				itemName: null
    			}
    		}],
    		houseRules: [],
            listingData: {
                basePrice: 0,
                cleaningPrice: 0,
                currency: null,
                weeklyDiscount: 0,
                monthlyDiscount: 0
            },
            listPhotos: []
    	},
        bookDetails: {
            checkIn: null,
            checkOut: null,
			guests: 1,
			chosenBlock:[]
		},
    };

    constructor(props) {
    	super(props);
    	this.state = {
			page: 'payment',
    	};
    	this.nextPage = this.nextPage.bind(this);
	}

    nextPage(page){
    	this.setState({ page });
    }

    render() {
    	const { page } = this.state;
		const { account, bookingData, resendEmailVerification } = this.props;
		console.log("bookingData==",bookingData)
		const { bookDetails: { guests, startDate, endDate, chosenBlock } } = this.props;
		const { serviceFees, base, rates } = this.props;


        return (
            <div> 
            	{
            		page === 'meetup' && <Meetup 
						hostDisplayName={bookingData.user.profile.firstName}
		            	hostPicture={bookingData.user.profile.picture}
						guestDisplayName={account.firstName}
		            	guestPicture={account.picture}
		            	nextPage={this.nextPage}
		            	emailVerified={account.verification.isEmailConfirmed}
		            />
            	}

            	{
            		page === 'verification' && <Verification 
            			guestEmail={account.email}
            			resendEmailVerification={resendEmailVerification}
            		/>
            	}

				{
            		page === 'avatar' && <AvatarUpload 
						nextPage={this.nextPage}
						guestPicture={account.picture}
						guestDisplayName={account.firstName}
						emailVerified={account.verification.isEmailConfirmed}
            		/>
            	}

            	{
            		page === 'payment' && <Payment 
                        listId={bookingData.id}
                        hostId={bookingData.userId}
                        guestId={account.userId}
            			guestEmail={account.email}
						hostDisplayName={bookingData.user.profile.firstName}
		            	hostPicture={bookingData.user.profile.picture}
		            	listTitle={bookingData.title}
		            	// listType={bookingData.settingsData[0].listsettings.itemName}
		            	coverPhoto={bookingData.coverPhoto}
		            	city={bookingData.city}
		            	state={bookingData.state}
		            	country={bookingData.country}
		            	houseRules={bookingData.houseRules}
                        checkIn={startDate}
                        checkOut={endDate}
                        allowedPersonCapacity={bookingData.personCapacity}
                        guests={guests}
                        basePrice={bookingData.listingData.basePrice}
                        cleaningPrice={bookingData.listingData.cleaningPrice}
                        currency={bookingData.listingData.currency}
                        weeklyDiscount={bookingData.listingData.weeklyDiscount}
                        monthlyDiscount={bookingData.listingData.monthlyDiscount}
                        listPhotos={bookingData.listPhotos}
                        serviceFees={serviceFees}
                        base={base}
                        rates={rates}
                        bookingType={bookingData.bookingType}
						policyName={bookingData.listingData.cancellation.policyName}
						chosenBlock={chosenBlock}
						nextPage={this.nextPage}
						guestDisplayName={account.firstName}
		            	guestPicture={account.picture}
						emailVerified={account.verification.isEmailConfirmed}
						experienceType={bookingData.listingData.experienceType}
						cancellationDescription={bookingData.listingData.cancellationDescription}
						cancellationPolicy={bookingData.cancellationPolicy}
            		/>
            	}
	            
            </div>
        );
    }
}

// Decorate with connect to read form values
const selector = formValueSelector('BookingForm'); // <-- same as form name

const mapState = (state) => ({
    account: state.account.data,
    bookingData: state.book.data,
    bookDetails: state.book.bookDetails,
    serviceFees: state.book.serviceFees,
    base: state.currency.base,
	rates: state.currency.rates,
	chosenBlock: state.book.chosenBlock
});

const mapDispatch = {
	resendEmailVerification
};

export default connect(mapState, mapDispatch)(Booking);
