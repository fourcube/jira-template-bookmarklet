export function createBookmarklet(text: string) {
  const template = `
    document.querySelector('[data-mode="source"] button').click();
    document.querySelector('#description').textContent = '${text
      .replaceAll("'", "\x27")
      .replaceAll("\r", "\\r")
      .replaceAll("\n", "\\n")}';
    `;

  return `javascript:eval(decodeURIComponent(escape(window.atob("${window.btoa(
    unescape(encodeURIComponent(template))
  )}"))));void 0`;
}
