export type HabitTypes = {
  id: number
  description: string
  category_1: string
  category_2: string
  category_3: string
  difficulty: string
}

export type CompletedHabitTypes = {
  id: number
  user_id: number
  habit_id: number
  completion_date: string
}

export type UserSettingsTypes = {
  id: number
  user_id: number
  setting_id: number
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
