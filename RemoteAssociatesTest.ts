function getQuestionPart(phrases: string[]): string[] {
  const findCommonSubstring = (phrases: string[]): string => {
    const [first, ...rest] = phrases;
    for (let len = first.length; len > 0; len--) {
      for (let start = 0; start <= first.length - len; start++) {
        const substring = first.slice(start, start + len);
        if (rest.every((phrase) => phrase.includes(substring))) {
          return substring;
        }
      }
    }
    return "";
  };
  const commonSubstring = findCommonSubstring(phrases);

  const result = phrases.map((phrase) =>
    phrase.replace(commonSubstring, "").trim()
  );

  return result;
}
