import React, { useState , useContext, useRef} from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function PatientForm({app}) {
    const { user } = useContext(AuthContext);
    const input = useRef();
    const [patient, setPatient] = useState(
        {
            id: '',
            name: '',
            gender: '',
            age: '',
            height: '',
            blood: '',
            note: ''
        }
    )

    const handleSubmit = async (e) => {
        const updatedNotes = {};
        updatedNotes.notes = input.current.value;
        console.log(input.current.value);
        try{
            await axios.put(`/api/appointments/${app._id}/`, updatedNotes);
            // window.location.reload();
        } catch(err){
            console.log(err);
        }
    }
  
    return (
        <>
            <div className="row justify-content-center">
                <form className="col-6" onSubmit={handleSubmit}>
                    {/* <div className="row">
                        <div className="mb-3 col-2">
                            <label htmlFor="name" className="form-label">ID:</label>
                            <input type="text" className="form-control" id="name" placeholder="..." disabled/>
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="name" className="form-label">Name:</label>
                            <input type="text" className="form-control" id="name"/>
                        </div>
                        <div className="mb-3 col-4">
                            <label htmlFor="gender" className="form-label">Gender:</label>
                            <select className="form-select">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div> */}
                    {/* <div className="row"> */}
                        {/* <div className="mb-3 col">
                            <label htmlFor="age" className="form-label">Age:</label>
                            <input type="text" className="form-control" id="age"/>
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="height" className="form-label">Height:</label>
                            <input type="text" className="form-control" id="height"/>
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="blood" className="form-label">Blood:</label>
                            <select className="form-select">
                                <option value="a">A</option>
                                <option value="b">B</option>
                                <option value="ab">AB</option>
                                <option value="o">O</option>
                            </select>
                        </div> */}
                        <div className="row">
                            <div className="mb-3 col-12">
                                <label htmlFor="notes" className="form-label">Patient notes:</label>
                                <textarea className="form-control" id="notes" rows="3" ref={input}>{app.notes}</textarea>
                            </div>
                        </div>
                        <div className="row">
                            
                        </div>
                    {/* </div> */}
                    {app.doctorId === user._id &&<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>}
                </form>
                <div>{patient.name}</div>
            </div>
        </>

    );
}
