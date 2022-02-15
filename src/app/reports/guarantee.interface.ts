import { Compliance } from "../compliances/compliance.model";
import { Direct } from "../directs/direct.model";
import { Material } from "../materials/material.model";

export interface Guarantee {
  _id: string,
  guaranteeType: string,
  // isMarked: boolean,
  status: string
  // materials: Material[],
  // compliances: Compliance[],
  // directs: Direct[],
}