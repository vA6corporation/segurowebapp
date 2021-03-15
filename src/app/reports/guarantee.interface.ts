import { Compliance } from "../compliances/compliance.model";
import { Direct } from "../directs/direct.model";
import { Material } from "../materials/material.model";

export interface Guarantee {
  materials: Material[],
  compliances: Compliance[],
  directs: Direct[],
}