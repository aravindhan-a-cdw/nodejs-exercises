const request = require("supertest");
const app = require('../src/app');


describe("Login user to obtain JWT Token", () => {
    test("Status 400 with wrong credentials", async () => {
        const response = await request(app).post('/auth/login/').send({
            username: "NewUser",
            password: "WrongPassword"
        });
        expect(response.statusCode).toBe(400);
    });
    test("Status 200 with correct credentials", async () => {
        const response = await request(app).post('/auth/login/').send({
            username: "NewUser",
            password: "CorrectPassword"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('success');
    });
})