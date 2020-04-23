import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {initStores} from '../redux/store/store.actions';
import {v4 as uuidv4} from 'uuid';
import {ErrorContainer, MainContainer} from '../components/Common';
import Spinner from '../components/Spinner';
import {colors, dict} from '../util/variables';

// const HomePageContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 20px;
// `;

const StoreTitle = styled('h1')({
    lineHeight: 1.2
});

const IndividualStore = styled(Link)({
    padding: "1em",
    fontSize: "1.2em",
    lineHeight: 1,
    margin: ".8em .5em",
    width: "8em",
    flex: "1 0 25%",
    boxShadow: `0 3px 3px ${colors.lightGrey}`,

    "&:hover": {
        backgroundColor: colors.pattensBlue,
        cursor: "pointer"
        
    }
});

const StoreWrapper = styled('div')({
    padding: "1.5em .5em",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "80%",
	margin: "0 auto"
});

class HomePage extends Component {

    componentDidMount () {
        const {initStores} = this.props;
        initStores();

        console.log("Homepage.jsx did mount: ", this.props);
    }

    render () {
        const {stores, isFetching} = this.props;

        if (isFetching) return <Spinner/>

        return (
   
            <MainContainer>
                <StoreTitle>{dict.stores}</StoreTitle>
                <StoreWrapper>
                   {
                    stores.length ?
                        stores.map(({address}) => (
                            <IndividualStore key={uuidv4()} to={`/products/${address}/1`}>
                                {address} 
                            </IndividualStore>
                        )) : (<ErrorContainer>{dict.storesNotFound}</ErrorContainer>)
                    }
                </StoreWrapper>

            </MainContainer>
            
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.store.isFetching,
    stores: state.store.stores
})
  
const mapDispatchToProps = dispatch => ({
    initStores: () => dispatch(initStores())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));