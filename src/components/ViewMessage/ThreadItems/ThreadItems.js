import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import s from '../ViewMessage.css';


import { graphql, compose } from 'react-apollo';

// Components
import Status from './Status';
import ToMessage from './ToMessage';
import FromMessage from './FromMessage';
import Loading from '../../Loading';

// Locale
import messages from '../../../locale/messages';

class ThreadItems extends Component {
  static propTypes = {
    formatMessage: PropTypes.func,
    threadId: PropTypes.number.isRequired,
    userType: PropTypes.string.isRequired,
    data: PropTypes.shape({
      guestProfile: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        picture: PropTypes.string,
        displayName: PropTypes.string.isRequired,
      }),
      hostProfile: PropTypes.shape({
        profileId: PropTypes.number.isRequired,
        picture: PropTypes.string,
        displayName: PropTypes.string.isRequired,
      }),
      threadItems: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        content: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        sentBy: PropTypes.string.isRequired,
      })),
      threadItemsCount: PropTypes.number.isRequired,
    }),
  };

  static defaultProps = {
    data: {
      threadItems: [],
      threadItemsCount: 0,
    },
  };

  render() {
    const { data, data: { threadItems, threadItemsCount, guestProfile, hostProfile, listData }, userType, loadMore } = this.props;
    const { childParentData } = this.props;
    // console.log('iopop', threadItems);
    // console.log('huhuhu',childParentData)
    let  finalLearners=[], guest = {};
    if (childParentData && childParentData.length > 0){
      childParentData.map((item, index) => {
        let learners = {};
        // console.log('popopo',item.childName[0].id)
        learners['id'] = item.childName[0].id;
        learners['name'] = item.childName[0].preferredName;
        finalLearners.push(learners);
      });
    }
    guest['id'] = data.guest;
    guest['name'] = guestProfile.displayName;
    finalLearners.push(guest);
    // console.log('learners',finalLearners);
    
    
    if (threadItems != null && threadItems.length > 0) {
      return (
        <div>

          {
                            threadItems != null && threadItems.length > 0 && threadItems.map((item, index) => (
                              <div key={index}>        
                                {
                                        item.type && item.type != 'message' && <Status
                                          type={item.type}
                                          createdAt={item.createdAt}
                                        />
                                    }
                                {
                  userType === 'guest' && item.sentBy === data.host && item.content != null && item.cancellationDetails && item.cancellationDetails.length == 0 && <FromMessage
                                          profileId={data.hostProfile.profileId}
                                          picture={data.hostProfile.picture}
                                          displayName={data.hostProfile.displayName}
                                          content={item.content}
                                          createdAt={item.createdAt}
                                        />
                                    }

                                   {
                  userType === 'guest' && item.sentBy === data.host && item.content != null && item.cancellationDetails && item.cancellationDetails.length > 0 && <FromMessage
                                    profileId={data.hostProfile.profileId}
                                    picture={data.hostProfile.picture}
                                    displayName={data.hostProfile.displayName}
                                    content={item.content}
                                    createdAt={item.createdAt}
                                    cancellationDetails={item.cancellationDetails}
                                    learners={finalLearners}
                                    guestName={guestProfile.firstName}
                                    hostName={hostProfile.firstName}
                                    listTitle={listData.title}
                                    userType={userType}
                                    />
                                    }
                                {
                                        userType === 'guest' && item.sentBy === data.guest && item.content != null && <ToMessage
                                          profileId={data.guestProfile.profileId}
                                          picture={data.guestProfile.picture}
                                          displayName={data.guestProfile.displayName}
                                          content={item.content}
                                          createdAt={item.createdAt}
                                        />
                                    }
                                {
                  userType === 'host' && item.sentBy === data.guest && item.content != null && item.cancellationDetails && item.cancellationDetails.length == 0 && <FromMessage
                                          profileId={data.guestProfile.profileId}
                                          picture={data.guestProfile.picture}
                                          displayName={data.guestProfile.displayName}
                                          content={item.content}
                                          createdAt={item.createdAt}
                                        />
                                    }

                                      {
                                        userType === 'host' && item.sentBy === data.guest && item.content != null && item.cancellationDetails && item.cancellationDetails.length > 0 && <FromMessage
                                          profileId={data.guestProfile.profileId}
                                          picture={data.guestProfile.picture}
                                          displayName={data.guestProfile.displayName}
                                          content={item.content}
                                          createdAt={item.createdAt}
                                          cancellationDetails={item.cancellationDetails}
                                          learners={finalLearners}
                                          guestName={guestProfile.firstName}
                                          hostName={hostProfile.firstName}
                                          listTitle={listData.title}
                                          userType={userType}
                                        />
                                      }
                                {
                  userType === 'host' && item.sentBy === data.host && item.content != null && <ToMessage
                                          profileId={data.hostProfile.profileId}
                                          picture={data.hostProfile.picture}
                                          displayName={data.hostProfile.displayName}
                                          content={item.content}
                                          createdAt={item.createdAt}
                                        />
                                    }
                              </div>
                                ))
                        }
          {
                            data && threadItems && threadItems.length < threadItemsCount && <div className={s.textCenter}>
              <Button href="javascript:void(0)" onClick={() => loadMore()} className={cx(s.btnRadius, s.btnPrimary)}><FormattedMessage {...messages.loadMoreMsg} /></Button>
                            </div>
                        }

        </div>
      );
    }
    return (
      <div> <FormattedMessage {...messages.noItmesFound} /> </div>
    );
  }
}

export default ThreadItems;

