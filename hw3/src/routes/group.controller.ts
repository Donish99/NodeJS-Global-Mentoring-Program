import { Request, Response } from "express";
import GroupService from "../services/group.service";
import Joi from "joi";
import { logger } from "../config";

const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().required(),
});

class GroupController {
  async createGroup(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = groupSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: error.message });
        return;
      }
      const group = await GroupService.createGroup(req.body);
      res.status(201).json(group);
    } catch (error: any) {
      logger.error(`Error in GroupController.createGroup: ${error.message}`, {
        args: [req.params.id],
        error,
      });

      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateGroup(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { error } = groupSchema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }
      const group = await GroupService.updateGroup(id, req.body);
      if (group === 1) {
        res.status(200).json({ message: `Group with id ${id} updated` });
      } else {
        res.status(404).json({ message: `Group with id ${id} not found` });
      }
    } catch (error: any) {
      logger.error(`Error in GroupController.updateGroup: ${error.message}`, {
        args: [req.params.id],
        error,
      });

      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getGroupById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const group = await GroupService.getGroupById(id);
      if (group) {
        res.status(200).json(group);
      } else {
        res.status(404).json({ message: `Group with id ${id} not found` });
      }
    } catch (error: any) {
      logger.error(`Error in GroupController.getGroupById: ${error.message}`, {
        args: [req.params.id],
        error,
      });

      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteGroup(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const deletedCount = await GroupService.deleteGroup(id);
      if (deletedCount === 1) {
        res.status(200).json({ message: `Group with id ${id} deleted` });
      } else {
        res.status(404).json({ message: `Group with id ${id} not found` });
      }
    } catch (error: any) {
      logger.error(`Error in GroupController.deleteGroup: ${error.message}`, {
        args: [req.params.id],
        error,
      });

      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new GroupController();
