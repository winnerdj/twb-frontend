//filters
export const filterReducer = (
    state = {
        search:'',
        date:'',
        fromDate:'',
        toDate:'',
        select:'',
        selectWhse:null,
        region:null,
        stc:null,
        via:null
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
                selectWhse:null,
                region:null,
                stc:null,
                via:null
            }
        default: return state
    }
}