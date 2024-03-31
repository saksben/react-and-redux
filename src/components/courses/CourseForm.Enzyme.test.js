import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

// 2 ways to render a React component for testing with Enzyme:
// 1. shallow: renders single component
// 2. mount: renders component with children

// Factory that creates component
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onchange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  //   console.log(wrapper.debug())
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it("labels save buttons as 'Save' when not saving", () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it("labels save buttons as 'Saving...' when saving", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
