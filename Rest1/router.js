const express = require('express')
const router = new express.Router()
const fs = require('fs')
const { send } = require('process')
const readline = require('readline')

router.get('/haesana/:sana', async (req, res) => {
    try {
        let found = false
        let result = ""
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET",
            "Content-Type", "text/plain;charset=UTF-8",
            "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
          );
        fs.readFile('sanakirja.txt', function(err, data) {
            if(err) throw err;
            let array = data.toString().split("\n");
            for(i in array) {
                if ((array[i].includes(req.params.sana + " ")) && req.params.sana.length < 40) {
                    let index = array[i].indexOf(" ") + 1
                    result = array[i].slice(index, array[i].length)
                    result.trim()
                    found = true
                }
            }
            if (found) {
                res.status(200).send(result)
            } else {
                res.status(404).send()
            }
        });
    } catch (error) {
        res.status(404).send(error)
    }

}) 

const addToFile = (word) => {
    fs.appendFileSync('./sanakirja.txt', '\n' + word, (err) => {
        if (err) {  console.error(err);  return; };
        console.log("File has been created");
    })
}

router.post('/uusisana', async (req, res) => {
    try {
        res.setHeader(
            "Access-Control-Allow-Methods",
            "POST",
            "Content-Type", "text/plain;charset=UTF-8",
            "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
          );
        const newWord = req.body.trim()
        if (newWord.length > 2 && newWord.includes(" ") && newWord.length < 40 ) {
            addToFile(newWord)
            res.status(201).send(newWord) 
        } else {
            res.status(400).send()
        }
    } catch (error) {
        res.status(400).send(error)
    }    
})

module.exports = router