import css from './Info.module.css'
export default function(props) {
    if (props.info) return <span content={props.info} className={css.info}>i</span>
    else return null
}