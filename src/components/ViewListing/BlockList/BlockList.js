import React from 'react';
import PropTypes from "prop-types";

import {
    Button,
    Row,
    Col,
    FormGroup
} from 'react-bootstrap';
import moment from 'moment';
import { forEach, isEmpty } from 'lodash';
// Style
import s from '../Calendar/Calendar.css';
import blockListStyle from './blockList.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// Redux
import { connect } from 'react-redux';
// components
import BlockListItem from './BlockListItem';
import Sticky from "../Sticky";
import SocialShare from '../SocialShare';
import ViewCount from '../ViewCount';
// Locale
import ShowInterestTable from './ShowInterestTable';
import messages from "../../../locale/messages";
// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Component
import CurrencyConverter from '../../CurrencyConverter';
import cx from 'classnames';
import { showInterest } from '../../../actions/showInterest';
import cookie from 'react-cookies';
import { graphql, gql, compose } from 'react-apollo';

class BlockList extends React.Component {
    static propTypes = {
        showInterest: PropTypes.func,
        showInterestData: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
            getShowInterest: PropTypes.array
        }),
    };

    constructor(props) {
        super(props);
        this.state = {
            hours: '3',
            showInterestData: [{
                time: 'Before 12',
                data: {
                    beforeMonday: 0,
                    beforeTuesday: 0,
                    beforeWednesday: 0,
                    beforeThursday: 0,
                    beforeFriday: 0,
                    beforeSaturday: 0,
                    beforeSunday: 0,
                },
            }, {
                time: '12 - 4',
                data: {
                    middleMonday: 0,
                    middleTuesday: 0,
                    middleWednesday: 0,
                    middleThursday: 0,
                    middleFriday: 0,
                    middleSaturday: 0,
                    middleSunday: 0,
                }
                ,
            }, {
                time: 'After 4',
                data: {
                    afterMonday: 0,
                    afterTuesday: 0,
                    afterWednesday: 0,
                    afterThursday: 0,
                    afterFriday: 0,
                    afterSaturday: 0,
                    afterSunday: 0,
                }
            }],
            current_Status: [{
                time: 'Before 12',
                data: {
                    beforeMonday: false,
                    beforeTuesday: false,
                    beforeWednesday: false,
                    beforeThursday: false,
                    beforeFriday: false,
                    beforeSaturday: false,
                    beforeSunday: false,
                },
            }, {
                time: '12 - 4',
                data: {
                    middleMonday: false,
                    middleTuesday: false,
                    middleWednesday: false,
                    middleThursday: false,
                    middleFriday: false,
                    middleSaturday: false,
                    middleSunday: false,
                }
                ,
            }, {
                time: 'After 4',
                data: {
                    afterMonday: false,
                    afterTuesday: false,
                    afterWednesday: false,
                    afterThursday: false,
                    afterFriday: false,
                    afterSaturday: false,
                    afterSunday: false,
                }
            }],

            isCookiesSet: false,
            isPageLoad: false,
        };

        this.changeInterestData = this.changeInterestData.bind(this);
    }

    componentWillMount() {
        const { listId } = this.props;
        const { showInterestData, current_Status } = this.state;
        const ShowInterest = listId;
        const cookiesValue = cookie.load(ShowInterest);

        if (cookiesValue && cookiesValue.length > 0 && cookiesValue[0].data && cookiesValue[1].data && cookiesValue[2].data) {
            this.setState({
                current_Status: [{
                    time: 'Before 12',
                    data: {
                        beforeMonday: cookiesValue[0].data.beforeMonday,
                        beforeTuesday: cookiesValue[0].data.beforeTuesday,
                        beforeWednesday: cookiesValue[0].data.beforeWednesday,
                        beforeThursday: cookiesValue[0].data.beforeThursday,
                        beforeFriday: cookiesValue[0].data.beforeFriday,
                        beforeSaturday: cookiesValue[0].data.beforeSaturday,
                        beforeSunday: cookiesValue[0].data.beforeSunday,
                    },
                }, {
                    time: '12 - 4',
                    data: {
                        middleMonday: cookiesValue[1].data.middleMonday,
                        middleTuesday: cookiesValue[1].data.middleTuesday,
                        middleWednesday: cookiesValue[1].data.middleWednesday,
                        middleThursday: cookiesValue[1].data.middleThursday,
                        middleFriday: cookiesValue[1].data.middleFriday,
                        middleSaturday: cookiesValue[1].data.middleSaturday,
                        middleSunday: cookiesValue[1].data.middleSunday,
                    }
                    ,
                }, {
                    time: 'After 4',
                    data: {
                        afterMonday: cookiesValue[2].data.afterMonday,
                        afterTuesday: cookiesValue[2].data.afterTuesday,
                        afterWednesday: cookiesValue[2].data.afterWednesday,
                        afterThursday: cookiesValue[2].data.afterThursday,
                        afterFriday: cookiesValue[2].data.afterFriday,
                        afterSaturday: cookiesValue[2].data.afterSaturday,
                        afterSunday: cookiesValue[2].data.afterSunday,
                    }
                }],
                isCookiesSet: !!(cookiesValue),
                cookiesValue
            });
        }
    }

    componentDidMount() {
        const { listId, showInterestData, showInterestData: { getShowInterest } } = this.props;
        const { current_Status } = this.state;
        const ShowInterest = listId;
        const cookiesValue = cookie.load(ShowInterest);

        if (cookiesValue && cookiesValue.length > 0 && cookiesValue[0].data && cookiesValue[1].data && cookiesValue[2].data) {
            this.setState({
                current_Status: [{
                    time: 'Before 12',
                    data: {
                        beforeMonday: cookiesValue[0].data.beforeMonday,
                        beforeTuesday: cookiesValue[0].data.beforeTuesday,
                        beforeWednesday: cookiesValue[0].data.beforeWednesday,
                        beforeThursday: cookiesValue[0].data.beforeThursday,
                        beforeFriday: cookiesValue[0].data.beforeFriday,
                        beforeSaturday: cookiesValue[0].data.beforeSaturday,
                        beforeSunday: cookiesValue[0].data.beforeSunday,
                    },
                }, {
                    time: '12 - 4',
                    data: {
                        middleMonday: cookiesValue[1].data.middleMonday,
                        middleTuesday: cookiesValue[1].data.middleTuesday,
                        middleWednesday: cookiesValue[1].data.middleWednesday,
                        middleThursday: cookiesValue[1].data.middleThursday,
                        middleFriday: cookiesValue[1].data.middleFriday,
                        middleSaturday: cookiesValue[1].data.middleSaturday,
                        middleSunday: cookiesValue[1].data.middleSunday,
                    }
                    ,
                }, {
                    time: 'After 4',
                    data: {
                        afterMonday: cookiesValue[2].data.afterMonday,
                        afterTuesday: cookiesValue[2].data.afterTuesday,
                        afterWednesday: cookiesValue[2].data.afterWednesday,
                        afterThursday: cookiesValue[2].data.afterThursday,
                        afterFriday: cookiesValue[2].data.afterFriday,
                        afterSaturday: cookiesValue[2].data.afterSaturday,
                        afterSunday: cookiesValue[2].data.afterSunday,
                    }
                }],
                isCookiesSet: !!(cookiesValue),
                cookiesValue
            });
        }

        let interestData = [];
        if (getShowInterest && getShowInterest.length > 0) {
            interestData = [{
                time: 'Before 12',
                data: {
                    beforeMonday: getShowInterest[0].beforeMonday,
                    beforeTuesday: getShowInterest[0].beforeTuesday,
                    beforeWednesday: getShowInterest[0].beforeWednesday,
                    beforeThursday: getShowInterest[0].beforeThursday,
                    beforeFriday: getShowInterest[0].beforeFriday,
                    beforeSaturday: getShowInterest[0].beforeSaturday,
                    beforeSunday: getShowInterest[0].beforeSunday,
                },
            }, {
                time: '12 - 4',
                data: {
                    middleMonday: getShowInterest[0].middleMonday,
                    middleTuesday: getShowInterest[0].middleTuesday,
                    middleWednesday: getShowInterest[0].middleWednesday,
                    middleThursday: getShowInterest[0].middleThursday,
                    middleFriday: getShowInterest[0].middleFriday,
                    middleSaturday: getShowInterest[0].middleSaturday,
                    middleSunday: getShowInterest[0].middleSunday,
                }
                ,
            }, {
                time: 'After 4',
                data: {
                    afterMonday: getShowInterest[0].afterMonday,
                    afterTuesday: getShowInterest[0].afterTuesday,
                    afterWednesday: getShowInterest[0].afterWednesday,
                    afterThursday: getShowInterest[0].afterThursday,
                    afterFriday: getShowInterest[0].afterFriday,
                    afterSaturday: getShowInterest[0].afterSaturday,
                    afterSunday: getShowInterest[0].afterSunday,
                }
            }];
            this.setState({ showInterestData: interestData });
        }
    }

    getHeaderText = (blocks) => {
        const today = moment().format("X");
        const totalSessions = [];
        forEach(blocks, (block) => {
            forEach(block.block.sessionTime, (sessionTime) => {
                if (moment(block.block.sessionTime[0].date, "Do MMMM YYYY").format("X") >= today) {
                    const sessionDate = moment(sessionTime.date, "Do MMMM YYYY").format("X");
                    if (sessionDate >= today) totalSessions.push(block.block.sessionTime.length);
                }
            });
        });
        if (!isEmpty(totalSessions) && totalSessions.every(v => v === totalSessions[0])) {
            const numSessions = totalSessions[0];
            if (numSessions > 1) return { showCurrency: true, text: `${numSessions} sessions for`, sessionsExist: true };
            else if (numSessions === 1) return { showCurrency: true, text: `1 session for`, sessionsExist: true };
        } else if (isEmpty(totalSessions)) {
            return { showCurrency: true, text: 'Experience for', sessionsExist: false };
        } else {
            return { showCurrency: true, text: 'Experience for', sessionsExist: true };
        }
    }

    componentWillReceiveProps(nextProps) {
        const { listId, showInterestData, showInterestData: { getShowInterest } } = nextProps;
        let interestData = [];
        if (getShowInterest && getShowInterest.length > 0) {
            interestData = [{
                time: 'Before 12',
                data: {
                    beforeMonday: getShowInterest[0].beforeMonday,
                    beforeTuesday: getShowInterest[0].beforeTuesday,
                    beforeWednesday: getShowInterest[0].beforeWednesday,
                    beforeThursday: getShowInterest[0].beforeThursday,
                    beforeFriday: getShowInterest[0].beforeFriday,
                    beforeSaturday: getShowInterest[0].beforeSaturday,
                    beforeSunday: getShowInterest[0].beforeSunday,
                },
            }, {
                time: '12 - 4',
                data: {
                    middleMonday: getShowInterest[0].middleMonday,
                    middleTuesday: getShowInterest[0].middleTuesday,
                    middleWednesday: getShowInterest[0].middleWednesday,
                    middleThursday: getShowInterest[0].middleThursday,
                    middleFriday: getShowInterest[0].middleFriday,
                    middleSaturday: getShowInterest[0].middleSaturday,
                    middleSunday: getShowInterest[0].middleSunday,
                }
                ,
            }, {
                time: 'After 4',
                data: {
                    afterMonday: getShowInterest[0].afterMonday,
                    afterTuesday: getShowInterest[0].afterTuesday,
                    afterWednesday: getShowInterest[0].afterWednesday,
                    afterThursday: getShowInterest[0].afterThursday,
                    afterFriday: getShowInterest[0].afterFriday,
                    afterSaturday: getShowInterest[0].afterSaturday,
                    afterSunday: getShowInterest[0].afterSunday,
                }
            }];
            this.setState({ showInterestData: interestData });
        }
    }

    getPrice = (blocks) => {
        let price = 0;
        if (blocks) {
            for (const block of blocks) {
                price = block.price;
            }
        }
        return price;
    };

    changeInterestData(itemIndex, dataIndex) {
        const { listId, showInterest } = this.props;
        const { showInterestData: { getShowInterest } } = this.props;
        const { showInterestData, current_Status } = this.state;
        const { showInterestData: { refetch } } = this.props;
        let interestData = [],
            currentCookieStatus = [];
        let interestName,
            interestCount;
        currentCookieStatus = current_Status.slice();
        interestData = showInterestData.slice();

        if (getShowInterest && getShowInterest.length > 0) {
            // Cookie Active status updated
            currentCookieStatus[itemIndex].data[dataIndex] = true;
            interestData[itemIndex].data[dataIndex] = Number(interestData[itemIndex].data[dataIndex]) + 1;
            interestName = dataIndex;
            this.setState({
                current_Status: currentCookieStatus,
                showInterestData: interestData
            });
            showInterest(listId, interestName, 1);
        } else {
            // Cookie Active status updated
            currentCookieStatus[itemIndex].data[dataIndex] = true;
            interestData[itemIndex].data[dataIndex] = Number(interestData[itemIndex].data[dataIndex]) + 1;
            interestName = dataIndex;
            this.setState({
                current_Status: currentCookieStatus,
                showInterestData: interestData
            });
            showInterest(listId, interestName, 1);
        }

        const stringfydata = JSON.stringify(currentCookieStatus);
        const maxAge = 3650 * 24 * 365; //one year
        cookie.save(listId, stringfydata, {
            path: '/',
            maxAge
        });

        this.setState({ isCookiesSet: true });
    }

    render() {
        const { blocks, loading, currency, listId, isHost, isAuthenticated, account, listingData, showInterest } = this.props;
        const { showInterestData, cookiesValue } = this.state;
        const { current_Status } = this.state;
        let isBookingAllowed = 0;
        if (account && account.data) {
            isBookingAllowed = account.data.isBookingAllowed;
        }
        const today = moment(moment().subtract(1, 'days')).format("X");
        let blockDate;
        const price = listingData.basePrice ? listingData.basePrice : 0;
        let newBlock = [];
        blocks && blocks.map(async (item, index) => {
            const newSession = {
                firstSession: item.sessionTime[item.sessionTime.length - 1].date,
                block: item
            };
            
            await newBlock.push(newSession);
        });
        newBlock = newBlock.sort((a, b) => {
            let difference;
            difference = moment(a.firstSession, "Do MMMM YYYY").diff(moment(b.firstSession, "Do MMMM YYYY"), 'days');
            return difference;
        });
        const headerText = this.getHeaderText(newBlock);

        return (
            <div className={`data-sticky bookItFormSection ${blockListStyle.bookItFormSection}`}>
                <div className={`${s.bookItContainer} ${blockListStyle.blockListWrapper} ${blockListStyle.bookItPanel}`}>
                    <div className={`${blockListStyle.header}`}>
                        <Row style={{ margin: 0, padding: 0, width: '100%' }}>
                            { headerText && <Col xs={7} sm={7} md={7} lg={7} style={{ paddingLeft: 20 }}>
                                {headerText.text}
                            </Col>
                        }
                            <Col xs={5} sm={5} md={5} lg={5} style={{ textAlign: 'right', paddingRight: 25 }}>
                                <CurrencyConverter amount={price} from={currency} />
                            </Col>
                        </Row>
                    </div>
                    {(headerText && headerText.showCurrency && headerText.sessionsExist && newBlock && newBlock.length > 0) ? (<div className={`${blockListStyle.list} `}>
                        {
                            newBlock && newBlock.map && newBlock.map((item, index) => {
                                blockDate = moment(item.firstSession, "Do MMMM YYYY").format("X");
                                return (<div>
                                    {item.block && blockDate >= today && <hr /> && (index > 0)}
                                    {item.block && blockDate >= today && <BlockListItem block={item.block} listId={listId} isHost={isHost} key={listId} isAuthenticated={isAuthenticated} isBookingAllowed={isBookingAllowed} />}
                                </div>);
                            })
                        }
                    </div>) : <div className={`${blockListStyle.list} `} style={{ padding: 15 }}><p>There are currently no dates listed.<br />If you are interested in this experience, contact the mentor or show your interest below.</p></div>}
                    <div style={{ paddingTop: 30, paddingBottom: 60 }}>
                        <ShowInterestTable
                          incrementItem={this.changeInterestData}
                          items={showInterestData}
                          cookiesValue={current_Status}
                        />
                    </div>
                </div>
                <div className="socialiconpanel">
                    <div className={cx('hidden-xs hidden-sm')}>
                        <SocialShare listId={listId} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapState = state => ({
    isLoading: state.viewListing.isLoading,
    isAuthenticated: state.runtime.isAuthenticated,
    account: state.account,
});

const mapDispatch = {
    showInterest
};

export default withStyles(blockListStyle)(connect(mapState, mapDispatch)(BlockList));
