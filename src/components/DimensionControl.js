import React from 'react';

const DimensionControl = props => {
    return (
        <React.Fragment>
            <button className={props.showDimensionControl ? "hide" : ""}
                onClick={props.onClickSetDimension}>Set Dimension</button>
            <form className={`dimension-group ${!props.showDimensionControl ? "hide" : ""}`}
                onSubmit={props.onClickSubmitDimension}>
                <input name="dimension-input" type="text" defaultValue={props.dimension}
                    onKeyUp={(e) => e.target.value = e.target.value.replace(/\D+/,'')}/>
                <button type="submit">Confirm</button>
                <button type="button" onClick={props.onClickCancel}>Cancel</button>
            </form>
        </React.Fragment>
    );
}

export default DimensionControl;