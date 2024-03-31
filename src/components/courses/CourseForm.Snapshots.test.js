import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    // represents an object of the React component
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()} // jest.fn() creates an empty mock function
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    // represents an object of the React component
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()} // jest.fn() creates an empty mock function
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
