import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addStory } from '../../actions/storiesActions'
import TopStory from './TopStory';

class StoryInput extends Component {

    state = {
        opening_line: '',
        image: '',
        genre: '',
        author: this.props.user.username, 
        openingLineError: '',
        imageError: '',
        genreError: ''
    }
    // validateImage(image) {
    // //regrex here 
    // }

    handleOnChange = (e) => {
        let name = e.target.name
        this.setState({ [name]: e.target.value })
    }

    handleOnSubmit = (e) => {
        // We can validate the data the user enters before we set it on the state, allowing us to block any invalid values and set another state property (for example, isInvalidNumber). 
        e.preventDefault();

        if (this.state.opening_line === '') {
            this.setState({ openingLineError: 'Opening line is required.' });
        }
        else if (this.state.image === '') {
            this.setState({ imageError: 'Image is required.' });
        }


        else if (this.state.genre === '') {
            this.setState({ genreError: 'Genre is required.' });
        }
        else {
            this.setState({ openingLineError: '', imageError: '', genreError: '' });
            this.props.addStory(this.state)
            this.setState({
                opening_line: '',
                image: '',
                genre: ''
            })
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <p className="text-secondary font-weight-bold text-warning">Add a new story:</p>
                        <form className="mt-2">
                            <div className="mb-3">
                                <input placeholder="Opening line here..." className="form-control"  value={this.state.opening_line} onChange={this.handleOnChange} name="opening_line" />
                                <small className="form-text text-danger">{this.state.openingLineError}</small>
                            </div>

                            <div className="mb-3">
                                <input placeholder="Image URL" className="form-control" type="url" value={this.state.image} onChange={this.handleOnChange} name="image" required />
                                <small className="form-text text-danger">{this.state.imageError}</small>
                            </div>

                            <div className="mb-3">
                                <select className="custom-select d-block w-100" onChange={this.handleOnChange} name="genre">
                                    <option selected="true" disabled="disabled">Choose a Genre</option>
                                    <option>Comedy</option>
                                    <option>Horror</option>
                                    <option>Action</option>
                                    <option>Fantasy</option>
                                </select>
                                <small className="form-text text-danger">{this.state.genreError}</small>
                            </div>

                            <button className="btn btn-secondary float-right" onClick={(event) => this.handleOnSubmit(event)}> Submit </button>
                        </form>
                    </div>
                </div>
                
                <div className="col-md-3">
                    <TopStory story={this.props.topStory} />
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.currentUser
    }
}

export default connect(mapStateToProps, { addStory })(StoryInput);

