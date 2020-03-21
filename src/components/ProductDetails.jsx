import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {initSingleProduct, initDeleteProduct} from '../redux/product/product.actions';
import Spinner from './Spinner';
import Button from './Button';
import {colors, dict} from '../util/variables';
import {ErrorContainer} from './forms/Components'
import {Snackbar} from './Snackbar';

const FullProduct = styled('div')`
    width: 80%;
    margin: 20px auto;
    border: 1px solid ${colors.whisper};
    box-shadow: 0 2px 3px ${colors.lightGrey};
    text-align: center;
    padding-bottom: .5em;
`;

const ProductTitle = styled('h1')`
    line-height: 1.2;
`;

const ProductBody = styled('div')`
    padding: 1.5em .5em;
`;

const EditProduct = styled('div')`
    label {
        display: block;
        color: ${colors.lightGrey};
    }
`;

class ProductDetails extends Component {
    snackbarRef = React.createRef();

    showSnackbarHandler = () => {
        const {response} = this.props; 

        if (response?.status && response?.status === 200) {
            console.log("responseInfo status: ", response?.status)
            this.snackbarRef.current.openSnackBar(dict.successfulProductDeletion);
            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } else {
            console.log("responseInfo status: ", response?.status)
            this.snackbarRef.current.openSnackBar(dict.errorUponProductDeletion);
        }
    }

    componentDidMount () {
        console.log("Component did mount: ", this.props)
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const {product, match} = this.props;
        
        if (prevProps.match.params.stockId !== match.params.stockId && product && product.loadedProduct.stock.id) {
            this.loadData();
        }
    }

    loadData() {
        const {match, initSingleProduct} = this.props;
        initSingleProduct(match.params.stockId);
    }

    editProductHandler = () => {
        console.log("Just a test for the edition of the product..")
    }

    deleteProductHandler = () => {
        const {initDeleteProduct, loadedProduct} = this.props;
        //console.log("loadedProduct props: ", loadedProduct.stock.id)
        
        window.confirm("Are you sure you wish to delete this product?") &&
        initDeleteProduct(loadedProduct.stock.id);
        this.showSnackbarHandler()
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    render () {
        const {match, loadedProduct, error} = this.props;

        let product = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;

        if (error?.code === 404) {
            return (<ErrorContainer>{dict.productNotExist}</ErrorContainer>)
        }

        if (match.params.stockId) product = <Spinner/>

        if (loadedProduct) {
            product = (
                <FullProduct>
                    <Snackbar ref={this.snackbarRef}/>
                    <ProductTitle>{loadedProduct.productcode}</ProductTitle>
                    <ProductBody>
                        <ul>
                            <li>Karats: {loadedProduct.stock.karats}</li>
                            <li>Cost in $: {loadedProduct.product.cost_usd}</li>
                            <li>Cost in €: {loadedProduct.product.cost_eu}</li>
                            <li>Gold weight: {loadedProduct.stock.gold_weight}</li>
                            <li>Silver weight: {loadedProduct.stock.silver_weight}</li>
                            <li>Producer Code: {loadedProduct.product.producer_code}</li>
                            <li>Description: {loadedProduct.product.descr}</li>
                            <li>Stones: {loadedProduct.stock.stones}</li>
                            <li>Color: {loadedProduct.stock.color}</li>
                            <li>Quantity: {loadedProduct.stock.quantity}</li>
                            <li>Category: {loadedProduct.product.category.kindOfCategory}</li>
                        </ul>
                    </ProductBody>
                    <EditProduct>
                        <Button btnType='edit'      disabled={false}  onClick={this.editProductHandler}>{dict.edit}</Button>
                        <Button btnType='danger'    disabled={false}  onClick={this.deleteProductHandler}>{dict.delete}</Button>
                        <Button btnType='success'   disabled={false}  onClick={this.redirectBack}>{dict.back}</Button>
                    </EditProduct>
                </FullProduct>
            );
        }
        return product;
    }
}

const mapStateToProps = state => ({
    loadedProduct: state.product.loadedProduct,
    error: state.product.error,
    response: state.product.response
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: stockId => dispatch(initSingleProduct(stockId)),
    initDeleteProduct: stockId => dispatch(initDeleteProduct(stockId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));