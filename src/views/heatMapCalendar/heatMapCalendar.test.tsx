import { render, RenderResult } from "@testing-library/react";
import Enzyme from "enzyme";
import HeatMapCalendar from "./heatMapCalendar";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("Snapshot testing heatmapcalnder", () => {
  it("snapshot heatmap calendar", async () => {
    let wrapper: RenderResult;
    wrapper = render(<HeatMapCalendar />);
    expect(wrapper).toMatchSnapshot();
  });
});
