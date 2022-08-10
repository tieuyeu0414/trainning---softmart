export default class RegexUtil {
    // Regex cho number
    static NumberRegex = new RegExp(/^[0-9]+$/);

    // Regex cho alphabet
    static LetterRegex = new RegExp(/^[A-Z]+$/);

    // Regex gồm số và chữ
    static LetterAndNumberRegex = new RegExp(/[A-Za-z0-9]+$/);

}
