export type HabitTypes = {
  id: number
  description: string
  category: string
}

export type CompletedHabitTypes = {
  id: number
  userid: number
  habitid: number
  completionDate: string
}
