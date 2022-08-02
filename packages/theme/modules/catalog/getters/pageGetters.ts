export interface PageGetters {
  getPageComponent: (type: string) => string;
}

export const getPageComponent = (type) => {
  switch (true) {
    case type === 'SimpleProduct':
    case type === 'VirtualProduct':
    case type === 'DownloadableProduct':
    case type === 'GroupedProduct':
    case type === 'ConfigurableProduct':
    case type === 'BundleProduct':
      return 'product';
    case type === 'CategoryTree':
      return 'category';
    case type === 'CmsPage':
      return 'cms';
    default:
      return null;
  }
};

const pageGetters: PageGetters = {
  getPageComponent,
};

export default pageGetters;
