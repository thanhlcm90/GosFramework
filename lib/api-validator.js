const validator = require('validator');

function STRING(length) {
    this._length = length;
}
STRING.prototype.key = 'STRING';
STRING.prototype.validate = function(value) {
    if (typeof value !== 'string') {
        return 'INCORRECT';
    } else if (this._length && this._length > 0 & value.length > this._length) {
        return `MAX_LENGTH_${this._length}`
    }
}

function BOOLEAN() { }
STRING.prototype.key = 'BOOLEAN';
BOOLEAN.prototype.validate = function(value) {
    return validator.isBoolean(value + '') ? null : 'INCORRECT';
}

function DATE() { }
STRING.prototype.key = 'DATE';
DATE.prototype.validate = function(value) {
    return validator.isISO8601(value + '') ? null : 'INCORRECT';
}

function NUMBER(min, max) {
    this._min = min;
    this._max = max;
}
STRING.prototype.key = 'NUMBER';
NUMBER.prototype.validate = function(value) {
    if (!validator.isFloat(value + '')) {
        return 'INCORRECT';
    } else if (this._min && value < this._min) {
        return `MIN_${this._min}`
    } else if (this._max && value > this._max) {
        return `MAX_${this._max}`
    }
}

function ARRAY() { }
STRING.prototype.key = 'ARRAY';
ARRAY.prototype.validate = function(value) {
    return Array.isArray(value) ? null : 'INCORRECT';
}

function OBJECT() { }
STRING.prototype.key = 'OBJECT';
OBJECT.prototype.validate = function(value) {
    return typeof value === 'object' && !Array.isArray(value) ? null : 'INCORRECT';
}

function isNull(value) {
    return value === null || value === undefined;
}

/**
 * Validator for api params
 * 
 * @param {object}      params of api request
 * @param {object}      paramDesc {param_name: type_of_param}, param_name include $ prefix will be required
 * @param {string}      prefix for error name, use in bunyan
 * @param {function}    callback callback of api
 * @returns ERROR CODE or Parse param
 */
function validatorParams({
    params,
    paramDesc,
    prefix
}) {
    let paramsValue = {};
    prefix = prefix || '';

    for (let attr in paramDesc) {
        let inValidMessage;
        let paramName = attr;
        let paramType = paramDesc[attr];

        // check param name with prefix $ for required
        if (paramName[0] === '$') {
            paramName = paramName.substr(1);
            if (!params || isNull(params[paramName]) || params[paramName].length === 0) {
                throw `ERROR_${prefix.toUpperCase()}${paramName.toUpperCase()}_MISSING`;
            }
        }

        // check param type
        if (params && !isNull(params[paramName]) && typeof paramType === 'function') {
            const dataTypeValid = new paramType();
            if (typeof dataTypeValid.validate === 'function')
                inValidMessage = dataTypeValid.validate(params[paramName]);
            else
                throw `Param type ${paramName} is incorrect`;
        }

        if (inValidMessage) {
            throw `ERROR_${prefix.toUpperCase()}${paramName.toUpperCase()}_${inValidMessage}`;
        } else if (Array.isArray(paramType) && paramType.length > 0 && Array.isArray(params[paramName]) && params[paramName].length > 0) {
            // param type is OBJECT, check DATA TYPE of each attr in Object
            if (typeof paramType[0] === 'object') {
                for (let i = 0; i < params[paramName].length; i++) {
                    validatorParams({
                        params: params[paramName][i],
                        paramDesc: paramType[0],
                        prefix: `${paramName}[${i}].`
                    });
                }

                // param type is DATA TYPE
            } else if (typeof paramType[0] === 'function') {
                const dataTypeValid = new paramType[0]();
                if (typeof dataTypeValid.validate === 'function')
                    for (let i = 0; i < params[paramName].length; i++) {
                        inValidMessage = dataTypeValid.validate(params[paramName][i]);
                        if (inValidMessage) {
                            throw `ERROR_${prefix.toUpperCase()}${paramName.toUpperCase()}[${i}]_${inValidMessage}`;
                        }
                    }
                else
                    throw `Param type ${paramName} is incorrect`;
            } else {
                throw `Param type ${paramName} is incorrect`;
            }
        } else if (typeof paramType === 'object' && params && typeof params[attr] === 'object') {
            validatorParams({
                params: params[paramName],
                paramDesc: paramType,
                prefix: `${paramName}.`
            });
        }
        paramsValue[paramName] = params[paramName];
    }
    return paramsValue;
}

module.exports = {
    validate: validatorParams,
    STRING: STRING,
    NUMBER: NUMBER,
    BOOLEAN: BOOLEAN,
    DATE: DATE,
    ARRAY: ARRAY,
    OBJECT: OBJECT
}
