import axios from "axios";
import { expect } from "chai";
import { BASE_URL, USERNAME, PASSWORD } from "../helpers/config.js";

describe('Auth - POST /auth', () => {

    it('TC-01: gets a token with correct login', async () => {
      const response = await axios.post(`${BASE_URL}/auth`, {
        username: USERNAME,
        password: PASSWORD,
      });

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('token');
      expect(response.data.token).to.be.a('string');
    });

    it('TC-02: returns no token with wrong password', async () => {
      const response = await axios.post(`${BASE_URL}/auth`, {
        username: USERNAME,
        password: 'wrongpassword',
      },
      { validateStatus: () => true }
    );

      expect(response.data).to.not.have.property('token');
    });

    it('TC-03: returns no token with wrong username', async () =>{
        const response = await axios.post(`${BASE_URL}/auth`, {
            username: 'wronguser',
            password: PASSWORD,
        },
        { validateStatus: () => true }
    );

    expect(response.data).to.not.have.property('token');
    });

    it('TC-04: returns no token without a username', async () => {
        const response = await axios.post(`${BASE_URL}/auth`, {
            password: PASSWORD
        },
        { validateStatus: () => true }
    );

    expect(response.data).to.not.have.property('token');
    });
})