function getQuestionPart(phrases) {
    var findCommonSubstring = function (phrases) {
        var first = phrases[0], rest = phrases.slice(1);
        for (var len = first.length; len > 0; len--) {
            var _loop_1 = function (start) {
                var substring = first.slice(start, start + len);
                console.log(substring, start, len);
                if (rest.every(function (phrase) { return phrase.includes(substring); })) {
                    return { value: substring };
                }
            };
            for (var start = 0; start <= first.length - len; start++) {
                var state_1 = _loop_1(start);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        return "";
    };
    var commonSubstring = findCommonSubstring(phrases);
    var result = phrases.map(function (phrase) {
        return phrase.replace(commonSubstring, "").trim();
    });
    return result;
}
