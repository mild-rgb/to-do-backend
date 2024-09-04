const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

const testSub = new Subscriber({
    name: "палахнюк", 
    subscriberToChannel: "channel1"
})
testSub.save()


//getting all subs
router.get('/', async (req, res) =>{
   try{
    const subscribers = await Subscriber.find()
    res.json(subscribers)
   }
   catch(err)
   {
    res.status(500).json({message: err.message})
   }

})


//getting one

router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

//creating one 

router.post('/', (req, res) =>
{

})

//updating one

router.patch('/', (req, res) =>
    {
        
    })

//deleting one 

router.delete('/:id', (req, res) =>
    {
        
    })


module.exports = router