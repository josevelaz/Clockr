import * as React from "react"
import { FlatList, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { TasksProps } from "./tasks.props"
import { CONTAINER, TEXT } from "./tasks.styles"

/**
 * Describe your component here
 */
export const Tasks = observer(function Tasks(props: TasksProps) {
  const { style } = props

  return null
})
