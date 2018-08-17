const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/zestimate', (req, res) => {
    let {API_KEY, address, cityStateZip} = req.query;
    address = encodeURI(address);
    cityStateZip = encodeURI(cityStateZip);
    const url = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${API_KEY}&address=${address}&citystatezip=${cityStateZip}`;
    console.log(url);
    fetch(url)
        .then(result => result.text())
        .then(result => {
            res.send(result.split('<amount currency="USD">')[1].split('</amount>')[0]);
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