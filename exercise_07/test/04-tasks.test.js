const request = require("supertest");
const app = require('../src/app');

let JWT_TOKEN = '';


let tasks = [
    {
        "title": "Task 1",
        "description": "Description of task 1",
        "priority": 1,
        "dueDate": "2023-04-11",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Task 2",
        "description": "Description of task 2",
        "priority": 5,
        "dueDate": "2023-04-13",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Demo Task",
        "description": "Description of the demo task 423",
        "priority": 8,
        "dueDate": "2023-05-13",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Complete review of exercise 5",
        "description": "Exercise 5 is in ready for review so complete it",
        "priority": 2,
        "dueDate": "2023-04-15",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Push exercise 7 to repo",
        "description": "Exercise 7 complete and push to github",
        "priority": 3,
        "dueDate": "2023-04-15",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    }, 
    {
        "title": "Complete testing for exercise 7",
        "description": "Exercise 7 test and push to github",
        "priority": 1,
        "dueDate": "2023-04-11",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Learn about joins",
        "description": "SQL joins",
        "priority": 5,
        "dueDate": "2023-04-13",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Learn about SQL optimization",
        "description": "SQL opti",
        "priority": 2,
        "dueDate": "2023-04-15",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Learn about subqueries",
        "description": "SQL subqueries",
        "priority": 2,
        "dueDate": "2023-05-10",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    },
    {
        "title": "Learn about joins",
        "description": "SQL joins",
        "priority": 3,
        "dueDate": "2023-05-01",
        "comments": [
            {
                "comment": "Hello World",
                "time": "1681114095347"
            }
        ]
    }
];

// Login and set JWT token
test("Login for JWT Token and set token", async () => {
    const response = await request(app).post('/auth/login/').send({
        username: "NewUser",
        password: "CorrectPassword"
    })
    expect(response.body).toHaveProperty('token');
    JWT_TOKEN = response.body.token;
})


describe("CRUD a task without Authorization", () => {
    test("Status 401 for Create without Authorization", async () => {
        // Create a task
        const response = await request(app).post('/task/').send({
            "title": "Test Task",
            "description": "Description of Test Task",
            "priority": 1,
            "dueDate": "2023-05-11 18:30",
            "comments": [
                {
                    "comment": "This is good",
                    "time": Date.now()
                },
                {
                    "comment": "Who is the client for this task?",
                    "time": Date.now()
                }
            ]
        });
        expect(response.statusCode).toBe(401);
    });

    test("Status 401 for Read All without Authorization", async () => {
        // Read all task
        const response = await request(app).get('/task/');
        expect(response.statusCode).toBe(401);
    });

    test("Status 401 for Read without Authorization", async () => {
        // Read a task
        const response = await request(app).get('/task/0');
        expect(response.statusCode).toBe(401);
    });

    test("Status 401 for update without Authorization", async () => {
        // Update a task
        const response = await request(app).put('/task/').send({
            "title": "Test Task",
            "description": "Description of Test Task with modified content",
        });
        expect(response.statusCode).toBe(401);
    });

    test("Status 401 for delete without Authorization", async () => {
        // Delete a task
        const response = await request(app).delete('/task/0');
        expect(response.statusCode).toBe(401);
    });

});

describe("Task CRUD with Authorization", () => {
    test("Status 201 for create a new task with Authorization", async () => {
        for(const index in tasks) {
            let response = await request(app).post('/task/')
                .set("Authorization", "Bearer " + JWT_TOKEN)
                .send(tasks[index]);
            expect(response.statusCode).toBe(201);
        }
    });

    test("Status 200 for update task with Authorization", async () => {
        const response = await request(app).put('/task/0')
            .set("Authorization", "Bearer " + JWT_TOKEN)
            .send({
                "description": "Description of Test Task 1 with modified content",
                "priority": 10,
            });
        expect(response.statusCode).toBe(200);
    });


    test("Status 200 for Read a task", async () => {
        const response = await request(app).get('/task/0')
            .set("Authorization", "Bearer " + JWT_TOKEN)
        expect(response.statusCode).toBe(200);
        expect(response.body.data.description).toStrictEqual("Description of Test Task 1 with modified content");
    });

    test("Status 200 for read all tasks", async () => {
        const response = await request(app).get('/task/')
            .set("Authorization", "Bearer " + JWT_TOKEN);
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body.data).length).toBe(5);
    });

    test("Read all tasks with pagination and sorting", async () => {
        const response = await request(app).get('/task?sort=priority&limit=2')
            .set("Authorization", "Bearer " + JWT_TOKEN);
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body.data).length).toBe(2);
        expect(response.body.data[0].priority).toBe(1);
    });

    test("Status 200 for delete of task", async () => {

        for(const index in tasks) {
            let response = await request(app).delete('/task/' + index)
                .set("Authorization", "Bearer " + JWT_TOKEN);

            expect(response.statusCode).toBe(200);
        }

        response = await request(app).get('/task/')
            .set("Authorization", "Bearer " + JWT_TOKEN);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('No tasks found!');

    })

})


