import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose, gql } from 'react-apollo';
import { FormattedRelative } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Home from '../../components/Home';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';

//Components
import BannerCaption from '../../components/Home/BannerCaption';
import HomeSlider from '../../components/Home/HomeSlider';
import NewsBox from '../../components/Home/NewsBox';
import HomeSearchForm from '../../components/Home/HomeSearchForm';
import Loader from '../../components/Loader';
import SocialIcon from '../../components/Home/SocialIcon';
import ImageNewsFeed from '../../components/Home/ImageNewsFeed';

// Graphql
import getRecommendQuery from './getRecommend.graphql';
import getImageBannerQuery from './getImageBanner.graphql';
import getMostViewedListingQuery from './getMostViewedListing.graphql';

// Locale
import messages from '../../locale/messages';
//import ImageNewsFeed from '../../components/ImageNewsFeed/ImageNewsFeed';

class Homepage extends React.Component {
    static propTypes = {
        getRecommendData: PropTypes.shape({
            loading: PropTypes.bool,
            getRecommendData: PropTypes.array
        }),
        getImageBannerData: PropTypes.shape({
            loading: PropTypes.bool,
            getImageBanner: PropTypes.object
        }),
        getMostViewedListingData: PropTypes.shape({
            loading: PropTypes.bool,
            GetMostViewedListing: PropTypes.array
        }),
        formatMessage: PropTypes.func,
    };

    static defaultProps = {
        getRecommendData: {
            loading: true
        },
        getImageBannerData: {
            loading: true
        },
        getMostViewedListingData: {
            loading: true
        },
    }

    render() {
        const { getRecommendData, getImageBannerData, getMostViewedListingData, getBannerData } = this.props;
        return (
            <div className={s.root}>
                <div className={s.container}>
                    <div className={s.pageContainer}><BannerCaption data={getBannerData} /></div>
                    <div className={s.bannerContainer}><HomeSearchForm /></div>

                    {
            getRecommendData.loading && getImageBannerData.loading && getMostViewedListingData.loading && <div>
                <Loader type="text" />
            </div>
          }
                    {
            !getRecommendData.loading && !getImageBannerData.loading && !getMostViewedListingData.loading && <div className={cx(s.pageContainer)}>
                {
                getRecommendData.getRecommend && getRecommendData.getRecommend.length > 0 && <div >
                    <h3 className={s.containerTitle}><FormattedMessage {...messages.recommended} /></h3>
                    <HomeSlider data={getRecommendData.getRecommend} />
                </div>
              }
                <div className={s.pageContainer}><SocialIcon /></div>
            </div>
          }
                </div>
                <div>
                    <ImageNewsFeed />
                </div>
            </div>
        );
    }
}

export default compose(
  withStyles(s),
  graphql(gql`
        query getBanner{
          getBanner {
            id
            title
            content
          }
        }
      `, {
          name: 'getBannerData',
          options: {
              ssr: true
          }
      }),
  graphql(getRecommendQuery, {
      name: 'getRecommendData',
      options: {
          ssr: false,
          fetchPolicy: 'network-only',
      }
  }),
  graphql(getMostViewedListingQuery, {
      name: 'getMostViewedListingData',
      options: {
          ssr: false
      }
  }),
  graphql(getImageBannerQuery, {
      name: 'getImageBannerData',
      options: {
          ssr: false
      }
  }),
)(Homepage);
