import request from 'supertest';
import dbmain from '../config/db.js';
import { expect } from 'chai';
import { dbdisconnect } from '../config/db.js';
import app from '../../index.js';

before(async () => {
    // connect to db
    try {
        await dbmain();
        console.log("connected to db for testing");
    } catch (e) {
        console.log("Error in db for testing", e);
    }
});

describe("Signup testing for teacher",()=>{
    it("should test signup for organisation", async () => {
        const response = await request(app)
            .post('/api/teacher/signup')
            .send({
                name: "teacher 1",
                email: "alamaeer24@gmail.com",
                password: "same",
                OrganisationId:"659192917ca88e3207e33573",
                subjects:["math","science"]
            });
        expect(response.statusCode).to.equal(201);
    }); 
})


after(async () => {
    // Clean up or disconnect from the database after running tests
    await dbdisconnect();
    console.log("disconnected from db");
});
