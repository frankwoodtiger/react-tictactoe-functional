import { getSymbol } from './utils'

const Box = (props) => {
    return (
        <div className="box noselect" onClick={props.onClickHandler}
            style={{ 
                "backgroundColor": props.boxObj.color ? 'yellow' : 'transparent',
                "color": props.boxObj.color ? 'black' : 'white',
            }}>
            {getSymbol(props.boxObj.boxState)}
        </div>
    );
}

export default Box;