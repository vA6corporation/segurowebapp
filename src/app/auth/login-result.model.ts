import { UserModel } from "../users/user.model";
import { OfficeModel } from "./office.model";

export interface LoginResultModel {
    accessToken: string,
    user: UserModel,
    office: OfficeModel|null,
}