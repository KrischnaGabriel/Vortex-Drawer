import React from 'react'
import Info from './Info.js'
import css from './InputField.module.css'

/*
__InputField__

label: labelname
timeout: changes the auto-submit time. accepted values:
    false = no auto submit
    0 = instand submit
    number (in ms) = timeout time till auto-submit
    default value is 700ms
onChange: function that will be called with the value of the input field. if the input field has an invalid value, it will call this function with undefined instead of NaN
submitInvalid: boolean value if invalid numbers should be submitted. default:yes
state
constraints: array of options: notNegative,notFloat
jsinput: boolean if jsinput is allowed
waiting: function that gets called if userinput was detected and its waiting
submit:
softsubmit
 */


export default function InputField(props) {

    var [,_update] = React.useState();
    const state = props.state
    function setState(new_state) {
        props.state = new_state;
        _update({})
    }
    
    console.log("satte",state)
    console.log("state.string_value",state.string_value)
    /*
    this hacky code, instead of using  a passed state from props and an internal one and then having to figure out which one is newer, i heremit dump the inner state and sudo-replace it with the passed state.
    inner and passed state thus stay syncd.
React in it's concept is geniusly simple and perfect but actually, when it comes to lifecycles, state, the existance of both functional and class components ,then it's a Mess!!
    */



    let submitInvalid = props.submitInvalid == undefined? true:props.submitInvalid

    function softsubmit() {
        console.log("softsubmit",state.number)
        if (state.isValid) {
            props.onSoftChange(state);
        } else {
            if (submitInvalid) props.onSoftChange(state);
        }
        setState(state)
    }
    function submit() {
        if (state.isValid) {
            props.onChange(state);
        } else {
            if (submitInvalid) props.onChange(state);
        }
        setState(state)
    }

    function validate(string_value) {
        console.log("validate",string_value)
        state.string_value = string_value;

        if (props.jsinput) {
            try{
                let val = eval(string_value)
                state.number = isNaN(val)? NaN:val;
            } catch (Ex) {
                state.number = NaN
            }
        }else{
            state.number = Number(string_value);
        }

        state.isValid = !Number.isNaN(state.number);

    }
    let ref = React.useRef()
    React.useEffect(()=>{
        if (ref.current) {
            if (ref.current.innerText != state.string_value) ref.current.innerText = state.string_value
        }
    })/*
    no matter how you bring it else to the element, it will rerenderr and then also reput the innertext, thus reseting the cursor position, which is annoying */

    validate(state.string_value)

    let keyPress_timeout = props.timeout != undefined? props.timeout:700 // time after entering a value ( and not pressing enter it takes to just automatically submit these values)

    let regex
    if (Array.isArray(props.constraints)) {

        if (props.constraints.indexOf("notNegative")==-1 && props.constraints.indexOf("notFloat")==-1)
            regex = /^[0-9\.-]$/i
        else if (props.constraints.indexOf("notFloat")==-1)
            regex = /^[0-9\.]$/i
        else if (props.constraints.indexOf("notNegative")==-1)
            regex = /^[0-9-]$/i
        else
            regex = /^[0-9]$/i
    } else
    regex = /^[0-9\.-]$/i
    // this is awful code
    var timeout
    return (

        <label className={css.textInput+" "+props.className}>
            {props.label}
            <div disabled={props.disabled}>
                <div valid={state.isValid+''} contentEditable={!props.disabled?'true':'false'} spellCheck="false" ref={ref} onKeyPress={(e)=>{
                    if (!props.jsinput && !regex.test(e.key) ) e.preventDefault();
                    if (e.which == 13) {
                        e.preventDefault()
                        clearTimeout(timeout);
                        validate(e.target.innerText);
                        submit();
                    }
                }}
                onInput={e=>{
                    if (keyPress_timeout!==false) {
                        if (keyPress_timeout === 0) {
                            validate(e.target.innerText);
                            submit();
                        }else {
                            if (props.waiting) props.waiting();
                            clearTimeout(timeout);
                            timeout = setTimeout(()=>{
                                validate(e.target.innerText);
                                submit();
                            }, keyPress_timeout)
                        }
                    }else{
                        validate(e.target.innerText);
                        softsubmit();
                    }
                }}
                
                >ass</div>
                <Info info={props.info} />
            </div>
        </label>
    )
}


{/*older class form. got obsolete as this component is better as a function

    export default class InputField extends React.Component {
        constructor(props) {
            super(props)
            this.props = props;

            this.submitInvalid = props.submitInvalid == undefined? true:props.submitInvalid

            this.state = null
            

        }
        
        timeout

        softsubmit() {
            console.log("softsubmit",this.state.number)
            if (this.state.isValid) {
                this.props.onSoftChange(this.state);
            } else {
                if (this.submitInvalid) this.props.onSoftChange(this.state);
            }
            this.setState({...this.state})
        }
        submit() {
            if (this.state.isValid) {
                this.props.onChange(this.state);
            } else {
                if (this.submitInvalid) this.props.onChange(this.state);
            }
            this.setState({...this.state})
        }

        componentDidUpdate() {
        }
        _setState(new_state) {
            this.props.state = new_state;

        }

        validate(string_value) {
            console.log("validate",string_value)
            this.state.string_value = string_value;

            if (this.props.jsinput) {
                try{
                    let val = eval(string_value)
                    this.state.number = isNaN(val)? NaN:val;
                } catch (Ex) {
                    this.state.number = NaN
                }
            }else{
                this.state.number = Number(string_value);
            }

            this.state.isValid = !Number.isNaN(this.state.number);

        }


        render() {
            this.state = this.props.state

            let initial_string_value = props.defaultValue? props.defaultValue:""
            this.validate(initial_string_value)

            this.keyPress_timeout = this.props.timeout != undefined? this.props.timeout:700 // time after entering a value ( and not pressing enter it takes to just automatically submit these values)

            if (Array.isArray(this.props.constraints)) {

                if (this.props.constraints.indexOf("notNegative")==-1 && this.props.constraints.indexOf("notFloat")==-1)
                    this.regex = /^[0-9\.-]$/i
                else if (this.props.constraints.indexOf("notFloat")==-1)
                    this.regex = /^[0-9\.]$/i
                else if (this.props.constraints.indexOf("notNegative")==-1)
                    this.regex = /^[0-9-]$/i
                else
                    this.regex = /^[0-9]$/i
            } else
            this.regex = /^[0-9\.-]$/i
            // this is awful code

            return (

                <label className={css.textInput+" "+this.props.className}>
                    {this.props.label}
                    <div disabled={this.props.disabled}>
                        <div valid={this.state.isValid+''} contentEditable={!this.props.disabled?'true':'false'} spellCheck="false" onKeyPress={(e)=>{
                            if (!this.props.jsinput && !this.regex.test(e.key) ) e.preventDefault();
                            if (e.which == 13) {
                                e.preventDefault()
                                clearTimeout(this.timeout);
                                this.validate(e.target.innerText);
                                this.submit();
                            }
                        }}
                        onInput={e=>{
                            console.log("ASSSSSSSSSss")
                            if (this.keyPress_timeout!==false) {
                                if (this.keyPress_timeout === 0) {
                                    this.validate(e.target.innerText);
                                    this.submit();
                                }else {
                                    if (this.props.waiting) this.props.waiting();
                                    clearTimeout(this.timeout);
                                    this.timeout = setTimeout(()=>{
                                        this.validate(e.target.innerText);
                                        this.submit();
                                    }, this.keyPress_timeout)
                                }
                            }else{
                                this.validate(e.target.innerText);
                                this.softsubmit();
                            }
                        }}
                        >{initial_string_value}</div>
                        <Info info={this.props.info} />
                    </div>
                </label>
            )
        }
    }

*/}
{/*legacy input field using <input/> instead of editable divs
    

        <label>
            Multiplier
            <input placeholder={multiplier_isValid? null:multiplier} defaultValue={multiplier_isValid? multiplier:null} type="text" onKeyPress={(e)=>{
                //console.log("onKeyPress",e)
                if (! /^[0-9\.-]$/i.test(e.key) ) e.preventDefault();
                clearTimeout(timeout_multiplier);
                function submit() { setState({...state, multiplier: e.target.value}) }
                if (e.which == 13) {
                    submit();
                } else {
                    timeout_multiplier = setTimeout(submit,keyPress_timeout)
                    //timeout_modulus = setTimeout(setState,2000,{...state, modulus: e.target.value}) // the event.value doesnt gets passed for whatever godddam reason. so here goes workaround
                }
            }}/>
        </label>
*/}