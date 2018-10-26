// Magic Line to Import Axios.. :S
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

// References to all the HTML elements needed.
let scoreboard: HTMLTableElement = <HTMLTableElement> document.getElementById("scorebody");
let inputName: HTMLInputElement = <HTMLInputElement> document.getElementById("name");
let inputScore: HTMLInputElement = <HTMLInputElement> document.getElementById("score");
let addbutton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addbutton");

// Add an event listener to the button.
addbutton.addEventListener("click", addToScoreboard);

// Variable to store the general URL used.
var baseURL: string = "https://mmo-restcalculatorservice.azurewebsites.net/api";

// Function to trim the double quotes from the JSON strings.
function trimQuotes (string: string)
{
    return string.replace(/['"]+/g, '');
}

// Get All Data from the REST Service, and append the data to a HTML table.
function getScores(): void
{
    axios.get(baseURL + '/highscores')
    .then(function (response) {
        for (let d of response.data) {
            let tablerow = scoreboard.appendChild(document.createElement("tr"));
            tablerow.appendChild(document.createElement("td")).innerHTML = trimQuotes(JSON.stringify(d.name));
            tablerow.appendChild(document.createElement("td")).innerHTML = JSON.stringify(d.score);
        }
    });
}

// Function to Post the new JSON object.
function addToScoreboard(event: MouseEvent)
{
    if(inputName.value != "" || inputScore.value != "")
    {
        axios.post(baseURL + '/highscores', {
            Name: inputName.value,
            Score: Number(inputScore.value)
        });

        let tablerow = scoreboard.appendChild(document.createElement("tr"));
        tablerow.appendChild(document.createElement("td")).innerHTML = inputName.value;
        tablerow.appendChild(document.createElement("td")).innerHTML = inputScore.value;

        inputName.value = "";
        inputScore.value = "";
    }
}

getScores();
