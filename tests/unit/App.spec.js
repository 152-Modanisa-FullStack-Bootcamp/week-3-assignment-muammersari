import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/App";
import Vuex from "vuex";

function mountComponentConfig(numberCount) {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  return { 
    localVue,
    mocks: {
      $store: {
        state: { count: numberCount },
        getters: { getCount: numberCount },
      },
    },
  };
}

describe("App.Vue", () => {

  test("Sanity check for test environment", () => {
    expect(true).toBeTruthy();
  });

  test("h1 exists", () => {
    let wrapper = shallowMount(App, mountComponentConfig());
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  test("h1 text equals to Daily Corona Cases in Turkey check", () => {
    let wrapper = shallowMount(App, mountComponentConfig());
    expect(wrapper.find("h1").text()).toEqual("Daily Corona Cases in Turkey");
  });

  test("notificationArea text message check", () => {
    let number = [0, 5, 10];

    number.forEach((element) => {
      let wrapper = shallowMount(App, mountComponentConfig(element));
      var notificationAreaText = wrapper.find(".notificationArea").text();

      if (element == 0)
        expect(notificationAreaText).toEqual(
          "So safe. Case count is " + element + "k"
        );
      else if (element == 5)
        expect(notificationAreaText).toEqual(
          "Life is normal. Case count is " + element + "k"
        );
      else
        expect(notificationAreaText).toEqual(
          "Danger!!! Case count is " + element + "k"
        );
    });
  });

  test("notificationArea class check based on getCount value", () => {
    let number = [
      { key: 0, value: "safe" },
      { key: 5, value: "normal" },
      { key: 10, value: "danger" },
    ];

    number.forEach((element) => {
      let wrapper = shallowMount(App, mountComponentConfig(element.key));
      var notificationAreaText = wrapper
        .find(".notificationArea")
        .attributes().class;

      if (element == 0)
        expect(notificationAreaText).toEqual(
          "notificationArea " + element.value
        );
      else if (element == 5)
        expect(notificationAreaText).toEqual(
          "notificationArea " + element.value
        );
      else
        expect(notificationAreaText).toEqual(
          "notificationArea " + element.value
        );
    });
  });
});
