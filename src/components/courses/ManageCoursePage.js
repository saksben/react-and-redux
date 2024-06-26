import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

// function-based React component
export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // checks to see if the api has already been called with data, else load stored courses
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course }); // If there are courses available, set course in state to course passed on props. Copies the course passed into props to state any time a new course is passed in
    }

    // checks to see if the api has already been called with data, else load stored authors
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]); // When a course is changed, it reloads useEffect. An empty array means useEffect will only run once

  // When form input changes, updates the course state based on that input
  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value, // If the change name is authorId, it parses as an int, else assigns it value
    }));
  }

  // Validates form data on client side so it doesn't need to wait for api call to load
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  // When a new course is created via form, display Save loading change and redirect to "/courses" page
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        // Passed in on props so is already bound to dispatch
        history.push("/courses"); // You can use <Redirect> or history to redirect. History is a React router object
      })
      .catch((error) => {
        setSaving(false); // So user can try again
        setErrors({ onSave: error.message });
      });
  }

  // If api call is loading (either have 0), display spinner. Else display CourseForm
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// React's way to validate the type of the prop, like in TypeScript or Java. Destructured in props above
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// Find the course in courses by its matching URL slug
export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

// Determines what state is passed to the component via props
// ownProps lets us access the component's props. In this case, we use to read URL data injected on props by React Router
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

// lets us declare what actions to pass to our component on props
// these are the Thunk action creators from authorActions/courseActions
const mapDispatchToProps = {
  // makes api calls to load data
  loadCourses,
  loadAuthors,
  saveCourse,
};

// Connects component to Redux
// This is what the export function is doing, but the uncommented one is convention
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(ManageCoursePage);
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
