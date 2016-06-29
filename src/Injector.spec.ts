import { PropTypes } from "react";
import { Injector } from "./Injector";

class TestClassA {}
class TestClassB {}
class TestClassC {}
const TestValue = "this is test value";

enum ProviderTokens {
  TestClassA,
  TestClassB,
  TestClassC,
  TestValue,
}

describe("テスト自体のテスト", function () {
  let inject: Injector;
  beforeEach(() => {
    inject = new Injector({
      [ProviderTokens.TestClassA]: new TestClassA(),
      [ProviderTokens.TestClassB]: new TestClassB(),
      [ProviderTokens.TestValue]: TestValue,
    });
  });

  it("実行時のReact用型情報を持つ", () => {
    expect(inject.childContextTypes).toEqual({
      [ProviderTokens.TestClassA]: PropTypes.object,
      [ProviderTokens.TestClassB]: PropTypes.object,
      [ProviderTokens.TestValue]: PropTypes.object,
    });
  });

  it("DIコンテナからインスタンスを取得できる", () => {
    const context = inject.getChildContext();
    expect(context[ProviderTokens.TestClassA] instanceof TestClassA).toBe(true);
    expect(context[ProviderTokens.TestClassB] instanceof TestClassB).toBe(true);
  });

  it("DIコンテナから値を取得できる", () => {
    const context = inject.getChildContext();
    expect(context[ProviderTokens.TestValue]).toEqual(TestValue);
  });

  it("DIコンテナを継承して上書きできる", () => {
    const context = inject.getChildContext();
    const newInject = new Injector({
      [ProviderTokens.TestClassC]: new TestClassC(),
    }, context);
    const newContext = newInject.getChildContext();
    expect(newContext[ProviderTokens.TestClassA] instanceof TestClassA).toBe(true);
    expect(newContext[ProviderTokens.TestClassB] instanceof TestClassB).toBe(true);
    expect(newContext[ProviderTokens.TestClassC] instanceof TestClassC).toBe(true);
  });
});
