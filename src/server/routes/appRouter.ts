import { Request, Response, Router } from "express";
import { ContactService } from "../service/contactService";

export const appRouter: Router = Router();
const contactService = new ContactService();

appRouter
  .post("/login", async (req: Request, res: Response): Promise<void> => {
    await contactService.login(req, res);
  })
  .post("/register", async (req: Request, res: Response): Promise<void> => {
    await contactService.register(req, res);
  })
  .post("/auth", async (req: Request, res: Response): Promise<void> => {
    await contactService.authenticate(req, res);
  })
  .patch("/update", async (req: Request, res: Response): Promise<void> => {
    await contactService.updateUser(req, res);
  })
  .get("/contact/:id", async (req: Request, res: Response): Promise<void> => {
    await contactService.getContacts(req, res);
  })
  .post("/contact", async (req: Request, res: Response): Promise<void> => {
    await contactService.addContact(req, res);
  })
  .delete(
    "/contact/:id",
    async (req: Request, res: Response): Promise<void> => {
      await contactService.removeContact(req, res);
    }
  )
  .put("/contact", async (req: Request, res: Response): Promise<void> => {
    await contactService.editContact(req, res);
  });
