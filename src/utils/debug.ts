const c = console;
const d = () => window.CC_DEBUG;
const f = (...arg: any[]) => {}; // eslint-disable-line @typescript-eslint/no-unused-vars
export default {
  log: d() ? c.log : f,
  error: d() ? c.error : f,
  warn: d() ? c.warn : f,
};
