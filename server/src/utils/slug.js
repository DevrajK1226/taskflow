import crypto from 'node:crypto';

export function makeSlug(name) {
  const base =
    name
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40)
      .replace(/-+$/, '') || 'org';

  return `${base}-${crypto.randomBytes(3).toString('hex')}`;
}
