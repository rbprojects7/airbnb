import React from 'react';
import Layout from '../../components/Layout';
import ListLayout from '../../components/Layout/ListLayout';
import BecomeHost from './BecomeHost';
import fetch from '../../core/fetch';

// Redux Action
import { getListingSteps } from '../../actions/getListingSteps';
import { getListingFields } from '../../actions/getListingFields';
import { getListingFieldsValues } from '../../actions/getListingFieldsValues';
import { getCancellationDetails } from '../../actions/getCancellationDetails';

const title = 'Become a Host';


export default {

  path: '/become-a-mentor/:listId?/:formPage?',

  async action({ params, store, query }) {

    // From Redux Store
    const isAuthenticated = store.getState().runtime.isAuthenticated;
    const isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
    const listingFields = store.getState().listingFields.data;
    const listingSteps = store.getState().location.listingSteps;
    const isExistingList = store.getState().location.isExistingList;
    const initialValuesLoaded = store.getState().location.initialValuesLoaded;

    // From URI
    const listId = params.listId;
    const formPage = params.formPage;
    const formBaseURI = "/become-a-mentor/";

    if (!isAuthenticated && !isAdminAuthenticated) {
      return { redirect: '/login' };
    }

    //fetch Cancellation Policies
    store.dispatch(getCancellationDetails());

    // Fetch all settings fields
    if(listingFields === undefined){
      store.dispatch(getListingFields());
    }

    if(listId != undefined && !isNaN(listId)) {
      // Fetch All steps status
      if(listingSteps === undefined){
        store.dispatch(getListingSteps(listId));
      } else {
        // Fetch All steps status for another list
        if(listingSteps.listId != listId) {
          store.dispatch(getListingSteps(listId));
        }
      }

    } else {
        if(initialValuesLoaded != true) {
          store.dispatch(getListingSteps());
        }

    }

    let mode;

    if("mode" in query) {
      if(query.mode === "new"){
        mode = query.mode;
      }
    }

    if(listId != undefined && !isNaN(listId)) {
      let step;
      const step1Pages = [
        "room", "bedrooms", "bathrooms", 
        "quality-standard", "make-description", "ages",
        "personal-qualities", "group-size", "learning", "learning-experience" ,"learning-aims", 
      ];
      const step2Pages = [
        "location", "map","photos", "cover-photo", "description", "title", "spaces","amenities",
      ];
      const step3Pages = [
        "guest-requirements", "house-rules", "review-how-guests-book",
        "booking-window", "min-max-nights", "calendar",
        "availability-and-price", "booking-window", "min-max-nights", "calendar",
        "pricing", "discount", "booking-scenarios", "local-laws", "session"
      ];

      if(step1Pages.indexOf(formPage) > -1) {
          step = 1;
      } else if(step2Pages.indexOf(formPage) > -1) {
          step = 2;
      } else if(step3Pages.indexOf(formPage) > -1) {
          step = 3;
      }
      if(step != undefined){
        return {
          title,
          component: <ListLayout step={step} formPage={formPage}>
            <BecomeHost listId={Number(listId)} title={title} formPage={formPage} formBaseURI={formBaseURI} mode={mode} />
          </ListLayout>,
        };
      }
    }

    return {
      title,
      component: <Layout>
        <BecomeHost listId={Number(listId)} title={title} formPage={formPage} formBaseURI={formBaseURI} mode={mode} />
      </Layout>,
    };

  },

};
