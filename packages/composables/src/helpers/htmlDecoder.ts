export function htmlDecode(input) {
  try {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  } catch {
    return input;
  }
}
