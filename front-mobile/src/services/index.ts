import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://wmazoni-dscatalog.herokuapp.com',
});

export const TOKEN = 'Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==';

export async function getProducts() {
    const res = api.get(`/products?page=0&linesPerPage=12&direction=ASC&orderBy=name`)
    return res
}

export function getCategories() {
    const res = api.get(`/categories?direction=ASC&orderBy=name`);
    return res
}