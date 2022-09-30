export const COUNT_MAX = 22;
export const COUNT_MIN = 1;
export const GENERATED_DB_PREFIX = "words_length_";
export const GENERATED_DB_EXTENSION = ".ts";
export const ORIGIN_DB = "3of6game.txt";
export const COUNT_UP_BUTTON_TEXT = "+";
export const COUNT_DOWN_BUTTON_TEXT = "−";

export function isLenthOverThenOne(value: string) {
  return value.length > 1;
}

export function isIncludesNotAlphabet(value: string) {
  return /[^a-zA-Z]/gi.test(value);
}

export function putClassForAwhile(
  element: HTMLElement,
  className: string,
  delay = 100
): void {
  element.classList.remove(className);
  element.classList.add(className);
  let count = 0;
  const clear: any = setInterval(
    (element) => {
      if (count > 0) {
        element.classList.remove(className);
        clearInterval(clear);
      }
      count++;
    },
    delay,
    element
  );
}
