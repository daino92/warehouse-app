import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {initSingleProduct, initDeleteProduct, initDisableProduct} from '../redux/product/product.actions';
import {dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import {MainContainer, FlexCentered, ModalWarning} from '../components/Common';

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
            snackBarMessage: '',
            openModalDisable: false,
            openModalDelete: false
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

    onOpenModalDisable = () => {
        this.setState({ openModalDisable: true });
    };

    onCloseModalDisable = () => {
        this.setState({ openModalDisable: false });
    };

    onOpenModalDelete = () => {
        this.setState({ openModalDelete: true });
    };

    onCloseModalDelete = () => {
        this.setState({ openModalDelete: false });
    };

    loadData() {
        const {match, initSingleProduct} = this.props;
        initSingleProduct(match.params.productId);
    }

    addProductHandler = () => {
        const {history} = this.props;
        const path = (history.location.pathname).split('/')[1];
        history.push({pathname: `/${path}/new-product`})
    }

    editProductHandler = () => {
        console.log("Just a test for the edition of the product..")
    }

    disableProductHandler = () => {
        const {initDisableProduct, loadedProduct} = this.props;
        initDisableProduct(loadedProduct[0][0])
    }

    componentWillUnmount() {
        const {onUnload} = this.props;
        onUnload();
    }

    /* Temporarily API not working */
    deleteProductHandler = () => {
        const {initDeleteProduct, loadedProduct} = this.props;
        console.log("loadedProduct props: ", loadedProduct.stock.id)
        initDeleteProduct(loadedProduct.stock.id);
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/');
    }

    render () {
        const {match, loadedProduct} = this.props;
        const {snackBarOpen, snackBarMessage, openModalDisable, openModalDelete} = this.state;

        let product = <p style={{textAlign: 'center'}}>{dict.selectProduct}</p>;
        
        if (match.params.productId) product = <Spinner/>
        if (loadedProduct) {
            const currentProduct = loadedProduct[0][0];
            const otherStock1 = loadedProduct[1][0][0]?.other;
            const otherStock2 = loadedProduct[1][0][1]?.other;
            const zeroQuantity =  currentProduct.quantity || otherStock1?.quantity || otherStock2?.quantity === 0;

            product = (
                <MainContainer>
                    <Modal center open={openModalDisable} onClose={this.onCloseModalDisable}>
                        <ModalWarning>{dict.productDisableMessage}</ModalWarning>   
                        <FlexCentered>
                            <Button btnType="danger"    disabled={false}  onClick={() => {
                                    this.onCloseModalDisable()
                                    this.disableProductHandler()}}>{dict.yes}</Button>
                            <Button btnType="edit"      disabled={false} onClick={this.onCloseModalDisable}>{dict.no}</Button>
                        </FlexCentered> 
                    </Modal>
                    <Modal center open={openModalDelete} onClose={this.onCloseModalDelete}>
                        <ModalWarning>{dict.productDeleteMessage}</ModalWarning>   
                        <FlexCentered>
                            <Button btnType="danger"    disabled={false}  onClick={() => {
                                    this.onCloseModalDelete()
                                    this.deleteProductHandler()}}>{dict.yes}</Button>
                            <Button btnType="edit"      disabled={false} onClick={this.onCloseModalDelete}>{dict.no}</Button>
                        </FlexCentered> 
                    </Modal>
                    <Snackbar snackBarOpen={snackBarOpen} snackBarMessage={snackBarMessage}/>
                    <ProductTitle>{currentProduct.sku}</ProductTitle>
                    <ProductBody>
                        <ul>
                            <li>{dict.karats}: {currentProduct.karats}</li>
                            <li>{dict.costDollars}: {currentProduct.costUsd}$</li>
                            <li>{dict.costEuro}: {currentProduct.costEu}€</li>
                            <li>{dict.goldWeight}: {currentProduct.goldWeight}</li>
                            <li>{dict.silverWeight}: {currentProduct.silverWeight}</li>
                            <li>{dict.stoneWeight}: {currentProduct.otherStoneWeight}</li>
                            <li>{dict.producerCode}: {currentProduct.producer.producerCode}</li>
                            <li>{dict.description}: {currentProduct.description}</li>
                            <li>{dict.stones}: {currentProduct.otherStone}</li>
                            <li>{dict.color}: {currentProduct.color}</li>
                            <li>{dict.quantity}: {zeroQuantity ? <>{dict.noStock}</> : currentProduct.quantity}</li>
                            <li>{dict.category}: {currentProduct.category.value}</li>
                            {   
                            otherStock1 && otherStock2 &&
                                <ul>   
                                    Other Shops:
                                    <li>{otherStock1.address} : {dict.quantity}: {zeroQuantity ? <>{dict.noStock}</> : otherStock1.quantity}</li>
                                    <li>{otherStock2.address} : {dict.quantity}: {zeroQuantity ? <>{dict.noStock}</> : otherStock2.quantity}</li>
                                </ul>
                            }
                        </ul>
                    </ProductBody>
                    <FlexCentered>
                        <Button btnType="add"       disabled={false}    onClick={this.addProductHandler}>{dict.add}</Button>
                        <Button btnType='edit'      disabled={false}    onClick={this.editProductHandler}>{dict.edit}</Button>
                        <Button btnType='danger'    disabled={false}    onClick={this.onOpenModalDisable}>{dict.disable}</Button>
                        {/* <Button btnType='danger'    disabled={false}    onClick={this.onOpenModalDelete}>{dict.delete}</Button> */}
                        <Button btnType='success'   disabled={false}    onClick={this.redirectBack}>{dict.back}</Button>
                    </FlexCentered>
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
    initSingleProduct: productId => dispatch(initSingleProduct(productId)),
    initDeleteProduct: stockId => dispatch(initDeleteProduct(stockId)),
    initDisableProduct: productId => dispatch(initDisableProduct(productId)),
    onUnload: () => dispatch({type: 'PAGE_UNLOADED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));