class Requests {
    getPing(){
        return cy.request({
            method: 'GET',
            url: 'ping'
        })
    }

    getBooking(){
        return cy.request({
            method: 'GET',
            url: 'booking/1'
        })
    }

    postBooking(){
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBookingWithoutToken(response){
        const id = response.body.bookingid
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `booking/${id}`,
            body:{
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
              }
        })
    }

    updateBooking(response){
        const id = response.body.bookingid
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body:{
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
              }
        })
    }

    updateBookingInexistent(){
        return cy.request({
            failOnStatusCode: false,
            method: 'PUT',
            url: `booking/654656456465465645656g`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body:{
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Breakfast"
              }
        })
    }
    
    postAuth(){
        return cy.request({
            method: 'POST',
            url: 'auth',
            body:{
                "username" : "admin",
                "password" : "password123"
            }
        })
    }

    doAuth(){
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;
            Cypress.env('token', token)
        })
    }

    deleteBooking(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode: false
        })
    }

    deleteBookingWithoutToken(response){
        const id = response.body.bookingid
        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=36482a7eacc8bcdK`
            },
            failOnStatusCode: false
        })
    }
}
export default new Requests();