import axios from 'axios';


const URL = 'http://localhost:16000';

const API = ({
    responseType,
    contentType
}) => {
    console.log(process.env.API_URL)
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
