
function selectAnalysis()
{
    // alert("NIGGA")
    var stockSymbol = document.getElementById('stock').value;
    var exchange = document.getElementById('exchange').value;
    var action = document.getElementById('action').value;
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    switch(action) {
        case 'fundamental':
            displayFundamentalAnalysisForm(resultsDiv);
            break;
        case 'technical':
            displayTechnicalAnalysisForm(resultsDiv);
            break;
        case 'intraday':
            displayIntradayForm(resultsDiv);
            break;
        case 'swing':
            displaySwingForm(resultsDiv);
            break;
    }
};

function displayFundamentalAnalysisForm(container){
    container.innerHTML =`
    <div>[Display 4 paragraphs of fundamental analysis text here]</div>
    `;
};

async function technical_analysis() {
    var inputElement = document.getElementById('chartImage');
    var selectedImage = inputElement.files[0];

    if (selectedImage) {
        var formData = new FormData();
        formData.append('chartImage', selectedImage);

        var result_string = "";

        const response = await fetch('http://127.0.0.1:4000/technical', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'image/png'
            }
        });
        const result = await response.text();
        document.getElementById('technicalResults').innerHTML = `<div>${result}</div>`;
    } else {
        console.log('No image selected');
    }
};

function displayTechnicalAnalysisForm(container) {
    container.innerHTML = `
        <div id="technicalForm">
        <div class="grid">
            <label for="chartImage">Upload Candlestick Chart Image
            <input type="file" id="chartImage" name="chartImage" required>
            </label>
            
            <label for="timeFrame">Candlestick Time Frame
            <select id="timeFrame" name="timeFrame">
                <option value="1m">1m</option>
                <option value="3m">3m</option>
                <option value="5m">5m</option>
                <option value="15m">15m</option>
                <option value="30m">30m</option>
                <option value="45m">45m</option>
                <option value="1h">1h</option>
                <option value="2h">2h</option>
                <option value="3h">3h</option>
                <option value="4h">4h</option>
                <option value="1D" selected>1D</option>
                <option value="1W">1W</option>
                <option value="1M">1M</option>
            </select>
            </label>
        </div>
            <button id="analyseButton" value="analyze" onclick="technical_analysis()">Analyze</button>
        </div>
        <div id="technicalResults"></div>
    `;
}

function displayIntradayForm(container) {
    container.innerHTML = `
        <div>[Display intraday entry stop loss targets risk reward ratio]</div>
        `;
}

function displaySwingForm(container) {
    container.innerHTML = `
        <div>[Display swing entry stop loss targets risk reward ratio]</div>
        `;
}
