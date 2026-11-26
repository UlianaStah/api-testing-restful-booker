import axios from "axios";
import { expect } from "chai";
import { BASE_URL } from "../helpers/config.js";
import { validBooking, createBooking, getBooking, updateBooking, patchBooking, deleteBooking } from "../helpers/booking.js";
import { getToken } from "../helpers/auth.js";

describe('Booking - read and create', () => {

    it('TC-05: returns a list of bookings', async () => {
        const response = await axios.get(`${BASE_URL}/booking`);

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
        expect(response.data[0]).to.have.property('bookingid')
    });

    it('TC-06: filters bookings by first name', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid; 
        const response = await axios.get(`${BASE_URL}/booking`, {
            params: { firstname: validBooking.firstname },
        });
        const ids = response.data.map((item) => item.bookingid);

        expect(response.status).to.equal(200);
        expect(ids).to.include(bookingId);
    });

    it('TC-07: returns a booking by its ID', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const response = await getBooking(bookingId);

        expect(response.status).to.equal(200);
        expect(response.data.firstname).to.equal(validBooking.firstname);
        expect(response.data.lastname).to.equal(validBooking.lastname);
        expect(response.data.totalprice).to.equal(validBooking.totalprice);
    });

    it('TC-08: returns 404 for a booking that does not exist', async () => {
        const response = await getBooking(9999999);

        expect(response.status).to.equal(404);
    });

    it('TC-09: creates a booking with valid data', async () => {
        const created = await createBooking();
        
        expect(created.status).to.equal(200);
        expect(created.data).to.have.property('bookingid');
        expect(created.data.booking.firstname).to.equal(validBooking.firstname);
        expect(created.data.booking.lastname).to.equal(validBooking.lastname);
        expect(created.data.booking.totalprice).to.equal(validBooking.totalprice);
    });

    // KNOWN BUG: the API returns 500 instead of a 4xx status.
   // See "Known issues found" in the README.
    it.skip('TC-10: rejects a booking without a firstname', async () => {
        const bookingWithoutFirstname = {...validBooking};
        delete bookingWithoutFirstname.firstname;

        const created = await createBooking(bookingWithoutFirstname);

        expect(created.status).to.be.within(400,499);
    });

    // KNOWN BUG: the API accepts the booking (200) and saves totalprice as null instead of rejecting it with 4xx status
   // See "Known issues found" in the README.
    it.skip('TC-11: rejects a booking with totalprice as text', async () => {
        const response = await createBooking({...validBooking, totalprice: 'abc'});

        expect(response.status).to.be.within(400,499);
    });

    it('TC-12: successfully updates a booking with token', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const token = await getToken();
        const updated = {...validBooking, firstname: 'Maria'};
        const response = await updateBooking(bookingId, updated, token);

        expect(response.status).to.equal(200);
        expect(response.data.firstname).to.equal('Maria');        
    });

    it('TC-13: rejects the update of a booking wothout token', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const updated = {...validBooking, firstname: 'Maria'};
        const response = await updateBooking(bookingId, updated);

        expect(response.status).to.equal(403);
    });

    it('TC-14: successful partial update of a booking with token', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const token = await getToken();
        const patial = { firstname: 'Maria' };
        const response = await patchBooking(bookingId, patial, token);

        expect(response.status).to.equal(200);
        expect(response.data.firstname).to.equal('Maria');
        expect(response.data.lastname).to.equal(validBooking.lastname);
        expect(response.data.totalprice).to.equal(validBooking.totalprice);
    });

    it('TC-15: rejects the partial update of a booking without token', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const partial = {firstname: 'Maria'};
        const response = await patchBooking(bookingId, partial);

        expect(response.status).to.equal(403);
    });

    it('TC-16: successfully deletes a booking with token', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const token = await getToken();
        const response = await deleteBooking(bookingId, token);

        expect(response.status).to.equal(201);
    });

    it('TC-17: rejects deleting a booking without token', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const response = await deleteBooking(bookingId);

        expect(response.status).to.equal(403);
    });

    it('TC-18: returns a 404 for deleted booking', async () => {
        const created = await createBooking();
        const bookingId = created.data.bookingid;
        const token = await getToken();
        const deleted = await deleteBooking(bookingId, token);
        const response = await getBooking(bookingId);

        expect(deleted.status).to.equal(201);
        expect(response.status).to.equal(404);
    });

});