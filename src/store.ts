import dayjs, { Dayjs } from "dayjs";
import { createResource, createSignal } from "solid-js";
import { IScheduleResponse } from "./types";

export const [currentDate, setCurrentDate] = createSignal<Dayjs | string>(
  dayjs()
);

export const [swapRequest, setSwapRequest] = createSignal<
IScheduleResponse[]
>([]);

const fetchSchedule = async () => (await fetch("http://localhost:8080")).json();
export const [scheduleFetcher, {refetch, mutate}] = createResource<{
  schedule: IScheduleResponse[];
}>(fetchSchedule);


