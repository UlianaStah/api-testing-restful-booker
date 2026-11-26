import axios from "axios";
import { expect } from "chai";
import { BASE_URL } from "../helpers/config.js";

describe('Ping - GET/ping', () => {

    it('TC-19: health check responds', async () =>{
        const response = await axios.get(`${BASE_URL}/ping`);

        expect(response.status).to.equal(201);
    })
})
