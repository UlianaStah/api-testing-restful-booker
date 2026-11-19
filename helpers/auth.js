import axios from 'axios' ;
import { BASE_URL, USERNAME, PASSWORD } from './config';

export async function getToken() {
    const response = await axios.post(`${BASE_URL}/auth`, {
        username: USERNAME,
        password: PASSWORD,
    });
    return response.data.token;
}