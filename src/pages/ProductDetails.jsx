import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {initSingleProduct, initDeleteProduct} from '../redux/product/product.actions';
import {dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import {MainContainer, ButtonsContainer} from '../components/Common';

const ProductTitle = styled('h1')`
    line-height: 1.2;
`;

const ProductBody = styled('div')`
    padding: 1.5em .5em;
`;

class ProductDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    showSnackbarHandler = () => {
        const {response} = this.props; 
        console.log("responseInfo status: ", response?.status)

        if (response?.status && response?.status === 200) {
            this.setState({snackBarOpen: true, snackBarMessage: dict.successfulProductDeletion})

            setTimeout(() => {
               this.redirectBack()
            }, 1500);
        } else {
            this.setState({snackBarOpen: true, snackBarMessage: dict.errorUponProductDeletion})

            setTimeout(() => {
               this.setState({snackBarOpen: false, snackBarMessage: ''})
            }, 3500);
        }
    }

    componentDidMount () {
        console.log("ProductDetails.jsx did mount: ", this.props)
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        const {product, match, response} = this.props;
        console.log("ProductDetails.jsx did update: ", this.props);
        
        if (prevProps.match.params.stockId !== match.params.stockId && product && product.loadedProduct.stock.id) {
            this.loadData();
        }

        if (prevProps.response !== response) {
            this.showSnackbarHandler()

            if (response?.status === 404) {
                this.redirectBack()
            }
        }
    }

    loadData() {
        const {match, initSingleProduct} = this.props;
        initSingleProduct(match.params.stockId);
    }

    addProductHandler = () => {
        const {history} = this.props;
        const path = (history.location.pathname).split('/')[1];
        history.push({pathname: `/${path}/new-product`})
    }

    editProductHandler = () => {
        console.log("Just a test for the edition of the product..")
    }

    componentWillUnmount() {
        const {onUnload} = this.props;
        onUnload();
    }

    deleteProductHandler = () => {
        const {initDeleteProduct, loadedProduct} = this.props;
        //console.log("loadedProduct props: ", loadedProduct.stock.id)
        
        window.confirm("Are you sure you wish to delete this product?") &&
            initDeleteProduct(loadedProduct.stock.id);
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/');
    }

    render () {
        const {match, loadedProduct} = this.props;

        let product = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;

        if (match.params.stockId) product = <Spinner/>

        if (loadedProduct) {
            product = (
                <MainContainer>
                    <Snackbar snackBarOpen={this.state.snackBarOpen} snackBarMessage={this.state.snackBarMessage}/>
                    <ProductTitle>{loadedProduct.productcode}</ProductTitle>
                    <ProductBody>
                        <ul>
                            <li>{dict.karats}: {loadedProduct.stock.karats}</li>
                            <li>{dict.costDollars}: {loadedProduct.product.cost_usd}$</li>
                            <li>{dict.costEuro}: {loadedProduct.product.cost_eu}€</li>
                            <li>{dict.goldWeight}: {loadedProduct.stock.gold_weight}</li>
                            <li>{dict.silverWeight}: {loadedProduct.stock.silver_weight}</li>
                            <li>{dict.stoneWeight}: {loadedProduct.stock.stoneWeight}</li>
                            <li>{dict.producerCode}: {loadedProduct.product.producer_code}</li>
                            <li>{dict.description}: {loadedProduct.product.descr}</li>
                            <li>{dict.stones}: {loadedProduct.product.stones}</li>
                            <li>{dict.color}: {loadedProduct.stock.color}</li>
                            <li>{dict.quantity}: {loadedProduct.stock.quantity}</li>
                            <li>{dict.category}: {loadedProduct.product.category.kindOfCategory}</li>
                        </ul>
                    </ProductBody>
                    <ButtonsContainer>
                        <Button btnType="add"       disabled={false}    onClick={this.addProductHandler}>{dict.add}</Button>
                        <Button btnType='edit'      disabled={false}    onClick={this.editProductHandler}>{dict.edit}</Button>
                        <Button btnType='danger'    disabled={false}    onClick={this.deleteProductHandler}>{dict.delete}</Button>
                        <Button btnType='success'   disabled={false}    onClick={this.redirectBack}>{dict.back}</Button>
                    </ButtonsContainer>
                </MainContainer>
            );
        }
        return product;
    }
}

const mapStateToProps = state => ({
    loadedProduct: state.product.loadedProduct,
    response: state.product.response
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: stockId => dispatch(initSingleProduct(stockId)),
    initDeleteProduct: stockId => dispatch(initDeleteProduct(stockId)),
    onUnload: () => dispatch({type: 'PAGE_UNLOADED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));