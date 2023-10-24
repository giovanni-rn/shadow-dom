"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const jsdom_1 = require("jsdom");
const $ = new jsdom_1.JSDOM('<body><script>setTimeout(()=>{document.querySelector("#add-btn").addEventListener("click",()=>{const newLi = document.createElement("li");const textInput = document.querySelector("input");newLi.appendChild(document.createTextNode(textInput.value));newLi.style.transform = "translateY(100px)";newLi.style.opacity = "0";document.querySelector("ul").appendChild(newLi);let addItemTime = 10;let opacity = 0;const addItem = setInterval(() => {newLi.style.transform = `translateY(${addItemTime}px)`;newLi.style.opacity = `${1.1 - addItemTime / 10}`;addItemTime--;if (addItemTime <= 0) clearInterval(addItem);}, 1);});document.querySelector("#reset-btn").addEventListener("click", () => document.querySelector("ul").replaceChildren(""))},100);</script></body>', { runScripts: "dangerously" }).window;
const d = $.document;
// HEAD TAG
const title = d.createElement("title");
const titleText = d.createTextNode("Shadow DOM");
title.appendChild(titleText);
d.querySelector("head").appendChild(title);
// HEADER
const header = d.createElement("header");
const h1 = d.createElement("h1");
const h1Text = d.createTextNode("Shadow DOM");
h1.appendChild(h1Text);
header.appendChild(h1);
const body = d.querySelector("body");
body.appendChild(header);
body.style.textAlign = "center";
// INPUT
const addBtn = d.createElement("button");
addBtn.appendChild(d.createTextNode("Add"));
addBtn.id = "add-btn";
const textInput = d.createElement("input");
textInput.placeholder = "Add new website";
const resetBtn = d.createElement("button");
resetBtn.appendChild(d.createTextNode("Reset"));
resetBtn.id = "reset-btn";
for (const input of [addBtn, textInput, resetBtn]) {
    input.style.padding = "10px";
    input.style.borderRadius = "10px";
    input.style.border = "solid 0px";
    input.style.fontSize = "20px";
    input.style.boxShadow = "0 5px 10px rgba(0, 0, 0, 0.1)";
    input.style.margin = input.nodeName === "BUTTON" ? "10px" : "7px";
    input.style.paddingLeft = input.nodeName === "BUTTON" ? "10px" : "15px";
    input.style.width = input.nodeName === "BUTTON" ? "150px" : "300px";
    input.style.height = input.nodeName === "BUTTON" ? "60px" : "45px";
    body.appendChild(input);
}
// LIST
const ul = d.createElement("ul");
const h2 = d.createElement("h2");
const h2Text = d.createTextNode("Best websites :");
h2.appendChild(h2Text);
body.appendChild(h2);
const defaultWebsites = ["youtube", "w3school", "oriano.dev", "figma"];
for (const url of defaultWebsites) {
    const li = d.createElement("li");
    const liTxt = d.createTextNode(!url.endsWith(".dev") ? `${url}.com` : url);
    li.appendChild(liTxt);
    ul.appendChild(li);
}
body.appendChild(ul);
const htmlString = `<!DOCTYPE html>${$.document.documentElement.outerHTML}`;
fs_1.default.writeFileSync("index.html", htmlString);
http_1.default
    .createServer((req, res) => {
    const html = fs_1.default.readFileSync("index.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
})
    .listen(5500, () => console.log("Running : http://localhost:5500"));
