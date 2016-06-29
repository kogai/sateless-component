import { PropTypes, ReactPropTypes } from "react";
import { assign } from "lodash";

export interface Providers {
  [key: string]: any;
}

export interface PropTypeDictionary {
  [key: string]: ReactPropTypes;
}

const assignPropTypes = (acc: PropTypeDictionary, token: string) => assign<{}, PropTypeDictionary>({}, acc, { [token]: PropTypes.object });

export class Injector {
  private tokens: string[];
  childContextTypes: PropTypeDictionary;

  constructor(private providers: Providers, previewProviders?: Providers) {
    this.providers = assign({}, previewProviders, providers);
    this.tokens = Object.keys(providers);
    this.childContextTypes = this.tokens.reduce(assignPropTypes, <PropTypeDictionary>{});
  }

  getChildContext() {
    return this.providers;
  }
}

/** サンプルのクラス実装 */
export class MyService {
  private serviceName: string = "Injectable service?";
  getName() {
    return this.serviceName;
  }
}

export enum ProviderTokens {
  MyService,
}
