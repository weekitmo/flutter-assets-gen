export function debounce(this: any, fn: Function, delay = 100) {
  let timer: NodeJS.Timeout | null = null;
  const self = this;
  function closure(...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(self, args);
    }, delay);
  }
  return closure;
}
