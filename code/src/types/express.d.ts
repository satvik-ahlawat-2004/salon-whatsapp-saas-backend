import { JwtPayload } from "../utils/jwt";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends JwtPayload {}

    interface Request {
      user?: User;
      salonId?: string;
    }
  }
}

export {};

