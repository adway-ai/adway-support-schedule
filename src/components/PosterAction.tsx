import { Component, createEffect, createSignal } from "solid-js";
import { swapRequest } from "../store";
import { IScheduleResponse } from "../types";

interface PosterActionProps {
  data: IScheduleResponse;
  onClick: (data: IScheduleResponse) => void;
}

const PosterAction: Component<PosterActionProps> = ({ onClick, data }) => {

  const [checked, setChecked] = createSignal(false);
  createEffect(() => {
    const found = swapRequest().find(({ id }) => id === data.id);
    setChecked(Boolean(found));
  }, [swapRequest()]);

  return (
    <label
      class="calender_action"
      onClick={(e) => {
        e.preventDefault();
        onClick(data);
      }}
    >
      Swap
      <input type="checkbox" checked={checked()} />
      <span class="check_mark" />
    </label>
  );
};

export default PosterAction;
