const getSymbol = (boxState) => {
    if (boxState !== null) {
        return boxState ? 'X' : 'O';
    }
    return '\u00A0';
}

export { getSymbol };