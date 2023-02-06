import dayjs from "dayjs";
import { Component, createSignal, onMount } from "solid-js";
import isToday from "dayjs/plugin/isToday";

import Poster from "./Poster";

dayjs.extend(isToday);

export interface CalenderDatesProps {
  date: string;
}
const CalenderDates: Component<CalenderDatesProps> = ({ date }) => {
  let elementRef: HTMLHeadingElement | undefined;
  const [isToday, setIsToday] = createSignal(false);

  onMount(() => {
    if (dayjs(date).isToday()) {
      setIsToday(true);
      elementRef?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  });

  return (
    <div class="container" ref={elementRef}>
      <div class={`calender_date ${isToday() ? "today" : ""}`}>
        <h3>
          <span>{dayjs(date).format("DD")}</span>
          <label>{dayjs(date).format("dddd")}</label>
        </h3>
        <Poster date={date} />
      </div>
    </div>
  );
};

export default CalenderDates;
