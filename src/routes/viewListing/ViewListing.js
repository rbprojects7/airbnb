import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewListing.css';
import {
  Button,
  Grid,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Components
import Photos from '../../components/ViewListing/Photos';
import ListingIntro from '../../components/ViewListing/ListingIntro';
import Calendar from '../../components/ViewListing/Calendar';
import ListingDetails from '../../components/ViewListing/ListingDetails';
import Reviews from '../../components/ViewListing/Reviews';
import HostDetail from '../../components/ViewListing/HostDetail';
import LocationMap from '../../components/ViewListing/LocationMap';
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';
import Sticky from '../../components/ViewListing/Sticky';
import HomeSlider from '../../components/Home/HomeSlider';
import BlockList from '../../components/ViewListing/BlockList/BlockList';
import BlockListMob from '../../components/ViewListing/BlockList/BlockListMob';
// Graphql
import BlockedDatesQuery from './BlockedDates.graphql';
import ListingDataQuery from './getListingData.graphql';
import MoreReviewsQuery from './MoreReviews.graphql';
import SimilarListsQuery from './getSimilarListing.graphql';
import ShowInterestQuery from './getShowInterest.graphql';

import AutoAffix from 'react-overlays/lib/AutoAffix';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins
import { scroller } from 'react-scroll'; //Imports scroller mixin, can use as scroller.scrollTo()

// Locale
import messages from '../../locale/messages';

// Or Access Link,Element,etc as follows
const Link = Scroll.Link;
const Element = Scroll.Element;
const Events = Scroll.Events;
const scroll = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;

const durationFn = function (deltaTop) {
    return deltaTop;
};

class ViewListing extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        listId: PropTypes.number.isRequired,
        preview: PropTypes.bool,
        isAdmin: PropTypes.bool,
        account: PropTypes.shape({
            userId: PropTypes.string
        }),
        ListingBlockedDates: PropTypes.shape({
            loading: PropTypes.bool,
            UserListing: PropTypes.shape({
                blockedDates: PropTypes.array
            })
        }),
        getListingData: PropTypes.shape({
            loading: PropTypes.bool,
            UserListing: PropTypes.object
        }),
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        similarListsData: PropTypes.shape({
            loading: PropTypes.bool,
            getSimilarListing: PropTypes.array
        }),
        showInterestData: PropTypes.object
    };

    static defaultProps = {
        getListingData: {
            loading: false,
            UserListing: {
                userId: null
            }
        },
        ListingBlockedDates: {
            loading: true,
            UserListing: {
                blockedDates: []
            }
        },
        account: {
            userId: null
        },
        isAdmin: false
    }

    render() {
        const { listId, title, getListingData, getListingData: { loading, UserListing }, preview } = this.props;
        // const { blocks } = UserListing;
        let blocks;
        if(getListingData && UserListing){
            blocks = UserListing.blocks
        }
        const currency = UserListing && UserListing.listingData && UserListing.listingData.currency;
        const { ListingBlockedDates } = this.props;
        const { listReviewsData } = this.props;
        const { account: { userId }, isAdmin } = this.props;
        const { lat, lng, similarListsData, similarListsData: { getSimilarListing } } = this.props;
        const isBrowser = typeof window !== 'undefined';
        const smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : undefined;
        const { showInterestData } = this.props;
        
        if (isBrowser && loading && !UserListing) {
            return <Loader type="text" />;
        }
        let isHost = false;
        if (UserListing) {
            if (userId && userId === UserListing.userId) {
                isHost = true;
            } else if (isAdmin) {
                isHost = true;
            }
        }
        if (preview && !isHost) {
            return <NotFound title={title} />;
        }

        if (!loading && !UserListing) {
            return <NotFound title={title} />;
        }

        return (
            <div className={s.root}>
                <div className={s.container}>

                    {
             UserListing && <div className={s.pageContainer}>
                 <Photos data={UserListing} />
                 <Element name="test1" className="element">
                     <Grid fluid className={cx(s.horizontalLineThrough)}>
                         <Row className={cx(s.pageContent)}>
                             <div className={s.contentContainer}>
                                 <Col xs={12} sm={12} md={8} lg={8} className={s.stickyContainer}>
                                     <Row>
                                         <AutoAffix viewportOffsetTop={0} container={this}>
                                             <div className={cx(s.zPanel, s.panelDefault)}>
                                                 <div className={cx("stickHeader", s.viewHeader)}>
                                                     <div className={s.headerNav}>
                                                         <div className={s.textColor}>
                                                             <ul className={cx('list-inline', s.stickyMenu)}>
                                                                 <li>
                                                                     <Link className={cx(s.textList)} activeClass={s.active} to="test1" spy smooth offset={-50} duration={800} onSetActive={this.handleSetActive}>
                                                                         <FormattedMessage {...messages.overview} />
                                                                     </Link>
                                                                 </li>
                                                                 <li>
                                                                     <Link className={cx(s.textList)} activeClass={s.active} to="test2" spy smooth offset={-80} duration={800} onSetActive={this.handleSetActive}>
                                                                         <FormattedMessage {...messages.reviews} />
                                                                     </Link>
                                                                 </li>
                                                                 <li>
                                                                     <Link className={cx(s.textList)} activeClass={s.active} to="test3" spy smooth offset={-70} duration={800} onSetActive={this.handleSetActive}>
                                                                         <FormattedMessage {...messages.theMentor} />
                                                                     </Link>
                                                                 </li>
                                                                 <li>
                                                                     <Link className={cx(s.textList)} activeClass={s.active} to="test4" spy smooth offset={-70} duration={800} onSetActive={this.handleSetActive}>
                                                                         <FormattedMessage {...messages.location} />
                                                                     </Link>
                                                                 </li>
                                                             </ul>
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                         </AutoAffix>
                                     </Row>
                                 </Col>
                                 <Col xs={5} sm={4} md={4} lg={4} className={cx(`${s.columnBox} hidden-xs hidden-sm`)}>
                                     <BlockList
                                       blocks={blocks} listId={UserListing.id} currency={currency}
                                       isHost={isHost} listingData = {UserListing.listingData || undefined}
                                       showInterestData={showInterestData}
                                     />
                                 </Col>
                                 <Col xs={12} sm={12} md={8} lg={8} className={cx(s.padding4, s.paddingTop4)}>
                                     <Row>
                                         <ListingIntro
                                           data={UserListing}
                                           reviewsCount={UserListing.reviewsCount}
                                           reviewsStarRating={UserListing.reviewsStarRating}
                                         />
                                         <Col xs={12} sm={12} className={cx(`${s.columnBox} hidden-md hidden-lg`)} style={{ right: 0, height: 'auto', position: 'relative', padding: 0, marginTop: '5em' }}>
                                             <BlockListMob
                                               blocks={blocks} listId={UserListing.id} currency={currency}
                                               isHost={isHost}
                                               listingData = {UserListing.listingData || undefined}
                                               showInterestData={showInterestData}
                                             />
                                         </Col>
                                     </Row>
                                 </Col>
                             </div>
                         </Row>
                     </Grid>
                     <Grid fluid className={cx(s.horizontalLineThrough)}>
                         <ListingDetails
                           data={UserListing}
                           isHost={isHost}
                         />
                     </Grid>
                 </Element>

                 <Element name="test2" className="element">
                     <Grid fluid className={cx(s.horizontalLineThrough, s.paddingTop4)}>
                         <Reviews
                           reviewsCount={UserListing.reviewsCount}
                           reviewsStarRating={UserListing.reviewsStarRating}
                           data={listReviewsData}
                           listId={listId}
                         />
                     </Grid>
                 </Element>
                 <Element name="test3" className="element">
                     <Grid fluid className={cx(s.horizontalLineThrough, s.paddingTop4)}>
                         <HostDetail
                           id={UserListing.id}
                           userId={UserListing.userId}
                           hostEmail={UserListing.user.email}
                           personCapacity={UserListing.personCapacity}
                           city={UserListing.city}
                           listingData={UserListing.listingData || undefined}
                           profile={UserListing.user.profile || undefined}
                           blockedDates={
                    ListingBlockedDates.UserListing != null ?
                      ListingBlockedDates.UserListing.blockedDates : undefined
                  }
                           isHost={isHost}
                           listTitle={UserListing.title}
                         />
                     </Grid>
                 </Element>
                 <Element name="test4" className="element">
                     <Grid fluid className={cx(s.paddingTop2)}>
                         <LocationMap data={UserListing} />
                     </Grid>
                     {
                similarListsData && similarListsData.getSimilarListing && similarListsData.getSimilarListing.length > 0 && <Grid fluid className={cx(s.space2)} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <Row className={cx(s.pageContent, s.space3)}>
                        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.space2)}>
                            <h2 className={cx(s.sectionTitleText, s.space2)}><FormattedMessage {...messages.similarListings} /></h2>
                        </Col>
                        <HomeSlider data={similarListsData.getSimilarListing} />
                    </Row>
                </Grid>
              }
                 </Element>
             </div>
          }

                </div>
            </div>
        );
    }
}

const mapState = state => ({
    account: state.account.data,
    isAdmin: state.runtime.isAdminAuthenticated
});

const mapDispatch = {
};

export default compose(
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(ListingDataQuery,
      {
          name: 'getListingData',
          options: props => ({
              variables: {
                  listId: props.listId,
                  preview: props.preview,
              },
              fetchPolicy: 'network-only',
              ssr: true
          })
      }
  ),
  graphql(BlockedDatesQuery,
      {
          name: 'ListingBlockedDates',
          options: props => ({
              variables: {
                  listId: props.listId,
              },
              fetchPolicy: 'network-only',
              ssr: false
          })
      }
  ),
  graphql(MoreReviewsQuery,
      {
          name: 'listReviewsData',
          options: props => ({
              variables: {
                  listId: props.listId,
              },
              fetchPolicy: 'network-only',
              ssr: false
          })
      }
  ),
  graphql(SimilarListsQuery,
      {
          name: 'similarListsData',
          options: props => ({
              variables: {
                  listId: props.listId,
                  lat: props.lat,
                  lng: props.lng
              },
              fetchPolicy: 'network-only',
              ssr: false
          })
      }
  ),
  graphql(ShowInterestQuery,
    {
        name: 'showInterestData',
        options: props => ({
            variables: {
                listId: props.listId,
            },
            fetchPolicy: 'network-only',
        })
    }
)
)(ViewListing);
