import EventService from "../services/EventService";
import moment from "moment";

class EventController {
  static async getEvents(req, res) {
    try {
      if (req.query.from && req.query.to) {
        const allEvents = await EventService.getEventsByDateRange(req);
        return res.json({ events: allEvents });
      } else {
        const allEvents = await EventService.getAllEvents();
        return res.json({ events: allEvents });
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  // unfinished
  static async getEventSummary(req, res) {
    try {
      if (req.query.from && req.query.to && req.query.by) {
        const momentTo = moment().format(req.query.to);
        const momentFrom = moment().format(req.query.from);
        console.log("moment to: ", momentTo);
        console.log("moment from: ", momentFrom);
        console.log("by: ", req.query.by);
        console.log(
          "date diff: ",
          moment(momentTo).diff(moment(momentFrom), "days", true)
        ); // takes days, hours, minutes
        let timeFrame = req.query.by;
        // if (timeFrame === "day") {
        // }
        const getSummary = await EventService.getEventSummaryByDateAndDuration(req);
        let eventSummary = [];
        return res.json({ events: getSummary });
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  static async createEvent(req, res) {
    // event fields 'user', 'date', and 'type' must be included
    if (!req.body.user || !req.body.date || !req.body.type) {
      return res.status(400).json({ status: "error" });
    }

    // type must be one of following: enter, exit, comment, highfive
    if (
      req.body.type !== "enter" &&
      req.body.type !== "leave" &&
      req.body.type !== "comment" &&
      req.body.type !== "highfive"
    ) {
      return res.status(400).json({ status: "error" });
    }

    // event type 'comment' must include valid 'message'
    if (req.body.type === "comment" && !req.body.message) {
      return res.status(400).json({ status: "error" });
    }

    // event type 'highfive' must include valid 'otheruser'
    if (req.body.type === "highfive" && !req.body.otheruser) {
      return res.status(400).json({ status: "error" });
    }
    const newEvent = {
      date: req.body.date,
      user: req.body.user,
      type: req.body.type,
      otheruser: req.body.otheruser,
      message: req.body.message
    };

    try {
      await EventService.createEvent(newEvent);
      return res.json({ status: "ok" });
    } catch (error) {
      return res.status(400).json({ status: "error" });
    }
  }

  static async deleteAllEvents(req, res) {
    try {
        await EventService.deleteAllEvents();
        return res.json({ status: "ok" });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

export default EventController;
