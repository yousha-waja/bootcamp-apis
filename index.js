import express from 'express';
import cors from 'cors';
import {longestWord,shortestWord,wordLength} from './bootcamp/wordGame.js'
import totalPhoneBill from './bootcamp/totalPhoneBill.js';
import enoughAirtime from './bootcamp/enoughAirtime.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// word game
app.get('/api/word_game', function(req,res){
    const sentence = req.query.sentence;
    if(!sentence){
        res.status(404).send("ERROR: no sentence was entered.");
        console.log("no sentence was entered.")
    }
    res.json({
        "longestWord" : longestWord(sentence),
        "shortestWord" : shortestWord(sentence),
        "sum" : wordLength(sentence)
    })
});

//totalPhoneBill
app.post('/api/phonebill/total', (req, res) => {
    const bill = req.body.bill;
    if(!bill){
        res.status(404).send("No bill was entered.")
    }
    res.json({
      "total" : totalPhoneBill(bill)
    });
  });

// get prices for an sms and a call
app.get('/api/phonebill/prices', (req,res)=>{
   res.json({
    call : 2.75,
    sms : 0.65
   })
});

// change the price of an sms or call
app.post('/api/phonebill/price', (req, res) => {
  const newPrice = parseFloat(req.body.newPrice).toFixed(2); // Convert to a floating-point number
  const type = (req.body.type.toLowerCase());
  
  if (type !== 'sms' && type !== 'call') {
      return res.json({
          status: 'error',
          message: "Invalid input: 'type' must be either 'sms' or 'call'",
      });
  }

  res.json({
      status: 'success',
      message: `The price of a ${type} has been changed to, R${newPrice}`,
  });
});


// Check to see if there is enough airtime available
  app.post('/api/Enough', (req,res)=>{
    const usage = req.body.usage;
    const available = req.body.available;
    res.json({
            result : enoughAirtime(usage,available)
      })    
  })


const PORT = process.env.PORT || 3011;

app.listen(PORT, ()=>{
    console.log(`API port number : ${PORT}`)
});