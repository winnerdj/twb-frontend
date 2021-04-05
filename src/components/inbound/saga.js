import API from '../../helpers/api';
import {saveAs} from 'file-saver';
const baseURL = 'inbound';

export const retrieve = ({
    route,
    type,
    refNo,
    fromDate,
    toDate
}) => {
    try{
        return API({
            responseType:'json',
            contentType:'application/json'
        }).get(`/${baseURL}/${route}`,{
            params:{
                type,
                refNo,
                fromDate,
                toDate
            }
        })
        .then(result => {
            return result
        })
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const retriveDetails = ({
    route,
    refNo,
    type
}) => {

    try{
        return API({
            responseType:'json',
            contentType:'application/json'
        }).get(`/${baseURL}/${route}/${refNo}`,{
            params:{
                type
            }
        })
        .then(result => {
            return result
        })
    }
    catch(e){
        console.log(e)
        throw e
    }
   
}

export const exportToASN = ({
    route,
    type,
    refNo
}) => {
    try{
        return API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })
        .get(`/${baseURL}/${route}/asn/${refNo}`,{
            params:{
                type
            }
        })
        .then(result => {
            console.log(result.data)
            return saveAs(result.data,`${route}_asn.xlsx`)
        })
    }
    catch(e){
        console.log(e)
        throw e
    }

}