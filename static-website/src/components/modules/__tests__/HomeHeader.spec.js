import React from "react";
import { shallow } from "enzyme";

import HomeHeader from "Components/modules/HomeHeader";

describe("test HomeHeader component", () => {
  it("should render correctly", () => {
    const component = shallow(<HomeHeader />);
    expect(component).toMatchSnapshot();
  });
});
