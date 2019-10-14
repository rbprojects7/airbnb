import React, { Component } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sticky.css';

class Sticky extends React.Component {
    
    componentDidMount() {
        const setInitialHeight = (elements) => {
            [].forEach.call(elements, (sticky) => {
                sticky.setAttribute('data-sticky-initial', sticky.getBoundingClientRect().top);
                sticky.setAttribute('data-sticky-width', sticky.getBoundingClientRect().width);
            });
        };

        const stickies = document.querySelectorAll('[data-sticky]');
        setInitialHeight(stickies);

        document.addEventListener('scroll', () => {
            let top = document.documentElement.scrollTop || document.body.scrollTop,
                bottom = document.documentElement.scrollHeight || document.body.scrollHeight,
                height = (document.documentElement.clientHeight || document.body.clientHeight) * 2.2,
                isWeb = (document.documentElement.clientWidth || document.body.clientWidth) >= 1200 ? true : false; 

            [].forEach.call(stickies, (sticky) => {
                let stickyInitial = parseInt(sticky.getAttribute('data-sticky-initial'), 10),
                    stickyInitialWidth = parseFloat(sticky.getAttribute('data-sticky-width'), 10),
                    stickyEnter = stickyInitial,
                    stickyExit = bottom;

                if (top >= stickyEnter && top <= stickyExit && isWeb && document.querySelector('.bookItFormSection')) {
                    sticky.setAttribute('style', 'position: fixed; top: 0px; z-index: 1; width: ' + stickyInitialWidth + 'px');
                    sticky.classList.add('sticky');
                    if (top > (bottom - height)) {
                        document.querySelector('.bookItFormSection').setAttribute('style', 'display: none');
                    } else {
                        document.querySelector('.bookItFormSection').removeAttribute('style');
                    }
                } else {
                    sticky.removeAttribute('style');
                    sticky.classList.remove('sticky');
                }
            });
        });
    }

    render() {
        const { children, exitOn } = this.props;

        return (
            <div data-sticky>
                {this.props.children}
            </div>    
        );
    };
}

Sticky.protoTypes = {
    children: React.PropTypes.node
};

export default withStyles(s)(Sticky);