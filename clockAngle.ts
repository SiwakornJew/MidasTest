function getClockAngle(hh_mm: string): number {
  const [hour, minute] = hh_mm.split(":").map(Number);
  const minuteAngle = minute * 6;
  const hourAngle = (hour % 12) * 30 + minute / 2;
  let angle = Math.abs(hourAngle - minuteAngle);
  angle = Math.min(angle, 360 - angle);
  return angle <= 180 ? angle : 360 - angle;
}
