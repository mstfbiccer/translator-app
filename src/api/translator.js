/**
 * Translator class.
 * @class
 * @param {string} input - The input text to be translated.
 */
export function Translator(input) {
  this.input = input;
}

/**
 * @name Translator#translate
 * @returns {string} The translated text.
 * @function
 */
Translator.prototype.translate = async function () {
  if(typeof this.input === "string" && this.input.trim() !== "") {
    const response = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: this.input,
        source: "en",
        target: "tr"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();
    return result?.translatedText;
  }else {
    return 'Something went wrong...'
  }
 
}