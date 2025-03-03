function print(input) {
    console.log("mde: " + input);
}

function error(input) {
    console.error("mde error: " + input);
}

module.exports = {
    print,
    error,
};