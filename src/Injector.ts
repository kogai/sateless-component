import { PropTypes, ReactPropTypes } from "react";
import { assign } from "lodash";

export abstract class Provider {}

export interface Providers {
  [key: string]: Provider;
}

export interface PropTypeDictionary {
  [key: string]: ReactPropTypes;
}

const assignPropTypes = (acc: PropTypeDictionary, token: string) => assign<{}, PropTypeDictionary>({}, acc, { [token]: PropTypes.object });

export class Injector {
  private tokens: string[];
  childContextTypes: PropTypeDictionary;

  constructor(private providers: Providers) {
    this.tokens = Object.keys(providers);
    this.childContextTypes = this.tokens.reduce(assignPropTypes, <PropTypeDictionary>{});
  }

  getChildContext() {
    return this.providers;
  }
}

/** サンプルのクラス実装 */
export class MyService implements Provider {
  private serviceName: string = "Injectable service?";
  getName() {
    return this.serviceName;
  }
}

export enum ProviderTokens {
  MyService,
}
