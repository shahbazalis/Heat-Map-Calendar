import Enzyme,{mount} from "enzyme";
import HeatMapCalendar from "../views/heatMapCalendar/heatMapCalendar";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

describe("< HeatMapCalendar/>", () => {
  it('should render as an svg', () => {
    const wrapper = mount(< HeatMapCalendar/>);
    expect(wrapper.find('svg')).toBeDefined();
    expect(wrapper.find('svg')).toHaveLength(1);
  });
});
