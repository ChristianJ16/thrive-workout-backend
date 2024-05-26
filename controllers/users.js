const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/users')


router.get('/', async (req, res)=>{
    try{
        res.json( await User.find() )
    }catch(error){
        res.status(400).json(error)
    }
})

router.post('/',  async (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    try{
        res.json(await User.create(req.body))
    }catch(error){
        res.status(400).json(error)
    }
})

router.put('/:id', async (req, res)=>{
    try{
        res.json( await User.findByIdAndUpdate(req.params.id, req.body, {new: true}) )
    }catch(error){
        res.status(400).json(error)
    }
})


router.delete('/:id', async (req, res)=>{
    try{
        res.json( await User.findByIdAndDelete(req.params.id) )
    }catch(error){
        res.status(400).json(error)
    }
})

router.post('/login', async  (req, res) => {
    try {
         const foundUser = await User.findOne({email: req.body.email})
         if(foundUser){
            const isAMatch = bcrypt.compareSync(req.body.password, foundUser.password)
            if(isAMatch){
                console.log('login successful')
                res.status(200).json( { status: 200, user: {
                    id: foundUser._id,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    email: foundUser.email
                } })
            }else{
                res.status(401).json( { status: 401, msg: 'password does not match.' } )
            }
         }else{
            res.status(401).json( { status: 401, msg: 'Username not found.'} )
         }
    } catch (error) {
        console.log("error is: ", error)
        res.status(500).json( { status: 500, msg: 'Something went wrong. Please try again later.' } )
    }
})



module.exports = router