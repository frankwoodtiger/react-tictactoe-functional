const getSymbol = (boxState) => {
    if (boxState !== null) {
        return boxState ? 'X' : 'O';
    }
    return '\u00A0';
}

const deepCloneObject = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export { getSymbol, deepCloneObject };