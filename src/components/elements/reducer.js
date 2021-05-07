//filters
export const filterReducer = (
    state = {
        search:'',
        date:'',
        fromDate:'',
        toDate:'',
        select:'',
        stc:null
    },
    action
) => {
    switch(action.type){
        case 'SET_FILTER_FIELD':
            return {
                ...state,
                [action.name]:action.payload
            }
        case 'RESET_FILTER':
            return{
                search:'',
                date:'',
                fromDate:'',
                toDate:'',
                select:'',
                stc:null

            }
        default: return state
    }
}