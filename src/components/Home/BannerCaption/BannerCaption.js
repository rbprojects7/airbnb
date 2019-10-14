import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BannerCaption.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import Loader from '../../Loader';

class BannerCaption extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getBanner: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
      }),
    }),
  };

  render() {
    const { data: { loading, getBanner } } = this.props;

    if(loading || !getBanner){
      return <Loader type={"text"} />
    } else {
        return (
          <Grid fluid>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.bannerCaptionContainer)}>
                <h1 className={cx(s.noMargin, s.bannerCaptionText)}>
                  <div className={s.space3}>
                    <span className={s.bannerCaptionHighlight}>{getBanner.title}</span>
                  </div>
                   <div>
                    <span className={s.bannerSubText}>{getBanner.content} </span>
                   </div>
                </h1>
              </Col>
            </Row>  
          </Grid>
        );
    }
  }
}

/*

export default compose(
    withStyles(s),
    graphql(gql `
        query getBanner{
          getBanner {
            id
            title
            content
          }
        }
      `,{
        name: 'getBannerData',
        options: {
          ssr: false
        }
      } 
    ),
)(BannerCaption);

*/
export default withStyles(s) (BannerCaption);