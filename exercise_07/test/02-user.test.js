const request = require("supertest");
const app = require('../src/app');


describe("Create a user", () => {
    test("Status 400 with insufficient data", async () => {
        const response = await request(app).post('/user/');
        expect(response.statusCode).toBe(400);
    });
    test("Status 201 with sufficient data", async () => {
        const response = await request(app).post('/user').send({
            username: "NewUser",
            password: "CorrectPassword"
        })
        expect(response.statusCode).toBe(201);
    });
})