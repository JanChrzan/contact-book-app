import { Router } from "express";
import { ContactService } from "../service/contactService";
import { createRouteHandler } from "../utils/createRouteHandler";

export const appRouter: Router = Router();
const contactService = new ContactService();

appRouter
  .post("/login", createRouteHandler(contactService.login))
  .post("/register", createRouteHandler(contactService.register))
  .post("/auth", createRouteHandler(contactService.authenticate))
  .patch("/update", createRouteHandler(contactService.updateUser))
  .get("/contact/:id", createRouteHandler(contactService.getContacts))
  .post("/contact", createRouteHandler(contactService.addContact))
  .delete("/contact/:id", createRouteHandler(contactService.removeContact))
  .put("/contact", createRouteHandler(contactService.editContact));
