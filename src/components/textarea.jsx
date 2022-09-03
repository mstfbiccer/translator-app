import { useState, useEffect } from "react";

const Textarea = ({
  speechval,
  readonly,
  placeholder,
  language,
  changeValue,
  translateIt,
}) => {
  const [speechValue, setSpeech] = useState(speechval);
  useEffect(() => {
    setSpeech(speechval);
  }, [speechval]);

  const onChangeHandler = (event) => {
    setSpeech(event.target.value);
    changeValue(event.target.value);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      translateIt();
    }
  };
  return (
    <div className="textarea-container">
      <h4 className="textarea-title">{language}</h4>
      <textarea
        className="textareas"
        cols={50}
        rows={10}
        placeholder={placeholder}
        value={speechValue}
        onChange={onChangeHandler}
        onKeyDown={keyDownHandler}
        disabled={readonly}
      />
    </div>
  );
};

export default Textarea;
