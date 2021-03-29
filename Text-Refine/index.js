// unit-test 대상의 code (공백이 4개 -> 1개, 2개 -> 1개)
function refineText(s) {
    return s.replace("    ", " ").replace("  ", " ");
}
module.exports = refineText;