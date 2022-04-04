import React from 'react';

class RecordItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecord: props.show,
            isAchieved: props.isAchieved,
            icon: props.icon,
            text: props.text,
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({isAchieved: !this.state.isAchieved})
    }

    render() {
        //If category hasn't been released yet, do not generate record icon.
        if(!this.state.showRecord) {
            return null;
        }
        return (
            <div className="buttonDiv">
                <button onClick={this.onClick}>
                    <img 
                        src={this.state.icon}
                        alt={this.state.text}
                        className={this.state.isAchieved ? "iconImage" : "iconImage greyscale"}
                    />
                </button>
            </div>
        )
    }
}

export default RecordItem