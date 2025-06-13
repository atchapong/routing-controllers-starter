import mongoose from 'mongoose';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * It returns true if the id is a valid mongoose id, and false if it's not
 * @param {string} id - The id to check
 * @returns A function that takes an id and returns a boolean
 */
const IdValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export { isEmpty, IdValidId };
