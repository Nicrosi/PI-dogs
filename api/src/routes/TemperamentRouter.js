const {getAll} = require('../controllers/controllerDogs.js');
const {Router} = require('express');
const router = Router();
const {Temperament} = require('../db');

router.get('/', async (req, res) => {
    try{
        const everyDog = await getAll();
        const temperament = [
            ...new Set(
                everyDog.map((e) => e.temperament).join().split(',').sort()
            )
        ]
        for(i = 1; i < temperament.length; i++){
            const temp = temperament[i].replace(" ", "");
            Temperament.findOrCreate({
                where:{
                    name: temp
                }
            })
        }
        const allTemperament = await Temperament.findAll();
        res.send(allTemperament);
    }catch(err){
        console.log(err);
    }
})

module.exports = router;