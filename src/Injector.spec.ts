import { PropTypes } from "react";
import { Injector, Provider } from "./Injector";

class TestClassA extends Provider {}
class TestClassB extends Provider {}

enum ProviderTokens {
  TestClassA,
  TestClassB,
}

describe("テスト自体のテスト", function () {
  let inject: Injector;
  beforeEach(() => {
    inject = new Injector({
      [ProviderTokens.TestClassA]: new TestClassA(),
      [ProviderTokens.TestClassB]: new TestClassB(),
    });
  });

  it("実行時のReact用型情報を持つ", () => {
    expect(inject.childContextTypes).toEqual({
      [ProviderTokens.TestClassA]: PropTypes.object,
      [ProviderTokens.TestClassB]: PropTypes.object,
    });
  });

  it("DIコンテナからインスタンスを取得できる", () => {});
  it("DIコンテナから値を取得できる", () => {});
  it("DIコンテナは継承・上書きされる", () => {});
});
