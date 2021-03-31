// unit-test 대상의 code
function refineText(source, options) {
    // initial code
    // source = source.trim();
    // refactor version
    return [normalizeWhiteSpace, 
        compactWhiteSpaces, 
        maskBannedWords, 
        trimWhiteSpaces
    ].reduce (
        (value, filter) => filter(value, options),
        source
    );
}

function trimWhiteSpaces(value) {
    return value.trim();
}

function maskBannedWords(source, options) {
    return options 
        ? options.bannedWords.reduce(maskBannedWord, source)
        : source;
}

function maskBannedWord(source, bannedWord) {
    const mask = "*".repeat(bannedWord.length)
    return source.replace(bannedWord, mask);
}

function normalizeWhiteSpace(source) {
    return source.replace("\t", " ");
}

function compactWhiteSpaces(source) {
    return source.indexOf("  ") < 0 
    ? source 
    : compactWhiteSpaces(source.replace("  ", " "));
}
module.exports = refineText;