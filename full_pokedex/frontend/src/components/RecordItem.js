import React from 'react';

class RecordItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecord: props.show,
            isAchieved: props.achieved,
            icon: props.icon,
            text: props.text,
        }
    }

    render() {
        if(!this.state.showRecord){
            return null;
        }
        return(
            <div className="buttonDiv">
                <button>
                    <img 
                        src={this.state.icon}
                        alt={this.state.text}
                        className="iconImage"
                    />
                </button>
            </div>
        )
    }
}

export default RecordItem