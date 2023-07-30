const express = require("express");
const { addToElastic,getEvents,geteventsFull, getLastEvent, getSearch } = require("../services/esService");


const router = express.Router();


router.post('/ElasticPart',addToElastic);
router.get('/getevents',getEvents);
router.get('/geteventsFull',geteventsFull);
router.get('/getLastEvent',getLastEvent);
router.get('/getSearch',getSearch);

module.exports = router;