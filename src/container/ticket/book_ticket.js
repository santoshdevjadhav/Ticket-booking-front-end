import React, { Component } from 'react'
import { Button, Table, FormGroup, Label, Col } from 'reactstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import * as book_action from '../../action/book_action/book_action'
import { argumentPlaceholder } from '@babel/types'
import moment from 'moment'

class book_ticket extends Component {
    constructor(props) {
        super(props)

        this.state = {

            booked_seats: [],
            id: '',
            already_booked: [],
            select_seats: [],
            name: '',
            date: ''

        }
    }

    componentWillMount() {
        let id, book_arr = []
        this.props.book.data.map((data) => {
            const { movie_name, date, _id, booked_seats } = data
            if (movie_name == this.props.location.state.movie && date == this.props.location.state.date) {
                id = _id
                book_arr = [...booked_seats]
            }
        })
        this.setState({
            id: id,
            already_booked: book_arr
        })
    }
    btn_book = (e) => {
        var flag = false;
        e.preventDefault()
        let arr = [...this.state.select_seats]
        if (arr.includes(e.target.id)) {
            arr = arr.filter(item => item !== e.target.id)
        } else {
            arr.push(e.target.id)
        }
        this.setState({
            select_seats: arr,
            name: this.props.location.state.movie,
            date: this.props.location.state.date
        })
    }
    generate_button = () => {

        var element = []
        for (var i = 0; i < 20; i++) {

            if (i % 5 == 0) {
                element.push(<tr></tr>)
            }
            var flag = false, flag1 = false
            if (this.state.already_booked.includes((i + 1) + ""))
                flag = true
            if (this.state.select_seats.includes((i + 1) + ""))
                flag1 = true


            element.push(<td><Button color={flag ? "success" : flag1 ? "info" : "secondary"} onClick={this.btn_book} id={i + 1} >{i + 1}</Button> </td>)
        }
        return element
    }
    btn_book_ticket = (e) => {
        e.preventDefault()

        let arr1 = [...this.state.select_seats, ...this.state.already_booked]

        this.setState({

            booked_seats: arr1
        }, function () {
            this.props.action.book.update_movie_detail({ id: this.state.id, booked_seats: this.state.booked_seats })
                .then((item) => {

                })
                .catch(error => console.log(error))
        })


    }
    btn_book_cancel = () => {
        this.setState({

            select_seats: []
        })
    }
    render() {
        return (
            <div>
                <center>
                    <nav class="navbar navbar-light bg-light ">
                        <center>
                            <h4>Movie:{this.props.location.state.movie}Date:{moment(this.props.location.state.date).format("DD-MM-YYYY")}</h4>
                        </center>
                        <table>
                            <tr><td><p>Availabe:<p class="text-secondary" >grey</p></p></td></tr>
                            <tr><td> <p>already booked:<p class="text-success" >green</p></p></td></tr>
                            <tr><td><p>current booked:<p class="text-info" >skyblue</p></p></td></tr>
                        </table>


                    </nav>
                    <Table cellPadding="5" cellSpacing="10">

                        <tbody>
                            {this.generate_button()}
                        </tbody>
                    </Table>
                </center>
                <FormGroup row>

                    <Col sm={6}>
                        <Label>booked:{this.state.booked_seats.length > 0 ? this.state.booked_seats.length : this.state.already_booked.length}</Label>

                    </Col>
                    <Col sm={6}>

                        <Label>available:{20 - (this.state.booked_seats.length > 0 ? this.state.booked_seats.length : this.state.already_booked.length)}</Label>
                    </Col>
                </FormGroup>
                <FormGroup row>

                    <Col sm={6}>

                        <Button onClick={this.btn_book_ticket} color="success">Book</Button>

                    </Col>
                    <Col sm={6}>

                        <Button onClick={this.btn_book_cancel} color="danger">Cancel</Button>
                    </Col>
                </FormGroup>


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
        book: bindActionCreators(book_action, dispatch)
    }
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(book_ticket))
