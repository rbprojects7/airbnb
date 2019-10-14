
export function getSubject(type) {
    let subject,
        previewText;

    if(type === 'welcomeEmail' || type === 'confirmEmail') {
        subject = 'Please confirm your e-mail address';
        previewText = 'Confirm your email';
    }
    if(type === 'bookingRequest') {
        subject = 'You have a new Booking request';
        previewText = 'Great News! You have a new booking';
    }
    if(type === 'bookingRequestGuest') {
        subject = 'Your booking request has been sent';
        previewText = 'Great News! Your booking request has been sent';
    }
    if(type === 'bookingConfirmedToHost') {
        subject = 'You have confirmed a booking';
        previewText = 'Confirmed Booking Details';
    }
    if(type === 'bookingConfirmedToGuest') {
        subject = 'Your booking is confirmed by your mentor';
        previewText = 'Your booking is confirmed by your mentor';
    }
    if(type === 'bookingDeclinedToGuest') {
        subject = 'Your Booking request is declined by your mentor';
        previewText = 'We are sorry, your request is declined';
    }
    if(type === 'bookingExpiredGuest') {
        subject = 'Your Booking request is expired';
        previewText = 'We are sorry, your request is expired';
    }
    if(type === 'bookingExpiredHost') {
        subject = 'Your Booking is expired';
        previewText = 'Your Booking is expired';
    }
    if(type === 'cancelledByHost') {
        subject = 'Your TutorHere booking has been cancelled by your Mentor';
        previewText = 'Your TutorHere booking has been cancelled by your Mentor';
    }
    if(type === 'cancelledByGuest') {
        subject = 'You have a cancellation message';
        previewText = 'You have a cancellation message';
    }
    if(type === 'completedGuest') {
        subject = 'Please write a review for your mentor';
        previewText = 'Action Required! Write a Review';
    }
    if(type === 'completedHost') {
        subject = 'Please write a reflection about your learner';
        previewText = 'Please complete a form';
    }
    if(type === 'forgotPasswordLink') {
        subject = 'Reset your Password';
        previewText = 'Action Required! Reset your Password';
    }

    if(type === 'message') {
        subject = 'You have got a new message';
        previewText = 'Someone sent you a new message!';
    }

    if (type === 'inquiry') {
        subject = 'you have a new enquiry';
        previewText = 'has expressed interest in your';
    }

    if (type === 'documentVerification') {
        subject = 'Documents verification status';
        previewText = 'Documents verification status';
    }

    if (type === 'reflection') {
        subject = 'has sent you a reflection';
        previewText = 'Your mentor has send you a reflection';
    }
    return {
        subject,
        previewText
    };
}
