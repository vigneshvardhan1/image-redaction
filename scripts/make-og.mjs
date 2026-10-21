import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <clipPath id="mark">
      <rect x="72" y="54" width="44" height="44" rx="12"/>
    </clipPath>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>

  <rect x="72" y="54" width="44" height="44" rx="12" fill="#141414"/>
  <g clip-path="url(#mark)">
    <rect x="61" y="72.7" width="66" height="6.6" rx="1.4" fill="#e7e5df" transform="rotate(36 94 76)"/>
    <rect x="61" y="72.7" width="66" height="6.6" rx="1.4" fill="#e7e5df" transform="rotate(-36 94 76)"/>
  </g>
  <text x="130" y="84" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#141414">redact</text>

  <text x="72" y="236" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#141414">Share the screenshot.</text>
  <text x="72" y="312" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" fill="#141414">Not the secrets.</text>

  <text x="74" y="382" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="400" fill="#707070">Redact names, emails, card numbers, and addresses</text>
  <text x="74" y="414" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="400" fill="#707070">in your browser. Nothing is uploaded.</text>

  <rect x="72" y="464" width="128" height="38" rx="19" fill="#f3f3f3"/>
  <text x="94" y="489" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="#141414">On-device</text>

  <rect x="212" y="464" width="138" height="38" rx="19" fill="#f3f3f3"/>
  <text x="234" y="489" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="#141414">No uploads</text>

  <rect x="362" y="464" width="86" height="38" rx="19" fill="#f3f3f3"/>
  <text x="384" y="489" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="#141414">Free</text>

  <text x="72" y="576" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="#adadad">imageredaction.com</text>
  <text x="1128" y="576" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="400" fill="#adadad">No account. No watermark.</text>

  <rect x="800" y="92" width="328" height="446" rx="28" fill="#f3f3f3"/>
  <rect x="824" y="116" width="280" height="398" rx="20" fill="#ffffff"/>

  <circle cx="850" cy="150" r="15" fill="#e0e0e0"/>
  <rect x="874" y="140" width="92" height="9" rx="4" fill="#141414"/>
  <rect x="874" y="156" width="58" height="6" rx="3" fill="#c7c7c7"/>
  <circle cx="1072" cy="150" r="2.5" fill="#adadad"/>
  <circle cx="1080" cy="150" r="2.5" fill="#adadad"/>
  <line x1="824" y1="184" x2="1104" y2="184" stroke="#f0f0f0" stroke-width="1.5"/>

  <rect x="840" y="204" width="176" height="46" rx="13" fill="#f3f3f3"/>
  <rect x="854" y="218" width="128" height="11" rx="3" fill="#141414"/>
  <rect x="854" y="235" width="78" height="5" rx="2.5" fill="#c7c7c7"/>

  <rect x="976" y="266" width="112" height="42" rx="13" fill="#ececec"/>
  <rect x="990" y="279" width="72" height="10" rx="3" fill="#141414"/>

  <rect x="840" y="324" width="208" height="46" rx="13" fill="#f3f3f3"/>
  <rect x="854" y="338" width="170" height="11" rx="3" fill="#141414"/>
  <rect x="854" y="355" width="104" height="5" rx="2.5" fill="#c7c7c7"/>

  <rect x="992" y="386" width="96" height="38" rx="13" fill="#ececec"/>
  <rect x="1006" y="398" width="60" height="10" rx="3" fill="#141414"/>

  <rect x="840" y="440" width="176" height="44" rx="13" fill="#f3f3f3"/>
  <rect x="854" y="453" width="124" height="10" rx="3" fill="#141414"/>
  <rect x="854" y="469" width="68" height="5" rx="2.5" fill="#c7c7c7"/>

  <rect x="840" y="500" width="112" height="30" rx="15" fill="#141414"/>
  <rect x="856" y="512" width="58" height="6" rx="3" fill="#ffffff" opacity="0.7"/>

  <rect x="834" y="198" width="188" height="58" rx="5" fill="none" stroke="#0066ff" stroke-width="1.6" stroke-dasharray="5 4"/>
  <rect x="834" y="181" width="64" height="17" rx="8.5" fill="#0066ff"/>
  <text x="845" y="193" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" fill="#ffffff">Email</text>
</svg>`;

const output = resolve('public/og.png');
await sharp(Buffer.from(svg)).png().toFile(output);
writeFileSync(resolve('scripts/og.svg'), svg, 'utf8');
console.log(`wrote ${output}`);
