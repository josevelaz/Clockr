import React, { useEffect, useState } from "react"
import { FlatList, LayoutRectangle, ScrollView, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import { CalendarProps } from "./calendar.props"
import Moment from "moment"
import { extendMoment } from "moment-range"
import reactotron from "reactotron-react-native"

const moment = extendMoment(Moment)

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  // borderWidth: 2,
}
const SELECTOR: ViewStyle = {
  width: 10,
  height: 10,
  backgroundColor: "red",
  alignSelf: "center"
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.text,
  backgroundColor: "white",
}

/**
 * Describe your component here
 */
export function Calendar(props: CalendarProps) {
  const DATE_INTERVAL = 15
  const CURRENT_DATE = moment(new Date())
  const FUTURE_DATE = moment().add(DATE_INTERVAL, "d")
  const PAST_DATE = moment().subtract(DATE_INTERVAL, "d")
  const DATE_RANGE = moment.range(PAST_DATE, FUTURE_DATE)
  const DATES = Array.from(DATE_RANGE.by("d"))

  const { style } = props

  const [selectedDate, setSelectedDate] = useState<Moment.Moment | string>(CURRENT_DATE)
  const [currentDayPOS, setCurrentDayPOS] = useState<LayoutRectangle | undefined>({x: 1, y: 1, width: 1, height: 1})
  const [daysArray, setDaysArray] = useState<Moment.Moment[] | undefined>(DATES)
  const [svWidth, setSvWidth] = useState<number>(0)

  const INTERVAL = svWidth / 6

  return (
    <View style={[CONTAINER, style]}>
      <View style={SELECTOR} />
      <ScrollView
        horizontal
        style={{ height: 60, width: "100%" }}
        snapToInterval={INTERVAL + 5}
        pagingEnabled
        snapToAlignment="center"
        contentInset={{top: 0, bottom: 0, left: 20, right: 20}}
        contentOffset={{ x: (currentDayPOS.x - INTERVAL * 2.5), y: 0 }}
        decelerationRate={0}
        disableIntervalMomentum
        onLayout={({ nativeEvent }) => setSvWidth(nativeEvent.layout.width)}
      >
        {daysArray.map((d) => (
          <View
            key={d.format("MM-DD")}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: INTERVAL,
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 2.5,
              marginVertical: 10
            }}
            onLayout={({ nativeEvent }) => CURRENT_DATE.format("MM-DD") === d.format("MM-DD") && setCurrentDayPOS(nativeEvent.layout)}
          >
              <Text style={{ color: color.primary, fontWeight: "600" }}>{CURRENT_DATE.format("MM-DD") === d.format("MM-DD") ? "Today" : ""}</Text>
            <Text
              style={{
                color:
                CURRENT_DATE.format("MM-DD") === d.format("MM-DD") ? color.primary : color.text,
              }}
              >
              {`${d.format("ddd")}  ${d.format("DD")}`}
            </Text>
            {/* <Text>{d.format("")}</Text> */}
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
