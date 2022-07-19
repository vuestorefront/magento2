import type { RawLocation } from 'vue-router';
import { useRouter, useContext } from '@nuxtjs/composition-api';
import { useUser } from '~/modules/customer/composables/useUser';
import { useCart } from '~/modules/checkout/composables/useCart';

type LinkGroup = { title: string, items: LinkGroupItem[] };
type LinkGroupItem = { label: string, link?: RawLocation, listeners?: Record<string, () => (Promise<void> | void)> };

export const useSidebarLinkGroups = () => {
  const { localeRoute } = useContext();
  const { logout } = useUser();
  const { clear } = useCart();

  const router = useRouter();
  const sidebarLinkGroups : LinkGroup[] = [
    {
      title: 'Personal details',
      items: [
        {
          label: 'My profile',
          link: { name: 'customer-my-profile' },
        },
        {
          label: 'Addresses details',
          link: { name: 'customer-addresses-details' },
        },
        {
          label: 'My newsletter',
          link: { name: 'customer-my-newsletter' },
        },
        {
          label: 'My wishlist',
          link: { name: 'customer-my-wishlist' },
        },
      ],
    },
    {
      title: 'Order details',
      items: [
        {
          label: 'Order history',
          link: { name: 'customer-order-history' },
        },
        {
          label: 'My reviews',
          link: { name: 'customer-my-reviews' },
        },
        {
          label: 'Log out',
          listeners: {
            click: async () => {
              await logout({});
              await clear({});
              await router.push(localeRoute({ name: 'home' }));
            },
          },
        },
      ],
    },
  ];

  return { sidebarLinkGroups };
};
