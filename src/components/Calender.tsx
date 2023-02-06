import dayjs, { Dayjs } from "dayjs";
import { Component, createEffect, createSignal, For } from "solid-js";
import CalenderDates from "./CalenderDates";
import { currentDate } from "../store";

const Calender: Component = () => {
  const [calenderDays, setCalenderDays] = createSignal<string[]>([]);

  const getDays = (date: Dayjs | string) => {
    const daysInMonth = dayjs(date).daysInMonth();
    const arr = Array.from(Array(daysInMonth).keys()).map((x) => {
      return dayjs(
        `${dayjs(date).format("YYYY")}-${dayjs(date).format("MM")}-${x + 1}`
      )
        .format("YYYYMMDD")
        .toString();
    });

    return arr;
  };

  // @Note about direct update
  createEffect(() => {
    console.log('***********Calender createEffect => useEffect react**********');
    console.log(currentDate());
    console.log('***********Calender createEffect => useEffect react**********');
    
    setCalenderDays(getDays(currentDate()));
  }, [currentDate()]);

  console.log('----------calender component------');
  console.log(calenderDays()); 
  console.log(currentDate());
  console.log('----------calender component------');
  

  return <For each={calenderDays()}>{(date) => <CalenderDates date={date} />}</For>;
};

export default Calender;
