import React from 'react';
import { Button } from '@material-ui/core'
import { connect } from 'react-redux';

class Header extends React.Component{

    render(){
        return (
            <header className={`App-header App-header-${this.props.className}`}>
                <div className="flex-box flex-evenly">
                <div className="column-2">
                    <div className="flex-col flex-center">
                    <h1 className="header-text animate-pop-in"></h1>
                    {this.props.home && <Button className="animate-pop-in" onClick={()=>this.props.dispatch({type:'FETCH_REVIEWS'})} variant="contained" color="secondary">Start</Button>}
                    </div>
                </div>
                </div>
            </header>
        )
    }

}
const mapStateToProps = state => ({
    home: state.home
})

export default connect(mapStateToProps)(Header);