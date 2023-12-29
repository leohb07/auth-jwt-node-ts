import { Request, Response } from "express";
import { TEvent } from "../types/event.type";
import { EventSchema } from "../models/event.model";
import jwt from "jsonwebtoken";
import { TTokenDecoded } from "../types/token-decoded.type";

class EventService {
  public async create(request: Request, response: Response) {
    try {
      const { description, dayOfWeek } = request.body as TEvent;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: "Access token is missing",
        });
        return;
      }

      const token = authorizationHeader.split(" ")[1];

      const tokenDecoded = jwt.decode(token) as TTokenDecoded;

      const newEvent = await EventSchema.create({
        description,
        dayOfWeek,
        userId: tokenDecoded?._id,
      });

      response.status(201).json({
        _id: newEvent?.id,
        description,
        dayOfWeek,
        userId: newEvent?.userId,
      });
    } catch (error: any) {
      response.status(500).json({
        success: false,
        message: error.message.toString(),
      });
    }
  }
}

export default new EventService();
