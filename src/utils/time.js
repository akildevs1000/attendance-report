// utils/time.js

/**
 * Calculates total hours and minutes from an array of "HH:MM" strings
 * Ignores "00:00" entries
 * @param {string[]} times - Array of time strings in "HH:MM" format
 * @returns {{ hours: number, minutes: number, total: string }} - Total hours and minutes
 */
export function calculateTotalHours(times) {
  let totalMinutes = 0;

  times.forEach(time => {
    if (time && time !== "---") {
      const [hours, minutes] = time.split(":").map(Number);
      totalMinutes += hours * 60 + minutes;
    }
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours,
    minutes,
    total: `${hours}h ${minutes}m` // human-readable format
  };
}


export function calculateAttendanceScore(shift, daysInMonth, performedHours = 0) {
  if (!shift?.working_hours) {
    return {
      expected_hours: 0,
      performed_hours: performedHours,
      score_percentage: 0
    };
  }

  // Convert "HH:MM" → hours
  const [h, m] = shift.working_hours.split(":").map(Number);
  const dailyHours = h + m / 60;

  const flexiHolidays = Number(shift.monthly_flexi_holidays || 0);
  const workingDays = daysInMonth - flexiHolidays;

  const expectedHours = workingDays * dailyHours;

  const scorePercentage =
    expectedHours > 0
      ? Number(((performedHours / expectedHours) * 100).toFixed(2))
      : 0;

  return {
    expected_hours: Number(expectedHours.toFixed(2)),
    performed_hours: Number(performedHours.toFixed(2)),
    score_percentage: scorePercentage
  };
}




export const checkShortShift = (halfday, working_hours, total_hrs) => {
  // Validate inputs
  if (
    !working_hours ||
    !total_hrs ||
    working_hours === "---" ||
    total_hrs === "---"
  ) {
    return null;
  }

  // Check if today is NOT half day
  const isHalfDay =
    new Date().toLocaleString("en-US", { weekday: "long" }) === halfday;

  // Convert HH:mm → minutes
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const shiftMinutes = toMinutes(working_hours);
  const employeeMinutes = toMinutes(total_hrs);

  // Short shift only if employee worked less and it's NOT half day
  if (employeeMinutes < shiftMinutes && !isHalfDay) {
    return "*";
  }

  return null;
};
