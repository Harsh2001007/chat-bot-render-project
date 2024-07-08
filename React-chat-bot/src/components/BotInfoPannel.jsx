import LabelField from "./LabelField";
import MajorButtons from "./MajorButtons";
import { useState } from "react";

export default function BotInfoPannel({ onApiResponse, method }) {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [env, setEnv] = useState("");
  const [botId, setBotId] = useState("");
  const [botRefId, setBotRefId] = useState("");
  const [convId, setConvId] = useState("");
  const [msgId, setMsgId] = useState("");
  const [userId, setUserId] = useState("");
  const [apiResponse, setApiResponse] = useState(undefined);

  function generateRandomString() {
    return Math.random().toString(36).substring(2, 10);
  }

  function randomFieldData() {
    setText("Dummy Text" + generateRandomString());
    setSubject("Dummy Subject" + generateRandomString());
    setEmail("dummy" + generateRandomString().substring(0, 8) + "@example.com");
    setName("Dummy User " + generateRandomString().substring(0, 8));
  }

  function envHandler(event) {
    setEnv(event.target.value);
    handleOptionClick(event.target.value);
  }

  const handleOptionClick = (value) => {
    if (value == "QA") {
      setBotId("cc15454e-7c0c-4c67-a90d-1f82bf531f1b");
      setBotRefId("7655a94c-d375-41f3-aea9-bb16cda2e24d");
    } else if (value == "US") {
      setBotId("6c0ab1ed-e961-4d5e-99b6-6dcdb557d2e2");
      setBotRefId("1d7aaac0-f9ce-4f73-9a23-5ebb73e14e3a");
    } else if (value == "EU") {
      setBotId("8afa0008-ac65-4e52-8689-16f566500045");
      setBotRefId("e1d560c8-87c6-4082-b714-f3f559358f28");
    } else if (value == "SG") {
      setBotId("8fcb5f20-b252-41a4-8832-75ac46e1bfb8");
      setBotRefId("23dc1d9d-e1f4-4a85-8a48-6dd4dfab553c");
    }
  };

  function generateUUID() {
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
    return uuid;
  }

  const convIdHanlder = () => {
    setConvId(generateUUID());
  };
  const msgIDHandler = () => {
    setMsgId(generateUUID());
  };

  const userIdHanlder = () => {
    setUserId(generateUUID());
  };

  let requestedBody = {
    env: env,
    conversationId: convId,
    messagePayload: {
      messageId: msgId,
      text: text,
      subject: subject,
    },
    userDetails: {
      userId: userId,
      userName: name,
      emailId: email,
    },
  };

  const apiSenderHandler = async () => {
    await fetch(
      "https://hd-web-qa.netomi.com/v1/webapi/28f9b3d4-05a4-4a63-8491-c5d301a5090c",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "PWUWERREWT",
          "x-bot-id": botId,
          "x-bot-ref-id": botRefId,
        },
        body: JSON.stringify(requestedBody),
      }
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(JSON.stringify(data));
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form data send successfully:", data);
        setApiResponse(data);
        onApiResponse(data);
        displayResponse(data);
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
        setApiResponse(error);
        onApiResponse(error);
        alert("Error sending form data. Please try again later.");
      });
  };
  function displayResponse(responseData) {
    let responseBodyHtml = responseData.payload.attachments[0].attachment.body;
  }

  return (
    <div className="bot-info-pannel">
      <h2 className="text heading-text">Get EMAIL API bot response directly</h2>
      <div className="env-div">
        <h3>Environment</h3>
        <div>
          <select name="" id="select" value={env} onChange={envHandler}>
            <option value="" disabled selected>
              Select Env
            </option>
            <option value="US">US</option>
            <option value="QA">QA</option>
            <option value="EU">EU</option>
            <option value="SG">SG</option>
          </select>
          <button className="clear-button" onClick={method}>
            Clear all responses
          </button>
        </div>
      </div>
      <LabelField title={"Bot Id"} values={botId} />
      <LabelField title={"Bot Reference ID:"} values={botRefId} />
      <LabelField
        title={"Conversation ID:"}
        buttonAction={true}
        values={convId}
        method={convIdHanlder}
      />
      <LabelField
        title={"Message ID:"}
        buttonAction={true}
        values={msgId}
        method={msgIDHandler}
      />
      <LabelField title={"Text:"} values={text} />
      <LabelField title={"Subject:"} values={subject} />
      <LabelField
        title={"User ID:"}
        values={userId}
        method={userIdHanlder}
        buttonAction={true}
      />
      <LabelField title={"User Email:"} values={email} />
      <LabelField title={"User Name:"} values={name} />
      <MajorButtons
        magicBtnAction={randomFieldData}
        sendBtnAction={apiSenderHandler}
      />
    </div>
  );
}
