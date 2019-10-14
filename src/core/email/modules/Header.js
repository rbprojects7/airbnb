import React from 'react';
import PropTypes from 'prop-types';
import {graphql, gql, compose} from 'react-apollo';
import {Table, TBody, TD, TR, Img} from 'oy-vey';
import EmptySpace from './EmptySpace';
import {url, sitename} from '../../../config';

const Header = (props) => {
    const style = {
        color: '#6C68C6, #514EA3, #00B0CD',
        fontWeight: 'bold',
        backgroundColor: '#F7F7F7',
        width: '100%',
        fontFamily: 'Comfortaa',
    };

    return (
        <Table
          width="100%"
          style={style}
          color={props.color}
        >
            <TBody>
                <TR>
                    <TD>
                        <Table width="100%">
                            <TBody>
                                <TR>
                                    <TD
                                      style={{ color: '#6C68C6', fontFamily: 'Comfortaa', fontSize: '2.5em', textAlign: 'center'}}
                                    >
                                       <a href={url} style={{ textDecoration: 'none'}}> {sitename} </a>
                                    </TD>
                                </TR>
                            </TBody>
                        </Table>
                    </TD>
                </TR>
            </TBody>
        </Table>
    );
};

Header.propTypes = {
    color: PropTypes.string.isRequired
};

export default Header;
