import React, {Component} from "react";
import {connect} from "react-redux";
import styled from "@emotion/styled";
import {v4 as uuidv4} from 'uuid';
import {initHistory} from '../redux/product/product.actions';
import {colors, dict} from '../util/variables';
import Spinner from '../components/Spinner';

const HistoryContainer = styled("section")`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 80%;
    margin: auto;
`;

const ProductHistoryContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    padding: 1em;
    width: 48%;
    border: 1px solid ${colors.whisper};
	border-radius: .5em;
    box-shadow: 0 2px 3px ${colors.lightGrey};
    background-color: ${colors.solitude};
`;

const AttributesColumn = styled("div")`

`;

const Attributes = styled("div")`
    padding: 2px 20px 0px 2px;
    margin-right: 5px;

    label {
        font-weight: 700;
    }
`;

class History extends Component {

    componentDidMount () {
        const {initHistory} = this.props;
        initHistory();

        console.log("History.jsx did mount: ", this.props);
    }

    render() {
        const {products, isFetching} = this.props;

        if (isFetching) return <Spinner/>

        return (
            <>
                <HistoryContainer>
                    {products.map(({id, timestamp, product}) => {
                        const {productcode, color, quantity, category, karats, gold_weight, silver_weight, diamond_weight, other_stoneWeight} = product || {}
                        const {kindOfCategory} = category || {}

                        return (
                            <ProductHistoryContainer key={uuidv4()}>
                                <AttributesColumn>
                                    <Attributes>
                                        <label>{dict.time}: </label> {timestamp}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.productCode}: </label> {productcode}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.color}: </label> {color}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.quantity}: </label> {quantity > 0 ? quantity : <>{dict.noStock}</> }
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.category}: </label> {kindOfCategory}
                                    </Attributes>
                                </AttributesColumn>
                                <AttributesColumn>
                                    <Attributes>
                                        <label>{dict.karats}: </label> {karats}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.goldWeight}: </label> {gold_weight}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.silverWeight}: </label> {silver_weight}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.diamondWeight}: </label> {diamond_weight}
                                    </Attributes>
                                    <Attributes>
                                        <label>{dict.stoneWeight}: </label> {other_stoneWeight}
                                    </Attributes>
                                </AttributesColumn> 
                            </ProductHistoryContainer>
                        )})
                    } 
                </HistoryContainer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    products: state.product.products,
    isFetching: state.product.isFetching
})

const mapDispatchToProps = dispatch => ({
    initHistory: () => dispatch(initHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(History);