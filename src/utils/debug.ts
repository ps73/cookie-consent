const c = console;
const d = () => {
  if (typeof window !== 'undefined') {
    return window.CC_DEBUG;
  }
  return false;
};
const f = (...arg: any[]) => {}; // eslint-disable-line @typescript-eslint/no-unused-vars
export default {
  log: d() ? c.log : f,
  error: d() ? c.error : f,
  warn: d() ? c.warn : f,
};
