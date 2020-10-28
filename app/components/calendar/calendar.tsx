import React, { useEffect, useState } from "react"
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { color, typography } from "../../theme"
import { CalendarProps } from "./calendar.props"
import Moment from "moment"
import { extendMoment } from "moment-range"
import { Text } from "../text/text"

const moment = extendMoment(Moment)

const CONTAINER: ViewStyle = {
  flexDirection: "row",
}
const SCROLL_PAGE: ViewStyle = {
  height: 100,
  padding: 20,
}

const SCREEN: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontSize: 32,
  fontWeight: "600",
}

interface DATE {
  day: number
  month: number
  year: number
}

const HEIGHT = 100

const scrollListener = (
  type: "year" | "month" | "day",
  updateState: React.Dispatch<React.SetStateAction<DATE>>,
  state: DATE,
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => {
  updateState({
    ...state,
    [type]: Math.round(event.nativeEvent.contentOffset.y / HEIGHT) + 1,
  })
}

/**
 * Describe your component here
 */
export function Calendar(props: CalendarProps) {
  const [date, setDate] = useState<DATE>({
    day: 1,
    month: 1,
    year: 2015,
  })

  const currentDay = moment().format("DD")
  const currentMonth = moment().format("MM")
  const currentYear = moment().format("YYYY")

  // List of all months
  const allMonths = moment.monthsShort()
  // List of days in a particular month and year
  const daysInMonth = moment(`${date.year}-${date.month}`, "YYYY-MM").daysInMonth()
  const days = []
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d)
  }
  // List of all years between 1900 and today
  const years = []
  for (let y = 2015; y <= parseInt(currentYear); y++) {
    years.push(y)
  }
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      {/* <View style={SELECTOR} /> */}
      <ScrollView
        style={{ height: HEIGHT }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(event) => scrollListener("day", setDate, date, event)}
      >
        {days.map((d) => (
          <Item key={d} text={d} />
        ))}
      </ScrollView>
      <ScrollView
        style={{ height: HEIGHT }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(event) => scrollListener("month", setDate, date, event)}
      >
        {allMonths.map((d) => (
          <Item key={d} text={d} />
        ))}
      </ScrollView>
      <ScrollView
        style={{ height: HEIGHT }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(event) => scrollListener("year", setDate, date, event)}
      >
        {years.map((d) => (
          <Item key={d} text={d} />
        ))}
      </ScrollView>
    </View>
  )
}

const Item = (props) => {
  return (
    <View style={SCROLL_PAGE}>
      <View style={SCREEN}>
        <Text style={TEXT}>{props.text}</Text>
      </View>
    </View>
  )
}
