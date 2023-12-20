// CONNECTED TO ../CLIENT/SRC/REGEX.TS - WHEN CHANGING THIS FILE, CHANGE BOTH

export const emailRegex = /^(?=.{1,255}$)[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,255}$/
export const nameRegex = /^[a-zA-Z]{3,50}$/
export const profanityRegex =
  /\b(fucker|fucking|fuck|stupid|loser|bitch|dumbass|lesbian|gay|dick|pussy|idiot|nigga|nigger|cock|shit|crap|asshole|condom)\b/i
