// import { ModuleModel } from "../navigation/module.model";
import { UserModel } from "../users/user.model";
import { BusinessModel } from "./business.model";
import { OfficeModel } from "./office.model";
// import { SettingsModel } from "./settings.model";

export interface AuthModel {
  user: UserModel
  business: BusinessModel|null
  office: OfficeModel
  // settings: SettingsModel
  // modules: ModuleModel[]
}