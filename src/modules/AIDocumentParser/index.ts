import { lazyLoad } from '@/utils/loadable';

const Page = lazyLoad(
  () => import('./AIDocumentParser'),
  module => module.default,
);

export default Page;
