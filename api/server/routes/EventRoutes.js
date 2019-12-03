import { Router } from "express";
import EventController from "../controllers/EventController";

const router = Router();

router.get("/events", EventController.getEvents);
router.post("/events", EventController.createEvent);

export default router;
