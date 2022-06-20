const { Router } = require('express');
const router = Router();

const {getAll} = require('../controllers/controllerDogs');
const {Dog, Temperament} = require('../db');

router.get('/', async (req, res) => {
    let {name} = req.query;
    const everyDog = await getAll();
    if(name){
        name = name.toLowerCase();
        let breed_name = await everyDog.filter(e => e.name.toLowerCase().includes(name));
        console.log(breed_name);
        breed_name.length > 0 ? 
            res.status(200).send(breed_name) : 
            res.status(404).send('Dog not found!');
    }
    else{
        res.status(200).send(everyDog)
    }
})

router.get('/:id', async (req, res) => {
    let {id} = req.params;
    const everyDog = await getAll();
    let breed_id = await everyDog.filter(e => e.id.toString() === id.toString())
    if (breed_id.length > 0) res.status(200).send(breed_id);
    else res.status(404).send('Dog not found!');
})

router.post('/', async (req, res) => {
    let{
        name,
        min_height,
        min_weight,
        max_height,
        max_weight,
        temperament,
        life_span,
        image
    } = req.body;
    name = name.toLowerCase();

    try{
        let new_Breed = await Dog.create({
            name,
            min_height,
            min_weight,
            max_height,
            max_weight,
            temperament,
            life_span,
            image
        });
        console.log(new_Breed)
        let temperament_dog = await Temperament.findAll({
            where: {
                name: temperament
            }
        });
        console.log(temperament_dog, "I'm a dog!");
        new_Breed.addTemperament(temperament_dog);
        res.send('Sent!');

    }catch(err){
        console.log(err);
    }
})

module.exports = router;

