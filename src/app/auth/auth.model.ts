import { UserModel } from "../users/user.model";
import { OfficeModel } from "./office.model";

export interface AuthModel {
  user: UserModel
  office: OfficeModel
}