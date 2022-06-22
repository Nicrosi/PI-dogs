import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios("/dogs");
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios("/temperaments");
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function filterByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getDogName(name){
    return async function(dispatch){
        try{
            var json = await axios.get("/dogs?name=" + name);
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            })
        }catch(err){
            console.log(err)
        }
        return dispatch({
            type: 'GET_DOG_NAME',
            payload: "error"
        })
    }
}

export function postDog(payload){
    return async function(){
        const response = await axios.post("/dogs/",payload);
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get("/dogs/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }catch(err){
            console.log(err);
        }
    }
}

export function clearDetail(){
    return{
        type: 'CLEAR_DETAIL',
        payload: {}
    }
}