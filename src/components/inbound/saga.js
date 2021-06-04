import API from '../../helpers/api';
import {saveAs} from 'file-saver';
import moment from 'moment';

const baseURL = 'inbound';
const date = moment();

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
    refNo,
    fileName
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
            return saveAs(result.data,`ASN_${fileName}_${date.format('YYYYMMDD').toString()}.xlsx`)
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
    toDate
}) => {
    try{
        return API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })
        .post(`/${baseURL}/${route}/excel`,null,{
            params:{
                fromDate,
                toDate
            }
        })
        .then(result => {
            return saveAs(result.data,`${route}.xlsx`)
        })
    
    }
    catch(e){
        console.log(e)
        throw e
    }
    
}

export const updateStatus = ({
    route,
    no
}) => {

    try{
        return API({
            responseType:'json',
            contentType:'application/json'
        })
        .put(`/${baseURL}/${route}/status/${no}`)
        .then(result => result)
    }
    catch(e){
        throw e
    }
}

export const createGRE = ({
    route,
    grnNo,
    drNo,
    user
}) => {
    try{
        return API({
            responseType:'json',
            contentType:'application/json'
        })
        .put(`/${baseURL}/${route}/${grnNo}/`,null,{
            params:{
                drNo,
                user
            }
        })
    }
    catch(e){
        throw e
    }
}

export const report = ({
    route,
    report
}) => {
    try{
        return API({
            responseType:'blob',
            contentType:'application/vnd.ms-excel'
        })
        .get(`/${baseURL}/${route}/${report}`)
        .then(result => {
            return saveAs(result.data,`balance_sheet_report.xlsx`)
        })
    
        
    }
    catch(e){
        throw e
    }
}