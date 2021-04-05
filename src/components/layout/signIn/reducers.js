const signInReducer = (
    state = {
        id:null,
        user_email:null,
        username:null,
        token:null
    },action
) => {
    switch(action.type){
        case 'SET_SIGNIN_USER':
            return {
               ...state,
                id:action.payload.id,
                user_email:action.payload.user_email,
                username:action.payload.username,
                token:action.payload.token
            }

        default: return state
    }

}

export default signInReducer