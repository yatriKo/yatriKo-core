"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";

type DateRangePickerProps = {
  onDateChange?: (from: Date, to: Date) => void;
  placeholder?: string;
};

export function DateRangePicker({
  onDateChange,
  placeholder,
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleChange = (range: DateRange | undefined) => {
    setDate(range);

    if (range?.from && range.to) {
      onDateChange?.(range.from, range.to);
    }
  };

  const formatted =
    date?.from && date.to
      ? `${format(date.from, "LLL dd, y")} - ${format(date.to, "LLL dd, y")}`
      : placeholder || "Pick a date range";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[260px] justify-start text-left font-normal"
        >
          {formatted}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={handleChange}
          numberOfMonths={2}
          disabled={(date) => date <= new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
