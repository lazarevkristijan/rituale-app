export type HabitTypes = {
  id: number
  description: string
  category_1: string
  category_2: string
  category_3: string
  difficulty: string
}

export type UserTypes = {
  id: number
  email: string
  username: string
  profile_picture: string
  first_name: string | null
  last_name: string | null
  priority_category_1: string | null
  priority_category_2: string | null
  priority_category_3: string | null
  country: string | null
  bio: string | null
  pinned_habit: number | null
}

export type CategoryTypes = {
  id: number
  category: string
}

export type BlogTypes = {
  id: number
  title: string
  author: string
  date_posted: string
  link: string
  image_url: string
}

export type BlogDataTypes = {
  title: string
  author: string
  link: string
  image_url: string
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

// SLICE TYPES
export type CompletedHabitsSliceTypes = {
  habits: number[]
}

export type BottomNavSliceTypes = {
  value: number
}

export type SettingsSliceTypes = {
  colorTheme: string
}

export type SessionSliceTypes = {
  user: {
    id: number
    username: string
    email: string
    profile_picture: string
    first_name: string | null
    last_name: string | null
    priority_category_1: string | null
    priority_category_2: string | null
    priority_category_3: string | null
    country: string | null
    bio: string | null
    pinned_habit: number | null
  } | null
}

export type ThemeSliceTypes = {
  value: boolean
}

// END SLICE TYPES

export type HabitFilterTypes =
  | FilterCategoriesTypes
  | FilterDifficultyTypes
  | FilterStatusTypes

export type HomeImageTypes = {
  raw_url: string
  post_url: string
  alt: string
}

export type FilterDialogTypes = {
  isCategoryFilterOpen: boolean
  setIsCategoryFilterOpen: (value: boolean) => void
  filterCategories: FilterCategoriesTypes
  setFilterCategories: (
    value: React.SetStateAction<FilterCategoriesTypes>
  ) => void
  isDifficultyFilterOpen: boolean
  setIsDifficultyFilterOpen: (value: boolean) => void
  filterDifficulties: FilterDifficultyTypes
  setFilterDifficulties: (
    value: React.SetStateAction<FilterDifficultyTypes>
  ) => void
  isStatusFilterOpen: boolean
  setIsStatusFilterOpen: (value: boolean) => void
  filterStatus: FilterStatusTypes
  setFilterStatus: (value: React.SetStateAction<FilterStatusTypes>) => void
  setPage: (page: string) => void
}

export type FilterButtonsTypes = {
  setIsCategoryFilterOpen: (value: React.SetStateAction<boolean>) => void
  setIsDifficultyFilterOpen: (value: React.SetStateAction<boolean>) => void
  setIsStatusFilterOpen: (value: React.SetStateAction<boolean>) => void
  setPage: (value: React.SetStateAction<string | undefined>) => void
  setFilterCategories: (
    value: React.SetStateAction<FilterCategoriesTypes>
  ) => void
  setFilterDifficulties: (
    value: React.SetStateAction<FilterDifficultyTypes>
  ) => void
  setFilterStatus: (value: React.SetStateAction<FilterStatusTypes>) => void
}
