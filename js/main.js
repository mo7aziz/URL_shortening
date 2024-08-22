import { shortenerURL } from "./fetchApi.js";

const urlInput = document.getElementById("url-input");
const btn = document.getElementById("shortner-btn");

const copiedPopup = () => {
  let div = document.createElement("div");
  div.className = "copied-popup";
  div.textContent = "Copied";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2000);
};

btn.addEventListener("click", () => {
  const url = urlInput.value;
  const regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  if (url.trim() == "") {
    swal({
      title: "Error",
      text: "Provide URL",
      icon: "error",
    });
    return;
  }
  if (!regex.test(url)) {
    swal({
      title: "Error",
      text: "Provide a valid URL",
      icon: "error",
    });
    return;
  }
  shortenerURL(url)
    .then((result) => JSON.parse(result))
    .then((result) => (urlInput.value = result["short_url"]));

  urlInput.addEventListener("click", function () {
    navigator.clipboard.readText().then((text) => {
      if (text !== urlInput.value && text.trim() !== "") {
        this.select();
        // Use the Clipboard API to copy the text
        navigator.clipboard
          .writeText(this.value)
          .then(() => {
            copiedPopup();
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      }
    });
  });
});
