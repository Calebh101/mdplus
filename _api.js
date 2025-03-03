function print(input) {
    console.log("mdplus: " + input);
}

function error(input) {
    console.error("mdplus error: " + input);
}

module.exports = {
    print,
    error,
};