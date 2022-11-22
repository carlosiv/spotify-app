export function formatTime(trackTime: number) {
  const minutes: number = Math.floor(trackTime / 60000);
  const seconds: number = parseInt(
    Math.floor((trackTime % 60000) / 1000).toFixed(0)
  );

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
