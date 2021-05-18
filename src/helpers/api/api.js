import axios from 'axios';


const URL = process.env.REACT_APP_API

const API = ({
    responseType,
    contentType
}) => {
    let headers = {
        'Content-Type': contentType
    }

    return axios.create({
        baseURL:URL,
        timeout:0,
        maxRedirects: 5,
        responseType:responseType,
        headers
    })
}

export default API
