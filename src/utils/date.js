export const printedDate = () => {
    return new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};


export const formatMinutesToHHMM = (totalMinutes) => {
    if (!totalMinutes && totalMinutes !== 0) return "--:--";

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}`;
};