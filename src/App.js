import The from './the.js'
import React from 'react'
function App() {
    return (
        <The></The>
    );
}

export default App;
// 


/* dont ask

function App() {
    const [state,setState] = React.useState({a:true})
    return (
        <>
            <Ass state={{...state}}>
            </Ass>
            <button onClick={e=>{
                setState({a: !state.a})
            }}>Outer {state.a+""}</button>
        </>
    );
}

export default App;


class Ass extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {a:true}
        console.log("constructor")
    }
    componentDidUpdate() {
        console.log("componentDidUpdate")

    }
    render() {
        let old = this.props.state.a
        this.props.state.a = "cleared"
        console.log("render")
        return (
            <>
            <button onClick={e=>{
                this.setState({a: !this.state.a})
            }}>Inner self {this.state.a+""} outer:{old+""}</button>
            <button onClick={e=>{
                this.forceUpdate();
            }}>forceUpdate</button>
            
            </>
        
        )
    }
}

*/