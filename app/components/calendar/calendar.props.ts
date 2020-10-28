import { ViewStyle } from "react-native"
export interface CalendarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  getDate?: (date: DATE) => void
}

export interface DATE {
  day: number
  month: number
  year: number
}
