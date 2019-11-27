import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;

describe("Testing the event endpoints:", () => {
  it("It should create a new enter event", done => {
    const event = {
      date: "1985-10-26T09:50:00Z",
      user: "Doc",
      type: "enter"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        console.log('res.body: ', res.body)
        expect(res.body).to.include({ status: "ok" });
        done();
      });
  });

  it("It should create a new leave event", done => {
    const event = {
      date: "1985-10-27T09:50:00Z",
      user: "Doc",
      type: "leave"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        console.log("res.body: ", res.body);
        expect(res.body).to.include({ status: "ok" });
        done();
      });
  });

  it("It should create a new comment event", done => {
    const event = {
      date: "1985-10-28T09:50:00Z",
      user: "Doc",
      type: "comment",
      message: "hello"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        console.log('res.body: ', res.body)
        expect(res.body).to.include({ status: "ok" });
        done();
      });
  });
  it("It should create a new highfive event", done => {
    const event = {
      date: "1985-10-29T09:50:00Z",
      user: "Doc",
      type: "highfive",
      otheruser: "Marty"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        console.log("res.body: ", res.body);
        expect(res.body).to.include({ status: "ok" });
        done();
      });
  });

  it("It should not create an event with incomplete parameters", done => {
    const event = {
      date: "1985-10-26T09:50:00Z",
      user: "Doc"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should not create a comment event without message", done => {
    const event = {
      date: "1985-10-26T09:50:00Z",
      user: "Doc",
      type: "comment"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should not create a highfive event without otheruser", done => {
    const event = {
      date: "1985-10-26T09:50:00Z",
      user: "Doc",
      type: "highfive"
    };
    chai
      .request(app)
      .post("/events")
      .set("Accept", "application/json")
      .send(event)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all events", done => {
    chai
      .request(app)
      .get("/events")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        console.log("all books res.body: ", res.body)
        res.body.events[0].should.have.property("date");
        res.body.events[0].should.have.property("user");
        res.body.events[0].should.have.property("type");
        res.body.events[0].should.have.property("message");
        res.body.events[0].should.have.property("otheruser");
        done();
      });
  });
  it("It should get all events within a date range", done => {
    chai
      .request(app)
      .get("/events?from=1985-10-26T09:00:00Z&to=1985-10-27T09:50:00Z")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        console.log("all books res.body: ", res.body);
        res.body.events[0].should.have.property("date");
        res.body.events[0].should.have.property("user");
        res.body.events[0].should.have.property("type");
        res.body.events[0].should.have.property("message");
        res.body.events[0].should.have.property("otheruser");
        res.body.events[1].should.have.property("date");
        res.body.events[1].should.have.property("user");
        res.body.events[1].should.have.property("type");
        res.body.events[1].should.have.property("message");
        res.body.events[1].should.have.property("otheruser");
        done();
      });
  });
});
