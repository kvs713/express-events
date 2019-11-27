import express from "express";
import bodyParser from "body-parser";
// import eventRoutes from "./server/routes/EventRoutes";
import EventController from "./server/controllers/EventController";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;
// when a random route is inputed

app.get("/events", EventController.getEvents);
app.post("/events", EventController.createEvent);
app.get("/events/summary", EventController.getEventSummary);
app.post("/events/clear", EventController.deleteAllEvents);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the express-events API."
  })
);
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;
