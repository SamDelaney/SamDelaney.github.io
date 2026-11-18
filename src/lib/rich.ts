// Turns **bold**, *italic* and [text](url) in content.ts strings into HTML.
// Content is ours, but escape anyway so a stray < can't break the page.
export function rich(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/\[(.+?)\]\((\S+?)\)/g, '<a class="inline" href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
