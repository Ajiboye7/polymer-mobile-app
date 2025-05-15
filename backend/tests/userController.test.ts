import request from "supertest";
import app from "../src/app";
import User from "../src/models/UserModels";

beforeEach(async () => {
    await User.deleteMany(); // Clears database before each test
  });

describe("User Controller", () => {
  test("Should create a new user with token", async () => {
    const res = await request(app).post("/api/auth/sign-up").send({
      name: "John Doe",
      account: "1234567",
      email: "john@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });

    expect(res.body.success).toBe(true);
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.token).toBeDefined();
  });

  test("should not create a new user with with existing email", async () => {
    await request(app).post("/api/auth/sign-up").send({
      name: "John Doe",
      account: "1234567",
      email: "john@gmail.com",
      password: "Password123!",
      confirmPassword: "Password123!",
    });

    const res = await request(app).post("/api/auth/sign-up").send({
        name: "Jane Doe",
        account: "789012",
        email: "john@gmail.com",
        password: "Test@123",
        confirmPassword: "Test@123",
      });

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe("email already exists")
  });

  test("should log in a user and return  token", async() => {
    await User.signUp("John Doe", "1234567", "john@gmail.com", "Password123!", "Password123!")

    const res = await request(app).post('/api/auth/sign-in').send({
        email:"john@gmail.com",
        password: "Password123!"
    })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.data.token).toBeDefined()
  })

  test("should not log in a user with account that doesn't exist", async ()=>{
    
    const res = await request(app).post('/api/auth/sign-in').send({
        email: "doesnotexist@gmail.com",
        password:"Password123!"
    })
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe("User does not exist")
  })

 test("should not log in a user with incorrect password", async () => {
  await User.signUp("John Doe", "1234567", "john@gmail.com", "Password123!", "Password123!");

  const res = await request(app).post("/api/auth/sign-in").send({
    email: "john@gmail.com",
    password: "wrongpassword",
  });

  console.log(res.body); // 🔍 Log response to check if user exists

  expect(res.statusCode).toBe(400);
  expect(res.body.error).toBe("Incorrect password");
});


});
