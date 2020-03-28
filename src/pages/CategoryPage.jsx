import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initCategories} from '../redux/category/category.actions';
import Category from '../components/Category';

class CategoryPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    componentDidMount () {
        const {initCategories} = this.props;
        initCategories();

        console.log("Category.jsx did mount: ", this.props)
    }

    editProductHandler = () => {
        console.log("Just a test for the edition of the category..")
    }

    deleteProductHandler = () => {
        console.log("Just a test for the deletion of the category..")
    }

    redirectBack = () => {
        const {history} = this.props;
        if(history) history.push('/products');
    }

    render() {
        const {categories, isFetching} = this.props;

        return (
            <Category categories={categories} isFetching={isFetching}
                onEditProduct={this.editProductHandler} onDeleteProduct={this.deleteProductHandler}
                onGoBack={this.redirectBack} />
        );
    }
}

const mapStateToProps = state => ({
    categories: state.category.categories,
    isFetching: state.product.isFetching
})
  
const mapDispatchToProps = dispatch => ({
    initCategories: () => dispatch(initCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryPage));