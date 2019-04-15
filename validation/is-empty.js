const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    //The Object.keys() method returns an array of a given object's own
    //property names, in the same order as we get with a normal loop.
    (typeof value === "object" && Object.keys(value).length === 0) ||
    //String trim() - Remove whitespace from both sides of a string
    (typeof value === "string" && value.trim().length === 0)
  );
};

//export the function so we can use it
module.exports = isEmpty;
