/* eslint-disable global-require */

// The top-level (parent) route
export default {

    path: '/',

  // Keep in mind, routes are evaluated in order
    children: [
        require('./home').default,
        require('./login').default,
        require('./register').default,
        require('./editProfile').default,
        require('./editChildProfile').default,
        require('./admin').default,
        require('./profile').default,
        require('./becomeHost').default,
        require('./viewListing').default,
        require('./manageListing').default,
        require('./search').default,
        require('./profilePhoto').default,
        require('./trustAndVerification').default,
        require('./changePassword').default,
        require('./dashboard').default,
        require('./inbox').default,
        require('./viewMessage').default,
        require('./book').default,
        require('./payout').default,
        require('./addPayout').default,
        require('./payment').default,
        require('./itinerary').default,
        require('./receipt').default,
        require('./reservation').default,
        require('./trips').default,
        require('./transaction').default,
        require('./warning').default,
        require('./cancel').default,
        require('./cancellationPolicies').default,
        require('./reviews').default,
        require('./writeReview').default,
        require('./mentorReview').default,
        require('./viewParentReview').default,
        require('./passwordVerification').default,
        require('./calendar').default,
        require('./portfolio').default,
        require('./viewLearnerReview').default,

    //document upload

        require('./documentVerification').default,
        require('./cancelBlock').default,
        require('./MentorBlockCancellation').default,

    // Static Pages
        require('./static/whyhost').default,
        require('./static/about').default,
        require('./static/contact').default,
        require('./static/fees').default,
        require('./static/careers').default,
        require('./static/terms').default,
        require('./static/privacy').default,
        require('./static/cookies').default,
        require('./static/learningaims').default,
        require('./static/safeguarding').default,
        require('./static/sessionsandblocks').default,
        require('./static/strengths').default,
        require('./static/codesofconduct').default,
        require('./static/reviewsystem').default,
        require('./static/riskassessments').default,
        require('./static/cancellationprocess').default,

    // Add Admin Panel Pages Here
        require('./siteadmin/adminDashboard').default,
        require('./siteadmin/adminLogin').default,
        require('./siteadmin/changeAdmin').default,
        require('./siteadmin/edituser').default,
        require('./siteadmin/users').default,
        require('./siteadmin/siteSettings').default,
        require('./siteadmin/listSettings').default,
        require('./siteadmin/listings').default,
        require('./siteadmin/currencies').default,
        require('./siteadmin/paymentSettings').default,
        require('./siteadmin/searchSettings').default,
        require('./siteadmin/bannerSettings').default,
        require('./siteadmin/imageBanner').default,
        require('./siteadmin/reservations').default,
        require('./siteadmin/viewReceipt').default,
        require('./siteadmin/serviceFeesSettings').default,
        require('./siteadmin/adminReviews').default,
        require('./siteadmin/writeReview').default,
        require('./siteadmin/editReview').default,
        require('./siteadmin/viewreservation').default,


    //document view
        require('./siteadmin/document').default,

    // Wish Lists
        require('./wishLists').default,

    // Wildcard routes, e.g. { path: '*', ... } (must go last)
        require('./notFound').default,
    ],

    async action({ next }) {
    // Execute each child route until one of them return the result
        const route = await next();

    // Provide default values for title, description etc.
        route.title = `${route.title || 'Untitled Page'}`;
        route.description = route.description || '';

        return route;
    },

};
