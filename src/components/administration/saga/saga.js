import API from '../../../helpers/api';
const baseURL = 'users';

export const createUser = ({
    userName,
    email
}) => {
    try{

        const apiService = API({
            responseType:'json',
            contentType:'application/json'
        })

        return apiService.post(`/${baseURL}`,{
            userName,
            email
        }).then(result => {
            return result.data
        })
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const retrieveUsers = () => {
    try{
        const apiService = API({
            responseType:'json',
            contentType:'application/json'
        })
        return apiService.get(`/${baseURL}`).then(result => {
            return result.data
        })

    }
    catch(e){
        console.log(e)
       throw e
    }
}

export const updateUser = ({
        email,
        password,
        status,
        oldPassword
    }) => {
    try{
        const apiService = API({
            responseType:'json',
            contentType:'application/json'
        })
        return apiService.put(`/${baseURL}/${email}`,{
            data:{
                user_password:password,
                is_active:status
            },
            oldPassword
        }).then(result => {
            return result
        })

    }
    catch(e){
        console.log(e)
       throw e
    }
}