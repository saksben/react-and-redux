import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"; // configures enzyme to work with React 17 
configure({ adapter: new Adapter() });