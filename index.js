const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const parser = require('xml-js');
const _ = require('lodash');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/zestimate', (req, res) => {
    let {API_KEY, address, cityStateZip} = req.query;
    address = encodeURI(address);
    cityStateZip = encodeURI(cityStateZip);
    const url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${API_KEY}&address=${address}&citystatezip=${cityStateZip}&rentzestimate=true`;
    fetch(url)
        .then(result => result.text())
        .then(result => {
            result = parser.xml2js(result, {compact: true, spaces: 4})['SearchResults:searchresults'];
            const valuationRange = _.get(result, 'response.results.result.rentzestimate.valuationRange');
            let zestimate = _.get(result, 'response.results.result.zestimate.amount._text');
            if (valuationRange) {
                // There is a rent zestimate
                let {low, high} = valuationRange;
                low = low._text;
                high = high._text;
                res.send(`${low} - ${high}`);
            } else if (zestimate) {
                // There is no rent zestimate so return the regular zestimate
                zestimate = (parseInt(zestimate) * 0.05) / 12;
                res.send(`${Math.floor(zestimate * 0.9)} - ${Math.floor(zestimate * 1.1)}`);
            } else {
                res.send('Sorry, could not calculate zestimate for this address :)')
            }
        })
        .catch(error => res.send('Sorry, could not calculate zestimate for this address :)'));
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);