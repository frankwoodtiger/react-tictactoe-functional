import { getSymbol } from './utils'

const Box = ({boxObj, onClickHandler}) => {
    return (
        <div className="box noselect" onClick={onClickHandler}
            style={{ 
                "backgroundColor": boxObj.color ? 'yellow' : 'transparent',
                "color": boxObj.color ? 'black' : 'white',
            }}>
            {getSymbol(boxObj.boxState)}
        </div>
    );
}

export default Box;