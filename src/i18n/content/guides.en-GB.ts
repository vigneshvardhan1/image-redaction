import type { Guide } from '../../data/guides';
import { guides } from '../../data/guides';
import { toBritishEnglish } from './englishVariants';

export const guidesEnGB: Guide[] = toBritishEnglish(guides);
