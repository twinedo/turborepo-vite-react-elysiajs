import { prisma } from "prisma/client"
import type { ExperienceInput, ExperienceUpdateInput } from "./types"


export const createExperience = async (data: ExperienceInput) => {
  return await prisma.experience.create({ data })
}

export const getExperiences = async () => {
  return await prisma.experience.findMany({
    orderBy: [
      { endDate: 'desc' }, // Latest endDate first
      { startDate: 'desc' } // If endDate is null
    ]
  })
}

export const getExperience = async (id: string) => {
  return await prisma.experience.findUnique({ where: { id } })
}

export const updateExperience = async (id: string, data: Partial<ExperienceUpdateInput>) => {
  return await prisma.experience.update({
    where: { id },
    data
  })
}

export const deleteExperience = async (id: string) => {
  return await prisma.experience.delete({ where: { id } })
}