/**
 * Small, deliberately conservative spelling pass for the English regional
 * editions. It only touches prose fields, so sample paths, icon names, and
 * slugs are never rewritten.
 */

const SKIP_KEYS = new Set([
  'sample',
  'icon',
  'slug',
  'href',
  'secondaryHref',
  'number',
  'id',
  'ogImageAlt',
  'cover',
  'coverPosition',
  'dateISO',
]);

const BRITISH_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bcolors\b/gi, 'colours'],
  [/\bcolor\b/gi, 'colour'],
  [/\bcolored\b/gi, 'coloured'],
  [/\bcoloring\b/gi, 'colouring'],
  [/\banalyzes\b/gi, 'analyses'],
  [/\banalyzed\b/gi, 'analysed'],
  [/\banalyzing\b/gi, 'analysing'],
  [/\banalyze\b/gi, 'analyse'],
  [/\banalyzation\b/gi, 'analysation'],
  [/\borganizations\b/gi, 'organisations'],
  [/\borganization\b/gi, 'organisation'],
  [/\borganizes\b/gi, 'organises'],
  [/\borganized\b/gi, 'organised'],
  [/\borganizing\b/gi, 'organising'],
  [/\borganize\b/gi, 'organise'],
  [/\brecognizable\b/gi, 'recognisable'],
  [/\brecognizes\b/gi, 'recognises'],
  [/\brecognized\b/gi, 'recognised'],
  [/\brecognizing\b/gi, 'recognising'],
  [/\brecognize\b/gi, 'recognise'],
  [/\bbehaviors\b/gi, 'behaviours'],
  [/\bbehavioral\b/gi, 'behavioural'],
  [/\bbehavior\b/gi, 'behaviour'],
  [/\bcenters\b/gi, 'centres'],
  [/\bcentered\b/gi, 'centred'],
  [/\bcentering\b/gi, 'centring'],
  [/\bcenter\b/gi, 'centre'],
  [/\bdefense\b/gi, 'defence'],
  [/\boffense\b/gi, 'offence'],
  [/\blicenses\b/gi, 'licences'],
  [/\blicensed\b/gi, 'licenced'],
  [/\blicense\b/gi, 'licence'],
  [/\bfavorites\b/gi, 'favourites'],
  [/\bfavorite\b/gi, 'favourite'],
  [/\bcatalogs\b/gi, 'catalogues'],
  [/\bcatalog\b/gi, 'catalogue'],
  [/\btraveled\b/gi, 'travelled'],
  [/\btraveling\b/gi, 'travelling'],
  [/\btravelers\b/gi, 'travellers'],
  [/\btraveler\b/gi, 'traveller'],
  [/\bcanceled\b/gi, 'cancelled'],
  [/\bcanceling\b/gi, 'cancelling'],
  [/\bmodeling\b/gi, 'modelling'],
  [/\bcapitalized\b/gi, 'capitalised'],
  [/\bjudgment\b/gi, 'judgement'],
  [/\bpracticing\b/gi, 'practising'],
  [/\blabeled\b/gi, 'labelled'],
  [/\bfulfill\b/gi, 'fulfil'],
  [/\benrollment\b/gi, 'enrolment'],
  [/\bauthorizations\b/gi, 'authorisations'],
  [/\bauthorization\b/gi, 'authorisation'],
  [/\bauthorized\b/gi, 'authorised'],
  [/\bauthorizing\b/gi, 'authorising'],
  [/\bauthorizes\b/gi, 'authorises'],
  [/\bauthorize\b/gi, 'authorise'],
  [/\bminimizations\b/gi, 'minimisations'],
  [/\bminimization\b/gi, 'minimisation'],
  [/\bminimized\b/gi, 'minimised'],
  [/\bminimizing\b/gi, 'minimising'],
  [/\bminimizes\b/gi, 'minimises'],
  [/\bminimize\b/gi, 'minimise'],
  [/\bmaximized\b/gi, 'maximised'],
  [/\bmaximizing\b/gi, 'maximising'],
  [/\bmaximizes\b/gi, 'maximises'],
  [/\bmaximize\b/gi, 'maximise'],
  [/\bprioritized\b/gi, 'prioritised'],
  [/\bprioritizing\b/gi, 'prioritising'],
  [/\bprioritizes\b/gi, 'prioritises'],
  [/\bprioritize\b/gi, 'prioritise'],
  [/\bsummarized\b/gi, 'summarised'],
  [/\bsummarizing\b/gi, 'summarising'],
  [/\bsummarizes\b/gi, 'summarises'],
  [/\bsummarize\b/gi, 'summarise'],
  [/\bcustomized\b/gi, 'customised'],
  [/\bcustomizing\b/gi, 'customising'],
  [/\bcustomizes\b/gi, 'customises'],
  [/\bcustomize\b/gi, 'customise'],
  [/\boptimized\b/gi, 'optimised'],
  [/\boptimizing\b/gi, 'optimising'],
  [/\boptimizes\b/gi, 'optimises'],
  [/\boptimize\b/gi, 'optimise'],
  [/\boptimization\b/gi, 'optimisation'],
  [/\banonymized\b/gi, 'anonymised'],
  [/\banonymizing\b/gi, 'anonymising'],
  [/\banonymizes\b/gi, 'anonymises'],
  [/\banonymize\b/gi, 'anonymise'],
  [/\bstandardized\b/gi, 'standardised'],
  [/\bstandardizing\b/gi, 'standardising'],
  [/\bstandardizes\b/gi, 'standardises'],
  [/\bstandardize\b/gi, 'standardise'],
  [/\bemphasized\b/gi, 'emphasised'],
  [/\bemphasizing\b/gi, 'emphasising'],
  [/\bemphasizes\b/gi, 'emphasises'],
  [/\bemphasize\b/gi, 'emphasise'],
  [/\brealized\b/gi, 'realised'],
  [/\brealizing\b/gi, 'realising'],
  [/\brealizes\b/gi, 'realises'],
  [/\brealize\b/gi, 'realise'],
  [/\bspecialized\b/gi, 'specialised'],
  [/\bspecializing\b/gi, 'specialising'],
  [/\bspecializes\b/gi, 'specialises'],
  [/\bspecialize\b/gi, 'specialise'],
  [/\butilized\b/gi, 'utilised'],
  [/\butilizing\b/gi, 'utilising'],
  [/\butilizes\b/gi, 'utilises'],
  [/\butilize\b/gi, 'utilise'],
  [/\bglobalization\b/gi, 'globalisation'],
  [/\bnormalization\b/gi, 'normalisation'],
  [/\bpersonalized\b/gi, 'personalised'],
  [/\bpersonalizing\b/gi, 'personalising'],
  [/\bpersonalizes\b/gi, 'personalises'],
  [/\bpersonalize\b/gi, 'personalise'],
  [/\bgray\b/gi, 'grey'],
  [/\btoward\b/gi, 'towards'],
  [/\bmath\b/gi, 'maths'],
  [/\bgotten\b/gi, 'got'],
];

function preserveCase(match: string, replacement: string): string {
  if (match === match.toUpperCase()) return replacement.toUpperCase();
  if (match[0] === match[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

function replaceBritish(value: string): string {
  return BRITISH_REPLACEMENTS.reduce(
    (text, [pattern, replacement]) =>
      text.replace(pattern, (match) => preserveCase(match, replacement)),
    value,
  );
}

/**
 * Recursively copy a content object, applying the British spelling pass to
 * prose strings. Structural fields are left alone.
 */
export function toBritishEnglish<T>(value: T, key = ''): T {
  if (typeof value === 'string') {
    return (SKIP_KEYS.has(key) ? value : replaceBritish(value)) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => toBritishEnglish(item, key)) as T;
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, child]) => [
        childKey,
        toBritishEnglish(child, childKey),
      ]),
    ) as T;
  }
  return value;
}
