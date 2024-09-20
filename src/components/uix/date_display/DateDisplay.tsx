import React from "react";

interface DateDisplayProps {
  isoDate: Date;
  showTime?: boolean;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ isoDate, showTime = false }) => {
  const date = new Date(isoDate);

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return (
    <span>
      {formattedDate}
      {showTime && ` ${formattedTime}`}
    </span>
  );
};

export default DateDisplay;
