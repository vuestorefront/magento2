import { type AlokaiContainer } from "@vue-storefront/middleware";
import { Config } from "../../types/setup";
import { apolloLinkFactory } from "./graphQl";
import { linkFactory } from "./linkHandlers";

export const createMagentoConnection = (settings: Config, alokai: AlokaiContainer) => {
  const apolloLink = apolloLinkFactory(
    settings,
    {
      apolloLink: linkFactory({ state: settings.state, alokai }),
    },
    alokai
  );

  return {
    apolloLink,
  };
};
