import React, {Component} from 'react'
import { updateGroup,load } from './api'
import "./styles.css";
import Menu from '../core/Menu'
class MentorGroup extends Component{

    constructor(){
        super()
        this.state = {
            group: {
                id: "",
                mentor:
                {
                    name: "",
                    email: ""
                },
                students: [
                    { name: "", email: "" },
                    { name: "", email: "" },
                    { name: "", email: "" }
                ],
                supervisors: [
                    { name: "", email: "" },
                    { name: "", email: "" }
                ],
                fields: {
                        title: "",
                        description: ""
                    }
                },
                deadlines: {
                    title:'',
                    description:''

                },
                show: false,
                current: "",
                groupId: '',
                dateset:''
            }
    }
    
    showModal = () => {
        this.setState({ show: true})
    }

    hideModal = () => {
        this.setState({
            show: false
        })
    }

    handleClick = (event,dialog_value)=> {
        const value = event.target.value;
        this.setState({
            current: value,
            show:dialog_value
        })
    }


    handleAssign = () => {
        
        const { current, group,groupId,dateset } = this.state
        if (current === "title")
        {
            group.fields.title = "--NOT UPLOADED--"
            group.deadlines.title=dateset
     
            
        }
      
        
        if (current === "description")
        {
            group.fields.description = "--NOT UPLOADED--"
            group.deadlines.description=dateset
        }
        
        this.setState({
            group
        })
        
         updateGroup(groupId, group)
             .then(data => {
                 //console.log(data)
                if (data.error)
                    console.log(data.error)
                else
                    this.setState({
                        group: data
                    })    
             })
         this.setState({
             show: false    
         })
    }

    
    componentDidMount = () => {
        const groupId = this.props.match.params.groupId
        load(groupId)
            .then(data => {
            if(data.error)
                console.log(data.error)
            else
                this.setState({group:data, groupId:groupId})
            })
    }

    handleChange =() => (event)=> {
        this.setState({
            dateset: event.target.value
        })
    }

    render() {
        const { group, show, current,dateset} = this.state
        //console.log(group.fields)
        const showHideClassName = show ? "modal display-block":"modal display-none"
        return (
            <div>
                <Menu></Menu>
                <div className="row">
                <div className={showHideClassName}>
                     <div className="modal-main">
                      
                        <input
                            type="date"
                            value={dateset}
                            onChange={this.handleChange()}>
                            </input>
                        <br/>
                        <button type="button"
                        style={{backgroundColor:"teal", paddingLeft: "10px", paddingRight: "10px", cursor:'pointer' }}
                        onClick={this.hideModal}>
                            Close
                        </button>
                        <button type="button"
                         style={{backgroundColor:"teal", paddingLeft: "10px", paddingRight: "10px", cursor:'pointer' }}
                        onClick={this.handleAssign}>
                            Assign
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ paddingTop: "70px", height: "1000px", width: "20%", backgroundColor: "teal", position: "fixed" }}>
                   
                   {/* Assigned Tasks */}
                    <p>
                        <h5 style={{ paddingLeft: "20px", textDecorationLine: 'underline' }}>Details</h5>
                        {group.supervisors !== [] && <button className="style1" value="supervisors"
                            onClick={(event) => this.handleClick(event,false)}>Supervisors</button>}
                        
                         {group.fields.title!=="" && <button className="style1" value="title"
                            onClick={(event) => this.handleClick(event, false)}>Title</button>}
                        

                        {group.fields.description !=="" && <button className="style1" value="description"
                            onClick={(event) => this.handleClick(event,false)}>Description</button>}
                        
                    </p>

                    {/* UnAssigned Tasks */}
                    <p>
                        <h5 style={{ paddingLeft: "20px", textDecorationLine: 'underline' }}>Assign Details</h5>
                        {group.fields.title==="" && <button className="style1" value="title"
                            onClick={(event) => this.handleClick(event,true)}>Title</button>}
                        {group.fields.description==="" && <button className="style1" value="description"
                            onClick={(event) => this.handleClick(event,true)}>Description</button>}
                    </p>
                </div>
                
                {/*Data rendered on right of sidebar */}
                <div style={{ height: "100%", width: "80%", marginLeft: "20%", paddingLeft: "20px", paddingTop:"70px" }}>
                <h2 style={{fontWeight: 'bold'}}>Group Details</h2> <br/> <br/> 
                         <div>
                          <h5 style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Students Details</h5>
                     <table class="table">
                         <thead>
                             <tr>
                             <th scope="col">S.No.</th>
                             <th scope="col">Name</th>
                             <th scope="col">Email</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr>
                             <th scope="row">1</th>
                             <td>{group.students[0].name}</td>
                             <td>{group.students[0].email}</td>
                             </tr>
                             <tr>
                             <th scope="row">2</th>
                             <td>{group.students[1].name}</td>
                             <td>{group.students[1].email}</td>
                             </tr>
                             <tr>
                             <th scope="row">3</th>
                             <td>{group.students[2].name}</td>
                             <td>{group.students[2].email}</td>
                             </tr>
                         </tbody>
                        </table>

                        {current === "description" && group.fields.description !=="" &&
                            <div>
                            <h5 style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Description</h5>
                            <p>{ group.fields.description}</p>
                            </div>}
                        
                            {current ==="title" && group.fields.title!=="" && <div>
                            <h5 style={{ fontWeight: 'bold', textDecorationLine: 'underline'  }}>Title of Project</h5>
                            <p>{group.fields.title}</p>
                            </div>}

                        
                        {current === "supervisors" && group.supervisors !== [] && 
                        <div>
                            <h5 style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Supervisors Details</h5>
                            <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">S No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">1</th>
                                <td>{group.supervisors[0].name}</td>
                                <td>{group.supervisors[0].email}</td>
                                </tr>
                                <tr>
                                <th scope="row">2</th>
                                <td>{group.supervisors[1].name}</td>
                                <td>{group.supervisors[1].email}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>}

                    </div>
                   
                </div>
            </div>
           </div>
            )
        }
}
export default MentorGroup;