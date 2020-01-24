import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, FormGroup, Input, Col, Form } from 'reactstrap'

import { withRouter } from 'react-router-dom'
import * as book_action from '../../action/book_action/book_action'

class movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie_name: '',
            date: '',
        }
    }

    getData = () => {
        return this.props.book.data.map((data, key) => {
            if (data.theatre_name == this.props.location.state.id) {
                const { movie_name, _id } = data
                return (
                    <option value={movie_name}>{movie_name}</option>

                )
            }
        })
    }
    getShow = () => {
        return this.props.book.data.map((data, key) => {
            if (data.theatre_name == this.props.location.state.id) {
                const { date } = data
                return (
                    <option value={date}>{date}</option>

                )
            }
        })
    }
    handle_change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    btn_movie = (e) => {
        e.preventDefault()
        if (this.state.movie == "" || this.state.dob == "") {
            alert("please fill all data")
        } else {

            this.props.history.push({ pathname: "/book", state: { movie: this.state.movie_name, date: this.state.date } })
        }

    }
    render() {
        return (
            <div>
                <center>

                    <Form>
                        <h1>Movies Details</h1>
                        <FormGroup row>
                            <Col sm={2}>
                                select Movies
                    </Col>
                            <Col sm={4}>

                                <Input type="select" name="movie_name" onChange={this.handle_change} >
                                    <option value="-1">select Movie</option>
                                    {this.getData()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2}>
                                select Movies
                    </Col>
                            <Col sm={4}>
                                <Input type="select" name="date" onChange={this.handle_change}  >
                                    <option value="-1">select show</option>
                                    {this.getShow()}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={7}>
                                <Button onClick={this.btn_movie}>submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </center>
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    const { book } = state
    return {
        book
    }
}
const mapDispatchToProps = dispatch => ({
    action: {
        book: bindActionCreators(book_action, dispatch),

    }
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(movie))