import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://wmazoni-dscatalog.herokuapp.com',
});

export const TOKEN = 'Basic e3tjbGllbnQtaWR9fTp7e2NsaWVudC1zZWNyZXR9fQ==';