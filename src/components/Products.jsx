import React, { Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import styled from '@emotion/styled';
import IndividualProduct from './IndividualProduct';
import imagePlaceholder from '../assets/picture-not-available.jpg';
import {initProducts} from '../redux/product/product.actions';
import {dict} from '../util/variables';

const ProductsContainer = styled('section')`
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

    productSelection = id => {
        this.setState({selectedProductId: id});
        this.props.history.push({pathname: '/products/' + id})
        this.setState({selected: true}) 
    }

    render () {
        const {products} = this.props;
        const {error} = this.state;
        
        if (error) return (<p style={{textAlign: 'center'}}>{dict.unexpectedError}</p>)

        // TODO: fix name conventions
        const sortedByProductCode = _.orderBy(products, ['productcode', 'stock.color'], ['asc', 'desc'])
        //console.log("Sorted by productCode: ", sortedByProductCode)

        return (
            <>
                <ProductsContainer>
                    {sortedByProductCode.map(({id, productcode, imageUrl, ...otherProps}) => (
                        <IndividualProduct key={id.toString()} {...otherProps}
                            imageUrl={imageUrl ? imageUrl : imagePlaceholder} 
                            clicked={() => this.productSelection(productcode)} 
                        />
                    ))}
                </ProductsContainer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    products: state.product.products
})

const mapDispatchToProps = dispatch => ({
    initProducts: () => dispatch(initProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products);