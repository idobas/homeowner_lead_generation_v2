const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const parser = require('xml-js');
const _ = require('lodash');
const nodemailer = require('nodemailer');

const companyEmail = 'rentwithme1234@gmail.com';
const companyEmailPassword = 'bestPassword1234';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: companyEmail,
      pass: companyEmailPassword
    }
});

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
function sendEmailToUser(address, firstName, lastName, email, phoneNumber, zestimate) {
    const emailText = `Hi ${firstName}!, thank you for signing up! Here are your account details: 
    \n Name: ${firstName}
    \n Last name: ${lastName}
    \n Phone: ${phoneNumber !== 'null' ? phoneNumber : ''}
    \n\n And here is the zestimate we found for the address: ${address}
    \n ${zestimate} $ (per month)
    \n Thank you, 
    \n The Rent-With-Me team :)`;
    const mailOptions = {
        from: companyEmail,
        to: email,
        subject: 'Congrats for joining Rent-With-Me!',
        text: emailText
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

app.get('/api/zestimate', (req, res) => {
    let {API_KEY, address, cityStateZip, firstName, lastName, email, phoneNumber, originalAddress} = req.query;
    address = encodeURI(address);
    cityStateZip = encodeURI(cityStateZip);
    const errorMessage = 'Sorry, could not calculate zestimate for this address :)';
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
                const toSend = `${low} - ${high}`;
                sendEmailToUser(originalAddress, firstName, lastName, email, phoneNumber, toSend);
                res.send(toSend);
            } else if (zestimate) {
                // There is no rent zestimate so return the regular zestimate
                zestimate = (parseInt(zestimate) * 0.05) / 12;
                const toSend = `${Math.floor(zestimate * 0.9)} - ${Math.floor(zestimate * 1.1)}`;
                sendEmailToUser(originalAddress, firstName, lastName, email, phoneNumber, toSend);
                res.send(toSend);
            } else {
                res.send(errorMessage)
            }
        })
        .catch(error => {
            console.log(error);
            res.send(errorMessage);
        });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);