/**
 * speechRecognition api is used to listen to the user's speech.
*/
const SpeechRecognition = window.webkitSpeechRecognition

/**
 * SpeechOperations class.
 * @class
 */
export function SpeechOperations() {
  this.recognition = new SpeechRecognition();
}

/**
 * @name SpeechOperations#listen
 * @param {function} cb callback function to be called when the speech is recognized.
 * @function
 */
SpeechOperations.prototype.listen = function (cb) {
  this.recognition.start();

  this.recognition.onresult = (event) => {
    let input = event.results[0][0].transcript;
    cb(input);
  }
 
  this.recognition.onspeechend = () => {
    this.recognition.stop();
  }
}

/**
 * @name SpeechOperations#speak
 * @param {string} lang language code for the speech.
 * @param {string} text input text for the speech.
 * @function
 */
SpeechOperations.prototype.speak = function(lang, text) {
  const synth = window.speechSynthesis;
  const utterance1 = new SpeechSynthesisUtterance(text);
  utterance1.lang = lang;
  synth.speak(utterance1);
}