import {API} from '../../helpers';
// import {saveAs} from 'file-saver';
const baseURL = 'internal';

export const retrieve = ({
    route,
    from,
    to,
    type
}) => {
    try{
        const apiService = API({
            responseType:'json',
            contentType:'application/json'
        })

        return apiService.get(`/${baseURL}/${route}`,{
            params:{
               from,
               to,
               type
            }
        })
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const create = ({
    route,
    type,
    user
}) => {
    try{
        const apiService = API({
            responseType:'json',
            contentType:'application/json'
        })

        return apiService.post(`/${baseURL}/${route}/${type}`,null,{
            params:{
                user
            }
        })
    }
    catch(e){
        console.log(e)
        throw e
    }
}