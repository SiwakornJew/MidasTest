function getClockAngle(hh_mm) {
    var _a = hh_mm.split(":").map(Number), hour = _a[0], minute = _a[1];
    var minuteAngle = minute * 6;
    var hourAngle = (hour % 12) * 30 + minute / 2;
    var angle = Math.abs(hourAngle - minuteAngle);
    angle = Math.min(angle, 360 - angle);
    return angle <= 180 ? angle : 360 - angle;
}
