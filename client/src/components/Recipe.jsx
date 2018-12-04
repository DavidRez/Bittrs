import React from 'react';

class Recipe extends React.Component {
    render() {
        return (
            <div id="recipe">
            <ul>
                <li>500 mg of alcohol</li>
                {Object.keys(this.props.herbs).map((herb, i) =>
                    <li key={i}>
                    {Math.floor(100/Object.keys(this.props.herbs).length)} mg of {herb}
                    </li>
                )}
            </ul>
            </div>
        );
    }
}

export default Recipe;