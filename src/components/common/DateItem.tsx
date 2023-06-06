import { Typography } from "@mui/material";
import dayjs from "dayjs";

type DateChipProps = {
  time: string;
  format?: string;
};

export const DateItem = ({ time, format }: DateChipProps) => {
  const convertedTime = format ? dayjs(time).format(format) : dayjs(time);
  return <Typography>{convertedTime.toString()}</Typography>;
};
