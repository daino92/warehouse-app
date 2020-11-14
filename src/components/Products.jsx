import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts, limitUpdate, pageUpdate, setSku, searchWithSku, clearSkuSearch} from '../redux/product/product.actions';
import {initCategories, categoryUpdate} from '../redux/category/category.actions';
import {initProducers, producerUpdate} from '../redux/producer/producer.actions';
import IndividualProduct from './IndividualProduct';
import {dict} from '../util/variables';
import Spinner from './Spinner';
import Select2 from './forms/Select2';
import Button from './Button';
import TextInput from './forms/TextInput';
import {ErrorContainer, PaginationWrapper} from './Common';

const ProductsWrapper = styled('section')({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto 1.5em" 
});

const SkuSearch = styled('div')({
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center", 
    
    "div": {
        maxWidth: 150
    }
});

class Products extends Component {
    componentDidUpdate(prevProps) {
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
        const limit = {
            value: event.value,
            label: event.label
        }

        limitUpdate(limit);
    }

    categorySelection = event => {
        const {categoryUpdate} = this.props; 
        const category = {
            value: event.value,
            label: event.label
        }

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

    setSkuInfo = e => {
        const {setSku} = this.props;

        let value = e.target.value;
        setSku(value)
    }

    skuSearchHandler = () => {
        const {skuSearch, searchWithSku} = this.props;
        let submitValue = skuSearch.value;

        if (submitValue !== "") {
            searchWithSku(submitValue)
        }
        
        console.log("submitValue: ", submitValue)
    }

    clearSearchBySku = () => {
        const {clearSkuSearch, skuSearch} = this.props;

        let submitValue = skuSearch.value;

        if (submitValue !== "") {
            clearSkuSearch();
        }
        
    }

    render () {
        const {match, history, products, producersOptions, isFetching, response, limitOptions, categoryOptions, skuSearch, disableFilters, searchBySKU, skuResults} = this.props;

        const path = (history.location.pathname).split('/')[1].slice(0, -1);
        let submitValue = skuSearch.value === "";

        if (response?.status === 404) return (<p style={{textAlign: 'center'}}>{dict.pageNotExist}</p>)
        if (response?.status === 400) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)
    
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
                { !searchBySKU &&
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
                    }

                    <Select2
                        label={limitOptions.label}
                        isDisabled={disableFilters}
                        placeholder={limitOptions.displayValue ? limitOptions.displayValue : "Select..."}
                        onChange={this.limiSelection}
                        options={limitOptions.options}
                    />

                    <Select2
                        label={categoryOptions.label}
                        isDisabled={disableFilters}
                        placeholder={categoryOptions.displayValue ? categoryOptions.displayValue : "Select..."}
                        onChange={this.categorySelection}
                        options={categoryOptions.options}
                    />

                    <Select2
                        label={producersOptions.label}
                        isDisabled={disableFilters}
                        placeholder={producersOptions.displayValue ? producersOptions.displayValue : "Select..."}
                        onChange={this.producerSelection}
                        options={producersOptions.options}
                    />
                </PaginationWrapper>

                <h2 style={{textAlign: "center"}}>{dict.searchBySku}</h2>
                <SkuSearch>
                    <TextInput 
                        name="skuSearch" 
                        type={skuSearch.params.type}
                        placeholder={skuSearch.params.placeholder}
                        value={skuSearch.value} 
                        maxLength={5}
                        onChange={this.setSkuInfo}
                    />
                    <Button btnType="success" disabled={false} onClick={this.skuSearchHandler}>{dict.search}</Button>
                    <Button btnType="success" disabled={submitValue} onClick={this.clearSearchBySku}>{dict.clear}</Button>
                </SkuSearch>

                { !searchBySKU &&
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
                }

                { searchBySKU &&
                    <ProductsWrapper>
                        {
                        skuResults ?
                            skuResults.map((product => (
                                <IndividualProduct key={uuidv4()} {...product}
                                    clicked={() => this.productSelection(path, product.id, product.categoryId, product.producerId)} 
                                />
                            ))) : (<ErrorContainer>{dict.productsNotFound}</ErrorContainer>)
                        }
                    </ProductsWrapper>
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    page: state.product.page,
    products: state.product.products,
    isFetching: state.product.isFetching,
    limitOptions: state.product.limitOptions,
    response: state.product.response,
    skuSearch: state.product.skuSearch,
    searchBySKU: state.product.searchBySKU,
    skuResults: state.product.skuResults,
    disableFilters: state.product.disableFilters,
    producersOptions: state.producer.producersOptions,
    categoryOptions: state.category.categoryOptions
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page, limit, category, producerId) => dispatch(initProducts(address, page, limit, category, producerId)),
    initCategories: () => dispatch(initCategories()),
    initProducers: () => dispatch(initProducers()),
    pageUpdate: page => dispatch(pageUpdate(page)),
    categoryUpdate: categoryId => dispatch(categoryUpdate(categoryId)),
    producerUpdate: producerId => dispatch(producerUpdate(producerId)),
    limitUpdate: limit => dispatch(limitUpdate(limit)),
    setSku: sku => dispatch(setSku(sku)),
    searchWithSku: sku => dispatch(searchWithSku(sku)),
    clearSkuSearch: () => dispatch(clearSkuSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);