import BotInfoPannel from "./components/BotInfoPannel";
import EnvCards from "./components/EnvCards";
import { useState } from "react";
import DOMpurify from "dompurify";

export default function App() {
  const [childApiResponse, setChildApiResponse] = useState(null);
  const [htmlResponses, setHtmlResponses] = useState([]);

  // const sanitizedHtml = DOMpurify.sanitize(
  //   childApiResponse?.payload.attachments[0].attachment["text"]
  // );

  // const handleApiResponse = (response) => {
  //   setChildApiResponse(response);
  // };

  const handleApiResponse = (response) => {
    const sanitizedHtml = DOMpurify.sanitize(
      response?.payload.attachments[0].attachment["text"]
    );
    const timestamp = new Date().toLocaleString();
    setHtmlResponses((prevHtmlResponses) => [
      ...prevHtmlResponses,
      { html: sanitizedHtml, timestamp },
    ]);
  };

  const clearAllHandler = () => {
    setHtmlResponses([]);
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <BotInfoPannel
          onApiResponse={handleApiResponse}
          method={clearAllHandler}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            border: "2px solid white",
            width: "900px",
            borderRadius: "10px",
          }}
        >
          {htmlResponses.map((response, index) => (
            <div
              key={index}
              style={{
                width: "calc(33.33% - 30px)",
                margin: "10px",
                boxSizing: "border-box",
                border: "1px solid white",
                borderRadius: "10px",
                height: "400px",
                backgroundColor: "black",
                paddingLeft: "10px",
                paddingTop: "10px",
                paddingRight: "10px",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: response.html }} />
              <p
                style={{ color: "white", marginTop: "10px", fontSize: "14px" }}
              >
                {response.timestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p style={{ color: "white", marginLeft: "50px", marginTop: "20px" }}>
        If required, use any of the configured bots
      </p>
      <div className="envCards-container">
        <EnvCards envInfo={"Kabir_Prod_Email_API_Bot"} envName={"US"} />
        <EnvCards envInfo={"QA-EmailApi"} envName={"QA"} />
        <EnvCards envInfo={"Harsh_Regression_Email_Api"} envName={"EU"} />
        <EnvCards envInfo={"tHarsh_Email_Api"} envName={"SG"} />
      </div>
    </>
  );
}
