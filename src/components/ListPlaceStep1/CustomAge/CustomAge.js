import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';

// External component
import {Range} from 'rc-slider';


// Redux form
import {change} from 'redux-form';

// Helper
import {convert} from '../../../helpers/currencyConvertion';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!rc-slider/assets/index.css';

class CustomAge extends Component {
    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        change: PropTypes.func.isRequired,
    };

    /*static defaultProps = {
        min: 0,
        max: 18
    };*/
    
    constructor (props) {
        super(props);
        this.state = {
            start: 0,
            end: 18,
            minimumAge: 0,
            maximumAge: 18
        };
        this.onAfterChange = this.onAfterChange.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }

    componentDidMount() {
        const { min, max } = this.props;
        if(min && max) {
            this.setState({
                minimumAge: min,
                maximumAge: max
            });
        }
    }

   componentWillReceiveProps(nextProps) {
       const { min, max } = nextProps;
       if(min && max) {
        this.setState({
            minimumAge: min,
            maximumAge: max
        });
       }
   } 



    async onAfterChange(sliderState){
       
        if(sliderState) {
            this.setState({
                minimumAge: sliderState[0],
                maximumAge: sliderState[1]
            });
        }
    }

    async updateValue(sliderState) {
        const { change, min, max, handleSubmit } = this.props;
        let minAge, maxAge;
        let values = sliderState; 
        if(sliderState) {
            this.setState({
                minimumAge: sliderState[0],
                maximumAge: sliderState[1]
            });
        }
        await change('ListPlaceStep1', 'minimumAge', sliderState[0]);
        await change('ListPlaceStep1', 'maximumAge', sliderState[1]);
    }
    
    render() {
        const { min, max } = this.props;
        const { start, end, minimumAge, maximumAge } = this.state;
        
        return (
            <div className={"listingAgeSlider"}>
                <Range
                    min={start}
                    max={end}
                    defaultValue={[min, max]}
                    value={[min, max]}
                    onAfterChange={this.onAfterChange}
                    onChange={this.updateValue}
                    allowCross={false}
                />
            </div>
        );
    }
}

const mapState = (state) => ({
 
});

const mapDispatch = {
    change
};

export default withStyles(s) (connect(mapState, mapDispatch)(CustomAge));