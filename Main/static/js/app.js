//---------------------------------------------------------
// SETUP AND GLOBAL VARIABLES
//---------------------------------------------------------
// setup
'use strict';

// create filepath of file
const filepath = '../resources/samples.json'

//---------------------------------------------------------
// LOADER FUNCTION THAT LOADS DATA FROM FILE
//---------------------------------------------------------
// fetch call using async function
async function loadFile(path) {
    try {
        let response = await fetch(path);
        let rawData = await response.json();
        // console.log(rawData);
        return rawData;
    } catch(error) {
        console.error(error);
    };
};

//---------------------------------------------------------
// INIT / MAIN FUNCTION FOR WEB
//---------------------------------------------------------
async function main() {
    // load the file
    let rawData = await loadFile(filepath);
    // console.log(rawData)
    let initialValue = rawData.names[0];

    //populates dropdown and set initial value
    rawData.names.forEach(sample => {
        let option = document.createElement("option");
        option.textContent = sample;
        document.querySelector("#selDataset").append(option);
    });
    document.querySelector("#selDataset").value = initialValue;

    //loads initial graphs and table
    graphAll(initialValue);

    //adds event listener to dropdown
    document.querySelector("#selDataset").addEventListener("change", event => {
        graphAll(event.target.value);
    })
};

//---------------------------------------------------------
//INIT WEBPAGE
//---------------------------------------------------------
main();