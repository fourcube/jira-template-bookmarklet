export function createIssueURL(baseUrl: string, text: string, projectId: string, issueType: string) {
  return `${baseUrl}/secure/CreateIssueDetails!init.jspa?pid=${projectId}&issuetype=${issueType}&description=${encodeURIComponent(
    text
  )}`;
}
