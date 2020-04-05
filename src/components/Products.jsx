import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts} from '../redux/product/product.actions';
import IndividualProduct from './IndividualProduct';
import {dict} from '../util/variables';
import Spinner from './Spinner';
import {ErrorContainer, PaginationWrapper} from './Common';

const ProductsWrapper = styled('section')`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 80%;
    max-width: 1080px;
    margin: auto; 
`;

class Products extends Component {

    componentDidMount () {
        const {match, initProducts} = this.props;
        initProducts(match.params.address, match.params.page);

        console.log("Products.jsx did mount: ", this.props);
    }

    productSelection = (path, id) => {
        const {history} = this.props;
        history.push({pathname: `/${path}/${id}`}); 
    }

    handlePageChange = page => {
        const {history, initProducts} = this.props;
        const store = (history.location.pathname).split('/')[2];

        history.push({pathname: `/products/${store}/${page}`})
        initProducts(store, page)
    }

    render () {
        const {match, history, products, isFetching, errorMessage} = this.props;
        const path = (history.location.pathname).split('/')[1];

        //if (errorMessage?.status === 404) return (<p style={{textAlign: 'center'}}>{dict.pageNotExist}</p>)
        //if (errorMessage?.status === 400) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)

        if (isFetching) return <Spinner/>

        // TODO: fix name conventions
        const sortedByProductCode = orderBy(products, ['productcode', 'stock.color'], ['asc', 'desc'])
        //console.log("Sorted by productCode: ", sortedByProductCode)

        // Pagination params
        const activePage = parseInt(match.params.page);
        //const totalItemsPerPage = sortedByProductCode.length;
        const maxItemsPerPage = 32;
        const totalItemsPerStore = 36;

        return (
            <>
                <PaginationWrapper>
                    <Pagination 
                        disabledClass={"disabled-navigation"}
                        prevPageText={"«"} 
                        nextPageText={"»"}
                        hideFirstLastPages 
                        activePage={activePage}
                        //itemsCountPerPage={maxItemsPerPage - totalItemsPerPage}
                        activeLinkClass={'activePage'}
                        itemsCountPerPage={maxItemsPerPage}
                        totalItemsCount={totalItemsPerStore}
                        onChange={this.handlePageChange}
                    />
                </PaginationWrapper>
                
                <ProductsWrapper>
                    {
                    sortedByProductCode.length ?
                        sortedByProductCode.map((product => (
                            <IndividualProduct key={uuidv4()} {...product}
                                clicked={() => this.productSelection(path, product.stock.id)} 
                            />
                        ))) : (<ErrorContainer>{dict.productsNotFound}</ErrorContainer>)
                    }
                </ProductsWrapper>
            </>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    isFetching: state.product.isFetching,
    errorMessage: state.product.errorMessage
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page) => dispatch(initProducts(address, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);