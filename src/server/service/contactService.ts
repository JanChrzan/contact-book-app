import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Contact, IContact } from "../schema/contactSchema.js";
import { IUser, User } from "../schema/userSchema.js";
import {
  ContactNotFoundError,
  InvalidCredentialsError,
  InvalidDataError,
  InvalidUserIdError,
  UnauthorizedError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from "../utils/Errors.js";

export class ContactService {
  public async login(
    req: Request,
    res: Response<{ message: string; data: string }>
  ): Promise<void> {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne(
      { email },
      { _id: false, __v: false }
    );

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    res
      .status(200)
      .json({ message: "User logged in successfully.", data: user.id });
  }

  public async register(
    req: Request,
    res: Response<{ message: string; data: string }>
  ): Promise<void> {
    const { id, fullName, email, password } = req.body;
    const ip: string = req.header("header-ip") || "error";
    const userExists: { _id: any } | null = await User.exists({ email });

    if (userExists) {
      throw new UserAlreadyExistsError();
    }

    if (!password) {
      throw new InvalidDataError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = new User({
      id,
      fullName,
      email,
      password: hashedPassword,
      ipAddress: ip,
    });

    try {
      await user.save();
    } catch {
      throw new InvalidDataError();
    }

    res
      .status(200)
      .json({ message: "User registered successfully.", data: user.id });
  }

  public async authenticate(
    req: Request,
    res: Response<{ message: string; data: string }>
  ): Promise<void> {
    const { id } = req.body;
    const ip = req.header("header-ip") || "error";
    const user: IUser | null = await User.findOne(
      { id },
      { _id: false, __v: false }
    );

    if (!user) {
      throw new InvalidUserIdError();
    }

    if (user.ipAddress !== ip && user.ipAddress === "error") {
      throw new UnauthorizedError();
    }

    res
      .status(200)
      .json({ message: "User authenticated successfully.", data: user.id });
  }

  public async updateUser(
    req: Request,
    res: Response<{ message: string; data: string }>
  ): Promise<void> {
    const { id } = req.body;
    const ip = req.header("header-ip") || "error";
    const user = await User.findOneAndUpdate(
      { id },
      { ipAddress: ip },
      { new: true }
    );

    if (!user) {
      throw new UserNotFoundError();
    }

    res
      .status(200)
      .json({ message: "User updated successfully.", data: user.id });
  }

  public async getContacts(
    req: Request,
    res: Response<{ message: string; data: IContact[] }>
  ): Promise<void> {
    const ownerId = req.params.id;
    const contacts: IContact[] = await Contact.find(
      { ownerId: ownerId },
      { _id: false, __v: false }
    );

    res
      .status(200)
      .json({ message: "Contacts fetched successfully.", data: contacts });
  }

  public async addContact(
    req: Request,
    res: Response<{ message: string }>
  ): Promise<void> {
    const { id, ownerId, fullName, address, email, phoneNumber, notes } =
      req.body;
    const contact: IContact = new Contact({
      id,
      ownerId,
      fullName,
      address,
      email,
      phoneNumber,
      notes,
    });

    try {
      await contact.save();
    } catch {
      throw new InvalidDataError();
    }

    res.status(200).json({ message: "Contact added successfully." });
  }

  public async removeContact(
    req: Request,
    res: Response<{ message: string }>
  ): Promise<void> {
    const id = req.params.id;
    const contact: IContact | null = await Contact.findOne(
      { id: id },
      { _id: false, __v: false }
    );

    if (!contact) {
      throw new ContactNotFoundError();
    }

    await Contact.findOneAndRemove({ id: req.params.id });

    res.status(200).json({ message: "Contact removed successfully." });
  }

  public async editContact(
    req: Request,
    res: Response<{ message: string }>
  ): Promise<void> {
    const { id, ownerId, fullName, address, email, phoneNumber, notes } =
      req.body;
    const updatedContact: IContact | null = await Contact.findOneAndUpdate(
      { id: id },
      { ownerId, fullName, address, email, phoneNumber, notes },
      { new: true }
    );

    if (!updatedContact) {
      throw new ContactNotFoundError();
    }

    res.status(200).json({ message: "Contact edited successfully." });
  }
}
