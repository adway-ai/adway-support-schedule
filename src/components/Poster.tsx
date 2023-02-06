import { Component, createEffect, createSignal } from "solid-js";
import { setSwapRequest } from "../store";
import PosterAction from "./PosterAction";
import { scheduleFetcher } from "../store";
import { IScheduleResponse } from "../types";
import dayjs from "dayjs";

interface PosterProps {
  date: string;
}
const Poster: Component<PosterProps> = ({ date }) => {
  const [data, setData] = createSignal<IScheduleResponse>(
    {},
    { equals: false }
  );

  const handleSwap = (user: IScheduleResponse) => {
    setSwapRequest((prev) => {
      const found = prev.find(({ id }) => id === user.id);
      if (found) {
        const filtered = [...prev.filter(({ id }) => id !== user.id)];
        return filtered;
      } else {
        if (prev.length >= 2) {
          prev.pop();
        }

        return [...prev, user];
      }
    });
  };

  createEffect(() => {
    const schedule = scheduleFetcher()?.schedule?.find(
      (item) => item.id === date
    );

    if (schedule) {
      setData(schedule);
    }
  }, [scheduleFetcher()]);

  const canDisplaySwap = dayjs(date).isAfter(dayjs());

  return (
    <div class="poster">
      <div
        class={`line ${data().isHoliday ? "holiday" : ""}  ${
          data().restDay && !data().isHoliday ? "rest_day" : ""
        }`}
      ></div>
      <div class="text_container">
        <div class="info">
          <span>{scheduleFetcher.loading && "Loading..."}</span>

          <h4>{data().restDay ? "rest" : "support"}</h4>

          <label>{data().restDay ? "Woo Hoo!" : data().user}</label>
        </div>

        {data().user && canDisplaySwap && (
          <PosterAction onClick={handleSwap} data={data()} />
        )}
      </div>
    </div>
  );
};

export default Poster;
