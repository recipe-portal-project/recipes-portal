module.exports = (text, overflow) => {
    if (text.length > overflow) {
        return `${text.slice(0, overflow).trim()}...`
    }
    return text;
}