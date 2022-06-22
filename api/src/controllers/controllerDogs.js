const axios = require('axios');
const {Dog, Temperament} = require('../db');

const getApi = async () =>{
    try{
        const getUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
        const getDog = await getUrl.data.map((x) => {
            const weight = x.weight.metric.split('-');
            const height = x.height.metric.split('-');
            const min_weight = parseInt(weight[0])
            const max_weight = parseInt(weight[1])
            const min_height = parseInt(height[0])
            const max_height = parseInt(weight[1])
            const id = x.id+""
            return{
                id: id,
                name: x.name,
                min_weight: min_weight ? min_weight : 0, //Un ternario que le da un valor por default en caso de que llegue vacío
                max_weight: max_weight ? max_weight : 1,
                min_height: min_height ? min_height : 0,
                max_height: max_height ? max_height : 1,
                life_span: x.life_span,
                image: x.image.url,
                temperament: x.temperament ? x.temperament : "This dog has no temperaments"
            }
        })
        return getDog;
    } catch(err){
        console.log(err)
    }
}

const getDb = async () =>{
    try{
        const dogDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        return dogDB
    }catch(err){
        console.log(err)
    }
}

const getAll = async () =>{
    const dogsAPI = await getApi()
    const dogsDB = await getDb()
    const all = dogsAPI.concat(dogsDB)
    return all
}

module.exports = {getAll}