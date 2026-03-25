export const printedDate = () => {
    return new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};


// export const formatMinutesToHHMM = (totalMinutes) => {
//     if (!totalMinutes && totalMinutes !== 0) return "--:--";

//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//         2,
//         "0"
//     )}`;
// };


/**
 * Calculates the duration between two time strings (HH:MM)
 * @param {string} checkIn - e.g., "08:43" or "---"
 * @param {string} checkOut - e.g., "14:15" or "---"
 * @returns {string} - Formatted duration "HH:MM" or "--:--"
 */
export const formatMinutesToHHMM = (checkIn, checkOut) => {
    // 1. Validate inputs: If either is missing or formatted as dashes, return default
    if (!checkIn || !checkOut || checkIn === "---" || checkOut === "---") {
        return "---";
    }

    // 2. Helper to convert "HH:MM" to total minutes
    const toMinutes = (timeStr) => {
        const [hrs, mins] = timeStr.split(":").map(Number);
        return (hrs * 60) + mins;
    };

    const startMinutes = toMinutes(checkIn);
    const endMinutes = toMinutes(checkOut);

    // 3. Calculate difference
    // Note: This assumes out is later than in. 
    // If you need to handle overnight shifts, you'd add: if (diff < 0) diff += 1440;
    const diff = endMinutes - startMinutes;

    if (diff < 0) return "--:--"; // Or handle negative time as needed

    // 4. Format back to HH:MM
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};