import { ImageInterface } from "./image";

export interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  avatar: ImageInterface;
  coverImage: ImageInterface | null;
}
