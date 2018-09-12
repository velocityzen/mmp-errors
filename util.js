'use strict';
const errors = require('./errors');

const getError = function(error) {
  if (typeof error === 'string') {
    error = errors[error];
  }

  if (!error) {
    error = errors.Call;
  }

  return error;
};

const isEmpty = function(something) {
  if (
    something === undefined ||
    something === false ||
    something === '' ||
    (something !== null && typeof something === 'object' && !Object.keys(something).length)
  ) {
    return true;
  }

  return false;
};


const ifEmpty = function(error) {
  error = getError(error);

  return result => {
    if (isEmpty(result)) {
      throw error();
    }

    return result;
  };
};

const ifError = function(error) {
  error = getError(error);

  return err => {
    if (typeof err.code === 'number') {
      throw err;
    }

    throw error(err);
  };
};

const ifInstanceThen = function(cls, error) {
  error = getError(error);

  return err => {
    if (err instanceof cls) {
      throw error();
    }

    throw err;
  };
};

const ifCodeThen = function(code, error) {
  error = getError(error);

  return err => {
    if (err.code === code) {
      throw error();
    }

    throw err;
  };
};

module.exports = {
  ifEmpty,
  ifError,
  ifInstanceThen,
  ifCodeThen
};
