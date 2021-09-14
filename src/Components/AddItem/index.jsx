import React, { Component, Fragment } from 'react'
import Styles from "./style.module.css";

export default class AddItem extends Component {

    render() {
        return (
            <Fragment>
                <form className="d-flex" onSubmit={this.props.handleSubmitForm}>
                    <input onChange={this.props.handleFormData} type="text" value={this.props.courseValue} id="course" className={Styles.task} placeholder="your Course..." />
                    <button className={Styles.action}>add</button>
                </form>
            </Fragment>
        )
    }
}
//