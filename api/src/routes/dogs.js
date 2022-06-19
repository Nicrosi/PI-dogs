const { Dog, Temperament } = require("../db");
const axios = require("axios");

const getApi = async () => {
        const uErreEle = await axios.get("https://api.thedogapi.com/v1/breeds/");
        const info = await uErreEle.data.map((god) => {
            return {
                    id: god.id,
                    image: god.image.url,
                    name: god.name,
                    temperament: god.temperament,
                    weight: god.weight.metric,
                    height: god.height.metric,
                    life_span: god.life_span,
                };
            });
            return info;
        };

const getFromDb = async () =>{
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
};

const getDoggos = async () => {
    const api = await getApi();
    const db = await getFromDb();

    const info = api.concat(db);
    return info;
};

module.exports = {
    getApi,
    getFromDb,
    getDoggos
};
