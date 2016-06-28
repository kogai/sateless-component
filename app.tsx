import * as React from "react";
import { Component, StatelessComponent, PropTypes, ReactElement, ValidationMap } from "react";
import { render } from "react-dom";

import { Injector, MyService, Providers, ProviderTokens } from "./Injector";

/** Child */
interface ChildProps {
  name: string;
  count: number;
}

/** 状態を持たないコンポーネント */
const MyChildComponent: StatelessComponent<ChildProps> = (props, context) => {
  const myService = context[ProviderTokens.MyService] as MyService;
  return (<div>{ props.count } / { props.name } / { myService.getName() }</div>);
};

MyChildComponent.contextTypes = {
  [ProviderTokens.MyService]: PropTypes.object
};


/** App */
const inject = new Injector({
  [ProviderTokens.MyService]: new MyService(),
});

class App extends Component<void, void> {
  static childContextTypes = inject.childContextTypes;

  getChildContext() {
    return inject.getChildContext();
  }

  render() {
    return (
      <section>
        <MyChildComponent name="myname" count={ 1 }></MyChildComponent>
      </section>
    );
  }
}

render(<App></App>, document.getElementById("root"));
