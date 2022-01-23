import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Counter from "@/Counter";
import Vuex from "vuex";
//import { state,actions, mutations } from "@/store";
import { actions, state } from "../../src/store";

function mountComponentConfig(numberCount) {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return {
    localVue,
    mocks: {
      $store: {
        state: { count: numberCount },
      },
    },
  };
}

describe("Counter.vue", () => {
  test("Sanity check for test environment", () => {
    expect(true).toBeTruthy();
  });

  test("Component Exist Check", () => {
    let wrapper = shallowMount(Counter, mountComponentConfig());
    expect(wrapper.find(".counter-container").exists()).toBeTruthy();
  });

  test("Decrease button exist check", () => {
    let wrapper = shallowMount(Counter, mountComponentConfig());
    expect(wrapper.findAll("button").at(0).text()).toEqual("Decrease");
  });

  test("Increase button exist check", () => {
    let wrapper = shallowMount(Counter, mountComponentConfig());
    expect(wrapper.findAll("button").at(1).text()).toEqual("Increase");
  });

  test("Increase button functionality check", async () => {
    const cnfg = mountComponentConfig();
    cnfg.mocks.$store.dispatch = jest.fn();
    let wrapper = shallowMount(Counter, cnfg);

    await wrapper.findAll("button").at(1).trigger("click");
    expect(cnfg.mocks.$store.dispatch).toHaveBeenCalledWith("increment");
  });

  test("Decrease button functionality check", async () => {
    const cnfg = mountComponentConfig();
    cnfg.mocks.$store.dispatch = jest.fn();
    let wrapper = shallowMount(Counter, cnfg);

    await wrapper.findAll("button").at(0).trigger("click");
    expect(cnfg.mocks.$store.dispatch).toHaveBeenCalledWith("decrement");
  });

  test("2 increase + decrease functionality check together", async () => {
    const cnfg = mountComponentConfig(0);
    let countmock = jest.fn();
    cnfg.computed = {
      count: jest.fn().mockReturnValue(1),
    };
    cnfg.mocks.$store.dispatch = jest.fn();
    let wrapper = shallowMount(Counter, cnfg);

    await wrapper.findAll("button").at(1).trigger("click");
    expect(cnfg.mocks.$store.dispatch).toHaveBeenCalledWith("increment");
    await wrapper.findAll("button").at(1).trigger("click");
    expect(cnfg.mocks.$store.dispatch).toHaveBeenCalledWith("increment");

    await wrapper.findAll("button").at(0).trigger("click");
    expect(cnfg.mocks.$store.dispatch).toHaveBeenCalledWith("decrement");

    expect(wrapper.find("span").text()).toEqual(1 + "k");
  });

  test("Count text show check", async () => {
    let wrapper = shallowMount(Counter, mountComponentConfig(2));
    const renderCount = wrapper.find("span").text();

    expect(wrapper.find("span").exists()).toBeTruthy();
    expect(wrapper.find("span").text()).toEqual(2 + "k");
  });
});
