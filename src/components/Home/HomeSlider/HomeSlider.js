import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { shuffle } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import c from './HomeSlider.css';
import s from '!isomorphic-style-loader!css-loader!sass-loader!react-id-swiper/src/styles/css/swiper.css';

import * as FontAwesome from 'react-icons/lib/fa';
import {
    Button,
    Grid,
    Row,
    Col,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    Carousel,
} from 'react-bootstrap';

// Component
import HomeItem from '../HomeItem';
import Swiper from 'react-id-swiper';

const nextArrowStyle = {
    position: 'absolute',
    right: '-40px',
    background: '#fff',
    color: '#00B0CD',
    zIndex: '5',
    width: 'auto',
    height: 'auto',
    top: '30%',
    fontSize: '40px',
    cursor: 'pointer',
    borderRadius: '50%',
    textAlign: 'center',
    border: '2px solid transparent',
    boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)'
};

const prevArrowStyle = {
    position: 'absolute',
    left: '-40px',
    background: '#fff',
    color: '#00B0CD',
    zIndex: '5',
    width: 'auto',
    height: 'auto',
    top: '30%',
    fontSize: '40px',
    cursor: 'pointer',
    borderRadius: '50%',
    textAlign: 'center',
    border: '2px solid transparent',
    boxShadow: '0 1px 1px 1px rgba(0, 0, 0, 0.14)'
};



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={nextArrowStyle}
            onClick={onClick}
        >
            <FontAwesome.FaAngleRight className={c.navigationIcon} />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={prevArrowStyle}
            onClick={onClick}
        >
            <FontAwesome.FaAngleLeft className={c.navigationIcon} />
        </div>
    );
}

class SlideComponent extends React.Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            listPhotos: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string
            })),
            coverPhoto: PropTypes.number,
            listingData: PropTypes.shape({
                basePrice: PropTypes.number,
                currency: PropTypes.string,
            }),
            settingsData: PropTypes.arrayOf(PropTypes.shape({
                listsettings: PropTypes.shape({
                    itemName: PropTypes.string,
                }),
            })),
            id: PropTypes.number,
            beds: PropTypes.number,
            title: PropTypes.string,
            bookingType: PropTypes.string,
            reviewsCount: PropTypes.number,
            reviewsStarRating: PropTypes.number
        }))
    };

    static defaultProps = {
        data: []
    }

    constructor(props) {
        super(props);
        this.swiper = null;
        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        this.progress = this.progress.bind(this);

        this.state = {
            isBeginning: true,
            isEnd: false
        }
    }

    goNext() {
        this.swiper.slideNext();
    }

    goPrev() {
        this.swiper.slidePrev();
    }
    progress() {
        if (!this.swiper) return;
        if (this.swiper.isEnd) {
            this.setState({ isEnd: true });
        } else if (this.swiper.isBeginning) {
            this.setState({ isBeginning: true });
        } else {
            this.setState({ isEnd: false, isBeginning: false });
        }
    }

    render() {
        const { data } = this.props;
        const { isBeginning, isEnd } = this.state;
        let th = this;
        const settings = {
            dots: false,
            autoplay: true,
            autoplaySpeed: 3100,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            slidesToShow: 3,
            speed: 750,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        arrows: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0,
                        swipe: true,
                        swipeToSlide: true,
                        touchMove: true,
                        centerMode: true
                    }
                }]
        };
        const params = {
            slidesPerView: 3,
            spaceBetween: 30,
            // slidesPerGroup: 3,
            loop: true,
            freeMode: 'true',
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                // 1024: {
                //   slidesPerView: 4,
                //   spaceBetween: 40
                // },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    centeredSlides: true,
                }
            }
        };

        return (
            <Grid fluid>
                {/* <div className="swiperCss"> */}
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} className={'homePageSwiperSlider'}>
                        {/* <Slider {...settings} className={cx('row')}> */}
                        <Swiper {...params} ref={node => th.swiper = node !== null ? node.swiper : null}>
                            {
                                shuffle(data).map((item, index) => {
                                    if (item.listPhotos.length > 0) {
                                        return (
                                            <div className={cx('col-md-12 col-sm-12 col-xs-12 noPadding')} key={index}>
                                                <HomeItem
                                                    id={item.id}
                                                    title={item.title}
                                                    basePrice={item.listingData.basePrice}
                                                    currency={item.listingData.currency}
                                                    // roomType={item.settingsData[0].listsettings.itemName}
                                                    beds={item.beds}
                                                    listPhotos={item.listPhotos}
                                                    coverPhoto={item.coverPhoto}
                                                    photo={item.listPhotos[0].name}
                                                    bookingType={item.bookingType}
                                                    reviewsCount={item.reviewsCount}
                                                    reviewsStarRating={item.reviewsStarRating}
                                                    wishListStatus={item.wishListStatus}
                                                    isListOwner={item.isListOwner}
                                                    minAge={item.minAge}
                                                    maxAge={item.maxAge}
                                                />
                                            </div>
                                        );
                                    }
                                })
                            }
                        </Swiper>
                        {/* <div className={`${isBeginning ? 'hide' : ''}`} onClick={this.goPrev}>
                            <SamplePrevArrow />
                        </div>
                        <div className={`${isEnd ? 'hide' : ''}`} onClick={this.goNext}>
                            <SampleNextArrow />
                        </div> */}
                            <SamplePrevArrow className={cx('hidden-xs hidden-sm')} onClick={this.goPrev} />
                            <SampleNextArrow className={cx('hidden-xs hidden-sm')} onClick={this.goNext} />
                        {/* </Slider> */}
                    </Col>
                </Row>
                {/* </div> */}
            </Grid>
        );

    }
}

export default withStyles(s,c)(SlideComponent);
