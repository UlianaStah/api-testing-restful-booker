import axios from "axios";
import { BASE_URL } from "./config.js";

export const validBooking = {
  firstname: 'Anna',
  lastname: 'Test',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-12-01',
    checkout: '2026-12-05',
  },
  additionalneeds: 'Breakfast',
};

export async function createBooking(data = validBooking) {
    return axios.post(`${BASE_URL}/booking`, data, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
    });
}

export async function getBooking(id) {
    return axios.get(`${BASE_URL}/booking/${id}`, {
        headers: { Accept: 'application/json' },
        validateStatus: () => true,
    });
}    

export async function updateBooking(id, data, token) {
    const headers = { Accept: 'application/json' };

    if(token) {
        headers.Cookie = `token=${token}`;
    }
    return axios.put(`${BASE_URL}/booking/${id}`, data, {
        headers,
        validateStatus: () => true
    });
}

export async function patchBooking(id,data, token) {
    const headers = { Accept: 'application/json'};

    if(token){
        headers.Cookie = `token=${token}`;
    }
    return axios.patch(`${BASE_URL}/booking/${id}`, data, {
        headers,
        validateStatus: () => true
    });    
}

export async function deleteBooking(id, token) {
    const headers = { Accept: 'application/json' };

    if(token){
        headers.Cookie = `token=${token}`;
    }
    return axios.delete(`${BASE_URL}/booking/${id}`, {
        headers,
        validateStatus: () => true
    });    
}