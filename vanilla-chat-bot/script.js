document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("botForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form submission
      sendFormData(); // Send form data
    });
});

function generateUUID(fieldId) {
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  document.getElementById(fieldId).value = uuid;
}

function magicFill() {
  // Fill all fields with dummy data except for environment, botId, and botRefId
  generateUUID("conversationId");
  generateUUID("messageId");

  // Generate dummy data for other fields
  document.getElementById("text").value =
    "Dummy Text " + generateRandomString();
  document.getElementById("subject").value =
    "Dummy Subject " + generateRandomString();
  generateUUID("userId");
  document.getElementById("userEmail").value =
    "dummy" + generateRandomString().substring(0, 8) + "@example.com";
  document.getElementById("userName").value =
    "Dummy User " + generateRandomString().substring(0, 8);
}

// Function to generate a random string for dummy data
function generateRandomString() {
  return Math.random().toString(36).substring(2, 10);
}

function sendFormData() {
  var botId = document.getElementById("botId").value.trim();
  var botRefId = document.getElementById("botRefId").value.trim();
  var environment = document.getElementById("environment").value.trim();
  var conversationId = document.getElementById("conversationId").value.trim();
  var messageId = document.getElementById("messageId").value.trim();
  var text = document.getElementById("text").value.trim();
  var subject = document.getElementById("subject").value.trim();
  var userId = document.getElementById("userId").value.trim();
  var userEmail = document.getElementById("userEmail").value.trim();
  var userName = document.getElementById("userName").value.trim();

  // Constructing the request body
  var requestBody = {
    env: environment,
    conversationId: conversationId,
    messagePayload: {
      messageId: messageId,
      text: text,
      subject: subject,
    },
    userDetails: {
      userId: userId,
      userName: userName,
      emailId: userEmail,
    },
  };

  // Making the API request
  fetch(
    "https://hd-web-qa.netomi.com/v1/webapi/28f9b3d4-05a4-4a63-8491-c5d301a5090c",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "PWUWERREWT",
        "x-bot-id": botId,
        "x-bot-ref-id": botRefId,
      },
      body: JSON.stringify(requestBody),
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
      console.log("Form data sent successfully:", data);
      displayResponse(data); // Display response
    })
    .catch((error) => {
      console.error("Error sending form data:", error);
      alert("Error sending form data. Please try again later.");
    });
}

function displayResponse(responseData) {
  // Fetching and parsing HTML body from the response
  var responseBodyHtml = responseData.payload.attachments[0].attachment.body;

  // Adding separator vertically
  var separator = document.getElementById("separator");
  separator.style.width = "2px";
  separator.style.height = "100%";
  separator.style.backgroundColor = "#ccc";
  separator.style.margin = "20px 0";

  // Adding response block dynamically
  var responseWrapper = document.createElement("div");
  responseWrapper.classList.add("response-wrapper");
  responseWrapper.innerHTML = `
      <h2>Response</h2>
      <div id="responseBlock">${responseBodyHtml}</div>
  `;
  document.querySelector(".container").appendChild(responseWrapper);
}

function selectEnvironment(environment) {
  var botIdInput = document.getElementById("botId");
  var botRefIdInput = document.getElementById("botRefId");
  var environmentInput = document.getElementById("environment");

  switch (environment) {
    case "US":
      botIdInput.value = "6c0ab1ed-e961-4d5e-99b6-6dcdb557d2e2";
      botRefIdInput.value = "1d7aaac0-f9ce-4f73-9a23-5ebb73e14e3a";
      environmentInput.value = "prod";
      break;
    case "QA":
      botIdInput.value = "cc15454e-7c0c-4c67-a90d-1f82bf531f1b";
      botRefIdInput.value = "7655a94c-d375-41f3-aea9-bb16cda2e24d";
      environmentInput.value = "qa";
      break;
    case "EU":
      botIdInput.value = "8afa0008-ac65-4e52-8689-16f566500045";
      botRefIdInput.value = "e1d560c8-87c6-4082-b714-f3f559358f28";
      environmentInput.value = "euprod";
      break;
    case "SG":
      botIdInput.value = "8fcb5f20-b252-41a4-8832-75ac46e1bfb8";
      botRefIdInput.value = "23dc1d9d-e1f4-4a85-8a48-6dd4dfab553c";
      environmentInput.value = "sgprod";
      break;
    default:
      break;
  }
}

{
  /* <div className="responses-container">
          {htmlResponses.map((html, index) => (
            <div
              className="response-body"
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
        </div> */
}
