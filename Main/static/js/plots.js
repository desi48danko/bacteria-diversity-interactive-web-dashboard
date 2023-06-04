//---------------------------------------------------------
// GRAPH ALL
//---------------------------------------------------------
//function that graphs all the graphs
function graphAll(subNum) {
    buildTable(subNum);
    buildBar(subNum);
    buildBubble(subNum);
    buildGauge(subNum);
};

//---------------------------------------------------------
//TABLE CONSTRUCTOR FUNCTION
//---------------------------------------------------------
async function buildTable(subNum) {
    // load and select relevant data
    let rawData = await loadFile(filepath);
    // console.log(rawData)
    let subNumData = rawData.metadata.filter(i => i.id == subNum)[0];

    // select the panel
    let panel = document.querySelector("#sample-metadata");

    // clear panel then populate it
    panel.innerHTML = "";
    Object.entries(subNumData).forEach(([key, value]) => {
        let h6 = document.createElement("h6");
        h6.textContent = `${key.toUpperCase()}: ${value}`
        panel.append(h6);
    });
};

//---------------------------------------------------------
//BAR CHART CONSTRUCTOR FUNCTION
//---------------------------------------------------------
async function buildBar(subNum) {
    // define title here for easy editing
    let barTitle = `Top 10 OTUs Found in Subject ${subNum}'s Bellybutton`

    // load and select relevant data
    let rawData = await loadFile(filepath);
    // console.log(rawData)
    let subNumData = rawData.samples.filter(i => i.id == subNum)[0];

    // define trace's data
    let trace1 = {
        x: subNumData.sample_values.slice(0, 10).reverse(),
        y: subNumData.otu_ids.slice(0, 10).map(i => `OTU ${i}`).reverse(),
        text: subNumData.otu_labels.slice(0, 10).reverse(),
        name: `Subject ${subNum}`,
        type: 'bar',
        orientation: 'h',
    };
    let barTraceData = [trace1]

    // define trace's layout
    let barLayout = {
        title: barTitle,
        margin: {
            t: 30,
            b: 30,
            l: 10,
            r: 10
        }
    };

    // graph plot
    Plotly.newPlot('bar', barTraceData, barLayout);
};

//---------------------------------------------------------
//BUBBLE CHART CONSTRUCTOR FUNCTION
//---------------------------------------------------------
async function buildBubble(subNum) {
    // define title here for easy editing
    let bubbleTitle = `Bacteria Cultures Per Sample in Subject ${subNum}'s Bellybutton`

    // load and select relevant data
    let rawData = await loadFile(filepath);
    // console.log(rawData)
    let subNumData = rawData.samples.filter(sampleObj => sampleObj.id == subNum)[0];

    // define trace's data
    let trace1 = {
        x: subNumData.otu_ids,
        y: subNumData.sample_values,
        text: subNumData.otu_labels,
        name: `Subject ${subNum}`,
        mode: 'markers',
        marker: {
            size: subNumData.sample_values,
            color: subNumData.otu_ids,
            // colorscale: 'Earth'
        }
    };
    let bubbleTraceData = [trace1]

    // define trace's layout
    let bubbleLayout = {
        title: bubbleTitle,
        margin: {
            t: 30,
            b: 30,
            l: 10,
            r: 10
        },
        hovermode: 'closest',
        xaxis: { title: 'OTU ID' }
    };

    // graph plot
    Plotly.newPlot('bubble', bubbleTraceData, bubbleLayout);
};