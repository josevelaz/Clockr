import React, { useEffect, useRef, useState } from "react"
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { color, typography } from "../../theme"
import { CalendarProps, DATE } from "./calendar.props"
import moment from "moment"
import { Text } from "../text/text"
import reactotron from "reactotron-react-native"

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
  color: color.primary,
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

  const dayRef = useRef<ScrollView>(null)
  const monthRef = useRef<ScrollView>(null)
  const yearRef = useRef<ScrollView>(null)

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
  const scrollToCurrentDate = () => {
    dayRef.current.scrollTo({ y: (parseInt(currentDay) - 1) * 100 }, 100)
    monthRef.current.scrollTo({ y: (parseInt(currentMonth) - 1) * 100 }, 100)
    yearRef.current.scrollTo({ y: (parseInt(currentYear) - 1) * 100 }, 100)
  }

  const { style, getDate } = props

  useEffect(() => {
    getDate && getDate(date)
  }, [date])

  useEffect(() => {
    setTimeout(scrollToCurrentDate, 500)
  }, [])

  return (
    <View style={[CONTAINER, style]}>
      <ScrollView
        style={{ height: HEIGHT }}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(event) => scrollListener("day", setDate, date, event)}
        ref={dayRef}
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
        ref={monthRef}
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
        ref={yearRef}
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
