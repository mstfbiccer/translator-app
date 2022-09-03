import { SpeechOperations } from "../api/speechOperations";
import { Translator } from "../api/translator";
import React, { useState } from "react";
import Textarea from "../components/textarea";
import RecentlyTranslated from "../components/recentlyTranslated";
import { BiMicrophone, BiVolumeFull, BiSend } from "react-icons/bi";
import { RecentlyOperations } from "../api/recentlyOperations";

const HomePage = ()=> {
    const speechObj = new SpeechOperations();
    const [outputState, setOutput] = useState("");
    const [speechValue, setSpeech] = useState("");
    const [micActivity, setMicActivity] = useState("passive");
    const recentlyOperator = new RecentlyOperations();
    const [recentlyData, setRecentlyData] = useState(
      recentlyOperator.getObjectList()
    );
    const initListen = () => {
      setMicActivity("active");
      speechObj.listen(async (data) => {
        let translator = new Translator(data);
        let output = await translator.translate();
        setOutput(output);
        setSpeech(data);
        setMicActivity("passive");
        recentlyOperator.add(data, output);
        setRecentlyData(recentlyOperator.getObjectList());
      });
    }
    const translateIt = async (value = speechValue, noRecord = false) => {
      setOutput("");
      let translator = new Translator(value);
      let output = await translator.translate();
      setOutput(output);
      !noRecord && recentlyOperator.add(speechValue, output);
      !noRecord && setRecentlyData(recentlyOperator.getObjectList());
    }
  
    return (
      <div className="App">
        <h3 className="main-title">The Translator APP</h3>
        <header className="App-header">
          <div className="input-container">
            <Textarea
              speechval={speechValue}
              placeholder="Enter text..."
              translateIt={() => translateIt()}
              language="English"
              triggerOnChange={false}
              changeValue={(value) => setSpeech(value)}
            />
            <BiMicrophone
              onClick={initListen}
              className={"listen-btn " + micActivity}
            />
            <BiSend
              className="send-btn"
              value={speechValue}
              onClick={() => translateIt()}
            />
          </div>
          <div className="output-container">
            <Textarea
              speechval={outputState}
              placeholder="See result..."
              readonly
              language="Turkish"
            />
            <BiVolumeFull
              onClick={() => speechObj.speak("tr-TR", outputState)}
              className="volume-btn"
            />
          </div>
        </header>
        <div className="recently-translate-container">
          <RecentlyTranslated
            recentlyList={recentlyData}
            title="Recently Translated"
            onClickHandler={(value) => {
              setSpeech(value);
              translateIt(value, true);
            }}
            localStorageUpdate={() =>
              setRecentlyData(recentlyOperator.getObjectList())
            }
          />
        </div>
      </div>
    );
};

export default HomePage;