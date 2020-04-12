import React, {Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import styled from '@emotion/styled';
import {v4 as uuidv4} from 'uuid';
import Pagination from "react-js-pagination";
import {initProducts} from '../redux/product/product.actions';
import IndividualProduct from './IndividualProduct';
import {colors, dict} from '../util/variables';
import Spinner from './Spinner';
import {ErrorContainer, PaginationWrapper, LabelComponent, FormComponent} from './Common';

const ProductsWrapper = styled('section')`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 80%;
    max-width: 1080px;
    margin: auto; 
`;

const SelectComponent = styled('select')`
    outline: none;
    border: 1px solid ${colors.lightGrey};
    font: inherit;
    padding: 6px 10px;
    display: block;
    width: 56px;

    &:focus {
        outline: none;
        border: 1px solid ${colors.sun};
    }
`;

class Products extends Component {
    state = {
        limitOptions: {
            label: 'Choose limit',
            value: 28,             
            options: [
                { value: 12, displayValue: 12 }, 
                { value: 16, displayValue: 16 }, 
                { value: 20, displayValue: 20 }, 
                { value: 24, displayValue: 24 }, 
                { value: 28, displayValue: 28 }
            ]
        }
    };

    componentDidUpdate(prevProps) {
        const {products, history, initProducts} = this.props;
        const {limitOptions} = this.state;

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
        const {history, initProducts} = this.props; 

        const store = history.location.pathname.split('/')[2];
        const page = history.location.pathname.split('/')[3];
        const limit = event.target.value;

        this.setState({ 
            ...this.state,
            limitOptions: {
                ...this.state.limitOptions,
                value: event.target.value
            }
        });

        history.push({pathname: `/products/${store}/${page}`});
        initProducts(store, page, limit)   
    }

    handlePageChange = page => {
        const {history, initProducts} = this.props;
        const {limitOptions} = this.state;

        const limit = limitOptions.value;
        const store = (history.location.pathname).split('/')[2];

        history.push({pathname: `/products/${store}/${page}`});
        initProducts(store, page, limit)
    }

    render () {
        const {match, history, products, isFetching, errorMessage} = this.props;
        const {limitOptions} = this.state;

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
                    <FormComponent>
                        <LabelComponent>{limitOptions.label}</LabelComponent>
                        <SelectComponent onChange={this.limiSelection} value={limitOptions.value}>
                            {limitOptions.options.map(option => (
                                <option key={uuidv4()} value={option.value}>
                                    {option.value}
                                </option>
                            ))}
                        </SelectComponent>
                    </FormComponent>
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
    initProducts: (address, page, limit) => dispatch(initProducts(address, page, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);