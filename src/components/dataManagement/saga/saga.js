import {API} from '../../../helpers';
import {saveAs} from 'file-saver';
const baseURL = 'master';

export const retrieve = ({route,date}) => {
    try{
        const apiService = API({
            responseType:'json',
            contentType:'application/json'
        })

        return apiService.get(`/${baseURL}/${route}`,{
            params:{
                fromDate:date
            }
        })
        .then(result=> {
            return result.data
        })
    }
    catch(e){
        console.log(e)
        return []
    }
}

export const exportToExcel = ({route,
    fileName,
    date
}) => {
    try{
        
        const apiService = API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })

        return apiService.get(`/${baseURL}/${route}/excel`,{
            params:{
                fromDate:date
            }
        }).then(result => {
            return saveAs(result.data,`${fileName}.xlsx`)
        })
    }
    catch(e){
        console.log(e)
    }
}