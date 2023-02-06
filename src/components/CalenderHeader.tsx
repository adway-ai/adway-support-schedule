import dayjs from "dayjs";
import { Component, onCleanup, onMount } from "solid-js";

import { currentDate, mutate, setCurrentDate, swapRequest, setSwapRequest } from "../store";

const CalenderHeader: Component = () => {
  let changeBox: HTMLHeadingElement | undefined;

  const scrollElementToView = () => {
    changeBox?.children[1]?.scrollIntoView();
  };

  onMount(() => {
    const currentMonthText = getChild(currentDate().toString());
    const prevMonth = getChild(
      dayjs(currentDate()).subtract(1, "month").toString()
    );
    const lastMonth = getChild(dayjs(currentDate()).add(1, "month").toString());

    changeBox?.append(prevMonth);
    changeBox?.append(currentMonthText);
    changeBox?.append(lastMonth);
    scrollElementToView();

    window?.addEventListener("resize", () => {
      setTimeout(() => scrollElementToView(), 500);
    });
  });

  onCleanup(() => {
    window?.removeEventListener("resize", () => {
      scrollElementToView();
    });
  });

  const handleShowNext = () => {
    const nextTime = dayjs(
      changeBox?.lastElementChild?.getAttribute("date") as string
    )
      .add(1, "month")
      .toString();

    const child = getChild(nextTime);
    changeBox?.appendChild(child);

    setCurrentDate(getDate(changeBox?.children[2] as HTMLElement));
    changeBox?.children[2]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => changeBox?.firstElementChild?.remove(), 750);
  };

  const handleShowPrev = () => {
    const nextDate = dayjs(
      changeBox?.firstElementChild?.getAttribute("date") as string
    )
      .subtract(1, "month")
      .toString();
    const child = getChild(nextDate);
    changeBox?.insertBefore(child, changeBox.firstElementChild);

    setCurrentDate(getDate(changeBox?.children[1] as HTMLElement));
    changeBox?.children[1]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => changeBox?.lastElementChild?.remove(), 750);
  };

  const getChild = (date: string) => {
    const child = document.createElement("span");
    child.textContent = dayjs(date).format("MM.YYYY");
    child.setAttribute("date", date);
    return child;
  };

  const getDate = (el: HTMLElement): string => {
    return el.getAttribute("date") as string;
  };

  const handleSwap = async () => {
    const res = await fetch(
      `http://localhost:8080/${swapRequest()[0].id}/${swapRequest()[1].id}`,
      { method: "POST" }
    );

    const data = await res.json();
    setSwapRequest([])
    mutate(data);
  };

  return (
    <div class="calendar__bar container">
      <div class="calendar">
        <button onClick={handleShowPrev}>
          <div class="arrow arrow-left"></div>
        </button>

        <h2 class="change_box" ref={changeBox}></h2>
        <button onClick={handleShowNext}>
          <div class="arrow arrow-right"></div>
        </button>
        {swapRequest()?.[0] && (
          <div class="swap">
            <span
              class={swapRequest()?.[1] ? "btn" : undefined}
              onClick={swapRequest()?.[1] ? handleSwap : undefined}
            >
              Swap
            </span>
            <span>
              {swapRequest()?.[0]?.user}{" "}
              {dayjs(swapRequest()?.[0]?.date).format("MMM-DD")}
            </span>
            {swapRequest()?.[1] && (
              <span>
                {swapRequest()?.[1]?.user}{" "}
                {dayjs(swapRequest()?.[1]?.date).format("MMM-DD")}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalenderHeader;
