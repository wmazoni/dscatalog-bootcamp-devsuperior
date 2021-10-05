import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://wmazoni-dscatalog.herokuapp.com',
});