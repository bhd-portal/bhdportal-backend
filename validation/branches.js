const Validator = require("validator");
const isEmpty = require("./is-empty");
//TODO IS EMPTY

module.exports = function validateBranchInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  data.avatar = !isEmpty(data.avatar) ? data.avatar : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.avatar)) {
    errors.avatar = "Avatar field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
