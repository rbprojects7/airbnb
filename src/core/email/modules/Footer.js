import React from 'react';
import {Table, TBody, TR, TD, A} from 'oy-vey';
import EmptySpace from './EmptySpace';
import {sitename} from '../../../config';

const Footer = (props) => {
    const style = {
        backgroundColor: '#f7f7f7',
        fontFamily: 'Comfortaa',
    };

    const spaceStyle = {
        paddingBottom: '25px',
        paddingLeft: '5px',
        color: '#484848',
        fontSize: '14px',
        textAlign: 'center',
    };

    return (
        <Table width="100%" style={style}>
            <TBody>
                <TR>
                    <TD>
                        <div style={spaceStyle}>Sent with <span style={{ color: '#FF5F6C' }}>&#10084;</span> from TutorHere</div>
                    </TD>
                </TR>
            </TBody>
        </Table>
    );
};

export default Footer;
