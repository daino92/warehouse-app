import newProductActionTypes from './new-product.types';

const initialState = {
    formIsValid: false,
    imageUrl: "",
    file: "",
    isFetching: false,
    response: null,
    updated: null,
    error: false,
    editable: false,
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
                isProduct: true,
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
                minLength: 3,
                maxLength: 5,
                isWeight: true,
                isRequired: true
            },
            validationMessage: 'Before dot the max range of digits should be 2. Also the dot is mandatory'
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
                minLength: 3,
                maxLength: 5,
                isRequired: true,
                isWeight: true
            },
            validationMessage: 'Before dot the max range of digits should be 2. Also the dot is mandatory'
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
                minLength: 3,
                maxLength: 5,
                isRequired: true,
                isWeight: true
            },
            validationMessage: 'Before dot the max range of digits should be 2. Also the dot is mandatory'
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
                maxLength: 10,
                isRequired: true,
                isNumeric: true
            },
            validationMessage: 'Before dot the max range of digits should be 2. Also the dot is mandatory'
        },
        otherStone: {
            label: 'Other stones',
            params: {
                placeholder: 'Other stones',
                rows: 2,
            },
            value: '',
            valid: false,
            touched: false,
            validationRules: {
                minLength: 1,
                maxLength: 500,
                isOtherStone: true,
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
                isRequired: true,
                isKarats: true
            },
            validationMessage: 'The value of karats is wrong. Choose one of the existing'
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
                isRequired: true,
                minLength: 1,
                maxLength: 500
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
                isRequired: true,
                isPrice: true,
                minLength: 3,
                maxLength: 9
            },
            validationMessage: 'The correct value could be something like 99999.99 (max 6 digits before dot and min 1)'
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
                isRequired: true,
                isCost: true,
                minLength: 3,
                maxLength: 8
            },
            validationMessage: 'The correct value could be something like 99999.99 (max 5 digits before dot and min 1)'
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
                isRequired: true,
                isCost: true,
                minLength: 3,
                maxLength: 8
            },
            validationMessage: 'The correct value could be something like 99999.99 (max 5 digits before dot and min 1)'
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
        },
        imageUrl: {
            label: 'Upload Image',
            value: '',
            valid: true,
            touched: true,
            maxFiles: 1,
            minSize: 0,
            maxSize: 1048576,
            validationRules: {
                isRequired: false
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
        case newProductActionTypes.UPDATE_PRODUCT_START:
            return {
                ...state,
                submitted: false
            }
        case newProductActionTypes.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                submitted: true,
                updated: action.payload
            }
        case newProductActionTypes.UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                error: true,
                submitted: false
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
        console.log("STATE IMAGE", state)
            let tmp = {
                ...state,
                //imageUrl: action.payload.fileUrl,
                imageUrl: {
                    ...state.imageUrl,
                    value: action.payload.fileUrl
                },
                productForm: {
                    ...state.productForm,
                    imageUrl: {
                        ...state.productForm.imageUrl,
                        value: action.payload.fileUrl
                    }
                },
                file: action.payload.file,
                // formIsValid: true
            }
            console.log("tmp", tmp)
            return tmp
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
        console.log("VALIDATION_HANDLER", action.payload.updatedProductForm)
        console.log("STATE", state)
            return {
                ...state,
                formIsValid: action.payload.formIsValid,
                productForm: action.payload.updatedProductForm
            } 
        case newProductActionTypes.EDIT_PRODUCT:
        console.log("EDIT_PRODUCT",action.payload)
            return {
                ...state,
                productForm: {
                    ...state.productForm,
                    sku: {
                        ...state.productForm.sku,
                        value: action.payload.sku,
                        valid: true,
                        touched: true
                    },
                    goldWeight: {
                        ...state.productForm.goldWeight,
                        value: action.payload.goldWeight,
                        valid: true,
                        touched: true
                    },
                    silverWeight: {
                        ...state.productForm.silverWeight,
                        value: action.payload.silverWeight,
                        valid: true,
                        touched: true
                    },
                    otherStoneWeight: {
                        ...state.productForm.otherStoneWeight,
                        value: action.payload.otherStoneWeight,
                        valid: true,
                        touched: true
                    },
                    diamondWeight: {
                        ...state.productForm.diamondWeight,
                        value: action.payload.diamondWeight,
                        valid: true,
                        touched: true
                    },
                    quantity: {
                        ...state.productForm.quantity,
                        value: action.payload.quantity,
                        valid: true,
                        touched: true
                    },
                    otherStone: {
                        ...state.productForm.otherStone,
                        value: action.payload.otherStone,
                        valid: true,
                        touched: true
                    },
                    karats: {
                        ...state.productForm.karats,
                        value: action.payload.karats,
                        valid: true,
                        touched: true
                    },
                    description: {
                        ...state.productForm.description,
                        value: action.payload.description,
                        valid: true,
                        touched: true
                    },
                    price: {
                        ...state.productForm.price,
                        value: action.payload.price,
                        valid: true,
                        touched: true
                    },
                    costEu: {
                        ...state.productForm.costEu,
                        value: action.payload.costEu,
                        valid: true,
                        touched: true
                    },
                    costUsd: {
                        ...state.productForm.costUsd,
                        value: action.payload.costUsd,
                        valid: true,
                        touched: true
                    },
                    categoryId: {
                        ...state.productForm.categoryId,
                        value: action.payload.categoryId,
                        valid: true,
                        touched: true
                    },
                    producerId: {
                        ...state.productForm.producerId,
                        value: action.payload.producerId,
                        valid: true,
                        touched: true
                    },
                    address: {
                        ...state.productForm.address,
                        value: action.payload.address,
                        valid: true,
                        touched: true
                    },
                    color: {
                        ...state.productForm.color,
                        value: action.payload.color,
                        valid: true,
                        touched: true
                    },
                    imageUrl: {
                        ...state.productForm.imageUrl,
                        value: action.payload.imageUrl,
                        valid: true,
                        touched: true
                    }
                },
                editable: !state.editable
            }
        case newProductActionTypes.CLEAR_NEW_PRODUCT:
            return {
                ...initialState
            }
        case newProductActionTypes.PAGE_UNLOADED:
            return {
                ...state,
                response: "",
                submitted: false,
                updated: "",
                imageUrl: "",
                formIsValid: false,
                editable: false,
                productForm: {
                    ...state.productForm,
                    sku: {
                        ...state.productForm.sku,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    goldWeight: {
                        ...state.productForm.goldWeight,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    silverWeight: {
                        ...state.productForm.silverWeight,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    otherStoneWeight: {
                        ...state.productForm.otherStoneWeight,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    diamondWeight: {
                        ...state.productForm.diamondWeight,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    quantity: {
                        ...state.productForm.quantity,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    otherStone: {
                        ...state.productForm.otherStone,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    karats: {
                        ...state.productForm.karats,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    description: {
                        ...state.productForm.description,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    price: {
                        ...state.productForm.price,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    costEu: {
                        ...state.productForm.costEu,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    costUsd: {
                        ...state.productForm.costUsd,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    categoryId: {
                        ...state.productForm.categoryId,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    producerId: {
                        ...state.productForm.producerId,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    address: {
                        ...state.productForm.address,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    color: {
                        ...state.productForm.color,
                        value: "",
                        valid: false,
                        touched: false
                    },
                    imageUrl: {
                        ...state.productForm.imageUrl,
                        value: "",
                        valid: true,
                        touched: true
                    }
                }
            };
        default:
            return state;
    }
}

export default newProductReducer;