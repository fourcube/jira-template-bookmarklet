export function createBookmarklet(text: string) {
  const template = `
    window.location.href='/secure/CreateIssueDetails!init.jspa?pid=' + JIRA.API.Projects.getCurrentProjectId() + '&issuetype=10001&description=${encodeURIComponent(
      text
    )}';
    `.trim();

  console.log(template);

  return `javascript:eval(decodeURIComponent(escape(window.atob("${window.btoa(
    unescape(encodeURIComponent(template))
  )}"))));void 0`;
}

export function createBookmarkletHacky(text: string) {
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
