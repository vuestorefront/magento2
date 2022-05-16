export function htmlDecode(input: string) {
  const formatName = () => {
    try {
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(input, 'text/html');
      return doc.documentElement.textContent;
    } catch {
      return input;
    }
  };
  const name = formatName();
  return name === 'undefined' ? '' : name;
}
