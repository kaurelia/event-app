import request from "supertest";
import { app, server } from "~root/index";

afterAll(() => {
  server.close();
});

const correctEvent = {
  name: "Test",
  surname: "Test",
  date: new Date(),
  email: "test@test.com",
};

const badEvent = {
  name: 32123,
  surname: "",
  date: "2017077 . ",
};

describe("POST /event", () => {
  it("add event with success by REST", (done) => {
    request(app)
      .post("/event")
      .set("Accept", "application/json")
      .send(correctEvent)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201)
      .end(done);
  });

  it("add event to check validation by REST", (done) => {
    request(app)
      .post("/event")
      .set("Accept", "application/json")
      .send(badEvent)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(400, {
        error: [
          "Name must be a string",
          "Surname required",
          "Email required",
          "Date must be a date",
        ],
      })
      .end(done);
  });
});
