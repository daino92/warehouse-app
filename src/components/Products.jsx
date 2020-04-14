import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts, limitUpdate} from '../redux/product/product.actions';
import IndividualProduct from './IndividualProduct';
import {dict} from '../util/variables';
import Spinner from './Spinner';
import Select from '../components/forms/Select';
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

    componentDidUpdate(prevProps) {
        const {products, history, initProducts, limitOptions} = this.props;

        const store = history.location.pathname.split('/')[2];
        const totalItemsPerStore = get(products, '[1][0].maxSize', 0);
        const limit = limitOptions.value;

        const numberOfPages = Math.ceil(totalItemsPerStore / limit);

        if ((prevProps.products[0] !== products[0]) && products[0].length === 0) {
            history.push({pathname: `/products/${store}/${numberOfPages}`});
            initProducts(store, numberOfPages, limitOptions.value);
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.products !== nextProps.products) {
            return true;
        }
        if (this.props.products === nextProps.products) {
            return <Spinner/>
        }
        return false
    }

    componentDidMount () {
        const {match, initProducts, limitOptions} = this.props;
        initProducts(match.params.address, match.params.page, limitOptions.value);

        console.log("Products.jsx did mount: ", this.props);
    }

    productSelection = (path, id) => {
        const {history} = this.props;
        history.push({pathname: `/${path}/${id}`}); 
    }

    limiSelection = event => {
        const {history, initProducts, limitUpdate} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page = history.location.pathname.split('/')[3];
        const limit = event.target.value;

        limitUpdate(limit);

        history.push({pathname: `/products/${store}/${page}`});
        initProducts(store, page, limit)   
    }

    handlePageChange = page => {
        const {history, initProducts, limitOptions} = this.props;

        const limit = limitOptions.value;
        const store = (history.location.pathname).split('/')[2];

        history.push({pathname: `/products/${store}/${page}`});
        initProducts(store, page, limit)
    }

    render () {
        const {match, history, products, isFetching, errorMessage, limitOptions} = this.props;

        const path = (history.location.pathname).split('/')[1];

        if (errorMessage?.status === 404) return (<p style={{textAlign: 'center'}}>{dict.pageNotExist}</p>)
        if (errorMessage?.status === 400) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)
    
        if (isFetching) return <Spinner/>

        // TODO: fix name conventions
        const sortedByProductCode = orderBy(products[0], ['productcode', 'color'], ['asc', 'desc'])
        //console.log("Sorted by productCode: ", sortedByProductCode)
        
        // Pagination params
        const activePage = parseInt(match.params.page);
        const maxItemsPerPage = parseInt(limitOptions.value);
        const totalItemsPerStore = get(products, '[1][0].maxSize', 0);

        return (
            <>
                <PaginationWrapper>
                    <Pagination 
                        disabledClass={"disabled-navigation"}
                        prevPageText={"«"} 
                        nextPageText={"»"}
                        hideFirstLastPages 
                        activePage={activePage}
                        activeLinkClass={'activePage'}
                        itemsCountPerPage={maxItemsPerPage}
                        totalItemsCount={totalItemsPerStore}
                        onChange={this.handlePageChange}
                    />
                    <Select name="limitOptions"
                        label={limitOptions.label} options={limitOptions.options}
                        value={limitOptions.value} onChange={this.limiSelection} />
                </PaginationWrapper>
                
                <ProductsWrapper>
                    {
                    sortedByProductCode.length ?
                        sortedByProductCode.map((product => (
                            <IndividualProduct key={uuidv4()} {...product}
                                clicked={() => this.productSelection(path, product.id)} 
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
    limitOptions: state.product.limitOptions,
    errorMessage: state.product.errorMessage
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page, limit) => dispatch(initProducts(address, page, limit)),
    limitUpdate: limit => dispatch(limitUpdate(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);