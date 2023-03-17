import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Contact } from "../schema/contactSchema";
import { User } from "../schema/userSchema";
import { handleError } from "../utils/handleError";
import { handleStatus } from "../utils/handleStatus";

export class ContactService {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }, { _id: false, __v: false });

      if (!user) {
        return handleStatus(res, 401, "Invalid email or password.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return handleStatus(res, 401, "Invalid email or password.");
      }

      res.send(user.id);
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { id, fullName, email, password } = req.body;
      const ip = req.header("header-ip") || "error";

      const userExists = await User.exists({ email });
      if (userExists) {
        return handleStatus(res, 400, "User with this email already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        id,
        fullName,
        email,
        password: hashedPassword,
        ipAddress: ip,
      });
      await user.save();
      res.send(user.id);
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async authenticate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const ip = req.header("header-ip") || "error";
      const user = await User.findOne({ id }, { _id: false, __v: false });

      if (!user) {
        return handleStatus(res, 401, "Invalid user ID.");
      }

      if (user.ipAddress !== ip && user.ipAddress === "error") {
        return handleStatus(res, 401, "Unauthorized");
      }

      res.send(user.id);
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const ip = req.header("header-ip") || "error";

      const user = await User.findOneAndUpdate(
        { id },
        { ipAddress: ip },
        { new: true }
      );

      if (!user) {
        return handleStatus(res, 404, "User not found.");
      }

      res.send(user.id);
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async getContacts(req: Request, res: Response): Promise<void> {
    try {
      const ownerId = req.params.id;
      const contacts = await Contact.find(
        { ownerId: ownerId },
        { _id: false, __v: false }
      );
      res.send(contacts);
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async addContact(req: Request, res: Response): Promise<void> {
    try {
      const { id, ownerId, fullName, address, email, phoneNumber, notes } =
        req.body;
      const contact = new Contact({
        id,
        ownerId,
        fullName,
        address,
        email,
        phoneNumber,
        notes,
      });
      await contact.save();
      return handleStatus(res, 200, "Contact added successfully.");
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async removeContact(req: Request, res: Response): Promise<void> {
    try {
      await Contact.findOneAndRemove({ id: req.params.id });
      return handleStatus(res, 200, "Contact removed successfully.");
    } catch (err) {
      return handleError(res, 400, err);
    }
  }

  public async editContact(req: Request, res: Response): Promise<void> {
    try {
      const { id, ownerId, fullName, address, email, phoneNumber, notes } =
        req.body;
      const updatedContact = await Contact.findOneAndUpdate(
        { id: id },
        { ownerId, fullName, address, email, phoneNumber, notes },
        { new: true }
      );
      if (!updatedContact) {
        return handleStatus(res, 404, "Contact not found.");
      }
      return handleStatus(res, 200, "Contact edited successfully.");
    } catch (err) {
      return handleError(res, 400, err);
    }
  }
}
