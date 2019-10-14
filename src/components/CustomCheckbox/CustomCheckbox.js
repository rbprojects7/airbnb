// General
import React from 'react';
import PropTypes from 'prop-types';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!icheck/skins/minimal/_all.css';
// import s from 'icheck/skins/minimal/';
// External Component
import { Checkbox } from 'react-icheck';
import { check } from 'graphql-anywhere';

class CustomCheckbox extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      disabled: false,
    }
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    const { checked } = this.props;
    if(checked === true) {
      this.setState({ isChecked: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;
    if(checked === true) {
      this.setState({ isChecked: true });
    } 
  }

  handleOnChange () {
    this.setState({ isChecked: !this.state.isChecked });
    return !this.state.isChecked;
  }

  render() {
    const { name, value, onChange, checked, input, disabled } = this.props;
    const { isChecked } = this.state;
    let checkBoxColor =  disabled ? "icheckbox_minimal-red" : "icheckbox_minimal-blue";

    return (
      <Checkbox
        checkboxClass={checkBoxColor}
        increaseArea="20%"
        checked={isChecked}
        name={name}
        value={value}
        onChange={() => onChange(this.handleOnChange())}
        disabled={disabled}
        />
    )
  }
}

export default withStyles(s)(CustomCheckbox);
