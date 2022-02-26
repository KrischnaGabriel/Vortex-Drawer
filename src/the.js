
import React from 'react'
import css from './the.module.css'

import InputField from './InputField';
import Radio from './Radio';
import Info from './Info.js'
import Warning from './Warning.js'

import ColorAlgorithms from './Coloring Algorithms/index.js'

function lerp(a,b,i) {
    return a*(1-i) + b*i
}
function inRange(min,x,max) {
    return min<x & x<max;
}



if (window.preset_set == undefined) {
    window.preset_set = [// needs to be global
        {
            preset_name: "Simple 2mod9", 
            showPoints: true, 
            showNumbers: true, 
            flipCircle: true, 
            modulus:{number:9, isValid:true, string_value:"9"}, 
            multiplier:{number:2, isValid:true, string_value:"2"}, 
            colorAlgo: 0, 
            maxLimit:{number:1000, isValid:true, string_value:"1000"}, 
            floatAlgo:false, 
            allowNegative:false, 
            calcFloat: false, 
            allowjsinput: false, 
            start: {number:1, isValid:true, string_value:"1"}, 
            increm: {number:1, isValid:true, string_value:"1"},
            searcxLimit: {number:5000, isValid:true, string_value:"5000"}, 
            loopLimit:{number:100, isValid:true, string_value:"100"},
            autoSubmit: true,showArrows:false
        },
        {"preset_name":"forgot the name","showPoints":false,"showNumbers":false,"flipCircle":true,"modulus":{number:1289, isValid:true, string_value:"1289"},"multiplier":{number:2, isValid:true, string_value:"2"},"colorAlgo":0,"maxLimit":{number:3000, isValid:true, string_value:"3000"},"floatAlgo":0,"allowNegative":false,"calcFloat":false,"allowjsinput":false,"start":{number:1, isValid:true, string_value:"1"},"increm":{number:1, isValid:true, string_value:"1"},"searcxLimit":{number:5000, isValid:true, string_value:"5000"},"loopLimit":{number:100, isValid:true, string_value:"100"},autoSubmit: false,showArrows:false},
        {"preset_name":"432 something","showPoints":true,"showNumbers":false,"flipCircle":true,"modulus":{number:432, isValid:true, string_value:"432"},"multiplier":{number:2, isValid:true, string_value:"2"},"colorAlgo":1,"maxLimit":{number:1000, isValid:true, string_value:"1000"},"floatAlgo":0,"allowNegative":false,"calcFloat":false,"allowjsinput":false,"start":{number:1, isValid:true, string_value:"1"},"increm":{number:1, isValid:true, string_value:"1"},"searcxLimit":{number:5000, isValid:true, string_value:"5000"},"loopLimit":{number:100, isValid:true, string_value:"100"},autoSubmit: false,showArrows:false},
        {"preset_name":"pi mod pi","showPoints":false,"showNumbers":false,"flipCircle":true,"modulus":{number:3.141592653589793, isValid:true, string_value:"Math.PI"},"multiplier":{number:3.141592653589793, isValid:true, string_value:"Math.PI"},"colorAlgo":0,"maxLimit":{number:4000, isValid:true, string_value:"4000"},"floatAlgo":1,"allowNegative":false,"calcFloat":false,"allowjsinput":true,"start":{number:0.0625, isValid:true, string_value:"1/16"},"increm":{number:0.0625, isValid:true, string_value:"1/16"},"searcxLimit":{number:5000, isValid:true, string_value:"5000"},"loopLimit":{number:100, isValid:true, string_value:"100"},"autoSubmit":false,showArrows:false},
        {"preset_name":"pretty 7","showPoints":false,"showNumbers":false,"flipCircle":true,"modulus":{"number":75.5,"isValid":true,"string_value":"75.5"},"multiplier":{"number":2.4,"isValid":true,"string_value":"2.4"},"colorAlgo":0,"maxLimit":{"number":10000,"isValid":true,"string_value":"10000"},"floatAlgo":1,"allowNegative":false,"calcFloat":false,"allowjsinput":true,"start":{"number":0.03125,"isValid":true,"string_value":"1/32"},"increm":{"number":0.03125,"isValid":true,"string_value":"1/32"},"searcxLimit":{"number":5000,"isValid":true,"string_value":"5000"},"loopLimit":{"number":100,"isValid":true,"string_value":"100"},"autoSubmit":false,showArrows:false}

    ]
}

export default function(props) {
    const [state,setState] = React.useState({preset_new:0});

    function _change(name, value) {//hardChange
        setState({...state, [name]: value }) 
    }
    function change(name, value) {//softChange
        // this is the only simple way ( that does not require to save the dom in state) to update the dom while (or strictly talking right before) main code execution
        indikator.comp();
        setTimeout(()=>{
            setState({...state, [name]: value }) 
        },3)
        
    }

    const preset_set = window.preset_set

    if (state.preset_new !== state.preset_old) {
        
        //console.log("### STate Change ##")
        //console.log("state.preset_old = state.preset_new;")
        //console.log(state.preset_old+" = "+state.preset_new)

        state.preset_old = state.preset_new;

        //console.log("setState({...state, ...preset_set[state.preset_old]});")

        //console.log(state, preset_set[state.preset_old])

        Object.assign(state, preset_set[state.preset_old])
        //state = {...state, ...preset_set[state.preset_old]}; even if state is a var it wont work of unexplicable reasons :/

        //console.log("state", state)
    }
    let presetOptions = [];
    for (let i=0; i<preset_set.length; i++) {
        presetOptions.push(<option value={i+""}>{preset_set[i].preset_name}</option>)
    }
    //console.log("STATE",state)



    // ### Indikator ###
        let indikator_ref = React.useRef()
        const indikator = {
            err: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "red"
                    indikator_ref.current.innerText = "Error"
                }
            },
            err: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "red"
                    indikator_ref.current.innerText = "Invalid input"
                }
            },
            inf: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "yellowgreen"
                    indikator_ref.current.innerText = "reached Infinity"
                }
            },
            llimit: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "crimson"
                    indikator_ref.current.innerText = "reached loop Limit!"
                }
            },
            mlimit: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "crimson"
                    indikator_ref.current.innerText = "reached iteration Limit!"
                }
            },
            slimit: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "crimson"
                    indikator_ref.current.innerText = "reached search Limit!"
                }
            },
            lis: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "yellow"
                    indikator_ref.current.innerText = "listening"
                }
            },
            comp: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "orangered"
                    indikator_ref.current.innerText = "computing..."
                }
            },
            done: function () {
                if (indikator_ref.current) {
                    indikator_ref.current.style.color = "lightgreen"
                    indikator_ref.current.innerText = "Done"
                }
            }
        }
        var indikator_state = indikator.done/*
        this is a great example of the difference between let and var.
        with let it doesn't work an the state even after asserting it to another value stays done, but with var it works as expected.
        */
    // ### Indikator ###
    
    // ### Algorithm chooser ###
        /*if (state.allowjsinput) {
            state.allowNegative = true
            state.calcFloat = true
        }*/
        state.floatAlgo = (state.allowNegative | state.calcFloat | state.allowjsinput) 
    // ### Algorithm chooser ###



    let svg_lineBuff
    let svg_dotArr
    let rss = []

    let modulus = state.modulus.number;
    let multiplier = state.multiplier.number;

    if ( state.multiplier.isValid & state.modulus.isValid ) {
        

        //### configure text width ###
            if (modulus>100 & state.showNumbers) state.showNumbers = false

            rss.push(`svg text {font: bold `+(lerp(0.03, 0.1, 10/(10+modulus)))+`px sans-serif;}`)
            // react guys don't tell me what i should and what i souldn't. i don't know a better way. maybe with css vars but idc how
            // also, super not elegant code

        //### configure text width ###
        //### configure point width ###
            let crad = lerp(0.002, 0.01, 200/(200+modulus))
            if (modulus>=500 & state.showPoints) state.showPoints = false

        //### configure point width ###


        //### get circle coords ###
            svg_dotArr = []
            let dividor = Math.PI / (modulus/2);
            let coords_arr = [] // this stores the coords of the numbers around cicle
            for (let i=0,step=0,x,y; i<modulus; i++,step+=dividor) {
                x = Math.sin(step)
                y = Math.cos(step) * (state.flipCircle? -1:1)
                coords_arr.push([x,y])
                if (state.showNumbers) {
                    svg_dotArr.push(<text dx={(x/4)/10} dy={lerp(-0.35,1,y/2+0.5)+"em"} text-anchor={x<0.3? (-0.3<x? "middle":"end"):"start"} x={x} y={y} fill="red">{i==0? modulus+"|0":i}</text>)
                }
                if (state.showPoints) {
                    svg_dotArr.push(<circle cx={x} cy={y} r={crad} fill="yellow" />)
                }
            }
            function getCoordY(i) {
                return Math.cos(dividor*i) * (state.flipCircle? -1:1)
            }

            function getCoordX(i) {
                return Math.sin(dividor*i)
            }
        //### get circle coords ###



        //### calculate stuff ###
            console.log("\ncalculate stuff")
            console.log("a % modulus = b")
            let number_loops = []
            if (state.floatAlgo) {
                let numberRegister = new Map()
                // this searches trough all possible numbers searching for loops like 1,2,4,8,7,5,1 is one loop, 3,6,3 is another on and so forth
                for (let check_no=state.start.number,i_total=0,i_search=0; check_no<=modulus ; check_no+=state.increm.number,i_total++,i_search++) {
                    if (i_total>state.maxLimit.number) {indikator_state = indikator.mlimit ;break;}
                    if (i_search>state.searcxLimit.number) {indikator_state = indikator.slimit ;break;}
                    if (check_no==0) continue;
                    if (!numberRegister.has(check_no)) {
                        let number_arr = []

                        // this iterates so long till it finds a repeating pattern like 1,2,4,8,7,5,1
                        for (let a=check_no,b,i_loop; ; i_total++,i_loop++) {
                            if (i_total>state.maxLimit.number) {indikator_state = indikator.mlimit; break;}
                            if (i_loop>state.loopLimit.number) {indikator_state = indikator.llimit; break;}

                            b = a % modulus
                            console.log(a+" % "+modulus+" = "+b)

                            if (!Number.isFinite(b)) {indikator_state = indikator.inf; break;}
                            if (numberRegister.has(b)) break;
            
                            numberRegister.set(b,true);
            
                            number_arr.push(b)
            
                            a = a * multiplier
                        }
                        number_loops.push(number_arr)

                        // if two loops use the same numbers this will break, but that is to my knowledge not possible so idc -_-
                    }

                }
            } else {
                let numberRegister = new Array(modulus)
                // this searches trough all possible numbers searching for loops like 1,2,4,8,7,5,1 is one loop, 3,6,3 is another on and so forth
                for (let check_no=1,i=0; check_no<=modulus; check_no++,i++) {
                    if (i>state.maxLimit.number) {indikator_state = indikator.mlimit; break;}

                    if (numberRegister[check_no-1]==undefined) {
                        let number_arr = []

                        // this iterates so long till it finds a repeating pattern like 1,2,4,8,7,5,1
                        for (let a=check_no,b;; i++) {
                            if (i>state.maxLimit.number) {indikator_state = indikator.mlimit; break;}

                            b = a % modulus
                            console.log(a+" % "+modulus+" = "+b)

                            if (!Number.isFinite(b)) {indikator_state = indikator.inf; break;}
                            if (numberRegister[b-1]!=undefined) break;
            
                            numberRegister[b-1] =true;
            
                            number_arr.push(b)
            
                            a = a * multiplier
                        }
                        number_loops.push(number_arr)

                        // if two loops use the same numbers this will break, but that is to my knowledge not possible so idc -_-
                    }

                }
            }
        //### calculate stuff ###

        


            


        //### now draw those lines ###
            console.log("\nnow draw those lines")
            console.log("coords_arr",coords_arr)
            console.log("number_loops",number_loops)
            svg_lineBuff = [] 
            let line_count = 0

            // actual drawing
            ColorAlgorithms.set_max_loops(number_loops.length)
            
            for (let number_arr,i3=0; i3<number_loops.length; i3++) {
                number_arr = number_loops[i3]
                let coloringFunction = ColorAlgorithms[state.colorAlgo].code(i3)
            
                for (let i=0,x,y,x2,y2; i<number_arr.length; i++) {
                    if (state.floatAlgo) {
                        x = getCoordX(number_arr[i])
                        y = getCoordY(number_arr[i])
                        x2 = getCoordX(number_arr[(i+1)%number_arr.length])
                        y2 = getCoordY(number_arr[(i+1)%number_arr.length])
                        // super inefficient since the same equation gets calles two times but im lazy and underpaid soo...
                    } else {
                        x = coords_arr[ number_arr[i] ][0]
                        y = coords_arr[ number_arr[i] ][1]
                        x2 = coords_arr[ number_arr[(i+1)%number_arr.length] ][0]
                        y2 = coords_arr[ number_arr[(i+1)%number_arr.length] ][1]
                    }
                    /**/
                    
                    let dx = Math.abs(x-x2)
                    let dy = Math.abs(y-y2)
                    let length = Math.sqrt(dx**2 + dy**2) // pythagoras says hi

                    let style = coloringFunction(length)
                    line_count++;

                    svg_lineBuff.push(
                    <line x1={x} y1={y} x2={x2} y2={y2} style={style} />)

                }
            }
            
            configure_stroke_width: {
                console.log("let mode = {...ColorAlgorithms[state.colorAlgo].staticStyles}")
                console.log("let mode = {..."+ColorAlgorithms+"["+state.colorAlgo+"].staticStyles}")
                let mode = {...ColorAlgorithms[state.colorAlgo].staticStyles}
                if (mode["stroke-width"] == "auto") mode["stroke-width"] = lerp(0.002, 0.01, 100/(100+line_count))
                if (mode["opacity"] == "auto") mode["opacity"] = line_count>200? lerp(0.1, 1, 600/(600+(line_count-200))) : 1
                if (state.showArrows) mode["marker-end"] = "url(#arrowhead)";
                /*
                */
                let buf= []
                for (const [key,val] of Object.entries(mode)) {
                    buf.push(key+":"+val+";");
                }
                rss.push(`line {`+buf.join("")+`}`)
            }

            
            
        //### now draw those lines ###

        indikator_state();
    } else indikator.err();


    

    //### RENDER ###

    let timeout_modulus,timeout_multiplier;

    let svg_ref = React.useRef();

    let coloringAlgoOptions = []
    for (let i=0; i<ColorAlgorithms.length; i++) {
        coloringAlgoOptions.push(<option value={i+""}>{ColorAlgorithms[i].name}</option>)
    }
    return <>
        <div className={css.wrapper}>
            <svg   viewBox="-1.1 -1.1 2.2 2.2" ref={svg_ref} preserveAspectRatio="xMaxYMin">
                <style>{rss.join(" ")}</style>
                <circle cx="0" cy="0" r="1" stroke="grey" stroke-width="0.015" fill="none" />

                <marker id="arrowhead" markerWidth="10" markerHeight="7" refY="3.5" orient="auto" refX="10" viewBox="0 0 10 10">
                    <polygon points="0 0, 10 3.5, 0 7"></polygon>
                </marker>
                {svg_lineBuff}
                {svg_dotArr}
                
            </svg>

            <div className={css.conf}>
                <div className={css.mainContainer}>


                    <div className={css.indikator}><span ref={indikator_ref}>Initial</span><span style={{color: state.floatAlgo? "pink":"lightgreen"}}>{state.floatAlgo? "Float":"Integer"}</span></div>
                    <div className={css.NumberSet}>
                        <span>Number Set</span>
                        <div>
                            <Radio a="{x∈R∣x>0}" b="{x∈R}" defaultValue={state.allowNegative} onChange={e=>{change("allowNegative",!state.allowNegative)}} info='Negative Numbers and non-integers require the use of less efficient code (the "Float" algorithm)' disabled={state.allowjsinput}/>
                            <Radio a="Integer" b="Float" defaultValue={state.calcFloat} onChange={e=>{change("calcFloat",!state.calcFloat)}} disabled={!state.allowNegative | state.allowjsinput} info="Integer == {x∈R}   Float == {x}" warn="Floats are not only slow to compute and may cause problems with the repetition-detection function, also modulus that have decimal places can lead to funny looking results"/>
                            <label>
                                Allow entering JS expressions
                                <input type="checkbox" checked={state.allowjsinput} onChange={e=>{change("allowjsinput",!state.allowjsinput)}} />
                                <Warning warn="This overrides the above two options"/>
                                <Info info='"1/3" equals 0.333333333   "3.3e+3" equals 3300        "Math.PI" equals 3.14159265358'/>
                            </label>
                        </div>
                    </div>
                    

                    <label>
                        Auto-Submit values
                        <input type="checkbox" checked={state.autoSubmit} onChange={e=>{change("autoSubmit",!state.autoSubmit)}} />
                        <Info info="Without pressing Enter, values will be submitted, after a timeout after changing a value, to be calculated and rendered. It get's annoying with huge calculations who may take a few seconds as this lags the browser for those few seconds."/>
                    </label>
                    <label>
                        Show Points 
                        <input type="checkbox" checked={state.showPoints} onChange={e=>{change("showPoints",!state.showPoints)}} />
                    </label>
                    <label>
                        Show Numbers 
                        <input type="checkbox" checked={state.showNumbers} onChange={e=>{change("showNumbers",!state.showNumbers)}} />
                    </label>
                    <label>
                        Show Arrows 
                        <input type="checkbox" checked={state.showArrows} onChange={e=>{change("showArrows",!state.showArrows)}} />
                    </label>
                    <label>
                        Rotate Circle 180°
                        <input type="checkbox" checked={state.flipCircle} onChange={e=>{change("flipCircle",!state.flipCircle)}} />
                    </label>
                    
                    <label>
                        <div>Select coloring Algorithm</div>
                        <select key={state.preset_new} defaultValue={[state.colorAlgo]} multiple onInput={(e)=>{
                            change("colorAlgo",Number(e.target.value))
                        }}>
                            {coloringAlgoOptions}
                        </select>
                    </label>

                    <div style={{"margin-left": 0, "margin-left": 0, }}>
                        <InputField timeout={state.autoSubmit? 750:false} label="Modulus" onChange={(value)=>{change("modulus",value)}} submitInvalid={true} state={state.modulus} constraints={[state.allowNegative? null:"notNegative",state.calcFloat? null:"notFloat"]} waiting={indikator.lis} jsinput={state.allowjsinput} className={css.smolInputfield}/>

                        <InputField timeout={state.autoSubmit? 750:false} label="std" onChange={(value)=>{change("start",value)}} submitInvalid={true} state={state.floatAlgo? state.start:{number:1, isValid:true, string_value:"1"}} constraints={[state.allowNegative? null:"notNegative",state.calcFloat? null:"notFloat"]} waiting={indikator.lis} jsinput={state.allowjsinput} className={css.smolInputfield} info="the start value to use when searching for loops. loops like 3,6,3 or 1,2,4,8,7,5,1" disabled={!state.calcFloat & !state.allowjsinput}/>
                    </div>

                    <div style={{"margin-left": 0, "margin-left": 0, }}>
                            
                        <InputField timeout={state.autoSubmit? 750:false} label="Multiplier" onChange={(value)=>{change("multiplier",value)}} submitInvalid={true} state={state.multiplier} constraints={[state.allowNegative? null:"notNegative",state.calcFloat? null:"notFloat"]} waiting={indikator.lis} jsinput={state.allowjsinput} className={css.smolInputfield}/>

                        <InputField timeout={state.autoSubmit? 750:false} label="inc" onChange={(value)=>{change("increm",value)}} submitInvalid={true} state={state.floatAlgo? state.increm:{number:1, isValid:true, string_value:"1"}} constraints={[state.allowNegative? null:"notNegative",state.calcFloat? null:"notFloat"]} waiting={indikator.lis} jsinput={state.allowjsinput} className={css.smolInputfield} info="the increment value to use when searching for loops. loops like 3,6,3 or 1,2,4,8,7,5,1" disabled={!state.calcFloat & !state.allowjsinput}/>
                    </div>


                    <InputField timeout={state.autoSubmit? 750:false} label="Max iteration count" onChange={(value)=>{change("maxLimit",value)}} submitInvalid={false} state={state.maxLimit} constraints={["notNegative","notFloat"]} info="The maximum amount of total computations (not per loop) that should be made till halting. This is in case the steadystate-detection does not work correctly, like when dealing with floating point numbers because of floating point imprecision. ALSO: This prevents your toaster from freezing and lagging too much as for every line a dom element is created. Polylines and Polygons do not work as the color, opacity and stroke widths all must be individually set." waiting={indikator.lis} jsinput={state.allowjsinput}/>

                    <InputField timeout={state.autoSubmit? 750:false} label="Max iteration per loop" onChange={(value)=>{change("loopLimit",value)}} submitInvalid={false} state={state.loopLimit} constraints={["notNegative","notFloat"]} info="The maximum amount of computations per loop that should be made till halting. Only interesting if working with floating point numbers" waiting={indikator.lis} jsinput={state.allowjsinput} disabled={!state.calcFloat & !state.allowjsinput}/>

                    <InputField timeout={state.autoSubmit? 750:false} label="Max searches" onChange={(value)=>{change("searcxLimit",value)}} submitInvalid={false} state={state.searcxLimit} constraints={["notNegative","notFloat"]} info="The maximum amount of searches of loops that should be made till halting. Only interesting if working with floating point numbers" waiting={indikator.lis} jsinput={state.allowjsinput} disabled={!state.calcFloat & !state.allowjsinput}/>


                    {/*
                    
                    */}
                </div>
                
                <div className={css.middleContainer}>


                    <label>
                        <div>Select a Preset</div>
                        <select key={state.preset_new} defaultValue={[state.preset_new]} multiple onInput={(e)=>{
                            change("preset_new",Number(e.target.value))
                        }}>{/**go screw yourself, defaultValue!  oh well. key={} exists so nm */}
                            {presetOptions}
                        </select>
                    </label>

                    <PresetSelector submit={(name)=>{
                        state.preset_name = name;
                        let current_preset = preset_set.length
                        delete state.preset_new
                        delete state.preset_old
                        window.preset_set.push(state)
                        console.log("Newly Added State!\nName:",name,"\nraw_obj:",JSON.stringify(state))
                        setState({preset_new: current_preset})

                    }}/>


                </div>
                
                <div className={css.endContainer}>

                    <a className={css.link_button} type="image/svg+xml" onClick={e=>{		
                        var data2 = `<?xml version="1.0" encoding="UTF-8"?>
                        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                        <svg height="100%" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:xlink="http://www.w3.org/1999/xlink">`+svg_ref.current.innerHTML+`</svg>`;
                        var data = new Blob([data2]);
                        e.target.href = URL.createObjectURL(data);
                    }}>View as SVG</a>
                    <a className={css.link_button} download={state.preset_name+".svg"} type="image/svg+xml" onClick={e=>{	
                        var data2 = `<?xml version="1.0" encoding="UTF-8"?>
                        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                        <svg height="100%" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:xlink="http://www.w3.org/1999/xlink">`+svg_ref.current.innerHTML+`</svg>`;
                        var data = new Blob([data2]);
                        e.target.href = URL.createObjectURL(data);
                    }}>Download as SVG</a>
                    <a className={css.link} href="https://github.com/KrischnaGabriel/Vortex-Drawer">View the Sauce Code at Github</a>
                </div>
            </div>

        </div>
    </>
}

function PresetSelector(props) {
    
    let input = React.useRef()
    const [state,setState] = React.useState(null)
    React.useEffect(()=>{
        if (input.current) {
            if (input.current.focus) {
                input.current.focus()
            }
        }
        
    })
    return(
        <>
            {!state ?
                <button onClick={e=>{
                    
                    setState({
                        "height": e.target.clientHeight+"px",
                        "min-width": e.target.clientWidth+"px",
                    })
                }}>
                    Add current state
                </button>
            :
                <span className={css.enterNAme} autofocus style={state} ref={input} onKeyDown={e=>{
                    if (e.which == 8 & e.target.innerText == "") setState(null)
                    if (e.which == 27 ) setState(null)

                }} onKeyPress={e=>{
                    //console.log(e)
                    if(e.which==13 & e.target.innerText != ""){
                        props.submit(e.target.innerText)
                        e.target.innerText = ""
                        setState(null)
                    }
                }} spellCheck="false" contentEditable="true">
                </span>
            }

            <Info info="Your new preset is only stored in this current tab. Reloading the page will clear it."/>
        </>
    )
    
}
/*original code

                    <label>
                    <div>Select a Preset</div>
                    <select defaultValue={state? [state.preset_new]:null} multiple onInput={(e)=>{
                        change("preset_new",Number(e.target.value))
                    }}>
                        {presetOptions}
                    </select>
                    <button onClick={e=>{
                        if (e.target.children.length==1) {
                            setTimeout(()=>{e.target.children[0].style.display =""},100)
                            //e.target.children[0].innerText = ""
                            e.target.children[0].style.display = "block"
                            e.target.children[0].focus();
                            e.target.children[0].select();
                            // see, no document onclick event-handler!
                            // though it's a mess
                            // this event gets triggered when pressing space int the child element. WTF
                        }
                        }}>
                        Add current state
                        <span onKeyPress={e=>{if(e.which==13){
                            state.preset_name = e.target.innerText;
                            let current_preset = preset_set.length
                            delete state.preset_new
                            delete state.preset_old
                            window.preset_set.push(state)
                            console.log("Newly Added State!\nName:",e.target.innerText,"\nraw_obj:",JSON.stringify(state))
                            setState({preset_new: current_preset})

                        }}} spellCheck="false" contentEditable="true" onClick={e=>{e.stopPropagation();}}></span>
                    </button>
                    <Info info="Your new preset is only stored in this current tab. Reloading the page will clear it."/>
                </label>
*/
