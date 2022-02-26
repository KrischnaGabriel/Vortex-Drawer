import css from './Warning.module.css'
export default function(props) {
    if (props.warn) return <span content={props.warn} className={css.warn}>Δ</span>
    else return null
}