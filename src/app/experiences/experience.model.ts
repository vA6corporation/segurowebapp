export interface ExperienceModel {
  object: string
  contractor: string
  startAt: string
  location: string
  timeLimit: string
  advancePercent: string
  tenderObjectContract: string

  typeWork: string
  endingDate: string
  signaturetAt: string
  faithfulCompliance: string
  directAdvance: string
  advanceMaterials: string
  bondingEntity: string
  income: ExperienceModelIncome[]

  nameSuretyEntities: string
  nameConsortium: string
  bondedConsortium: string
  participationConsortium: string

  nameOtherConsortium: string
  participationOtherConsortium: string
}
export interface ExperienceModelIncome {
  year: string
  amount: number
}