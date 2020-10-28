import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { Calendar } from "./calendar"
import { CalendarDateTile } from "../calendar-date-tile/calendar-date-tile"
import moment from "moment"

storiesOf("Calendar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Date Picker" usage="Date picker used to select the date of tasks." noPad>
        <Calendar />
      </UseCase>
    </Story>
  ))
