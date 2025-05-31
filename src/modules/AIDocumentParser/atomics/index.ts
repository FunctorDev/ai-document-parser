import { lazyLoad } from '@/utils/loadable';

export { default as Input } from './Input';
export { default as Onboarding } from './Onboarding';
export { default as EssentialInsights } from './EssentialInsights';

export const Output = lazyLoad(
  () => import('./Output'),
  module => module.default,
  {
    fallback: null,
  },
);
