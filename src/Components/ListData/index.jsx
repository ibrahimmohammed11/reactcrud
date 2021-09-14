import React, { Component, Fragment } from 'react'
import Styles from "./style.module.css";

export default class ListData extends Component {
    state = {
        isEdit: false
    }
    toggleState = () => {
        let { isEdit } = this.state;
        this.setState({
            isEdit: !isEdit,
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.updateCourse(this.props.index, this.input.value);
        this.toggleState();
    }
    render() {
        let { index, course } = this.props.course;
        let { deleteTask } = this.props;
        let { isEdit } = this.state;
        return (
            <Fragment>
                {isEdit
                    ? <form onSubmit={this.handleFormSubmit}>
                        <input ref={(v) => { this.input = v }} className={Styles.editInput} defaultValue={course} />
                        <button className={Styles.editButton}>Update Course</button>
                    </form>
                    : <div>
                        <span className={Styles.task}>{course}</span>
                        <span onClick={this.toggleState} className={Styles.edit}><i className={`${Styles.editSt} fas fa-edit`}></i></span>
                        <span className={Styles.action} onClick={() => deleteTask(index)}><i className={`${Styles.closeSt} far fa-times-circle`}></i></span>
                    </div>
                }

            </Fragment>
        )
    }
}
