const validations = (value, rules) => {
    let isValid = true;
    
    for (let rule in rules) {
    
        switch (rule) {
            case 'minLength':
                isValid = isValid && minLength(value, rules[rule])
                break
            case 'maxLength':
                isValid = isValid && maxLength(value, rules[rule])
                break
            case 'isRequired':
                isValid = isValid && isRequired(value)
                break
            case 'isEmail':
                isValid = isValid && isEmail(value)
                break
            case 'isNumeric':
                isValid = isValid && isNumeric(value)
                break
            case 'isAlphaNumeric':
                isValid = isValid && isAlphaNumeric(value)
                break
            default: 
                isValid = true
        } 
    }
    return isValid;
}

const validationMessages = value => {
    let errorMessage = {};

    if (!value.input) {
        errorMessage.input = 'This field is required';
    }

    if (!isEmail.pattern.test(value.email)) {
        errorMessage.email = 'Email address is invalid';
    }
    
    if (!isNumeric.pattern.test(value.numeric)) {
        errorMessage.numeric = 'This field expects only numeric values';
    }

    return errorMessage;
};

/**
 * minLength Val
 * @param  value 
 * @param  minLength
 * @return          
*/

const minLength = (value, minLength) => {
    return value.length >= minLength;
}

/**
 * maxLength Val
 * @param  value 
 * @param  maxLength
 * @return          
*/

const maxLength = (value, maxLength) => {
    return value.length <= maxLength;
}

/**
 * Check to confirm that field is required
 * 
 * @param  value 
 * @return       
 */

const isRequired = value => {
    return value.trim() !== '';	
}

/**
 * Email validation
 * 
 * @param value
 * @return 
 */

const isEmail = value => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(String(value).toLowerCase());
}

/**
 * Numeric validation
 * 
 * @param value
 * @return 
 */

const isNumeric = value => {
    const pattern = /^\d+$/;
    return pattern.test(String(value).toLowerCase());
}

/**
 * Alphanumeric validation
 * 
 * @param value
 * @return 
 */

const isAlphaNumeric = value => {
    const pattern = /^[a-zA-Z0-9]*$/;
    return pattern.test(String(value).toLowerCase());
}
  
export {validations, validationMessages};