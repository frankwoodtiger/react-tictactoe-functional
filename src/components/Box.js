import { getSymbol } from './utils'

const Box = (props) => {
    return (
        <div onClick={props.onClickHandler}
            style={{ 
                "backgroundColor": props.boxObj.color ? 'yellow' : 'transparent',
                "color": props.boxObj.color ? 'black' : 'white',
            }}
            className="box">{getSymbol(props.boxObj.boxState)}
        </div>
    );
}

export default Box;