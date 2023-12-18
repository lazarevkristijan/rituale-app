export type HabitTypes = {
  id: number
  description: string
  category_1: string
  category_2: string
  category_3: string
  difficulty: string
}

export type CategoryTypes = {
  id: number
  category: string
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

export type FilterCategoriesTypes = {
  health: boolean
  appearance: boolean
  communication: boolean
  finance: boolean
  productivity: boolean
  creativity: boolean
  networking: boolean
  relationships: boolean
  personal_growth: boolean
}

export type FilterDifficultyTypes = {
  easy: boolean
  medium: boolean
  hard: boolean
}

export type FilterStatusTypes = {
  completed: boolean
  not_completed: boolean
}

export type FilterTypes = {
  categories: FilterCategoriesTypes
  difficulty: FilterDifficultyTypes
  status: FilterStatusTypes
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
    priority_category_1: string | null
    priority_category_2: string | null
    priority_category_3: string | null
    country: string | null
    bio: string | null
    profile_picture: string | null
  } | null
}

export type ThemeSliceTypes = {
  value: boolean
}

// END SLICE TYPES
