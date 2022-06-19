const { getDoggos } = require('../controllers/ControllerDog')
const { Router } = require("express");
const router = Router();
const { Temperament } = require('../db')

router.get("/", async (req, res) => {
    try {
        const allDogs = await getDoggos()
        const temperament = [
            ...new Set(
                allDogs.map((e) => e.temperament).join().split(',').sort()
            )
        ]
        for(let i = 1; i < temperament.length; i++){
            const temp = temperament[i].replace(" ", "")
            Temperament.findOrCreate({
                where:{
                    name: temp
                }
            })
        }

        const allTemperament = await Temperament.findAll()
        res.send(allTemperament)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;