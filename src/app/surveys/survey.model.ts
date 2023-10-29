import { ExperienceAdvisorType, ExperienceAttentionType, ExperienceRecommendType, ExperienceTimeType } from "./create-surveys/create-surveys.component"

export interface SurveyModel {
  fromCountry: string
  suggestion: string
  time: ExperienceTimeType
  experienceAdvisor: ExperienceAdvisorType
  experienceAttention: ExperienceAttentionType
  experienceRecommend: ExperienceRecommendType
  createdAt: string
}