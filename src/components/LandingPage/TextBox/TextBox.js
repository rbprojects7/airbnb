import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import textBoxStyles from './textBox.scss';

class TextBox extends React.Component {

  render() {
    const { title, mainText } = this.props;
    return (
      <div className={textBoxStyles.mainContainer}>
        <div className={textBoxStyles.textWrapper}>
          <div className={textBoxStyles.titleContainer}>
            <FormattedMessage {...title} />
          </div>
          <div className={textBoxStyles.textContentContainer}>
            <FormattedMessage {...mainText} />
          </div>
        </div>
        <div className={textBoxStyles.bottomLine}>
        </div>
      </div>
    )
  }
}


export default withStyles(textBoxStyles)(TextBox);
