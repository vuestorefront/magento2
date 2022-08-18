import type { MetaInfo } from 'vue-meta';

export const getMetaInfo = (page: any, isNoIndex: boolean = false): MetaInfo => {
  if (!page) {
    return null;
  }

  const seoTags: MetaInfo = {
    meta: [],
  };

  if (page?.meta_title || page?.title || page?.name) {
    seoTags.title = page?.meta_title || page?.title || page?.name;
  }
  if (page?.meta_description) {
    seoTags.meta.push({
      hid: 'description',
      name: 'description',
      content: page.meta_description,
    });
  }
  if (page?.meta_keyword || page?.meta_keywords) {
    seoTags.meta.push({
      hid: 'keywords',
      name: 'keywords',
      content: page?.meta_keyword || page?.meta_keywords,
    });
  }
  if (isNoIndex) {
    seoTags.meta.push({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  return seoTags;
};
