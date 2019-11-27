import { Router } from "express";
import EventController from "../controllers/EventController";

const router = Router();

router.get("/events", EventController.getEvents);
router.post("/events", EventController.createEvent);
// router.get("/:id", BookController.getABook);
// router.put("/:id", BookController.updatedBook);
// router.delete("/:id", BookController.deleteBook);

export default router;
