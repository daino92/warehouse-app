import React, {Component} from 'react';
import styled from '@emotion/styled';
import {Route} from 'react-router-dom';
import Products from '../components/Products';

const HomePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

class HomePage extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div>
                <HomePageContainer>
                    <Route path="/products" component={Products} />
                </HomePageContainer>
            </div> 
        )
    }
}

export default HomePage;