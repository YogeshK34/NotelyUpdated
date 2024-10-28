import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function CalendarComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
