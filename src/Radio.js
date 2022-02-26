import Info from './Info.js'
import Warning from './Warning.js'
import css from './Radio.module.css'
var i = 0
export default function(props) {
    let name = css.wrapper+i++
    
    function onChange(e) {
        props.onChange(e.target.value == "1")
    }
    return (
        <div className={css.wrapper} disabled={props.disabled}>
            <label>{props.a}</label>
            <input type="radio" name={name} onChange={onChange} checked={props.defaultValue ==false} value="0" disabled={props.disabled}/>
            <input type="radio" name={name} onChange={onChange} checked={props.defaultValue ==true} value="1" disabled={props.disabled}/>
            <label>{props.b}</label>
            <Warning warn={props.warn} />
            <Info info={props.info} />
        </div>
    )
}