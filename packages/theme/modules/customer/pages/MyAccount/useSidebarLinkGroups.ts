import type { RawLocation } from 'vue-router';

import { useRouter, useContext } from '@nuxtjs/composition-api';
import { useUser } from '~/modules/customer/composables/useUser';
import { useCart } from '~/modules/checkout/composables/useCart';

type LinkGroup = { title: string, items: LinkGroupItem[] };
type LinkGroupItem = { id: string, label: string, link?: RawLocation };

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
          id: 'my-profile',
          label: 'My profile',
          link: { name: 'customer-my-profile' },
        },
        {
          id: 'address-details',
          label: 'Addresses details',
          link: { name: 'customer-addresses-details' },
        },
        {
          id: 'my-newsletter',
          label: 'My newsletter',
          link: { name: 'customer-my-newsletter' },
        },
        {
          id: 'my-wishlist',
          label: 'My wishlist',
          link: { name: 'customer-my-wishlist' },
        },
      ],
    },
    {
      title: 'Order details',
      items: [
        {
          id: 'order-history',
          label: 'Order history',
          link: { name: 'customer-order-history' },
        },
        {
          id: 'my-reviews',
          label: 'My reviews',
          link: { name: 'customer-my-reviews' },
        },
        {
          id: 'log-out',
          label: 'Log out',
        },
      ],
    },
  ];

  const logoutUser = async () => {
    await logout({});
    await clear({});
    await router.push(localeRoute({ name: 'home' }));
  };

  return { sidebarLinkGroups, logoutUser };
};
