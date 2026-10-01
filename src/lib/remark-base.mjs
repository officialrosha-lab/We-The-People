// Markdown links such as [Record](/record/) are written as if the site were at the root. In a subfolder they need
// the subfolder in front. This walks the parsed text and adds it. Absolute links and #anchors are left alone.
export function remarkBase({ base = '/' } = {}) {
  const prefix = base.replace(/\/$/, '');
  const walk = (node) => {
    if (
      node.type === 'link' &&
      typeof node.url === 'string' &&
      node.url.startsWith('/') &&
      !node.url.startsWith('//') &&
      prefix
    ) {
      node.url = prefix + node.url;
    }
    if (node.children) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}
