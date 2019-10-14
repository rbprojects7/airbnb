import React from 'react';
import PropTypes from 'prop-types';
import { forEach, map, includes } from 'lodash';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListingDetails.css';
import {
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import { injectIntl } from 'react-intl';
import { findMatch, totalList } from './helper';
import TickIcon from './tick.svg';
import CrossIcon from './cross.svg';
// Translation

class EnhancedDBSListItem extends React.Component {
    static propTypes = {
        itemList: PropTypes.arrayOf(PropTypes.shape({
            listsettings: PropTypes.shape({
                itemName: PropTypes.string,
                settingsType: PropTypes.shape({
                    typeName: PropTypes.string
                }),
            }),
            spacesId: PropTypes.string,
        })).isRequired,
        label: PropTypes.string.isRequired,
    };
    static defaultProps = {
        showTicks: false,
    };
    constructor(props) {
        super(props);
        const { itemList } = props;
        const itemListArr = [];
        forEach(itemList, item => itemListArr.push(item.listsettings.itemName));
        const indices = findMatch(itemListArr, totalList);
        this.state = { indices };
    }
    componentWillReceiveProps(props) {
        const { itemList } = props;
        const itemListArr = [];
        forEach(itemList, item => itemListArr.push(item.listsettings.itemName));
        const indices = findMatch(itemListArr, totalList);
        this.setState({ indices });
    }
    render() {
        const { itemList, label } = this.props;
        const { indices } = this.state;
        return (
            <Col xs={12} sm={12} md={8} lg={8} className={cx(s.space2, s.horizontalLineThrough)}>
                <Row>
                    <Col xs={12} sm={3} md={3} lg={3} className={cx(s.space1, s.titleMargin)}>
                        <p className={s.textMuted}> {label} </p>
                    </Col>
                    <Col xs={12} sm={9} md={9} lg={9} className={cx(s.space1)}>
                        <Row>
                            <Col md={12} lg={12} sm={12} xs={12}>
                                {
                                  map(totalList, (item, key) => {
                                      if (includes(indices, key)) {
                                          return (<p className={cx(s.text, s.spiltContainer)} key={item}><img alt={item} src={TickIcon} />&nbsp;&nbsp;{item}</p>);
                                      }
                                      return (<p className={cx(s.text, s.spiltContainer)} key={item}><img alt={item} src={CrossIcon} />&nbsp;&nbsp;{item}</p>);
                                  })
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    }

}

export default injectIntl(withStyles(s)(EnhancedDBSListItem));
