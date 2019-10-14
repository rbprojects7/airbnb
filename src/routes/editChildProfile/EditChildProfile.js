import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditChildProfile.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import EditChildProfileForm from '../../components/EditChildProfileForm/EditChildProfileForm';
import EditProfileSideMenu from '../../components/EditProfileSideMenu';

class EditChildProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    loading: false
  };

  render() {
    const { title, data, loading } = this.props;
    let list, dob, splitDateString, year, day, month, firstName, id;
    let formValues = {};
    if(data && data.length > 0){
    list = {
      id: data[0].id,
      firstName: data[0].firstName,
      lastName: data[0].lastName,
      preferredName: data[0].preferredName,
      birthday: data[0].birthday,
      email: data[0].email,
      preferences: data[0].preferences,
      childSelect: data[0].firstName,
    };
    dob = data[0].birthday;
    splitDateString = dob.split('-');
    year = Number(splitDateString[0]);
    month = Number(splitDateString[1] - 1);
    day = Number(splitDateString[2]);
    id = data[0].id,
    firstName = data[0].firstName;

    if (!loading) {
      formValues = Object.assign({}, list, { year: year }, { month: month }, { day: day }, { childSelect: id });
    }
  }
    return (
      <div className={s.container}>
        <Grid>
          <Row className={cx(s.landingContainer)}>
            <Col xs={12} sm={3} md={3} lg={3} className={cx(s.smBottom, s.smPadding)}>
              <EditProfileSideMenu />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} className={s.smPadding}>
              <EditChildProfileForm
                initialValues={formValues}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default withStyles(s)(EditChildProfile);
