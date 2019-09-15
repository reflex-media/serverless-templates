import React from "react";
import { shallow } from "enzyme";

import HomeHeader from "../HomeHeader";
import { app } from "../../../config";

describe("test HomeHeader component", () => {
  it("should render correctly", () => {
    const component = shallow(<HomeHeader />);
    expect(component).toMatchSnapshot();
  });

  it("should render with debug turned off", () => {
    app.debug = false;
    const component = shallow(<HomeHeader />);
    expect(component).toMatchSnapshot();
    app.debug = true;
  });
});
