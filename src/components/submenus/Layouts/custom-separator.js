import React from 'react';
import PropTypes from 'prop-types';

const customSeparator = ({ id }) => (<div id={id} className="row"><div className="col-md-2 col-xs-12" /><div className="col-md-8 col-xs-12"><hr /></div><div className="col-md-2 col-xs-12" /></div>);

customSeparator.propTypes = {
    id: PropTypes.string,
};

customSeparator.defaultProps = {
    id: '',
};

export default customSeparator;
