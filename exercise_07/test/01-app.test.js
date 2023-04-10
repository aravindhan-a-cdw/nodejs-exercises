const request = require("supertest");
const app = require('../src/app');

describe("Test the root path", () => {
    test("Status is 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});

describe("Test Non existant path", () => {
    test("Status is 404", async () => {
        const response = await request(app).get("/demo");
        expect(response.statusCode).toBe(404);
    })
})
