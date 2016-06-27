import * as React from "react";
import { render } from "react-dom";

interface ChildProps {
  name: string;
  count: number;
}

// StatelessComponent
const MyChildComponent: React.StatelessComponent<ChildProps> = (props) => <div>{ props.count } / { props.name }</div>;

/*
ReactComponentClass
class MyChildComponent extends React.Component<ChildProps, any> {
  render() {
    return <div>{ this.props.count * 2 } / { this.props.name + "." }</div>;
  }
}
*/

const App: React.StatelessComponent<void> = () => (
  <section>
    <h1>Foo</h1>
    <MyChildComponent name="myname" count={ 1 }></MyChildComponent>
  </section>
);
