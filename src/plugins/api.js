import axios from 'axios';

export class Api {
    client = axios.create({
        baseURL: "http://localhost:8000/api/",
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 10000,
    })};