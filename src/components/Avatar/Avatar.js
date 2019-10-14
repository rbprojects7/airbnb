// General
import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';

// Redux
import { connect } from 'react-redux';

// Asset
import defaultPic from './defaultPic.png';
import cx from 'classnames';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Avatar.css';

// Component 
import Link from '../Link';

class Avatar extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string,
    withLink: PropTypes.bool,
    profileId: PropTypes.number,
    linkClassName: PropTypes.string,
    profilePictureData: PropTypes.shape({
      loading: PropTypes.bool,
      account: PropTypes.shape({
        picture: PropTypes.string
      })
    }),
    isUser: PropTypes.bool,
    type: PropTypes.string,
    staticImage: PropTypes.bool
  };

  static defaultProps = {
    source: null,
    height: 100,
    width: 100,
    profileId: null,
    withLink: false,
    profilePictureData: {
      loading: true,
      userAccount: {
        picture: null
      }
    },
    isUser: false,
    type: 'medium',
    staticImage: false
  }

  render() {
    const {
      source,
      title,
      height,
      width,
      className,
      withLink,
      linkClassName,
      profileId,
      profilePictureData: {
        loading, userAccount
      },
      isUser,
      type,
      staticImage
    } = this.props;
    const path = '/images/avatar/' + type + '_';
    let imgSource = defaultPic;

    if (isUser) {
      if (staticImage) {
        imgSource = source !== null ? source : defaultPic;
      } else if (!loading && userAccount != null) {
        imgSource = userAccount.picture !== null ? path + userAccount.picture : defaultPic;
      }
    } else {
      if (staticImage) {
        imgSource = source !== null ? source : defaultPic;
      } else {
        imgSource = source !== null ? path + source : defaultPic;
      }
    }
    
    if(withLink){
      return (
        <Link to={"/users/show/" + profileId} className={linkClassName}>
          <img src={imgSource} className={cx(s.imgBackground, className)} alt={title} height={height} width={width} />
        </Link> 
      );
    } else {
      return (
        <img src={imgSource} className={cx(s.imgBackground, className)} alt={title} height={height} width={width} />
      );
    }

  }
}

export default compose(
    withStyles(s),
    graphql(gql `
      query {
          userAccount {
              picture
          }
      }
    `, 
      {
        name: 'profilePictureData', 
        options: (props) => ({
          skip: !props.isUser,
          ssr: false
        })
      }),
)(Avatar);


