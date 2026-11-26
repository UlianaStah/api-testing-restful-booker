import axios from "axios";
import { expect } from "chai";
import { createBooking, getBooking, updateBooking, patchBooking, deleteBooking, validBooking } from "../helpers/booking.js";
import { getToken } from "../helpers/auth.js";

describe('Full flow - booking lifecycle', () => {

    it('TC-20: create, read, update, delete and read again', async () => {
        const token = await getToken();

        const created = await createBooking();
        expect(created.status).to.equal(200);
        const bookingId = created.data.bookingid;

        const read = await getBooking(bookingId);
        expect(read.status).to.equal(200);
        expect(read.data.firstname).to.equal(validBooking.firstname);
        expect(read.data.lastname).to.equal(validBooking.lastname);
        expect(read.data.totalprice).to.equal(validBooking.totalprice);

        const updatedData = {...validBooking, firstname: 'Maria'};
        const updated = await updateBooking(bookingId, updatedData, token);
        expect(updated.status).to.equal(200);
        expect(updated.data.firstname).to.equal('Maria');
        expect(updated.data.lastname).to.equal(validBooking.lastname);
        expect(updated.data.totalprice).to.equal(validBooking.totalprice);

        const deleted = await deleteBooking(bookingId, token);
        expect(deleted.status).to.equal(201);

        const readAgain = await getBooking(bookingId);
        expect(readAgain.status).to.equal(404);
    });
})