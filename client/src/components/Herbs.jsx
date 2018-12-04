import React from 'react';

class Herbs extends React.Component {
    constructor(props) {
        super(props);

        this.clickedHerb = this.clickedHerb.bind(this);

        this.state = {
            herbs : []
        };
    }

    componentDidMount() {
        let arr = Object.keys(this.props.herbs);
        this.setState({herbs : arr})
    }

    clickedHerb(e) {
        this.props.clickedHerb(e);
    }

    render() {
        if(this.state.herbs.length > 0) {
            return (
                <ul class="ui checkbox">
                    {this.state.herbs.map((herb, i) =>
                        <React.Fragment key={i}>
                        <li>
                        <input type="checkbox" name={herb} onClick={this.clickedHerb} />
                        <label>{herb}</label>
                        </li>
                        </React.Fragment>
                    )}
                </ul>
            );
        }
        else
            return(<span></span>)
    }
}

export default Herbs;