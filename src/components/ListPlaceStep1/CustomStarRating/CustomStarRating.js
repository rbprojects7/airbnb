import React from 'react';
import PropTypes from 'prop-types';

import StarRatingComponent from 'react-star-rating-component';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './CustomStarRating.css';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Locale
import messages from '../../../locale/messages';

class CustomStarRating extends React.Component {

    static propTypes = {
      name: PropTypes.string.isRequired,
      className: PropTypes.string,
      change: PropTypes.func,
      editing: PropTypes.bool,
      value: PropTypes.number,
      currentValue: PropTypes.number,
    }; 

    static defaultProps = {
      editing: false,
      value: 0,
    };

    constructor (props) {
      super (props);  
      this.state = {
        rating: 0,
        showTooltip: false,
        toolTipValue: 0
      }
      this.onStarClick= this.onStarClick.bind(this);
      this.onStarHover = this.onStarHover.bind(this);
      this.onStarHoverOut = this.onStarHoverOut.bind(this);
    }

    componentDidMount() {
      const { value, editing } = this.props;
      console.log("change",value)
      if (editing) {
        this.setState({rating: value});
        //change(nextValue);
      }
    }

    componentWillReceiveProps(nextProps) {
      const { value, editing } = nextProps;
      console.log("change",value)
      if (editing) {
        this.setState({rating: value});
        //change(nextValue);
      }
    }
  
    onStarClick(nextValue, prevValue, name) {
      const { change } = this.props;
      if(Number(nextValue) === Number(prevValue)){
        this.setState({rating: 0});
        change(0);
      } else {
        this.setState({rating: nextValue});
        change(nextValue);
       }

    }

    onStarHover(nextValue, prevValue, name) {
      this.setState({
        showTooltip: true,
        toolTipValue: nextValue
      });
    }

    onStarHoverOut(nextValue, prevValue, name) {
      this.setState({
        showTooltip: false,
        toolTipValue: 0
      });
    }

    render() {
      const { rating, showTooltip, toolTipValue } = this.state;
      const { className, name, editing, value, currentValue } = this.props;

      return (
        <div className={className}>
          <div className={cx(s.starRatingContainer, 'customStarRating')}>
            {
              showTooltip && toolTipValue && <div 
                className={cx(s.tooltiptext, { [s.littleTypeTip]: toolTipValue === 1 }, { [s.significatTypeTip]: toolTipValue === 3 })}>
                { 
                  toolTipValue === 1 && <FormattedMessage {...messages.starRatingTooltipLittle} />
                }
                {
                  toolTipValue === 2 && <FormattedMessage {...messages.starRatingTooltipModerate} />
                }
                {
                  toolTipValue === 3 && <FormattedMessage {...messages.starRatingTooltipSignificant} />
                }
              </div>
            }
            <StarRatingComponent 
              name={name}
              starCount={3}
              editing={editing}
              value={editing ? rating : value}
              starColor={`#FF5F6C`}
              emptyStarColor={`#646F79`}
              onStarClick={this.onStarClick}
              onStarHover={this.onStarHover}
              onStarHoverOut={this.onStarHoverOut}
            />
          </div>
        </div>
      );
    }
}

export default withStyles(s)(CustomStarRating);
 

