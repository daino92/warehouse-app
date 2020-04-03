import React, { Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import styled from '@emotion/styled';
import Pagination from "react-js-pagination";
import {v4 as uuidv4} from 'uuid';
import {initProducts, initPageCount} from '../redux/product/product.actions';
import IndividualProduct from './IndividualProduct';
import imagePlaceholder from '../assets/picture-not-available.jpg';
import {dict, colors} from '../util/variables';
import Spinner from './Spinner';
import {ErrorContainer} from './forms/Components'

const PageComponent = styled('section')`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 80%;
    max-width: 1080px;
    margin: auto; 
`;

const PaginationComponent = styled('div')`
    display: flex;
    justify-content: center;

    ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style-type: none;

        .active {
            background-color: ${colors.sun};
            border-radius: 50%;
        }
    }

    a {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }

    .disabled-navigation a, 
    .disabled-navigation a:hover {
        cursor: not-allowed;
        color: ${colors.lightGrey};
    }
    
`;

class Products extends Component {
    state = {
        selectedProductId: null,
        selected: false
    }

    componentDidMount () {
        const {match, initProducts, initPageCount} = this.props;
        initProducts(match.params.address,  match.params.page);
        initPageCount(match.params.address)

        console.log("Products.jsx did mount: ", this.props);
    }

    productSelection = stockId => {
        this.setState({selectedProductId: stockId});
        this.props.history.push({pathname: '/products/' + stockId})
        this.setState({selected: true}) 
    }

    handlePageChange = page => {
        const {history, initProducts} = this.props;
        const store = (history.location.pathname).split('/')[2];

        history.push({pathname: `/products/${store}/${page}`})
        initProducts(store, page)
    }

    render () {
        const {match, products, isFetching} = this.props;
        const {error} = this.state;

        if (error) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)

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
                <PaginationComponent>
                    <Pagination 
                        disabledClass={"disabled-navigation"}
                        prevPageText={"<"} 
                        nextPageText={">"}
                        hideFirstLastPages 
                        activePage={activePage}
                        //itemsCountPerPage={maxItemsPerPage - totalItemsPerPage}
                        itemsCountPerPage={maxItemsPerPage}
                        totalItemsCount={totalItemsPerStore}
                        onChange={this.handlePageChange}
                    />
                </PaginationComponent>
                
                <PageComponent>
                    {
                    sortedByProductCode.length ?
                        sortedByProductCode.map(({imageUrl, ...otherProps}) => {
                            const {id} = otherProps.stock;
                            return (
                                <IndividualProduct key={uuidv4()} {...otherProps}
                                    imageUrl={imageUrl ? imageUrl : imagePlaceholder} 
                                    clicked={() => this.productSelection(id)} 
                                />
                            )
                        }) : (<ErrorContainer>{dict.productsNotFound}</ErrorContainer>)
                    }
                </PageComponent>
            </>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    isFetching: state.product.isFetching,
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page) => dispatch(initProducts(address, page)),
    initPageCount: address => dispatch(initPageCount(address))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);