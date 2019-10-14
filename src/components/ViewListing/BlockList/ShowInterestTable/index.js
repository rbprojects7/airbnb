import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import blockListStyle from '../blockList.scss';
import FilledImg from './filled.svg';
import EmptyImg from './empty.svg';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class ShowInterestTable extends Component {
    constructor(props) {
        super(props);
        // const { items, cookiesValue } = props;
        // if (cookiesValue && cookiesValue.length > 0) {
        //     this.state = { items: cookiesValue };
        // } else {
        //     this.state = { items };
        // }
        //this.state = { items: [] };
    }
    componentWillReceiveProps(props) {
        const { items, cookiesValue } = props;
        //this.state = { items };
        // if (cookiesValue && cookiesValue.length > 0) {
        //     this.state = { items: cookiesValue };
        // } else {
        //     this.state = { items };
        // }
    }
    render() {
        const { items } = this.props;
        const { incrementItem, cookiesValue } = this.props;
        
        return (<div>
            <div className={`${blockListStyle.header}`} style={{ marginTop: 0 }}>
                Click to show your interest
            </div>
            <div style={{ border: '1px solid #ccc', borderTop: 0, paddingBottom: 15 }}>
                <Row style={{ margin: 0 }}>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <p style={{ padding: '10px 0 5px 0', margin: 0 }}>Select your ideal days and times for this experience.</p>
                    </Col>
                </Row>
                <Row style={{ margin: 0, padding: 5 }}>
                    <Col lg={4} md={4} sm={4} xs={4}>
                        <p style={{ textAlign: 'center' }} />
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>M</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>T</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>W</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>T</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>F</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>S</p>
                    </Col>
                    <Col lg={1} md={1} sm={1} xs={1} style={{ padding: 0 }}>
                        <p style={{ textAlign: 'center', margin: 0 }}>S</p>
                    </Col>
                </Row>
                {map(items, (item, itemIndex) => (<Row style={{ margin: 0, padding: '1.5px 5px', height: 28 }}>
                    <Col lg={4} md={4} sm={4} xs={4}>
                        <p style={{ lineHeight: '26px', margin: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.time}</p>
                    </Col>
                    {map(item.data, (data, dataIndex) => (<Col
                        lg={1}
                        md={1}
                        sm={1}
                        xs={1}
                        style={{
                            padding: '0 1.5px',
                            height: '100%',
                            cursor: 'pointer',
                        }}
                        // onClick={() => incrementItem(itemIndex, dataIndex)}
                    onClick={() => cookiesValue && cookiesValue[itemIndex] && cookiesValue[itemIndex]['data'] && cookiesValue[itemIndex]['data'][dataIndex] === false ? incrementItem(itemIndex, dataIndex) : void(0)}
                    >

                        {
                            data ? <p key={dataIndex}
                                style={{
                                    height: '100%',
                                    textAlign: 'center',
                                    margin: 0,
                                    color: '#FFF',
                                    border: '1px solid #FF5F6C',
                                    borderRadius: 4,
                                    lineHeight: '20px',
                                    padding: 2,
                                    fontWeight: 'bold',
                                    background: `#FF5F6C url("${FilledImg}") no-repeat scroll right center`,
                                    backgroundOrigin: 'content-box',
                                }}
                            >
                                {data}
                            </p> : <p key={dataIndex}
                                style={{
                                    height: '100%',
                                    textAlign: 'center',
                                    margin: 0,
                                    color: '#000',
                                    border: '1px solid #FF5F6C',
                                    borderRadius: 4,
                                    padding: 3,
                                    background: `#FFF url("${EmptyImg}") no-repeat scroll right center`,
                                    backgroundOrigin: 'content-box',
                                }}
                                onClick={() => incrementItem(itemIndex, dataIndex)}
                                />}
                    </Col>))}
                </Row>))}
            </div>
        </div>);
    }
}

ShowInterestTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    incrementItem: PropTypes.func.isRequired,
};

export default withStyles(blockListStyle)(ShowInterestTable);
