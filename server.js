const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var admin = require("firebase-admin");
const paypal = require('paypal-rest-sdk');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "globalshut-a0441",
        "private_key_id": "8ebcde7e9535ab071d38309b2d19c8dbc5d69852",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDISBH/9a8F9jIr\njZ+3T91xEpzqS1de6k+umIMXcqsnIhdk3xvBYPlUXKPMJAJgemknO6ftbAgBMvq5\npsmQtBCZkVz9uIMcwaZJtMvoOOCEy5/0ijwzGn1DXz3kK2kNDvWJst+J2Ymj/LU0\nSakq+uXw/AFsjveygeCIrvK+NO9swSI0lI0x1yi1NX7DAd8yzhoKOPeuq5F/FpmV\nFzpwT3ufWR4+8dCHgutuuk0fh71MRwM5m8nRTwnLE6Lm/jJFThNgu4eYgKrFbHHs\nKLnnfR4RGUWuzT52yyu2D5xQuI146lgt3OEXGSeV/+7Sw+CGa3553l3YdD4kRl63\n/C66t1ABAgMBAAECggEAG6Q+v7nTxxncgMBSG8WtBU8RUxDE5TeneaxY42KTFpqQ\n6f4U4ZKVtrv2a1VI8rHSU3TbT1xKmofDrN3FEfCYHem/ENFnXw+m+KM4RTucWReV\nYvW1K0Rrp2G8tAH9xKyc3L1QNsFMStK025uS+niYRbMyKx5sNznPmG202OWLadHb\nLBpfXlmxxG/uxQ9RmpEUVitvrti832gcBZ8cdVI+5TfmYRQkw+McMGNHEmX0cQ3k\nbs7K3ZZTEu/cKESm5+8dX1HIGMp8Kdd6HsVYhelknhx/dpGZL0MfeAAQ0jw217+x\nPVXa0hr2OtYuAG9P+A3VMnfhqdTwpzo1jmCkPL5HZQKBgQD6D9mk+hR01pe20V1N\ncC1d+//a4qXJXMCa709iobuqT5CKy5RVzZiJmYbu9xZr9pYD1BQKlMd/BZTc0Z9P\nFbGf+TsTPQyHPiU48sTcDFb6xAb08l51G+whceLRRrQNQcBWjLurDXdLBkPTMJ2+\ncCFmT6sfGFNF/DDTmh+S/aHSkwKBgQDNCZm5BDDaso6iEyaovtggTCgFjWBUrrDO\ngwyWq279SAGIacFzI+KgABD+usvdAmorgEUo0u0EhfT+ECPXtOrXW6N0FhhTS2Y+\nX35vTCo6EhXAh99ascflWxXQ8ig+x7hmE2LQF3ND9TBwA+07mx7lorY6M6wtgLua\nU7d1H12LmwKBgQD0ajOoXktKXEmUBpW00BV3zI0rK+cxpzgW+BvW4xBkCjrUfuGw\n8DDNJcPOpLJEupOskEk6gmtwC0uSfk3BZgnkvB1y03QAaMzHGfsyvdjyaFIIbzHG\nM5Gcqw0w0nPAlWji79GrApF8QlZfASDd+AmdT/eJgCQ8vqAW44lDCid2gwKBgQCU\n8sl6b4HyDc6yDMmDwogNBmX4ipiVTAZjLy5g8g8B7mI2r+T5ePM0Gng+JILefdeU\n3GzhWEEYjRvJyP3QwLvtUMPwG/D16YtP+l1GCwWOA/9LSylFoGq/wiiaDqCP4tSh\nSqn402BH2QGkDiYzq9+JIGfS5iDJOYCPfwuCCRQSywKBgHDbWQNuiKwzgCrXObxG\n7l22JgYz+5L5XdWQgRGMkO++PC2R6wuSd7J4Mhkcp9AIgaT73JM7gTyMEzlUHvVF\nqbCO7NKSlopkB1CmLMTUZxoVy9m8nzATAA9oFamvR8E93al+KZOYw1v0Pytal3KA\nfv9ng9treT7DH1juUM8H4hU7\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-u5qru@globalshut-a0441.iam.gserviceaccount.com",
        "client_id": "114964398957363734145",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u5qru%40globalshut-a0441.iam.gserviceaccount.com"
      }
      )
  });
  paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AT4zpdSlOPlT7ClZUVkO657qU95FGVGjJYyxpcKZCHRPBcyZVgDF9Cwd0yZvu5UOZ22jVWAdqza7WAg6',
    'client_secret': 'EEGnFOszZgtUhLrpktkAwGN1KMk_eVZ1mpHBS6N98yQMbLa5NMv6DHINBEpzATlo_5bQGg6k1a_QUaeL'
  });
  
app.get("/donate/:c", (req, res) => {
    const c = req.params["c"];
    const credits = Number(c);
    xob();
    async function xob() {
            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>GlobalShut | Manage your payments, computers and much more on GlobalShut App</title>
                <style>
                    body {
                        font-size: 18.5px;
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    }
                    .MAG {
                     margin-right: 56px;
                   }
                   button {
                      padding: 15px;
                      margin-right: 0;
                      margin-left: 8px;
                      font-size: 20px;
                      background-color: #ffffff;
                      border-radius: 10px;
                      margin: 0;
                      width: 12.5em;
                      font-family: 'Trebuchet MS', sans-serif;
                      border: none;
                      border-color: #ff0077;
                      border-style: solid;
                      -webkit-font-smoothing: antialiased;
                      -moz-osx-font-smoothing: grayscale;
                      color: #ff0077;
                      /*transition: 0.45s;*/
                    }
                  input {
                      font-size: 20px;
                      margin-left: 8px;
                      width: 100%;
                      padding: 15px;
                      font-size: 20px;
                      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                      outline: none;
                      border-radius: 10px;
                      border: none;
                      border: #ff0077 solid 2px;
                    }
                </style>
            </head>
            <body>
                <div>
                    <div style="display:flex; justify-content:left;">
                     <h1 style="color: #ff0077;">GlobalShut Account</h1>
                    </div>
                    <p style="font-weight: 500;">Sorry, But the user doesn't exist! Please try again</p>
                    <a href="/"><button>Try again</button></a>
                </div>
            </body>
            </html>
            `);
                const create_payment_json = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "https://app.globalshut.namishkumar.in/success",
                        "cancel_url": "http://app.globalshut.namishkumar.in/cancel",
                    },
                    "transactions": [{
                        "item_list": {
                            "items": [{
                                "name": "Donation of money to GlobalShut Open-Source",
                                "sku": "001",
                                "price": `${c}`,
                                "currency": "USD",
                                "quantity": 1
                            }]
                        },
                        "amount": {
                            "currency": "USD",
                            "total": `${c}`
                        },
                        "description": `You are going to process a transaction of $${c} for donation to GlobalShut Open-Source.`
                    }]
                };
            }
                app.get('/success', (req, res) => {
                    const payerId = req.query.PayerID;
                    const paymentId = req.query.paymentId;
                    const execute_payment_json = {
                      "payer_id": payerId,
                      "transactions": [{
                          "amount": {
                              "currency": "USD",
                              "total": `${c}`
                          }
                      }]
                    };
                  
                    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                      if (error) {
                          console.log(error.response);
                          throw error;
                      }
                  });
                    paypal.payment.create(create_payment_json, function (error, payment) {
                        if (error) {
                            throw error;
                        } else {
                            for(let i = 0;i < payment.links.length;i++){
                              if(payment.links[i].rel === 'approval_url'){
                                res.redirect(payment.links[i].href);
                              }
                            }
                        }
                      });
            
             });
            });
  app.get('/cancel', (req, res) => res.send('Cancelled'));
app.listen(process.env.PORT || 7391, "0.0.0.0");
