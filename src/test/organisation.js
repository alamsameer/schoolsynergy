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

describe("testing org onboarding signup", () => {
    it("should test signup for organisation", async () => {
        const response = await request(app)
            .post('/api/organisation/signup')
            .send({
                name: "second school",
                email: "alamsaeer24@gmail.com",
                password: "same"
            });
        expect(response.statusCode).to.equal(201);
    });     
});

describe('OrganisationSignIn', () => {
    it('should return a 404 status if Organisation is not found', async () => {
      const response = await request(app)
        .post('/api/organisation/signin')
        .send({
          email: 'nonexistent@example.com',
          password: 'password',
        });
  
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ error: 'Organisation not found' });
    });
  
    it('should return a 401 status if the password is incorrect', async () => {
      const response = await request(app)
        .post('/api/organisation/signin')
        .send({
          email: 'alamsaeer24@gmail.com',
          password: 'wrongpassword',
        });
  
      expect(response.status).to.equal(401);
      expect(response.body).to.deep.equal({ error: 'Incorrect password' });
    });
  
    it('should return a 200 status with a token if the credentials are correct', async () => {
      const response = await request(app)
        .post('/api/organisation/signin')
        .send({
          email: 'alamsaeer24@gmail.com',
          password: 'same',
        });
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('message', 'Organisation logged in successfully');
    });
  
    it('should return a 500 status on server error', async () => {
      // Simulating a server error (e.g., unhandled exception)
      // This may not reflect your actual server error scenario
      const response = await request(app)
        .post('/api/organisation/signin')
        .send({
          email: 'alamsaeer24@gmail.com',
          password: 'samkk',
        });
  
      expect(response.status).to.equal(500);
      expect(response.body).to.deep.equal({ error: 'Error logging in user' });
    });
  });

after(async () => {
    // Clean up or disconnect from the database after running tests
    await dbdisconnect();
    console.log("disconnected from db");
});
