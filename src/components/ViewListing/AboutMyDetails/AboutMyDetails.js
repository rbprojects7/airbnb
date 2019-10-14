import React from "react";
import PropTypes from "prop-types";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./AboutMyDetails.css";
import {
  Row,
  Col,
  Panel
} from "react-bootstrap";
import cx from "classnames";
import * as FontAwesome from "react-icons/lib/fa";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../../locale/messages";

// Component
import StarRating from "../StarRating";

// Helper functions
import {
  checkValue
} from "../../../components/ViewListing/ListingDetails/helper";

class AboutMyDetails extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    formatMessage: PropTypes.func,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data: data
    });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({
      data: data
    });
  }

  render() {
    const { data } = this.state;
    const { formatMessage } = this.props.intl;
    let verbalStrength;
    let verbalDescription;
    let logicStrength;
    let logicDescription;
    let visualStrength;
    let visualDescription;
    let musicalStrength;
    let musicalDescription;
    let bodyStrength;
    let bodyDescription;
    let peopleStrength;
    let peopleDescription;
    let innerStrength;
    let innerDescription;
    let nauralisticStrength;
    let nauralisticDescription;
    if (data && data.starList != undefined) {
      verbalStrength = checkValue(data.starList.verbalStrength, "");
      verbalDescription = checkValue(data.starList.verbalDescription, "");
      logicStrength = checkValue(data.starList.logicStrength, "");
      logicDescription = checkValue(data.starList.logicDescription, "");
      visualStrength = checkValue(data.starList.visualStrength, "");
      visualDescription = checkValue(data.starList.visualDescription, "");
      musicalStrength = checkValue(data.starList.musicalStrength, "");
      musicalDescription = checkValue(data.starList.musicalDescription, "");
      bodyStrength = checkValue(data.starList.bodyStrength, "");
      bodyDescription = checkValue(data.starList.bodyDescription, "");
      peopleStrength = checkValue(data.starList.peopleStrength, "");
      peopleDescription = checkValue(data.starList.peopleDescription, "");
      innerStrength = checkValue(data.starList.innerStrength, "");
      innerDescription = checkValue(data.starList.innerDescription, "");
      nauralisticStrength = checkValue(data.starList.nauralisticStrength, "");
      nauralisticDescription = checkValue(data.starList.nauralisticDescription, "");
    }

    return (
      <Row className={cx(s.pageContent, s.noMargin)}>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={cx(s.space2, s.spaceTop2)}
        >

          <Col lg={3} md={3} xs={12} sm={3} className={cx(s.noPadding, s.space4)}>
            <Row>
              <p className={s.strengthTitle}>
                <FormattedMessage {...messages.strengths} />
              </p>
            </Row>
          </Col>
          <Col lg={9} md={9} xs={12} sm={9} className={cx(s.noPadding, s.strenthpanelMargin)}>
            {verbalStrength > 0 && (
              <Col md={9} lg={9} sm={9} xs={12} className={cx(s.noPadding)}>
                <span>
                  <StarRating
                    value={verbalStrength}
                    className={cx(s.starReview, s.iconSize)}
                  />
                </span>
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.verbalStrength} />
                </span>
                <div>
                  {verbalDescription && <Panel className={s.panelContainer}>
                    <span className={s.textwrap}>
                      {verbalDescription}
                    </span>
                  </Panel>}
                </div>
              </Col>
            )}



            {logicStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={s.noPadding}>
                <StarRating
                  value={logicStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.logicStrength} />
                </span>
                {logicDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {logicDescription}
                  </span>
                </Panel>}
              </Col>
            )}



            {visualStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={s.noPadding}>
                <StarRating
                  value={visualStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.visualStrength} />
                </span>
                {visualDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {visualDescription}
                  </span>
                </Panel>}
              </Col>
            )}



            {musicalStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={s.noPadding}>
                <StarRating
                  value={musicalStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.musicalStrength} />
                </span>
                {musicalDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {musicalDescription}
                  </span>
                </Panel>}
              </Col>
            )}



            {bodyStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={s.noPadding}>
                <StarRating
                  value={bodyStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.bodyStrength} />
                </span>
                {bodyDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {bodyDescription}
                  </span>
                </Panel>}
              </Col>
            )}




            {peopleStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={s.noPadding}>
                <StarRating
                  value={peopleStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.peopleStrength} />
                </span>
                {peopleDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {peopleDescription}
                  </span>
                </Panel>}
              </Col>
            )}




            {innerStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={s.noPadding}>
                <StarRating
                  value={innerStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.innerStrength} />
                </span>
                {innerDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {innerDescription}
                  </span>
                </Panel>}
              </Col>
            )}



            {nauralisticStrength > 0 && (
              <Col md={9} lg={9} xs={12} sm={9} className={cx(s.noPadding, 'viewListing')}>
                <StarRating
                  value={nauralisticStrength}
                  className={cx(s.starReview, s.iconSize)}
                />
                <span className={s.starReviewTitle}>
                  <FormattedMessage {...messages.nauralisticStrength} />
                </span>
                {nauralisticDescription && <Panel className={s.panelContainer}>
                  <span className={s.textwrap}>
                    {nauralisticDescription}
                  </span>
                </Panel>}
              </Col>
            )}


          </Col>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(withStyles(s)(AboutMyDetails));
