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


router.post('/login', async (req, res)=>{
    
    try {
        const foundUser = await User.findOne({username: req.body.username})
        if(foundUser){
            const isAMatch = bcrypt.compareSync(req.body.password, foundUser.password)
            if(isAMatch){
                console.log('login successful')
                req.session.currentUser = foundUser
                res.redirect('/fruits/')
            }else{
                res.status(500).send('Username or password does not match or does not exist.')
            }
        }else{
            res.status(500).send('Username or password does not match or does not exist.')
        }

    } catch (err) {
        console.log(err)
        res.status(500).send('Username or password does not match or does not exist.')
    }
})


router.delete('/logout', (req, res)=>{
    req.session.destroy( err => {
        if(err){
            res.status(500).send('logout failed')    
        }else{
            res.redirect('/users/login')
        }  
    })
})

// router.put('/login', (req, res) => {
//     console.log(req.body);
//     User.findOne({username: req.body.username}, (err, foundUser) => {
//       if(err) {
//         res.json('Oops, there was an error. Please try again')
//       } else {
//         if(!foundUser){
//           res.json('Username and password do not match. Please try again.')
//         } else if(bcrypt.compareSync(req.body.password, foundUser.password)) {
//           res.json({username: foundUser.username})
//         } else {
//           res.json('Username and password do not match. Please try again.')
//         }
//       }
//     })
// })



module.exports = router