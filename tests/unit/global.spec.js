import { actions, mutations, state } from "@/store";
describe("actions tests", () => {
  it("increment functionality check", () => {
    let context = {
      commit: jest.fn(),
    };

    actions.increment(context);
    expect(context.commit).toHaveBeenCalled();
    expect(context.commit).toHaveBeenCalledWith("addToCount", 1);
  });

  it("decrement functionality check", () => {
    let context = {
      commit: jest.fn(),
    };

    actions.decrement(context);
    expect(context.commit).toHaveBeenCalled();
    expect(context.commit).toHaveBeenCalledWith("addToCount", -1);
  });
});
