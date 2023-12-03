export type HabitTypes = {
  id: number
  description: string
  category: string
  difficulty: string
}

export type CompletedHabitTypes = {
  id: number
  userid: number
  habitid: number
  completionDate: string
}

export type UserSettingsTypes = {
  id: number
  userid: number
  settingid: number
  value: string
}

// SLICE TYPES
export type CompletedHabitsSliceTypes = {
  habits: number[]
}

export type BottomNavSliceTypes = {
  value: number
}

export type SettingsSliceTypes = {
  colorTheme: string
  language: string
}

export type SessionSliceTypes = {
  user: {
    first_name: string
    last_name: string
    email: string
    id: number
    password: string
  } | null
}

export type ThemeSliceTypes = {
  value: boolean
}

// END SLICE TYPES
