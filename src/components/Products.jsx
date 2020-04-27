import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts, limitUpdate} from '../redux/product/product.actions';
import {initCategories, categoryUpdate} from '../redux/category/category.actions';
import {initProducers, producerUpdate} from '../redux/producer/producer.actions';
import IndividualProduct from './IndividualProduct';
import {dict} from '../util/variables';
import Spinner from './Spinner';
import Select from '../components/forms/Select';
import {ErrorContainer, PaginationWrapper} from './Common';

const ProductsWrapper = styled('section')({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "auto" 
});

class Products extends Component {

    componentDidUpdate(prevProps) {
        const {products, history, initProducts, limitOptions, categoryOptions, producersOptions} = this.props;

        const store = history.location.pathname.split('/')[2];
        const limit = limitOptions.value;
        const category = categoryOptions.value;
        const producer = producersOptions.value;
        const totalItemsPerStore = get(products, '[1][0].maxSize', 0);
        const numberOfPages = Math.ceil(totalItemsPerStore / limit);

        if ((prevProps.products[0] !== products[0]) && products[0].length === 0) {
            history.push({pathname: `/products/${store}/${numberOfPages}`});
            initProducts(store, numberOfPages, limit, category, producer);
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
        const {match, initProducts, initCategories, initProducers, limitOptions, categoryOptions, producersOptions} = this.props;

        initCategories();
        initProducers();
        initProducts(match.params.address, match.params.page, limitOptions.value, categoryOptions.value, producersOptions.value);

        console.log("Products.jsx did mount: ", this.props);
    }

    productSelection = (path, id, categoryId, producerId) => {
        const {history} = this.props;
        history.push({
            pathname: `/${path}/${id}`, 
            state: {
                categoryId: categoryId, 
                producerId: producerId
            }
        }); 
    }

    limiSelection = event => {
        const {history, initProducts, limitUpdate, categoryOptions, producersOptions} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page  = history.location.pathname.split('/')[3];
        const limit = event.target.value;
        const category = categoryOptions.value;
        const producer = producersOptions.value;

        limitUpdate(limit);

        if (page === '0' || page === '') {
            history.push({pathname: `/products/${store}/1`});
            initProducts(store, 1, limit, categoryOptions.value = '', producer)  
        } else {
            history.push({pathname: `/products/${store}/${page}`});
            initProducts(store, page, limit, category, producer)   
        }  
    }

    categorySelection = event => {
        const {history, initProducts, limitOptions, producersOptions, categoryUpdate} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page  = history.location.pathname.split('/')[3];
        const limit = limitOptions.value; 
        const category = event.target.value;
        const producer = producersOptions.value;
        
        categoryUpdate(category);

        if (page === '0' || page === '') {
            history.push({pathname: `/products/${store}/1`});
            initProducts(store, 1, limit, category, producersOptions.value = '')  
        } else {
            history.push({pathname: `/products/${store}/${page}`});
            initProducts(store, page, limit, category, producer)
        }   
    }

    producerSelection = event => {
        const {history, initProducts, limitOptions, categoryOptions, producerUpdate} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page = history.location.pathname.split('/')[3];
        const limit = limitOptions.value; 
        const category = categoryOptions.value;
        const producer = event.target.value;

        producerUpdate(producer)

        if (page === '0' || page === '') {
            history.push({pathname: `/products/${store}/1`});
            initProducts(store, 1, limit, category, categoryOptions.value = '', producer)  
        } else {
            history.push({pathname: `/products/${store}/${page}`});
            initProducts(store, page, limit, category, producer)
        }   
    }

    handlePageChange = page => {
        const {history, initProducts, limitOptions, categoryOptions, producersOptions} = this.props;

        const limit = limitOptions.value;
        const store = history.location.pathname.split('/')[2];
        const category = categoryOptions.value;
        const producer = producersOptions.value;

        if (page === '0' || page === '') {
            history.push({pathname: `/products/${store}/1`});
            initProducts(store, 1, limit, category, categoryOptions.value = '', producersOptions.value = '')  
        } else {
            history.push({pathname: `/products/${store}/${page}`});
            initProducts(store, page, limit, category, producer)
        }
    }

    render () {
        const {match, history, products, producersOptions, isFetching, errorMessage, limitOptions, categoryOptions} = this.props;

        const path = (history.location.pathname).split('/')[1].slice(0, -1);

        if (errorMessage?.status === 404) return (<p style={{textAlign: 'center'}}>{dict.pageNotExist}</p>)
        if (errorMessage?.status === 400) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)
    
        if (isFetching) return <Spinner/>

        const sortedByProductCode = orderBy(products[0], ['sku', 'color'], ['asc', 'desc'])
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

                    <Select name="categoryOptions"
                        label={categoryOptions.label} options={categoryOptions.options}
                        value={categoryOptions.value} onChange={this.categorySelection} />

                    <Select name="producerSelection"
                        label={producersOptions.label} options={producersOptions.options}
                        value={producersOptions.value} onChange={this.producerSelection} />
                </PaginationWrapper>
                
                <ProductsWrapper>
                    {
                    sortedByProductCode.length ?
                        sortedByProductCode.map((product => (
                            <IndividualProduct key={uuidv4()} {...product}
                                clicked={() => this.productSelection(path, product.id, product.categoryId, product.producerId)} 
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
    errorMessage: state.product.errorMessage,
    producers: state.producer.producers,
    producersOptions: state.producer.producersOptions,
    categoryOptions: state.category.categoryOptions
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page, limit, category, producerId) => dispatch(initProducts(address, page, limit, category, producerId)),
    initCategories: () => dispatch(initCategories()),
    initProducers: () => dispatch(initProducers()),
    categoryUpdate: categoryId => dispatch(categoryUpdate(categoryId)),
    producerUpdate: producerId => dispatch(producerUpdate(producerId)),
    limitUpdate: limit => dispatch(limitUpdate(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);