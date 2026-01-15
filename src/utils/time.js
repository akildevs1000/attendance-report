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
    if (time && time !== "00:00") {
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
