import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts, limitUpdate} from '../redux/product/product.actions';
import {initCategories, categoryUpdate} from '../redux/category/category.actions';
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
        const {products, history, initProducts, limitOptions, categoryOptions} = this.props;

        const store = history.location.pathname.split('/')[2];
        const totalItemsPerStore = get(products, '[1][0].maxSize', 0);
        const limit = limitOptions.value;
        const category = categoryOptions.value;

        const numberOfPages = Math.ceil(totalItemsPerStore / limit);

        if ((prevProps.products[0] !== products[0]) && products[0].length === 0) {
            history.push({pathname: `/products/${store}/${numberOfPages}`});
            initProducts(store, numberOfPages, limit, category);
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
        const {match, initProducts, initCategories, limitOptions, categoryOptions} = this.props;

        initCategories();
        initProducts(match.params.address, match.params.page, limitOptions.value, categoryOptions.value);

        console.log("Products.jsx did mount: ", this.props);
    }

    productSelection = (path, id) => {
        const {history} = this.props;
        history.push({pathname: `/${path}/${id}`}); 
    }

    limiSelection = event => {
        const {history, initProducts, limitUpdate, categoryOptions} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page = parseInt(history.location.pathname.split('/')[3]);
        const category = categoryOptions.value;
        const limit = event.target.value;

        limitUpdate(limit);

        if (page === 0)  {
            history.push({pathname: `/products/${store}/1`});
            initProducts(store, 1, limit, categoryOptions.value = '')  
        } else {
            history.push({pathname: `/products/${store}/${page}`});
            initProducts(store, page, limit, category)   
        }  
    }

    categorySelection = event => {
        const {history, initProducts, limitOptions, categoryUpdate} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page = parseInt(history.location.pathname.split('/')[3]);
        const limit = limitOptions.value; 
        const category = event.target.value;
        
        categoryUpdate(category);

        if (page === 0)  {
            history.push({pathname: `/products/${store}/1`});
            initProducts(store, 1, limit, category)  
        } else {
            history.push({pathname: `/products/${store}/${page}`});
            initProducts(store, page, limit, category)
        }   
    }

    handlePageChange = page => {
        const {history, initProducts, limitOptions, categoryOptions} = this.props;

        const limit = limitOptions.value;
        const store = (history.location.pathname).split('/')[2];
        const category = categoryOptions.value;

        history.push({pathname: `/products/${store}/${page}`});
        initProducts(store, page, limit, category)
    }

    render () {
        const {match, history, products, isFetching, errorMessage, limitOptions, categoryOptions} = this.props;

        const path = (history.location.pathname).split('/')[1];

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
    errorMessage: state.product.errorMessage,
    categoryOptions: state.category.categoryOptions
})

const mapDispatchToProps = dispatch => ({
    initProducts: (address, page, limit, category) => dispatch(initProducts(address, page, limit, category)),
    initCategories: () => dispatch(initCategories()),
    categoryUpdate: categoryId => dispatch(categoryUpdate(categoryId)),
    limitUpdate: limit => dispatch(limitUpdate(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);