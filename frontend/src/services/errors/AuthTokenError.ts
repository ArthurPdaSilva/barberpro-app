export class AuthTokenError extends Error {
  constructor() {
    super("Failed authenticated");
  }
}
