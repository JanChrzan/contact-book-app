export class InvalidDataError extends Error {
  status: number;
  constructor() {
    super("Invalid data.");
    this.status = 400;
  }
}
export class InvalidCredentialsError extends Error {
  status: number;
  constructor() {
    super("Invalid email or password.");
    this.status = 401;
  }
}
export class UserAlreadyExistsError extends Error {
  status: number;
  constructor() {
    super("User with this email already exists.");
    this.status = 400;
  }
}
export class InvalidUserIdError extends Error {
  status: number;
  constructor() {
    super("Invalid user ID.");
    this.status = 401;
  }
}
export class UnauthorizedError extends Error {
  status: number;
  constructor() {
    super("Unauthorized");
    this.status = 401;
  }
}
export class UserNotFoundError extends Error {
  status: number;
  constructor() {
    super("User not found.");
    this.status = 404;
  }
}
export class ContactNotFoundError extends Error {
  status: number;
  constructor() {
    super("Contact not found.");
    this.status = 404;
  }
}
