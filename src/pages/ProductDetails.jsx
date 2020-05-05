import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled';
import get from 'lodash/get';
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {initSingleProduct, initDeleteProduct, initDisableProduct} from '../redux/product/product.actions';
import {initCategories, initSingleCategory} from '../redux/category/category.actions';
import {initProducers, initSingleProducer} from '../redux/producer/producer.actions';
import {dict} from '../util/variables';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import {Snackbar} from '../components/Snackbar';
import imagePlaceholder from '../assets/no-image-icon.png';
import mq from '../util/mediaQueries.js';
import {MainContainer, FlexCentered, ModalWarning} from '../components/Common';

const ProductTitle = styled('h1')({
    fontSize: "2.4em"
});

const ProductBody = styled('div')({
    display: "flex",
    flexWrap: "wrap"
},
mq({
    padding: ["1em", "4em"]
}));

const ProductImage = styled('div')({
    display: "flex",
    justifyContent: "center"
},
mq({
    width: ["100%", "100%", "50%"]
}));

const ImageComponent = styled('div')({
	width: "100%",
    maxWidth: "90%",
    borderRadius: "1em",
    backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
},
mq({
    height: ["150px", "230px", "100%"]
}));

const ProductInformation = styled('div')({
    display: "flex",
    flexWrap: "wrap"
},
mq({
    width: ["100%", "100%", "50%"]
}));

const AttributesColumn = styled("div")({
    "> div": {
        padding: ".2em"
    }
},
mq({
    width: ["100%", "100%", "50%"]
}));

const InformationTitle = styled('div')({
    fontSize: "2em",
    width: "100%",
    fontWeight: 700,
    padding: ".4em"
});

const OtherShops = styled('div')({
    margin: "0 auto"
});

class ProductDetails extends Component {
    state = {
        snackBarOpen: false,
        snackBarMessage: '',
        openModalDisable: false,
        openModalDelete: false
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

    loadData = () => {
        const {match, history, initSingleProduct, initCategories, initProducers, initSingleProducer, initSingleCategory} = this.props;

        if (history.location.state) {
            initSingleProducer(history.location.state?.producerId);
            initSingleCategory(history.location.state?.categoryId);
        } else {
            initCategories();
            initProducers();
        }
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

    deleteProductHandler = () => {
        const {initDeleteProduct, loadedProduct} = this.props;
        initDeleteProduct(loadedProduct[0][0].sku);
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/');
    }

    render () {
        const {match, loadedProduct, categories, producers, loadedproducer, loadedCategory} = this.props;
        const {snackBarOpen, snackBarMessage, openModalDisable, openModalDelete} = this.state;

        let product;
        
        if (match.params.productId) product = <Spinner/>

        if (loadedProduct) {
            const currentProduct = get(loadedProduct, '[0][0]', 0);
            const otherStock1    = get(loadedProduct, '[1][0][0].other', "");
            const otherStock2    = get(loadedProduct, '[1][0][1].other', "");
            const zeroQuantity   = currentProduct.quantity === 0;
            const zeroQuantityOtherShops = otherStock1?.quantity || otherStock2?.quantity === 0;

            const imageSource = currentProduct.imageUrl === "" ? imagePlaceholder : currentProduct.imageUrl;

            let categoryId = get(loadedProduct, '[0][0].categoryId', "");
            let producerId = get(loadedProduct, '[0][0].producerId', "");

            let category = categories.find(cat => cat.id === categoryId);
            let producer = producers.find(prod => prod.id === producerId);

            let producerValue = "";
            let categoryValue = "";

            if (loadedproducer?.value) {
                producerValue = loadedproducer?.value;
            } else {
                producerValue = producer?.value;
            }

            if (loadedCategory?.value) {
                categoryValue = loadedCategory?.value;
            } else {
                categoryValue = category?.value;
            }

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
                        <ProductImage>
                            <ImageComponent alt={currentProduct.description} style={{backgroundImage: `url(${imageSource})`}}/>
                        </ProductImage>
                        <ProductInformation>
                            <InformationTitle>{dict.productInfo}</InformationTitle>
                            <AttributesColumn>
                                <div>{dict.producerCode}: {producerValue}</div>
                                <div>{dict.description}: {currentProduct.description}</div>
                                <div>{dict.karats}: {currentProduct.karats}</div>
                                <div>{dict.color}: {currentProduct.color}</div>
                                <div>{dict.costDollars}: {currentProduct.costUsd}$</div>
                                <div>{dict.costEuro}: {currentProduct.costEu}€</div>
                            </AttributesColumn>
                            <AttributesColumn>
                                <div>{dict.stones}: {currentProduct.otherStone}</div>
                                <div>{dict.goldWeight}: {currentProduct.goldWeight}</div>
                                <div>{dict.silverWeight}: {currentProduct.silverWeight}</div>
                                <div>{dict.stoneWeight}: {currentProduct.otherStoneWeight}</div>
                                <div>{dict.quantity}: {zeroQuantity ? <>{dict.noStock}</> : currentProduct.quantity}</div>
                                <div>{dict.category}: {categoryValue}</div>
                            </AttributesColumn>

                            {otherStock1 && otherStock2 &&
                                <OtherShops>  
                                    <InformationTitle>{dict.otherShops}</InformationTitle> 
                                    <div>{otherStock1.address} : {dict.quantity}: {zeroQuantityOtherShops ? <>{dict.noStock}</> : otherStock1.quantity}</div>
                                    <div>{otherStock2.address} : {dict.quantity}: {zeroQuantityOtherShops ? <>{dict.noStock}</> : otherStock2.quantity}</div>
                                </OtherShops>
                            }
                        </ProductInformation>
                    </ProductBody>
                    <FlexCentered>
                        <Button btnType="add"       disabled={false}    onClick={this.addProductHandler}>{dict.add}</Button>
                        <Button btnType='edit'      disabled={false}    onClick={this.editProductHandler}>{dict.edit}</Button>
                        <Button btnType='danger'    disabled={false}    onClick={this.onOpenModalDisable}>{dict.disable}</Button>
                        <Button btnType='danger'    disabled={false}    onClick={this.onOpenModalDelete}>{dict.delete}</Button>
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
    response: state.product.response,
    categories: state.category.categories,
    producers: state.producer.producers,
    loadedCategory: state.category.loadedCategory,
    loadedproducer: state.producer.loadedproducer
})
  
const mapDispatchToProps = dispatch => ({
    initSingleProduct: productId => dispatch(initSingleProduct(productId)),
    initDeleteProduct: productId => dispatch(initDeleteProduct(productId)),
    initDisableProduct: productId => dispatch(initDisableProduct(productId)),
    initCategories: () => dispatch(initCategories()),
    initProducers: () => dispatch(initProducers()),
    initSingleCategory: (categoryId) => dispatch(initSingleCategory(categoryId)),
    initSingleProducer: (producerId) => dispatch(initSingleProducer(producerId)),
    onUnload: () => dispatch({type: 'PAGE_UNLOADED'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductDetails));