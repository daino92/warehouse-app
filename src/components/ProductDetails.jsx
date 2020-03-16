import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {initSingleProduct, initDeleteProduct} from '../redux/product/product.actions';
import Spinner from './Spinner';
import Button from './Button';
import {colors, dict} from '../util/variables';
import {ErrorContainer} from '../components/forms/Components';

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

const ProductBody = styled('p')`
    padding: 1.5em .5em;
`;

const EditProduct = styled('div')`
    label {
        display: block;
        color: ${colors.lightGrey};
    }
`;

class ProductDetails extends Component {
    componentDidMount () {
        console.log("component did mount: ", this.props)
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

    deleteProductHandler = () => {
        const {initDeleteProduct, loadedProduct} = this.props;
        //console.log("loadedProduct props: ", loadedProduct.stock.id)
        
        window.confirm("Are you sure you wish to delete this product?") &&
        initDeleteProduct(loadedProduct.stock.id);

        // axiosInstance.delete('/posts/' + match.params.id)
        //     .then(response => {
        //         console.log(response);
        //         //return (<p>Successful deletion!</p>)
        //         this.redirectBack();
        //     }).catch(error => {
        //         this.setState({error: true})
        //         this.redirectBack();
        //     });
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    render () {
        const {error, match, loadedProduct} = this.props;

        let product = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;
        if (match.params.stockId) product = <Spinner/>

        if (error) return (
            <ErrorContainer>{dict.errorUponProductDeletion}</ErrorContainer>
        )
        // if (!error) return (<h1>{dict.successfulProductDeletion}</h1>)
        if (loadedProduct) {
            product = (
                <FullProduct>
                    <ProductTitle>{loadedProduct.productcode}</ProductTitle>
                    <ProductBody>
                        <ul>
                            <li>Karats: {loadedProduct.product.karats}</li>
                            <li>Cost in $: {loadedProduct.product.cost_usd}</li>
                            <li>Cost in €: {loadedProduct.product.cost_eu}</li>
                            <li>Gold weight: {loadedProduct.product.gold_weight}</li>
                            <li>Silver weight: {loadedProduct.product.silver_weight}</li>
                            <li>Producer Code: {loadedProduct.product.producer_code}</li>
                            <li>Description: {loadedProduct.product.descr}</li>
                            <li>Stones: {loadedProduct.product.stones}</li>
                            <li>Color: {loadedProduct.stock.color}</li>
                            <li>Quantity: {loadedProduct.stock.quantity}</li>
                            <li>Color: {loadedProduct.product.category.kindOfCategory}</li>
                        </ul>
                    </ProductBody>
                    <EditProduct>
                        <Button btnType='danger'  disabled={false}  onClick={this.deleteProductHandler}>{dict.delete}</Button>
                        <Button btnType='success' disabled={false}  onClick={this.redirectBack}>{dict.back}</Button>
                    </EditProduct>
                </FullProduct>
            );
        }
        return product;
    }
}

const mapStateToProps = state => ({
    loadedProduct: state.product.loadedProduct,
    error: state.product.error
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: stockId => dispatch(initSingleProduct(stockId)),
    initDeleteProduct: stockId => dispatch(initDeleteProduct(stockId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));