const express = require('express')
const router = new express.Router()
const fs = require('fs')
const { send } = require('process')
const readline = require('readline')

router.get('/haesanakirja/', async (req, res) => {
    try {
        res.setHeader("Content-Type", "text/plain;charset=UTF-8")
        let dictionary = fs.readFileSync('./sanakirja.txt', {encoding: 'utf8', flag:'r'})
        console.log(dictionary)
        res.status(200).send(dictionary)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/haesana/:sana', async (req, res) => {
    try {
        let found = false
        let result = ""
        res.setHeader("Content-Type", "text/plain;charset=UTF-8")
        fs.readFile('sanakirja.txt', function(err, data) {
            if(err) throw err;
            var array = data.toString().split("\n");
            for(i in array) {
                if (array[i].includes(req.params.sana + " ")) {
                    console.log(array[i])
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
        
        //res.status(200).send(req.params.sana)
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
        res.setHeader("Content-Type", "text/plain;charset=UTF-8")
        const newWord = req.body.trim()
        if (newWord.length > 2 && newWord.includes(" ")) {
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