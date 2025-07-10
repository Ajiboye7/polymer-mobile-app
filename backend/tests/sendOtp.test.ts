import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import { updateIdentity } from "../src/controller/IdentityController";
import User from "../src/models/UserModels";
import * as requiredAuthModule from "../src/middleware/requiredAuth";

jest.mock("../src/config/env", () => ({
  JWT_SECRET: "test-secret",
}));

jest.mock("../src/middleware/requiredAuth");

describe("update user identity test", () => {
  let userId: string;

  beforeEach(async () => {
    userId = new mongoose.Types.ObjectId().toString();
    await User.create({
      _id: userId,
      name: "Jane Doe",
      account: "1234567890",
      email: "jane@example.com",
      password: "password123!",
      //identityType: "nin",
    });

    jest
      .spyOn(requiredAuthModule, "default")
      .mockImplementation(
        async (
          req: Request,
          res: Response,
          next: NextFunction
        ): Promise<any> => {
          if (req.headers.authorization === "Bearer mocked-token") {
            req.user = { _id: userId.toString() };
            return next();
          } else {
            return res.status(401).json({
              success: false,
              message: "Invalid or missing token",
            });
          }
        }
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("successful update", () => {
    test("should successfully update user identity", async () => {
      const response = await request(app)
        .put("/api/auth/add-identity-type")
        .set("Authorization", "Bearer mocked-token")
        .send({ identityType: "bvn" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "Identity type updated successfully",
        data: {
          identityType: "bvn",
        },
      });
    });
  });

  describe("Validation error", () => {
    test("should return 400 for an empty identity type", async () => {
      const response = await request(app)
        .put("/api/auth/add-identity-type")
        .set("Authorization", "Bearer mocked-token")
        .send({
          /*identityType: "bvn" */
        })
        .expect(400);
      expect(response.body).toEqual({
        success: false,
        message: "Identity type are required",
      });
    });
  });

  describe("Unauthorized request", () => {
    test("should return 401 for invalid or missing user id ", async () => {
      jest
        .spyOn(requiredAuthModule, "default")
        .mockImplementation(
          async (
            req: Request,
            res: Response,
            next: NextFunction
          ): Promise<any> => {
            // Simulate a logged-in request where user ID is missing
            req.user = { _id: "" }; // or omit setting it at all
            return next();
          }
        );
      const response = await request(app)
        .put("/api/auth/add-identity-type")
        .set("Authorization", "Bearer mocked-token")
        .send({ identityType: "bvn" })
        .expect(401);

      expect(response.body).toEqual({
        success: false,
        message: "Request is not authorized",
      });
    });
  });

  describe("Non existing user", () => {
    test("should return 404 if user does not exist", async () => {
      await User.deleteOne({ _id: userId });

      const response = await request(app)
        .put("/api/auth/add-identity-type")
        .set("Authorization", "Bearer mocked-token")
        .send({ identityType: "bvn" })
        .expect(404);

      expect(response.body).toEqual({
        success: false,
        message: "User not found",
      });
    });
  });

  describe("Internal server error", () => {
    test("should return 500 for database error", async () => {
      await mongoose.connection.close();

      const response = await request(app)
        .put("/api/auth/add-identity-type")
        .set("Authorization", "Bearer mocked-token")
        .send({ identityType: "bvn" })
        .expect(500);

      expect(response.body).toEqual({
        success: false,
        message: "Internal server error during identity update",
      });
    });
  });
});
