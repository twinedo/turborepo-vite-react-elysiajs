export interface Experience {
  id: string
  company: string
  position: string
  startDate: Date
  endDate?: Date | null
  description?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ExperienceInput {
  company: string
  position: string
  startDate: Date
  endDate?: Date | null
  description?: string | null
}

export interface ExperienceUpdateInput extends Partial<ExperienceInput> {}