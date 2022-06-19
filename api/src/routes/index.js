const { Router } = require('express');
const {Dog, Temperament} = require('../db')
const {getApi, getFromDb, getDoggos} = require('./dogs.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req, res, next) => {  
    try {
        const { name } = req.query;
        let allDogs = await getDoggos();       
        if (name) {                               
            let dogName = await allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?                       
            res.status(200).send(dogName)  :
            res.status(404).send({ info: "No gods for you." });
        } else {
            res.status(200).send(allDogs);    
        } 
    } catch (error) {
        next(error);
        };
    });


router.get('/dogs/:id', async (req, res, next) =>{
    try{
        const { id } = req.params;
        let allGods = await getDoggos();
        if(id){
            let godId = await allGods.filter((god) => god.id.toString() === id.toString());
            res.status(200).send(godId)
        }else{
            res.status(200).send(allGods)
        }
    }catch(error){
        next(error);
    }
});

router.post('/dogs', async (req, res) =>{
    
});

router.get('/dogs/temperaments', async (req, res) =>{
    
});


module.exports = router;
