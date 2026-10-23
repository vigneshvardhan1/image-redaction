import type { APIRoute } from 'astro';
import { adsense } from '../config/ads';

/**
 * Google AdSense expects a line like:
 *   google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
 *
 * The publisher ID is taken from PUBLIC_ADSENSE_CLIENT at build time. Without
 * a configured ID the route stays empty rather than publishing a placeholder.
 */
export const GET: APIRoute = () => {
  if (!adsense.enabled) {
    return new Response(
      '# Set PUBLIC_ADSENSE_CLIENT to publish the AdSense ads.txt entry.\n',
      {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      },
    );
  }

  const publisher = adsense.client.replace(/^ca-/, '');
  return new Response(
    `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
};
