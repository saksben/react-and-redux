import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

// class-based React component
class CoursesPage extends React.Component {
    // does this after the component mount lifecycle phase (when component is inserted into DOM tree)
    componentDidMount() {
    // destructures props for stored courses, authors, and actions
    const { courses, authors, actions } = this.props;
    // checks to see if the api has already been called with data, else load stored courses
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    // checks to see if the api has already been called with data, else load stored authors
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

//   renders a CourseList component, passing courses as props
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

// imports Redux-stored states (destructured above to get)
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// determines what state is passed to the component via props
function mapStateToProps(state) {
  return {
    courses:
    // if there are no authors, return an empty array. Else for each course in courses, map each stored author as authorName (created now) with rest of course state
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
}

// lets us declare what actions to pass to our component on props
function mapDispatchToProps(dispatch) {
  return {
    // makes api calls to load data
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

// This is what the export function is doing, but the uncommented one is convention
// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
