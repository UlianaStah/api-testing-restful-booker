
# Tests cases

| ID    | Titles                                        | Steps                                                         | Expected result                                 | Actual result |
|-------|-----------------------------------------------|---------------------------------------------------------------|-------------------------------------------------|---------------|
|TC-01  | Get a token with correct login                | POST /auth with admin / password123                           | 200, response contains a token                  |               |
|TC-02  | Get a token with wrong password               | POST /auth with admin / wrongpassword                         | Response doesn't contain a token                |               |
|TC-03  | Get a token with wrong username               | POST /auth with wronguser / password123                       | Response doesn't contain a token                |               |
|TC-04  | Get a token without a username                | POST /auth with only password123                              | Response doesn't contain a token                |               |
|TC-05  | Get list of bookings                          | GET /booking                                                  | 200, response is a list                         |               |
|TC-06  | Filter bookings by first name                 | GET /booking?firstname=Anna                                   | 200, list contains the IDs of "Anna" booking    |               |
|TC-07  | Get an existing booking by ID                 | POST a booking, then GET /booking/{id}                        | 200, data matches what was sent                 |               |
|TC-08  | Get a booking that doesn't exist              | GET /booking/99999999                                         | 404, booking not found                          |               |
|TC-09  | Create a booking with valid data              | POST /booking with a full JSON body                           | 200, response has a bookingid                   |               |
|TC-10  | Create a booking without first name           | POST /booking with first name missing                         | Error status (4xx), booking is not created      |               |
|TC-11  | Create a booking with totalprice as text      | POST /booking with "totalprice": "abc"                        | Error status (4xx), booking is not created      |               |
|TC-12  | Update the booking with a token               | PUT /booking/{id} with a new firstname and a Cookie header    | 200, first name is changed                      |               |
|TC-13  | Update the booking without token              | PUT /booking/{id}, with a new firstname and no Cookie header  | 403                                             |               |
|TC-14  | Partial update with a token                   | PATCH/booking/{id} with a new firstname and a Cookie header   | 200, first name changed, other fields unchanged |               |
|TC-15  | Partial update without a token                | PATCH /booking/{id}, with a new firstname and no Cookie header| 403                                             |               |
|TC-16  | Delete a booking with a token                 | DELETE /booking/{id}, with a Cookie header                    | 201 Created                                     |               |
|TC-17  | Delete a booking without token                | DELETE /booking/{id}, with no Cookie header                   | 403                                             |               |
|TC-18  | Deleted booking cannot be read                | After TC-16, GET /booking/{id}                                | 404                                             |               |
|TC-19  | Health check responds                         | GET /ping                                                     | Success status (200)                            |               |
|TC-20  | Full flow: create, read, update, delete, read | POST, GET, PUT, DELETE, GET in a row                          | 200, 200, 200, 201, 404                         |               |