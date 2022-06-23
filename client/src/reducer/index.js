const initialState = {
    dogs: [],
    dogFiltered: [],
    temperaments: [],
    detail: []
}

function mainReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_DOGS' :
            return{
                ...state,
                dogs: action.payload,
                dogFiltered: action.payload
            }
        case 'GET_TEMPERAMENTS' :
            return{
                ...state,
                temperaments: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT' :
            const dogFiltered = state.dogFiltered;

            let dogsFiltered = action.payload === "all" ? dogFiltered :
                dogFiltered.filter((e) => {
                    if(e.temperament){
                        if(e.temperament.includes(action.payload)) {
                            return e;
                        }
                    }
                    else if(e.temperaments) {
                        const x = e.temperaments?.map(the => the.name)
                        if(x.includes(action.payload)){
                            return e;
                        }
                    }
                    return false;
                });
            return{
                ...state,
                dogs: dogsFiltered
            }
        case 'FILTER_CREATED' :
            const allDogs = state.dogFiltered;
            const filterCreated = action.payload === "created" ?
                allDogs.filter(e => e.id.length > 4) :
                allDogs.filter(e => e.id.length > 0 && e.id.length < 4);
                if(filterCreated.length > 0){
                console.log(filterCreated, allDogs)
            return{
                ...state,
                dogs: action.payload === "all" ? state.dogFiltered : filterCreated
            }
            }else{
                return{
                ...state,
                dogs: "error"
                }
            }
        case 'ORDER_BY_NAME' :
            let sorted = action.payload === 'atoz' ?
                state.dogs.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1}
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {return -1}
                    return 0
                }) :
                state.dogs.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {return -1}
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {return 1}
                    return 0
                })
            return{
                ...state,
                dogs: sorted
            }
        case 'ORDER_BY_WEIGHT' : 
            let sortedW = action.payload === "min" ?
            state.dogs.sort(function (a, b) {                         
                    if (parseInt(a.min_weight) > parseInt(b.min_weight)) { return 1 }
                    if (parseInt(a.min_weight) < parseInt(b.min_weight)) { return -1 }
                    return 0;            
            }) :
            state.dogs.sort(function (a, b) {
                    if (parseInt(a.max_weight) > parseInt(b.max_weight)) { return -1 }
                    if (parseInt(a.max_weight) < parseInt(b.max_weight)) { return 1 }
                    return 0;
            });        
            return {
            ...state,
            dogs: sortedW
            }
        case 'GET_DOG_NAME' : 
            return {
                ...state,
                dogs: action.payload
            }
        case 'GET_DETAIL' :
            return{
                ...state,
                detail: action.payload
            }
        case 'CLEAR_DETAIL' :
            return{
                ...state,
                detail: {}
            }
        default :
            return state;
    }
}

export default mainReducer;