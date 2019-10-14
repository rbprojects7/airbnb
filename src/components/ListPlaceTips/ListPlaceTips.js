import React from 'react';
import PropTypes from 'prop-types';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListPlaceTips.css';
import {
  Grid,
  Row,
  Col } from 'react-bootstrap';

// Component
import ListPlaceStep1 from '../../components/ListPlaceStep1';

// Translation
import { injectIntl } from 'react-intl';

import activity2 from './page1.jpg';
import activity3 from './page2.jpg';
import activity4 from './page3.jpg';
import activity5 from './page4.jpg';
import activity6 from './page5.png';
import activity7 from './page6.svg';
import activity8 from './page7.jpg';
import activity9 from './page8.jpg';
import activity10 from './page9.jpg';
import activity11 from './page10.jpg';
import activity12 from './page11.jpg';
import activity13 from './page12.jpg';
import activity14 from './page14.png';
import activity15 from './page15.svg';

class ListPlaceTips extends React.Component {
  static propTypes = {
  };

  render() {
    const { page  } = this.props;
    let bgimg = activity2;
    if(page == 'page1'){
      bgimg = activity2;
    }
    else if (page == 'page2') {
      bgimg = activity3;
    }
    else if(page == 'quality'){
      bgimg = activity7;
    }
    else if(page == 'description'){
      bgimg = activity4;
    }
    else if(page == 'age'){
      bgimg = activity5;
    }
    else if(page == 'learning'){
      bgimg = activity6;
    }
    else if(page == 'experience'){
      bgimg = activity14;
    }
    else if(page == 'group'){
      bgimg = activity8;
    }
    else if(page == 'person'){
      bgimg = activity9;
    }
    else if(page == 'session'){
      bgimg = activity15;
    }
    else if (page == 'location') {
      bgimg = activity10;
    }
    else if (page == 'spaces') {
      bgimg = activity10;
    }
    return (
      <Col xs={12} sm={6} md={5} mdOffset={1} lg={5} lgOffset={1} xsHidden className={s.noPadding}>
          <div className={s.helpPanel}>
              <div className={cx(s.imageContent)}
                style={{ backgroundImage: `url(${bgimg})` }}>
              </div>
          </div>
      </Col>
    );
  }
}

export default withStyles(s)(ListPlaceTips);

