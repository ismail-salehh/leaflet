// crypto.randomUUID only works on https or localhost. The fallback keeps the app
// working if you open it from your phone over your local network (http://192.168...).
export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
