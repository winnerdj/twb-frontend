export const userManagement = (
    state = {
        users:[]
    },
    action
) =>{
    switch(action.type){
        case 'SET_USER_FIELDS':
            return{
                ...state,
                [action.name]:action.payload
            }   
        default: return state
    }
}


