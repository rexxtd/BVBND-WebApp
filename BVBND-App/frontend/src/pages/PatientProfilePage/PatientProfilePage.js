import React from "react";
import PatientForm from "../../components/PatientProfile/PatientForm";
import PatientShow from "../../components/PatientProfile/PatientShow";
import "./PatientProfilePage.css";

export default function PatientProfilePage() {
    return (
        <div className="container">
            <PatientShow />
        </div>
    );
}

