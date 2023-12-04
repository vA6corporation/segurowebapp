export interface ExperienceModel {
    contractor: string
    startAt: string
    location: string
    timeLimit: string
    advancePercent: string
    tenderObjectContract: string
    price: number
    isCompleted: boolean
    isArbitration: boolean
    isOperator: boolean
    isConsorcio: boolean
    isCommonRepresentative: boolean

    typeWork: string
    endingDate: string
    signaturetAt: string
    faithfulCompliance: string
    directAdvance: string
    advanceMaterials: string
    bondingEntity: string
    incomes: ExperienceModelIncome[]
    othersConsortium: any[]

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