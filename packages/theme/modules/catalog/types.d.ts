export interface Breadcrumb {
  text: string;
  link: string;
}

export interface Price {
  regular: number | null;
  special?: number | null;
  maximum?: number | null;
  final?: number | null;
}

export interface MediaGalleryItem {
  small: string;
  normal: string;
  big: string;
}
