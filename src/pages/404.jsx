import React, {Component} from 'react';
import styled from '@emotion/styled';
import {dict} from '../util/variables';

const NotFoundComponent = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

class Page404 extends Component {
    
    render () {
        return (
            <NotFoundComponent>
                <h1>{dict.pageNotFound}</h1>
            </NotFoundComponent>
        )
    }
}

export default Page404;