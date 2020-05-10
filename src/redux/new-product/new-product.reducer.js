import newProductActionTypes from './new-product.types';

const initialState = {
    formIsValid: false,
    imageUrl: "",
    file: "",
    isFetching: false,
    response: null,
    error: false,
    submitted: false,
    productForm: {
        sku: {
            label: 'Product SKU',
            params: {
                placeholder: 'Product SKU',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 5,
                maxLength: 7,
                isRequired: true
            },
            validationMessage: 'SKU should have at least 5 letters'
        },
        goldWeight: {
            label: 'Gold weight',
            params: {
                placeholder: 'Gold weight',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 5,
                isRequired: true,
                isNumeric: true,
            },
            validationMessage: 'This field is required and it should have 1-5 letters'
        },
        silverWeight: {
            label: 'Silver weight',
            params: {
                placeholder: 'Silver weight',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 5,
                isRequired: true,
                isNumeric: true
            }
        },
        otherStoneWeight: {
            label: 'Other Stone weight',
            params: {
                placeholder: 'Other Stone weight',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 5,
                isRequired: true,
                isNumeric: true
            }
        },
        diamondWeight: {
            label: 'Diamond weight',
            params: {
                placeholder: 'Diamond weight',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 5,
                isRequired: true,
                isNumeric: true
            }
        },
        quantity: {
            label: 'Quantity',
            params: {
                placeholder: 'Quantity',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 5,
                isRequired: true,
                isNumeric: true
            }
        },
        otherStone: {
            label: 'Other stones',
            params: {
                placeholder: 'Other stones',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 5,
                maxLength: 5,
                isRequired: true
            }
        },
        karats: {
            label: 'Karats',
            params: {
                placeholder: 'Karats',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 5,
                isRequired: true,
                isNumeric: true
            }
        },
        description: {
            label: 'Product description',
            params: {
                placeholder: 'Product description',
                rows: 2,
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                isRequired: true
            }
        },
        price: {
            label: 'Product price',
            params: {
                placeholder: 'Product price',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                isRequired: true
            }
        },
        costEu: {
            label: 'Product price EU',
            params: {
                placeholder: 'Product price EU',
                type: 'input'
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                isRequired: true
            }
        },
        costUsd: {
            label: 'Product price USD',
            params: {
                placeholder: 'Product price USD',
                type: 'input',
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                isRequired: true
            }
        },
        categoryId: {
            label: 'Product Category',
            value: '',
            valid: false,   
            touched: false,           
            options: [],
            validationRules: {
                isRequired: true
            }
        },
        producerId: {
            label: 'Producer Category',
            value: '',
            valid: false,   
            touched: false,           
            options: [],
            validationRules: {
                isRequired: true
            }
        },
        address: {
            label: 'Shop availability',
            value: '',
            valid: false,   
            touched: false,          
            options: [],
            validationRules: {
                isRequired: true
            }
        },
        color: {
            label: 'Product color',
            value: '',
            valid: false,
            touched: false,
            params: {
                type: 'radio'
            },
            options: [
                { value: 'Yellow',  isChecked: false},
                { value: 'White',   isChecked: false},
                { value: 'Rose',    isChecked: false},
                { value: 'Black',   isChecked: false}
            ],
            validationRules: {
                
            }
        }
    }
}

const newProductReducer = (state = initialState, action) => {
    switch(action.type) {
         case newProductActionTypes.ADD_PRODUCT_START:
            return {
                ...state,
                isFetching: true
            }
        case newProductActionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                submitted: true,
                isFetching: false,
                addedProduct: action.payload
            }
        case newProductActionTypes.ADD_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                submitted: false,
                isFetching: false,
                response: action.payload
            }
        case newProductActionTypes.IMAGE_UPLOAD_START:
            return {
                ...state
            }
        case newProductActionTypes.IMAGE_UPLOAD_SUCCESS:
            return {
                ...state,
                imageUrl: action.payload
            }
        case newProductActionTypes.IMAGE_UPLOAD_FAILED:
            return {
                ...state,
                error: true,
                response: action.payload
            }
        case newProductActionTypes.IMAGE_UPLOAD_PROPERTIES:
            return {
                ...state,
                imageUrl: action.payload.fileUrl,
                file: action.payload.file
            }
        case newProductActionTypes.POPULATE_SELECT_FIELDS:
            return {
                ...state,
                productForm: {
                    ...state.productForm,
                    categoryId: {
                        ...state.productForm.categoryId,
                        options: [
                            ...action.payload.updatedCategories
                        ]
                    },
                    address: {
                        ...state.productForm.address,
                        options: [
                            ...action.payload.updatedStores
                        ]
                    },
                    producerId: {
                        ...state.productForm.producerId,
                        options: [
                            ...action.payload.updatedProducers
                        ]
                    }
                }
            } 
        case newProductActionTypes.VALIDATION_HANDLER:
            return {
                ...state,
                formIsValid: action.payload.formIsValid,
                productForm: action.payload.updatedProductForm
            } 
        case newProductActionTypes.CLEAR_NEW_PRODUCT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

export default newProductReducer;