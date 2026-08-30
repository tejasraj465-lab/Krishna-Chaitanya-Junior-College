/** Resize ImageKit photos at the CDN so the browser downloads less. */
export function imageKitSrc(url: string, width = 800): string {
  if (!url || !url.includes('ik.imagekit.io')) return url;
  if (/[?&]tr=/.test(url)) return url;
  const joiner = url.includes('?') ? '&' : '?';
  return `${url}${joiner}tr=w-${width},q-70,f-auto`;
}

export function imageKitSrcSet(url: string, widths: number[] = [640, 960, 1400]): string {
  if (!url || !url.includes('ik.imagekit.io')) return '';
  return widths.map((width) => `${imageKitSrc(url, width)} ${width}w`).join(', ');
}
