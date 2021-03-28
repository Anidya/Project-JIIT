import React, {Component} from 'react'
import './styles.css';
import Menu from '../core/MenuS'
import MenuS from '../core/MenuS';
class DashboardS extends Component{

    render() {
        return (
            <div>

                <MenuS></MenuS>
                {/* Sidebar */}
                <div style={{ paddingTop: "70px", height: "1000px", width: "20%", backgroundColor: "teal", position: "fixed" }}>
                    {/* Assigned Tasks */}
                    <p>
                        <h5 style={{ paddingLeft: "20px", textDecorationLine: 'underline' }}>Group Details</h5>
                        <button className="style1">Detail 1</button>
                    </p >
                </div>
                {/*Data rendered on right of sidebar */}
                <div style={{ height: "100%", width: "80%", marginLeft: "20%", paddingLeft: "20px" ,paddingTop:"70px"}}>
                    <h3 >Details</h3>
                </div>
                
            </div>
            )
        }
}
export default DashboardS;