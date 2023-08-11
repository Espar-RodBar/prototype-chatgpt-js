const askBtnElement = document.querySelector(".ask-btn");
const inputElement = document.querySelector("#question");
const ulElement = document.querySelector(".blackboard");

function writeChatMessage(msg, speaker, parentElement) {
    // insert li (with a p with text) on the ul
    const newLine = document.createElement("li");
    const text = document.createElement("p");
    text.innerHTML = msg;
    newLine.appendChild(text);

    parentElement.appendChild(newLine);

    // Select the apropiate class for the style
    if (speaker === "assistant") {
        newLine.classList.add("assistant");
    } else {
        newLine.classList.add("user");
    }
}

async function getPrompt(message) {
    const options = {
        method: "POST",
        body: JSON.stringify({
            message: message,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch("/askBot", options);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function askHandler() {
    const inputData = inputElement.value;
    writeChatMessage(inputData, "user", ulElement);
    inputElement.value = "";

    const messageFromPrompt = await getPrompt(inputData);

    writeChatMessage(
        messageFromPrompt.content,
        messageFromPrompt.role,
        ulElement
    );
}

askBtnElement.addEventListener("click", askHandler);
