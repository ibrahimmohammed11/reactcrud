import React, { Component, Fragment } from 'react';
import AddItem from '../AddItem';
import ListData from '../ListData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Styles from "./style.module.css";
export default class Main extends Component {
    state = {
        courses: [
            // { id: 1, course: "HTML" },
            // { id: 2, course: "CSS" },
            // { id: 3, course: "JavaScript" },
            // { id: 4, course: "PHP" },
        ],
        newCourse: { id: '', course: '' },
    }
    addToLocalStorage = (courses) => {
        localStorage.setItem("courses", JSON.stringify(courses));
    };
    componentDidMount() {
        let courses = JSON.parse(localStorage.getItem("courses"));
        if (courses !== null) {
            this.setState({ courses });
        }
    }
    deleteCourse = (index) => {
        // first method to delete element from state
        let courses = [...this.state.courses];
        // courses = courses.filter((item) => item.id !== id);
        // this.setState({
        //     courses
        // })

        // second method to delete element from state
        // let index = courses.findIndex((item) => item.id === id);
        // courses.splice(index, 1);
        // this.setState({
        //     courses
        // })

        // third method to delete element from state
        courses.splice(index, 1);
        this.setState({
            courses
        })
        this.addToLocalStorage(courses);

    }

    handleFormData = (e) => {
        let newCourse = this.state.newCourse;
        newCourse.course = e.target.value;
        newCourse.id = Math.random().toFixed(4);
        this.setState({
            newCourse
        })

    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        if (e.target.course.value === "") {
            toast.error("Please enter your new course")
        } else {
            let newCourse = this.state.newCourse;
            let courses = [...this.state.courses];
            courses.push(newCourse)
            this.setState({
                courses: courses,
                newCourse: { id: '', course: '' } // for reset form with value of each input
            });
            this.addToLocalStorage(courses);
        }

    }

    updateCourse = (index, value) => {
        let courses = [...this.state.courses];
        let editCourse = courses[index];
        editCourse["course"] = value;
        this.setState({
            courses
        })
        this.addToLocalStorage(courses);
    }

    render() {
        let { courses } = this.state;
        let courseValue = this.state.newCourse.course; // for reset form with value of each input
        return (
            <Fragment>
                <div className={Styles.container1}>
                    <ToastContainer />

                    <div className={Styles.formStyle}>
                        <h1 className="bg-danger py-3">Courses</h1>
                        <div className={Styles.listItems}>
                            <AddItem courseValue={courseValue} handleSubmitForm={this.handleSubmitForm} handleFormData={this.handleFormData} />
                            {courses.length > 0 ? courses.map((course, key) => {
                                return <ListData index={key} key={key} course={course} deleteTask={this.deleteCourse} updateCourse={this.updateCourse} />
                            }) : <div className="py-4"><b>You don't have Courses to show</b></div>}
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}
