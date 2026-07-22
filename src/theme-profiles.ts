export const themeProfiles = [
  {
    id: 'steel',
    name: 'Steel',
    description: 'Neutral Zinc with a saturated blue identity layer.',
  },
  {
    id: 'mono',
    name: 'Mono',
    description: 'Pure grayscale with no atmospheric identity hue.',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    description: 'Neutral charcoal with a saturated lavender identity.',
  },
  {
    id: 'ember',
    name: 'Ember',
    description: 'Neutral charcoal with a saturated copper identity.',
  },
  {
    id: 'moss',
    name: 'Moss',
    description: 'Neutral charcoal with a saturated moss identity.',
  },
  {
    id: 'pine',
    name: 'Pine',
    description: 'Controlled forest-charcoal with a deep green identity.',
  },
  {
    id: 'tide',
    name: 'Tide',
    description: 'Cool charcoal with a saturated teal identity.',
  },
  {
    id: 'plum',
    name: 'Plum',
    description: 'Neutral charcoal with a saturated plum identity.',
  },
  {
    id: 'rosewood',
    name: 'Rosewood',
    description: 'Neutral charcoal with a saturated deep-rose identity.',
  },
  {
    id: 'oxblood',
    name: 'Oxblood',
    description: 'Restrained wine-charcoal with a deep red identity.',
  },
] as const

export type ThemeProfileId = (typeof themeProfiles)[number]['id']
