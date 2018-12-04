import React from 'react';

class Benefits extends React.Component {
    render() {
        console.log(this.props.benefits)
        return (
            <ul id="benefits">
                {this.props.benefits.map((benefit,i) => {
                    <li key={i}>{benefit}</li>
                })}
            </ul>
        );
    }
}

export default Benefits;