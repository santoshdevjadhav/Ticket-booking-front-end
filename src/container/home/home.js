import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, FormGroup, Col } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import * as  book_action from '../../action/book_action/book_action'
class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: []
        }

    }

    componentWillMount() {
        this.props.action.book.list_theatre()
            .then((item) => {
                let arr = []
                item.map((data, key) => {
                    
                    const { _id, theatre_name } = data
                    arr.push(theatre_name);

                })
                arr = arr.filter((val, pos, self) => { return self.indexOf(val) == pos })
                this.setState({
                    name: arr
                })
            })
            .catch(error => console.log(error))
    }
    btn_theatre = (e) => {
        e.preventDefault()
        console.log("id", e.target.id)
        this.setState({
            id: e.target.id
        }, function () {
            this.props.history.push({ pathname: "/movie", state: { id: this.state.id } })
        })
    }
    getData = () => {

        return this.state.name.map((val) => {

            return (
                <FormGroup row>


                    <Button className="btn btn-primary btn-lg btn-block" color="success" id={val} onClick={this.btn_theatre}>
                        {val}
                    </Button>
                
                </FormGroup>


            )
        })
    }
    render() {
        return (
            <div>
                <h1>Select theatre</h1>
                {this.getData()}


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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(home))