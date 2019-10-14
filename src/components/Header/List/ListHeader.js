import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { 
 Navbar,
 Nav,
 NavItem,
 NavDropdown,
 MenuItem 
} from 'react-bootstrap';
import s from './ListHeader.css';

// Components
import Link from '../../Link';
import ListNavigation from './ListNavigation';
import SaveButton from './SaveButton';
import Logo from '../../Logo';
import Toaster from '../../Toaster';

class ListHeader extends React.Component {

  static propTypes = {
    step: PropTypes.number.isRequired,
    formPage: PropTypes.string.isRequired,
  };
 
  render() {
    const { step, formPage } = this.props;
    
    return (
      <div className={s.root}>
        <Toaster />
        <div className={s.container}>
          <Navbar fluid className={cx(s.AirBnbHeader, 'ListHeader')} fixedTop={true} expanded={false}>
            <Navbar.Header>
              <Navbar.Brand className={cx('hidden-xs')} >
                <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
              </Navbar.Brand>
              <Navbar.Toggle className={cx(s.brandBorder, s.navBarToggle)} children={
                <span>
                  <Logo link={"/"} className={s.brand} />
                </span>
              } />
              <Navbar.Toggle className={cx(s.exitToggle, s.navBarToggle)} children={
                <span>
                  <SaveButton 
                    step={step}
                    formPage={formPage}
                    className={s.exitText}
                  />
                </span>
              } />
            </Navbar.Header>
            <Navbar.Collapse>
              <ListNavigation step={step} formPage={formPage} />
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(ListHeader);
