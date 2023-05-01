import express, { Router } from "express";
import GroupsController from "../controllers/group.controller";

const router: Router = express.Router();

router.post("/", GroupsController.createGroup);

router.put("/:id", GroupsController.updateGroup);

router.get("/:id", GroupsController.getGroupById);

router.delete("/:id", GroupsController.deleteGroup);

export default router;
