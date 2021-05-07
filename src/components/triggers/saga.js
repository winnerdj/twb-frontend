import API from '../../helpers/api';
const baseURL = 'triggers';

export const trigger = ({
    route,
    from,
    to
}) => {
    try{
        return API({
            responseType:'json',
            contentType:'application/json'
        }).post(`/${baseURL}/${route}`,null,{
            params:{
                from,
                to
            }
        }).then(result => {
            return result
        })
    }
    catch(e){
        throw e
    }
}