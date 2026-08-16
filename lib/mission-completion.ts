export function canCompleteMission(steps: boolean[], correctAnswer: boolean | undefined) {
  return steps.length > 0 && steps.every(Boolean) && correctAnswer === true;
}
