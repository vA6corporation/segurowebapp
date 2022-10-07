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
  faithfulCompliance: string
  directAdvance: string
  advanceMaterials: string
  bondingEntity: string
  income: ExperienceModelIncome[]
}
export interface ExperienceModelIncome {
  year: string
  amount: number
}