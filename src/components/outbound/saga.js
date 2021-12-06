import API from '../../helpers/api';
import {saveAs} from 'file-saver';
import moment from 'moment';
const date = moment();

const baseURL = 'outbound';

export const retrieve = ({
    route,
    type,
    refNo,
    fromDate,
    toDate,
    whse
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
                toDate,
                whse
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

export const exportToODO = ({
    route,
    type,
    refNo,
    stc,
    via,
    region,
    whse
}) => {
    try{
        return API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })
        .post(`/${baseURL}/${route}/odo`,null,{
            params:{
                type,
                refNo,
                stc,
                via,
                region,
                whse
            }
        })
        .then(result => {
            saveAs(result.data,`ODO_${moment().format('YYYYMMDD').toString()}.xlsx`)
        })
    }
    catch(e){
        console.log(e)
        throw e
    }

}

export const exportToExcel = ({
    route,
    fromDate,
    toDate,
    whse
}) => {
    try{
        return API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })
        .post(`/${baseURL}/${route}/excel`,null,{
            params:{
                fromDate,
                toDate,
                whse
            }
        })
        .then(result => {
            console.log(result.data)
            return saveAs(result.data,`${route}_odo.xlsx`)
        })
    }
    catch(e){
        console.log(e)
        throw e
    }

}


export const exportToAsnSTO = ({
    route,
    type,
    refNo,
    fileName
}) => {
    try{
        return API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })
        .get(`/inbound/${route}/asn/${refNo}`)
        .then(result => {
            return saveAs(result.data,`ASN_${fileName}_${date.format('YYYYMMDD').toString()}.xlsx`)
        })
    }
    catch(e){
        console.log(e)
        throw e
    }
}
