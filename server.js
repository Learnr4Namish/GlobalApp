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
  
app.get("/", function(req, res) {
   res.sendFile(__dirname + "/index.html");
});
app.post("/dashboard", (req, res) => {
    const body = req.body;
    const emailAddress = body.eAddress;
    const password = body.password;
    const db = getFirestore();
    getTheUser();
    async function getTheUser() {
        const userRef = db.collection("users").doc(emailAddress);
    const doc = await userRef.get();
    if(!doc.exists) {
       res.sendFile(__dirname + "/no-user.html");
    }else{
       const password3 = doc.data().password;
       const credits = String(doc.data().accountCredit);
       const filePayed = String(doc.data().filePayed);
       let mainMsg;
       let divBg;
       let btnText;
       let btnUrl;
       let creditsText;
       let creditsBg;
       let creditsUrl;
       let btnTxt;
       let clr;
       let shutText;
       if(filePayed === "no") {
         mainMsg = "Warning! You don't have access to file access feature in your GlobalShut account! Subscribe to get access.";
         divBg = "#ff0000";
         btnText = "Subscribe now";
         btnUrl = `/subscription/file?emailAddress=${emailAddress}&password=${password}`;
       }else{
         mainMsg = "You have access to the file access feature in your GlobalShut if the file size is less than 1 GB and after this limit, you will be charged $1/GB from your credit balance."
         divBg = "green";
         btnText = "Learn more";
         btnUrl = "https://site.globalshut.namishkumar.in/";
        }
        if(Number(credits) < 10) {
            if(Number(credits) < 3) {
                creditsText = "Warning! The credits in your account are extremely low! Please make sure that you have atleast $4 credits to ensure quick service delivery."
                creditsBg = "red";
                creditsUrl = `/add/credits?emailAddress=${emailAddress}&password=${password}`;
                clr = "white";
            }else{
                creditsText = "Nice! You have enough credits to subscribe to various GlobalShut services. By the way, you can add more credits for future use."
                creditsBg = "yellow";
                clr = "black";
                creditsUrl = `/add/credits?emailAddress=${emailAddress}&password=${password}`;
            }
        }else{
            creditsText = "Excellent! You have enough credits to get better services from GlobalShut. By the way, you can add more credits for future use."
            creditsBg = "green";
            creditsUrl = `/add/credits?emailAddress=${emailAddress}&password=${password}`;
            clr = "white";
        }
       if(password3 === password) {
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
                   <h1 style="color: #ff0077;">GlobalShut Console</h1>
                   <p style="font-weight: 800; font-size:25px; transform:translateY(10px); margin-left:8px;">$${credits}</p>
                </div>
                   <p style="font-weight: 500; font-size:20px;">Welcome to GlobalShut ${emailAddress}!</p>
                   <h1>Credits management</h1>
                   <div style="padding:25px; border-radius:10px; background-color:${creditsBg}; color:${clr}; text-align:center;">
                    <p style="font-weight: 500; font-size:20px">${creditsText}</p>
                    <a href="${creditsUrl}"><button>Add credits</button></a>
                   </div>
                   <h1>Computer edge</h1>
                   <div style="padding:25px; border-radius:10px; background-color:${divBg}; color:white; text-align:center;">
                   <p style="font-weight: 500; font-size:24px; text-align:center;"><u>Files access feature</u></p> 
                    <p style="font-weight: 500; font-size:20px">${mainMsg}</p>
                    <a href="${btnUrl}"><button>${btnText}</button></a>
                   </div>  
                   <h1>Shutdown package</h1>
                   <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
                   <p style="font-weight: 500; font-size:24px; text-align:center;"><u>Shutdown package</u></p> 
                   <p style="font-weight: 500; font-size:20px">You get 10 shutdowns for $1 (RS. 80).</p>
                   <a href="/pay/shutdown"><button>See more packs</button></a>
                   </div>
                   <br>
                   <h1>Are you confused?</h1>
                   <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
                   <p style="font-weight: 500; font-size:24px; text-align:center;">Are you confused? See our combo packs to get everything in just one pack including attractive offers!</p> 
                   <a href="/globalpay/see/packs?emailAddress=${emailAddress}&password=${password}"><button>Show me</button></a>
                   </div>
               </div>
           </body>
           </html>
           `);
       }else{
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
                 <h1 style="color: #ff0077;">GlobalShut Password</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But the password you entered is Invalid! Please try with the correct password!</p>
                <a href="/"><button>Try again</button></a>
            </div>
        </body>
        </html>
        `);
       }
    }
    }
})
app.get("/add/credits",  (req, res) => {
   const query = req.query;
   const emailAddress = query.emailAddress;
   const password = query.password;
   const db = getFirestore();
   getTheData();
   async function getTheData() {
     const userRef = db.collection("users").doc(emailAddress);
     const doc = await userRef.get();
     if(!doc.exists) {
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
                 <h1 style="color: #ff0077;">GlobalShut User</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But the user doesn't exist!</p>
                <a href="/"><button>Go to home</button></a>
            </div>
        </body>
        </html>
        `);
     }else{
        const passwordM = doc.data().password;
        if(passwordM === password) {
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
                     <h1 style="color: #ff0077;">GlobalShut Credits</h1>
                     <form method="post" action="/dashboard">
                        <input name="eAddress" value="${emailAddress}" hidden>
                        <input name="password" value="${password}" hidden>
                        <button type="submit" style="font-size:22px; width:min-content; transform:translateY(5px); margin-left:5px;"><</button>
                     </form>
                    </div>
                    <p style="font-weight: 500;">Please add how much credits you want to add. There is no maximum amount of money that you can add.</p>
                    <form method="post" action="/res/credit">
                      <div class="MAG">
                      <input name="eAddress" value="${emailAddress}" hidden>
                      <input name="password" value="${password}" hidden>
                      <input name="credits" placeholder="Enter a number" required>
                      <br>
                      <br>
                      <button type="submit">Next</button>
                      </div>
                    </form>
                    </form>
                    </div>
            </body>
            </html>
            `);
        }else{
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
                 <h1 style="color: #ff0077;">GlobalShut Password</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But the password you entered is Invalid! Please try with the correct password!</p>
                <a href="/"><button>Try again</button></a>
            </div>
        </body>
        </html>
        `);
        }
     }
   }
});
app.post("/res/credit", (req, res) => {
    const body = req.body;
    const eAddress = body.eAddress;
    const password = body.password;
    const c = body.credits;
    const credits = Number(c);
    const db = getFirestore();
    const uRef = db.collection("users").doc(eAddress);
    xob();
    async function xob() {
        const doc = await uRef.get();
        if(!doc.exists) {
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
        }else{
             const ps = doc.data().password;
             if(password === ps) {
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
                                "name": "Addition of credits",
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
                        "description": `You are going to process a transaction of $${c} to buy credits for your GlobalShut account`
                    }]
                };
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
                      } else {
                          console.log(JSON.stringify(payment));
                          const accountCredit = doc.data().accountCredit;
                          const newC = Number((Number(accountCredit) + Number(c)));
                          const filePayed = doc.data().filePayed;
                          const shutdowns = Number(doc.data.shutdowns);
                          const sessionTime = Number(doc.data().sessionTime);
                          const dat = {
                            accountCredit:newC,
                            filePayed:filePayed,
                            shutdowns:shutdowns,
                            sessionTime:sessionTime,
                            emailAddress:eAddress,
                            password:password
                          }
                          const refn = db.collection("users").doc(eAddress).set(dat);
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
                                   <h1 style="color: #ff0077;">GlobalShut Payment</h1>
                                  </div>
                                  <p style="font-weight: 500;">Your payment was successful! Your credit balance has been increased</p>
                                  <a href="/"><button>Login again</button></a>
                              </div>
                          </body>
                          </html>
                          `);
                      }
                  });
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
             }else{
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
                         <h1 style="color: #ff0077;">GlobalShut Password</h1>
                        </div>
                        <p style="font-weight: 500;">Sorry, But the password you entered is Invalid! Please try with the correct password!</p>
                        <a href="/"><button>Try again</button></a>
                    </div>
                </body>
                </html>
                `);
             } 
        }
    }
})
app.get("/subscription/file", (req, res) => {
    const query = req.query;
    const emailAddress = req.query.emailAddress;
    const password = query.password;
    const db = getFirestore();
    everything();
    async function everything() {
        const usersRef = db.collection("users").doc(emailAddress);
        const doc = await usersRef.get();
    if(!doc.exists) {
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
                 <h1 style="color: #ff0077;">GlobalAuth error</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But the account doesn't exist! Please try again.</p>
                <a href="/"><button>Try again</button></a>
            </div>
        </body>
        </html>
        `);
    }else{
        const passwordo = doc.data().password;
        
        if(passwordo === password) {
            const accountCredit = String(doc.data().accountCredit);
        if(Number(accountCredit) < 4) {
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
                     <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                    </div>
                    <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the your account doesn't have sufficient credits!</p>
                    <a href="/"><button>Go home</button></a>
                </div>
            </body>
            </html>
            `);
        }else{
        let idVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
            const newCredits = Number(Number(accountCredit) - 4);
            let passSVars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let passCVars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const generateCompPassword = function generateCompPassword() {
                let x1 = Math.floor((Math.random() * 9) + 1);
                let x2= Math.floor((Math.random() * 9) + 1);
                let x3 = Math.floor((Math.random() * 9) + 1);
                let x4 = Math.floor((Math.random() * 9) + 1);
                let x5 = Math.floor((Math.random() * 9) + 1);
                let x6 = Math.floor((Math.random() * 9) + 1);
                let x7 = Math.floor((Math.random() * 9) + 1);
                let x8 = Math.floor((Math.random() * 9) + 1);
                let x9 = Math.floor((Math.random() * 9) + 1);
                let x10 = Math.floor((Math.random() * 9) + 1);
                let y1 = Math.floor((Math.random() * 25) + 1);
                let y2= Math.floor((Math.random() * 25) + 1);
                let y3 = Math.floor((Math.random() * 25) + 1);
                let y4 = Math.floor((Math.random() * 25) + 1);
                let y5 = Math.floor((Math.random() * 25) + 1);
                let y6 = Math.floor((Math.random() * 25) + 1);
                let y7 = Math.floor((Math.random() * 25) + 1);
                let y8 = Math.floor((Math.random() * 25) + 1);
                let y9 = Math.floor((Math.random() * 25) + 1);
                let y10 = Math.floor((Math.random() * 25) + 1);
                return idVars[x1] + passSVars[y1] + idVars[x2] + passCVars[y2] + idVars[x3] + passSVars[y3] + idVars[x4] + passCVars[y4] + idVars[x5] + passSVars[y5] + idVars[x6] + passCVars[y6] + idVars[x7] + passSVars[y7] + idVars[x8] + passCVars[y8] + idVars[x9] + passSVars[y9] + idVars[x10] + passCVars[x10];
            }
            const transactionID = generateCompPassword();
            const dataForTransaction = {
                by:emailAddress,
                id:transactionID,
                hours:`${new Date().getHours}`,
                minutes:`${new Date().getMinutes}`,
                seconds:`${new Date().getSeconds}`,
                jsDate:`${new Date().toString()}`,
                moneyBeforeThePay:`${Number(accountCredit)}`,
                moneyAfterThePay:`${Number(newCredits)}`,
                moneyTransferred:1
            }
            const dataForAccountTransaction = {
                by:emailAddress,
                id:transactionID,
                hours:`${new Date().getHours}`,
                minutes:`${new Date().getMinutes}`,
                seconds:`${new Date().getSeconds}`,
                jsDate:`${new Date().toString()}`,
                moneyBeforeThePay:`${Number(accountCredit)}`,
                moneyAfterThePay:`${Number(newCredits)}`,
                moneyTransferred:1
            }
            const filePayed = doc.data().filePayed;
            if(filePayed === "yes") {
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
                 <h1 style="color: #ff0077;">GlobalShut App</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But you have already subscribed to the files access feature! Such repeated transactions are not allowed!</p>
                <a href="/"><button>Go to home</button></a>
            </div>
        </body>
        </html>
        `);
            }else{      
            const prevShutdowns = String(doc.data().shutdowns);
            //const newShutdowns  = Number((Number(prevShutdowns) + 10));
            const sessionTime = String(doc.data().sessionTime);
            const dataForAccount = {
                filePayed:"yes",
                emailAddress:emailAddress,
                password:password,
                shutdowns: prevShutdowns,
                accountCredit: newCredits,
                sessionTime:Number(sessionTime),
            }
            const ref1 = db.collection("globalpay").doc(transactionID).set(dataForTransaction);
            const ref2 = db.collection("users").doc(emailAddress).collection("transactions").doc(transactionID).set(dataForAccountTransaction);
            const ref3 = db.collection("users").doc(emailAddress).set(dataForAccount);
            const transactions = {
                [transactionID]: transactionID
            }
            const ref4 = db.collection("users").doc(emailAddress).collection("all_transactions").doc("all_transactions").set(transactions, { merge: true });
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
                     <h1 style="color: #ff0077;">GlobalPay Transaction</h1>
                    </div>
                    <h1>$4</h1>
                    <p style="font-weight: 500;">Payment successful!</p>
                    <p style="font-weight: 500;">Transaction ID: ${transactionID}</p>
                    <p style="font-weight: 800;">Note: This transaction is not from your bank account! It's from your GlobalShut Account wallet!</p>
    
                    <a href="/"><button>Login again</button></a>
                </div>
            </body>
            </html>
            `);
        }
        }
        }else{
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
                 <h1 style="color: #ff0077;">GlobalShut Password</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But the password you entered is Invalid! Please try with the correct password!</p>
                <a href="/"><button>Try again</button></a>
            </div>
        </body>
        </html>
        `);
        }
    }
    }
})
app.get("/pay/shutdown", (req, res) => {
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
             <h1 style="color: #ff0077;">GlobalShut App</h1>
            </div>
            <p style="font-weight: 500;">Please first verify that It's you.</p>
            <form method="post" action="/pay/shutdown">
            <div class="MAG">
                <input name="eAddress" placeholder="Email Address" type="email" required>
                <br>
                <br>
                <input name="password" placeholder="Password (10 digits)" type="password" required>
                <br>
                <br>
                <button type="submit">Next</button>
            </div>
        </form>
        <p style="font-weight: 500;">Unable to login to your account? <a href="https://support.globalshut.namishkumar.in/unable-to-login/" style="color: #ff0077;">Click here.</a></p>
        </div>
    </body>
    </html>
    `);
});
app.post("/pay/shutdown", (req, res) => {
    const body = req.body;
    const emailAddress = body.eAddress;
    const password = body.password;
    const db = getFirestore();
    getTheUser();
    async function getTheUser() {
        const userRef = db.collection("users").doc(emailAddress);
    const doc = await userRef.get();
    if(!doc.exists) {
       res.sendFile(__dirname + "/no-user.html");
    }else{
       const password3 = doc.data().password;
       const credits = String(doc.data().accountCredit);
       const filePayed = String(doc.data().filePayed);
       const shutdowns = String(doc.data().shutdowns);
       if(password3 === password) {
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
                   <h1 style="color: #ff0077;">GlobalPay - By GlobalShut</h1>
                   <p style="font-weight: 800; font-size:25px; transform:translateY(10px); margin-left:8px;">$${credits}</p>
                </div>
                <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
                <p style="font-weight: 500; font-size:20px">You get 10 shutdowns and restarts combined for $1. Currently, you have ${shutdowns} shutdowns and restarts left.</p>
                <br>
               </div>
               <br>
               <h1>Packs</h1>
               <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
               <h1>$1</h1>
               <p style="font-weight: 500; font-size:20px">You get 10 shutdowns and restarts combined for $1.</p>
               <a href="/globalpay/pay/shutdown/1/?emailAddress=${emailAddress}&password=${password}"><button >Select this plan</button></a>
              </div>
              <br>
              <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
               <h1>$4 (75% discount)</h1>
               <p style="font-weight: 500; font-size:20px">You get 50 shutdowns and restarts combined for $4 at a discount</p>
               <a href="/globalpay/pay/shutdown/4/?emailAddress=${emailAddress}&password=${password}"><button >Select this plan</button></a>
              </div>
              <br>
              <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
               <h1>$10</h1>
               <p style="font-weight: 500; font-size:20px">You get 200 shutdowns and restarts combined for $10 at a horrible discount of $10!</p>
               <a href="/globalpay/pay/shutdown/10/?emailAddress=${emailAddress}&password=${password}"><button>Select this plan</button></a>
              </div>
              <br>
              <div style="padding:25px; border-radius:10px; background-color:#ff0077; color:white; text-align:center;">
               <h1>$100</h1>
               <p style="font-weight: 500; font-size:20px">Infinity and free forever shutdowns and restarts! You no longer need to pay for shutdowns and restarts.</p>
               <a href="/globalpay/pay/shutdown/100/?emailAddress=${emailAddress}&password=${password}"><button>Select this plan</button></a>
              </div>
           </body>
           </html>
           `);

       }else{
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
                 <h1 style="color: #ff0077;">GlobalShut Password</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But the password you entered is Invalid! Please try with the correct password!</p>
                <a href="/"><button>Try again</button></a>
            </div>
        </body>
        </html>
        `);
       }
    }
    }
})
app.get("/globalpay/pay/shutdown/1/", (req, res) => {
  const emailAddress = req.query.emailAddress;
  const password = req.query.password;
  //console.log(req.query);
  const db = getFirestore();
  const userRef = db.collection("users").doc(emailAddress);
  getTheData();
  async function getTheData() {
     const doc = await userRef.get();
     if(!doc.exists) {
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>GlobalPay</title>
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
                 <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the account doesn't exist!</p>
                <a href="/"><button>Go home</button></a>
            </div>
        </body>
        </html>
        `);
     }else{
        const accountCredit = String(doc.data().accountCredit);
        if(Number(accountCredit) < 1) {
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
                 <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                </div>
                <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the your account doesn't have sufficient credits!</p>
                <a href="/"><button>Go home</button></a>
            </div>
        </body>
        </html>
        `);
        }else{
            let idVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
            const newCredits = Number(Number(accountCredit) - 1);
            let passSVars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let passCVars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
            const generateCompPassword = function generateCompPassword() {
                let x1 = Math.floor((Math.random() * 9) + 1);
                let x2= Math.floor((Math.random() * 9) + 1);
                let x3 = Math.floor((Math.random() * 9) + 1);
                let x4 = Math.floor((Math.random() * 9) + 1);
                let x5 = Math.floor((Math.random() * 9) + 1);
                let x6 = Math.floor((Math.random() * 9) + 1);
                let x7 = Math.floor((Math.random() * 9) + 1);
                let x8 = Math.floor((Math.random() * 9) + 1);
                let x9 = Math.floor((Math.random() * 9) + 1);
                let x10 = Math.floor((Math.random() * 9) + 1);
                let y1 = Math.floor((Math.random() * 25) + 1);
                let y2= Math.floor((Math.random() * 25) + 1);
                let y3 = Math.floor((Math.random() * 25) + 1);
                let y4 = Math.floor((Math.random() * 25) + 1);
                let y5 = Math.floor((Math.random() * 25) + 1);
                let y6 = Math.floor((Math.random() * 25) + 1);
                let y7 = Math.floor((Math.random() * 25) + 1);
                let y8 = Math.floor((Math.random() * 25) + 1);
                let y9 = Math.floor((Math.random() * 25) + 1);
                let y10 = Math.floor((Math.random() * 25) + 1);
                return idVars[x1] + passSVars[y1] + idVars[x2] + passCVars[y2] + idVars[x3] + passSVars[y3] + idVars[x4] + passCVars[y4] + idVars[x5] + passSVars[y5] + idVars[x6] + passCVars[y6] + idVars[x7] + passSVars[y7] + idVars[x8] + passCVars[y8] + idVars[x9] + passSVars[y9] + idVars[x10] + passCVars[x10];
            }
            const transactionID = generateCompPassword();
            const dataForTransaction = {
                by:emailAddress,
                id:transactionID,
                hours:`${new Date().getHours}`,
                minutes:`${new Date().getMinutes}`,
                seconds:`${new Date().getSeconds}`,
                jsDate:`${new Date().toString()}`,
                moneyBeforeThePay:`${Number(accountCredit)}`,
                moneyAfterThePay:`${Number(newCredits)}`,
                moneyTransferred:1
            }
            const dataForAccountTransaction = {
                by:emailAddress,
                id:transactionID,
                hours:`${new Date().getHours}`,
                minutes:`${new Date().getMinutes}`,
                seconds:`${new Date().getSeconds}`,
                jsDate:`${new Date().toString()}`,
                moneyBeforeThePay:`${Number(accountCredit)}`,
                moneyAfterThePay:`${Number(newCredits)}`,
                moneyTransferred:1
            }
            const filePayed = doc.data().filePayed;
            const prevShutdowns = String(doc.data().shutdowns);
            const newShutdowns  = Number((Number(prevShutdowns) + 10));
            const sessionTime = String(doc.data().sessionTime);
            const dataForAccount = {
                filePayed:filePayed,
                emailAddress:emailAddress,
                password:password,
                shutdowns: newShutdowns,
                accountCredit: newCredits,
                sessionTime:Number(sessionTime),
            }
            const ref1 = db.collection("globalpay").doc(transactionID).set(dataForTransaction);
            const ref2 = db.collection("users").doc(emailAddress).collection("transactions").doc(transactionID).set(dataForAccountTransaction);
            const ref3 = db.collection("users").doc(emailAddress).set(dataForAccount);
            const transactions = {
                [transactionID]: transactionID
            }
            const ref4 = db.collection("users").doc(emailAddress).collection("all_transactions").doc("all_transactions").set(transactions, { merge: true });
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
                 <h1 style="color: #ff0077;">GlobalPay Transaction</h1>
                </div>
                <h1>$1</h1>
                <p style="font-weight: 500;">Payment successful!</p>
                <p style="font-weight: 500;">Transaction ID: ${transactionID}</p>
                <p style="font-weight: 800;">Note: This transaction is not from your bank account! It's from your GlobalShut Account wallet!</p>

                <a href="/"><button>Login again</button></a>
            </div>
        </body>
        </html>
        `);
        }
     }
  }
});
app.get("/globalpay/pay/shutdown/4/", (req, res) => {
    const emailAddress = req.query.emailAddress;
    const password = req.query.password;
    //console.log(req.query);
    const db = getFirestore();
    const userRef = db.collection("users").doc(emailAddress);
    getTheData();
    async function getTheData() {
       const doc = await userRef.get();
       if(!doc.exists) {
          res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>GlobalPay</title>
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
                   <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                  </div>
                  <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the account doesn't exist!</p>
                  <a href="/"><button>Go home</button></a>
              </div>
          </body>
          </html>
          `);
       }else{
          const accountCredit = String(doc.data().accountCredit);
          if(Number(accountCredit) < 4) {
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
                   <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                  </div>
                  <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the your account doesn't have sufficient credits!</p>
                  <a href="/"><button>Go home</button></a>
              </div>
          </body>
          </html>
          `);
          }else{
              let idVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
              const newCredits = Number(Number(accountCredit) - 4);
              let passSVars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let passCVars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
              const generateCompPassword = function generateCompPassword() {
                  let x1 = Math.floor((Math.random() * 9) + 1);
                  let x2= Math.floor((Math.random() * 9) + 1);
                  let x3 = Math.floor((Math.random() * 9) + 1);
                  let x4 = Math.floor((Math.random() * 9) + 1);
                  let x5 = Math.floor((Math.random() * 9) + 1);
                  let x6 = Math.floor((Math.random() * 9) + 1);
                  let x7 = Math.floor((Math.random() * 9) + 1);
                  let x8 = Math.floor((Math.random() * 9) + 1);
                  let x9 = Math.floor((Math.random() * 9) + 1);
                  let x10 = Math.floor((Math.random() * 9) + 1);
                  let y1 = Math.floor((Math.random() * 25) + 1);
                  let y2= Math.floor((Math.random() * 25) + 1);
                  let y3 = Math.floor((Math.random() * 25) + 1);
                  let y4 = Math.floor((Math.random() * 25) + 1);
                  let y5 = Math.floor((Math.random() * 25) + 1);
                  let y6 = Math.floor((Math.random() * 25) + 1);
                  let y7 = Math.floor((Math.random() * 25) + 1);
                  let y8 = Math.floor((Math.random() * 25) + 1);
                  let y9 = Math.floor((Math.random() * 25) + 1);
                  let y10 = Math.floor((Math.random() * 25) + 1);
                  return idVars[x1] + passSVars[y1] + idVars[x2] + passCVars[y2] + idVars[x3] + passSVars[y3] + idVars[x4] + passCVars[y4] + idVars[x5] + passSVars[y5] + idVars[x6] + passCVars[y6] + idVars[x7] + passSVars[y7] + idVars[x8] + passCVars[y8] + idVars[x9] + passSVars[y9] + idVars[x10] + passCVars[x10];
              }
              const transactionID = generateCompPassword();
              const dataForTransaction = {
                  by:emailAddress,
                  id:transactionID,
                  hours:`${new Date().getHours}`,
                  minutes:`${new Date().getMinutes}`,
                  seconds:`${new Date().getSeconds}`,
                  jsDate:`${new Date().toString()}`,
                  moneyBeforeThePay:`${Number(accountCredit)}`,
                  moneyAfterThePay:`${Number(newCredits)}`,
                  moneyTransferred:1
              }
              const dataForAccountTransaction = {
                  by:emailAddress,
                  id:transactionID,
                  hours:`${new Date().getHours}`,
                  minutes:`${new Date().getMinutes}`,
                  seconds:`${new Date().getSeconds}`,
                  jsDate:`${new Date().toString()}`,
                  moneyBeforeThePay:`${Number(accountCredit)}`,
                  moneyAfterThePay:`${Number(newCredits)}`,
                  moneyTransferred:4
              }
              const filePayed = doc.data().filePayed;
              const prevShutdowns = String(doc.data().shutdowns);
              const newShutdowns  = Number((Number(prevShutdowns) + 50));
              const sessionTime = String(doc.data().sessionTime);
              const dataForAccount = {
                  filePayed:filePayed,
                  emailAddress:emailAddress,
                  password:password,
                  shutdowns: newShutdowns,
                  accountCredit: newCredits,
                  sessionTime:Number(sessionTime)
              }
              const ref1 = db.collection("globalpay").doc(transactionID).set(dataForTransaction);
              const ref2 = db.collection("users").doc(emailAddress).collection("transactions").doc(transactionID).set(dataForAccountTransaction);
              const ref3 = db.collection("users").doc(emailAddress).set(dataForAccount);
              const transactions = {
                  [transactionID]: transactionID
              }
              const ref4 = db.collection("users").doc(emailAddress).collection("all_transactions").doc("all_transactions").set(transactions, { merge: true });
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
                   <h1 style="color: #ff0077;">GlobalPay Transaction</h1>
                  </div>
                  <h1>$4</h1>
                  <p style="font-weight: 500;">Payment successful!</p>
                  <p style="font-weight: 500;">Transaction ID: ${transactionID}</p>
                  <p style="font-weight: 800;">Note: This transaction is not from your bank account! It's from your GlobalShut Account wallet!</p>
  
                  <a href="/"><button>Login again</button></a>
              </div>
          </body>
          </html>
          `);
          }
       }
    }
  });
  app.get("/globalpay/pay/shutdown/10/", (req, res) => {
    const emailAddress = req.query.emailAddress;
    const password = req.query.password;
    //console.log(req.query);
    const db = getFirestore();
    const userRef = db.collection("users").doc(emailAddress);
    getTheData();
    async function getTheData() {
       const doc = await userRef.get();
       if(!doc.exists) {
          res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>GlobalPay</title>
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
                   <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                  </div>
                  <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the account doesn't exist!</p>
                  <a href="/"><button>Go home</button></a>
              </div>
          </body>
          </html>
          `);
       }else{
          const accountCredit = String(doc.data().accountCredit);
          if(Number(accountCredit) < 10) {
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
                   <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                  </div>
                  <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the your account doesn't have sufficient credits!</p>
                  <a href="/"><button>Go home</button></a>
              </div>
          </body>
          </html>
          `);
          }else{
              let idVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
              const newCredits = Number(Number(accountCredit) - 10);
              let passSVars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let passCVars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
              const generateCompPassword = function generateCompPassword() {
                  let x1 = Math.floor((Math.random() * 9) + 1);
                  let x2= Math.floor((Math.random() * 9) + 1);
                  let x3 = Math.floor((Math.random() * 9) + 1);
                  let x4 = Math.floor((Math.random() * 9) + 1);
                  let x5 = Math.floor((Math.random() * 9) + 1);
                  let x6 = Math.floor((Math.random() * 9) + 1);
                  let x7 = Math.floor((Math.random() * 9) + 1);
                  let x8 = Math.floor((Math.random() * 9) + 1);
                  let x9 = Math.floor((Math.random() * 9) + 1);
                  let x10 = Math.floor((Math.random() * 9) + 1);
                  let y1 = Math.floor((Math.random() * 25) + 1);
                  let y2= Math.floor((Math.random() * 25) + 1);
                  let y3 = Math.floor((Math.random() * 25) + 1);
                  let y4 = Math.floor((Math.random() * 25) + 1);
                  let y5 = Math.floor((Math.random() * 25) + 1);
                  let y6 = Math.floor((Math.random() * 25) + 1);
                  let y7 = Math.floor((Math.random() * 25) + 1);
                  let y8 = Math.floor((Math.random() * 25) + 1);
                  let y9 = Math.floor((Math.random() * 25) + 1);
                  let y10 = Math.floor((Math.random() * 25) + 1);
                  return idVars[x1] + passSVars[y1] + idVars[x2] + passCVars[y2] + idVars[x3] + passSVars[y3] + idVars[x4] + passCVars[y4] + idVars[x5] + passSVars[y5] + idVars[x6] + passCVars[y6] + idVars[x7] + passSVars[y7] + idVars[x8] + passCVars[y8] + idVars[x9] + passSVars[y9] + idVars[x10] + passCVars[x10];
              }
              const transactionID = generateCompPassword();
              const dataForTransaction = {
                  by:emailAddress,
                  id:transactionID,
                  hours:`${new Date().getHours}`,
                  minutes:`${new Date().getMinutes}`,
                  seconds:`${new Date().getSeconds}`,
                  jsDate:`${new Date().toString()}`,
                  moneyBeforeThePay:`${Number(accountCredit)}`,
                  moneyAfterThePay:`${Number(newCredits)}`,
                  moneyTransferred:10
              }
              const dataForAccountTransaction = {
                  by:emailAddress,
                  id:transactionID,
                  hours:`${new Date().getHours}`,
                  minutes:`${new Date().getMinutes}`,
                  seconds:`${new Date().getSeconds}`,
                  jsDate:`${new Date().toString()}`,
                  moneyBeforeThePay:`${Number(accountCredit)}`,
                  moneyAfterThePay:`${Number(newCredits)}`,
                  moneyTransferred:10
              }
              const filePayed = doc.data().filePayed;
              const prevShutdowns = String(doc.data().shutdowns);
              const sessionTime = String(doc.data().sessionTime);
              const newShutdowns  = Number(Number(prevShutdowns) + 200);
              const dataForAccount = {
                  filePayed:filePayed,
                  emailAddress:emailAddress,
                  password:password,
                  shutdowns: newShutdowns,
                  accountCredit: newCredits,
                  sessionTime:Number(sessionTime),
              }
              const ref1 = db.collection("globalpay").doc(transactionID).set(dataForTransaction);
              const ref2 = db.collection("users").doc(emailAddress).collection("transactions").doc(transactionID).set(dataForAccountTransaction);
              const ref3 = db.collection("users").doc(emailAddress).set(dataForAccount);
              const transactions = {
                  [transactionID]: transactionID
              }
              const ref4 = db.collection("users").doc(emailAddress).collection("all_transactions").doc("all_transactions").set(transactions, { merge: true });
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
                   <h1 style="color: #ff0077;">GlobalPay Transaction</h1>
                  </div>
                  <h1>$10</h1>
                  <p style="font-weight: 500;">Payment successful!</p>
                  <p style="font-weight: 500;">Transaction ID: ${transactionID}</p>
                  <p style="font-weight: 800;">Note: This transaction is not from your bank account! It's from your GlobalShut Account wallet!</p>
  
                  <a href="/"><button>Login again</button></a>
              </div>
          </body>
          </html>
          `);
          }
       }
    }
  });
  app.get("/globalpay/pay/shutdown/100/", (req, res) => {
    const emailAddress = req.query.emailAddress;
    const password = req.query.password;
    //console.log(req.query);
    const db = getFirestore();
    const userRef = db.collection("users").doc(emailAddress);
    getTheData();
    async function getTheData() {
       const doc = await userRef.get();
       if(!doc.exists) {
          res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>GlobalPay</title>
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
                   <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                  </div>
                  <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the account doesn't exist!</p>
                  <a href="/"><button>Go home</button></a>
              </div>
          </body>
          </html>
          `);
       }else{
          const accountCredit = String(doc.data().accountCredit);
          if(Number(accountCredit) < 100) {
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
                   <h1 style="color: #ff0077;">GlobalPay Failure</h1>
                  </div>
                  <p style="font-weight: 500;">Sorry, But GlobalPay failed to process a transaction from your account as the your account doesn't have sufficient credits!</p>
                  <a href="/"><button>Go home</button></a>
              </div>
          </body>
          </html>
          `);
          }else{
              let idVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
              const newCredits = Number(Number(accountCredit) - 1);
              let passSVars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let passCVars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
              const generateCompPassword = function generateCompPassword() {
                  let x1 = Math.floor((Math.random() * 9) + 1);
                  let x2= Math.floor((Math.random() * 9) + 1);
                  let x3 = Math.floor((Math.random() * 9) + 1);
                  let x4 = Math.floor((Math.random() * 9) + 1);
                  let x5 = Math.floor((Math.random() * 9) + 1);
                  let x6 = Math.floor((Math.random() * 9) + 1);
                  let x7 = Math.floor((Math.random() * 9) + 1);
                  let x8 = Math.floor((Math.random() * 9) + 1);
                  let x9 = Math.floor((Math.random() * 9) + 1);
                  let x10 = Math.floor((Math.random() * 9) + 1);
                  let y1 = Math.floor((Math.random() * 25) + 1);
                  let y2= Math.floor((Math.random() * 25) + 1);
                  let y3 = Math.floor((Math.random() * 25) + 1);
                  let y4 = Math.floor((Math.random() * 25) + 1);
                  let y5 = Math.floor((Math.random() * 25) + 1);
                  let y6 = Math.floor((Math.random() * 25) + 1);
                  let y7 = Math.floor((Math.random() * 25) + 1);
                  let y8 = Math.floor((Math.random() * 25) + 1);
                  let y9 = Math.floor((Math.random() * 25) + 1);
                  let y10 = Math.floor((Math.random() * 25) + 1);
                  return idVars[x1] + passSVars[y1] + idVars[x2] + passCVars[y2] + idVars[x3] + passSVars[y3] + idVars[x4] + passCVars[y4] + idVars[x5] + passSVars[y5] + idVars[x6] + passCVars[y6] + idVars[x7] + passSVars[y7] + idVars[x8] + passCVars[y8] + idVars[x9] + passSVars[y9] + idVars[x10] + passCVars[x10];
              }
              const transactionID = generateCompPassword();
              const dataForTransaction = {
                  by:emailAddress,
                  id:transactionID,
                  hours:`${new Date().getHours}`,
                  minutes:`${new Date().getMinutes}`,
                  seconds:`${new Date().getSeconds}`,
                  jsDate:`${new Date().toString()}`,
                  moneyBeforeThePay:`${Number(accountCredit)}`,
                  moneyAfterThePay:`${Number(newCredits)}`,
                  moneyTransferred:100
              }
              const dataForAccountTransaction = {
                  by:emailAddress,
                  id:transactionID,
                  hours:`${new Date().getHours}`,
                  minutes:`${new Date().getMinutes}`,
                  seconds:`${new Date().getSeconds}`,
                  jsDate:`${new Date().toString()}`,
                  moneyBeforeThePay:`${Number(accountCredit)}`,
                  moneyAfterThePay:`${Number(newCredits)}`,
                  moneyTransferred:100
              }
              const filePayed = doc.data().filePayed;
              const prevShutdowns = String(doc.data().shutdowns);
              const newShutdowns  = Number(Infinity);
              const sessionTime = String(doc.data().sessionTime);
              const dataForAccount = {
                  filePayed:filePayed,
                  emailAddress:emailAddress,
                  password:password,
                  shutdowns: newShutdowns,
                  sessionTime:Number(sessionTime),
                  accountCredit: newCredits,
              }
              const ref1 = db.collection("globalpay").doc(transactionID).set(dataForTransaction);
              const ref2 = db.collection("users").doc(emailAddress).collection("transactions").doc(transactionID).set(dataForAccountTransaction);
              const ref3 = db.collection("users").doc(emailAddress).set(dataForAccount);
              const transactions = {
                  [transactionID]: transactionID
              }
              const ref4 = db.collection("users").doc(emailAddress).collection("all_transactions").doc("all_transactions").set(transactions, { merge: true });
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
                   <h1 style="color: #ff0077;">GlobalPay Transaction</h1>
                  </div>
                  <h1>$100</h1>
                  <p style="font-weight: 500;">Payment successful!</p>
                  <p style="font-weight: 500;">Transaction ID: ${transactionID}</p>
                  <p style="font-weight: 800;">Note: This transaction is not from your bank account! It's from your GlobalShut Account wallet!</p>
  
                  <a href="/"><button>Login again</button></a>
              </div>
          </body>
          </html>
          `);
          }
       }
    }
  });
  app.get('/cancel', (req, res) => res.send('Cancelled'));
app.listen(process.env.PORT || 7391, "0.0.0.0");