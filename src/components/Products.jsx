import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts, limitUpdate, pageUpdate} from '../redux/product/product.actions';
import {initCategories, categoryUpdate} from '../redux/category/category.actions';
import {initProducers, producerUpdate} from '../redux/producer/producer.actions';
import IndividualProduct from './IndividualProduct';
import {dict} from '../util/variables';
import Spinner from './Spinner';
import Select from '../components/forms/Select';
import Select2 from './forms/Select2';
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

    componentDidUpdate(prevProps, prevState) {
        const {history, initProducts, limitOptions, categoryOptions, producersOptions, page} = this.props;

        const store = history.location.pathname.split('/')[2];
        const limit = limitOptions.value;
        const category = categoryOptions.value;
        const producer = producersOptions.value;

        if ((prevProps.limitOptions.value === limit) 
            && (prevProps.categoryOptions.value === category) 
            && (prevProps.producersOptions.value === producer) 
            && (prevProps.page === page)) return

        history.push({pathname: `/products/${store}/${page}`});
        initProducts(store, page, limit, category, producer);        
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
        const {limitUpdate} = this.props; 
        const limit = event.target.value; 

        limitUpdate(limit);
    }

    categorySelection = event => {
        const {categoryUpdate} = this.props; 
        const category = event.target.value;

        categoryUpdate(category);
    }

    producerSelection = event => {
        const {producerUpdate} = this.props; 
        const producer = {
            value: event.value,
            label: event.label
        }

        producerUpdate(producer)
    }

    handlePageChange = page => {
        const {pageUpdate} = this.props;
        pageUpdate(page)
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

                    <Select2
                        label={producersOptions.label}
                        //autoFocus 
                        placeholder={producersOptions.displayValue ? producersOptions.displayValue : "Select..."}
                        onChange={this.producerSelection}
                        options={producersOptions.options}
                    />
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
    page: state.product.page,
    producers: state.producer.producers,
    producersOptions: state.producer.producersOptions,
    categoryOptions: state.category.categoryOptions,
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page, limit, category, producerId) => dispatch(initProducts(address, page, limit, category, producerId)),
    initCategories: () => dispatch(initCategories()),
    initProducers: () => dispatch(initProducers()),
    pageUpdate: page => dispatch(pageUpdate(page)),
    categoryUpdate: categoryId => dispatch(categoryUpdate(categoryId)),
    producerUpdate: producerId => dispatch(producerUpdate(producerId)),
    limitUpdate: limit => dispatch(limitUpdate(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);