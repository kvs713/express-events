import database from "../src/models";

class EventService {
  static async getAllEvents() {
    try {
      console.log("GET ALL EVENTS");
      return await database.Event.findAll({
        order: [["date", "ASC"]],
        attributes: ["date", "user", "type", "message", "otheruser"]
      });
    } catch (error) {
      throw error;
    }
  }

  static async getEventsByDateRange(req) {
    try {
      console.log("GET ALL EVENTS BY DATE!");
      const Op = database.Sequelize.Op;
      return await database.Event.findAll({
        where: {
          date: {
            [Op.lte]: req.query.to,
            [Op.gte]: req.query.from
          }
        },
        order: [["date", "ASC"]],
        // attributes: { exclude: ["id", "createdAt", "updatedAt"] }
        attributes: ["date", "user", "type", "message", "otheruser"]
      });
    } catch (error) {
      throw error;
    }
  }

  static async createEvent(event) {
    try {
      return await database.Event.create(event);
    } catch (error) {
      throw error;
    }
  }

  static async getEventSummaryByDateAndDuration(req) {
    try {
      console.log("GET EVENT SUMMARY");
      const Op = database.Sequelize.Op;
      const countEnters = await database.Event.count({
        where: {
          type: "enter",
          date: {
            [Op.lte]: req.query.to,
            [Op.gte]: req.query.from
          }
        }
      });
      const countLeaves = await database.Event.count({
        where: {
          type: "leave",
          date: {
            [Op.lte]: req.query.to,
            [Op.gte]: req.query.from
          }
        }
      });
      const countComments = await database.Event.count({
        where: {
          type: "comment",
          date: {
            [Op.lte]: req.query.to,
            [Op.gte]: req.query.from
          }
        }
      });
      const countHighfives = await database.Event.count({
        where: {
          type: "highfive",
          date: {
            [Op.lte]: req.query.to,
            [Op.gte]: req.query.from
          }
        }
      });

      let summary = {
        date: req.query.to, // not correct, but I need some date
        enters: countEnters,
        leaves: countLeaves,
        comments: countComments,
        highfives: countHighfives
      };
      return summary;
    } catch (error) {
      throw error;
    }
  }

  static async deleteAllEvents() {
    try {
      return await database.Event.destroy({ where: {} });
    } catch (error) {
      throw error;
    }
  }
}

export default EventService;
