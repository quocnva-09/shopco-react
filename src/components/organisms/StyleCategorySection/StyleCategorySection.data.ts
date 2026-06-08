import type { StyleCategoryCardData } from '@/components/molecules/StyleCategoryCard';

/**
 * Default data for StyleCategorySection — loads images from public/style-categories.
 * Used by HomePage and Storybook stories.
 */
export const defaultStyleCategories: StyleCategoryCardData[] = [
  {
    id: 'casual',
    label: 'Casual',
    image: '/style-categories/casual-style.png',
    variant: 'casual',
    href: '#',
  },
  {
    id: 'formal',
    label: 'Formal',
    image: '/style-categories/formal-style.png',
    variant: 'formal',
    href: '#',
  },
  {
    id: 'party',
    label: 'Party',
    image: '/style-categories/party-style.png',
    variant: 'party',
    href: '#',
  },
  {
    id: 'gym',
    label: 'Gym',
    image: '/style-categories/gym-style.png',
    variant: 'gym',
    href: '#',
  },
];
