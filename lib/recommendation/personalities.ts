import { WinePersonality } from '@/types/wine'

export const personalities: WinePersonality[] = [
  {
    id: 'fresh_classic',
    name: 'The Fresh Classic',
    description: 'You love clean, crisp wines that let the fruit speak. A perfectly chilled Chablis or a zesty Sauvignon Blanc is your idea of heaven.',
    characteristics: ['High acidity lover', 'Minimal oak preference', 'Crisp and clean palate'],
    color: '#5A9367',
    exampleWines: ['Chablis', 'Sancerre', 'Vinho Verde', 'Grüner Veltliner'],
    vector: { acidity: 0.9, tannin: 0.2, fruit: 0.5, sweetness: 0.1, body: 0.3, style: 0.2 },
  },
  {
    id: 'smooth_operator',
    name: 'The Smooth Operator',
    description: 'You gravitate towards easy-drinking, fruit-forward wines. Soft, approachable, and crowd-pleasing — that\'s your style.',
    characteristics: ['Soft tannin preference', 'Fruit-forward palate', 'Easy-drinking style'],
    color: '#C9A961',
    exampleWines: ['Merlot', 'Pinot Noir', 'Grenache', 'Dolcetto'],
    vector: { acidity: 0.4, tannin: 0.3, fruit: 0.8, sweetness: 0.3, body: 0.5, style: 0.3 },
  },
  {
    id: 'bold_adventurer',
    name: 'The Bold Adventurer',
    description: 'Go big or go home. You want wines with power, structure, and intensity. Bring on the big reds.',
    characteristics: ['Big tannin lover', 'Full body preference', 'Intense flavor seeker'],
    color: '#8B2252',
    exampleWines: ['Barolo', 'Cabernet Sauvignon', 'Syrah', 'Malbec'],
    vector: { acidity: 0.5, tannin: 0.9, fruit: 0.7, sweetness: 0.1, body: 0.9, style: 0.3 },
  },
  {
    id: 'crisp_minimalist',
    name: 'The Crisp Minimalist',
    description: 'Less is more. You appreciate ultra-dry, light wines with purity and precision. No frills, just quality.',
    characteristics: ['Ultra-dry preference', 'Light body lover', 'Pure and precise palate'],
    color: '#87CEEB',
    exampleWines: ['Muscadet', 'Albariño', 'Picpoul de Pinet', 'Dry Riesling'],
    vector: { acidity: 0.8, tannin: 0.1, fruit: 0.3, sweetness: 0.0, body: 0.2, style: 0.2 },
  },
  {
    id: 'rich_indulger',
    name: 'The Rich Indulger',
    description: 'You love wines with depth, richness, and a touch of luxury. Oaked Chardonnay, creamy textures, and full body — yes please.',
    characteristics: ['Oaked wine lover', 'Creamy texture preference', 'Full body enthusiast'],
    color: '#6B2737',
    exampleWines: ['Oaked Chardonnay', 'Viognier', 'White Burgundy', 'Rioja Reserva'],
    vector: { acidity: 0.4, tannin: 0.5, fruit: 0.6, sweetness: 0.2, body: 0.8, style: 0.2 },
  },
  {
    id: 'sweet_tooth',
    name: 'The Sweet Tooth',
    description: 'You\'re not afraid to embrace sweetness. From off-dry Rieslings to luscious dessert wines, you love fruity and approachable.',
    characteristics: ['Sweetness appreciator', 'Fruit-driven palate', 'Approachable wine lover'],
    color: '#E8B44C',
    exampleWines: ['Moscato d\'Asti', 'Gewürztraminer', 'Late Harvest Riesling', 'Sauternes'],
    vector: { acidity: 0.5, tannin: 0.1, fruit: 0.8, sweetness: 0.9, body: 0.4, style: 0.2 },
  },
  {
    id: 'wild_experimenter',
    name: 'The Wild Experimenter',
    description: 'Conventional is boring. You seek out natural wines, orange wines, and anything that challenges the norm.',
    characteristics: ['Natural wine enthusiast', 'Funky flavor explorer', 'Convention challenger'],
    color: '#D2691E',
    exampleWines: ['Orange Wine', 'Pét-Nat', 'Skin-Contact White', 'Unfiltered Natural Red'],
    vector: { acidity: 0.6, tannin: 0.4, fruit: 0.5, sweetness: 0.2, body: 0.5, style: 1.0 },
  },
  {
    id: 'elegant_classicist',
    name: 'The Elegant Classicist',
    description: 'You appreciate tradition, structure, and elegance. Great wine tells a story of its place and maker.',
    characteristics: ['Structure appreciator', 'Tradition lover', 'Refined palate'],
    color: '#4A4A6A',
    exampleWines: ['Bordeaux', 'Brunello di Montalcino', 'Burgundy', 'Chianti Classico'],
    vector: { acidity: 0.6, tannin: 0.7, fruit: 0.5, sweetness: 0.1, body: 0.7, style: 0.1 },
  },
]

export function getPersonalityById(id: string): WinePersonality | undefined {
  return personalities.find(p => p.id === id)
}
