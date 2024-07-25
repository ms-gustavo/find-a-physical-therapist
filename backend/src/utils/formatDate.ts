import { format, toZonedTime } from "date-fns-tz";

export function formatDate(datetime: Date) {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = toZonedTime(datetime, timeZone);

  const date = format(zonedDate, "yyyy-MM-dd", { timeZone });
  const time = format(zonedDate, "HH:mm:ss", { timeZone });

  return { date, time };
}
