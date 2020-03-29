import React, { Component} from 'react';
import {connect} from 'react-redux';
import orderBy from 'lodash/orderBy';
import styled from '@emotion/styled';
import IndividualProduct from './IndividualProduct';
import imagePlaceholder from '../assets/picture-not-available.jpg';
import {initProducts} from '../redux/product/product.actions';
import {dict} from '../util/variables';
import Spinner from './Spinner';
import {ErrorContainer} from './forms/Components'

const PageComponent = styled('section')`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 80%;
    max-width: 1080px;
    margin: auto; 
`;

class Products extends Component {
    state = {
        selectedProductId: null,
        selected: false
    }

    componentDidMount () {
        const {initProducts} = this.props;
        initProducts();

        console.log("Products.jsx did mount: ", this.props);
    }

    productSelection = stockId => {
        this.setState({selectedProductId: stockId});
        this.props.history.push({pathname: '/products/' + stockId})
        this.setState({selected: true}) 
    }

    render () {
        const {products, isFetching} = this.props;
        const {error} = this.state;
        
        if (error) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)

        if (isFetching) return <Spinner/>

        // TODO: fix name conventions
        const sortedByProductCode = orderBy(products, ['productcode', 'stock.color'], ['asc', 'desc'])
        //console.log("Sorted by productCode: ", sortedByProductCode)

        return (
            <>
                <PageComponent>
                    {
                    sortedByProductCode.length ?
                        sortedByProductCode.map(({imageUrl, ...otherProps}) => {
                            const {id} = otherProps.stock;
                            return (
                                <IndividualProduct key={otherProps.id.toString()} {...otherProps}
                                    imageUrl={imageUrl ? imageUrl : imagePlaceholder} 
                                    clicked={() => this.productSelection(id)} 
                                />
                            )
                        }) : (<ErrorContainer>{dict.productsNotFound}</ErrorContainer>)
                    }
                </PageComponent>
            </>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    isFetching: state.product.isFetching
})

const mapDispatchToProps = dispatch => ({
    initProducts: () => dispatch(initProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);