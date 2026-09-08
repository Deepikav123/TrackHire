import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { FormInputText, FormInputSelect, FormInputTextarea, FormInputButton } from "./formInput";
import { useState } from "react";
import '../../../addApplication.css'
function AddApplication() {
    const [formData, setFormData] = useState(
        {
            company: "",
            role: "",
            jobtype: "",
            location: "",
            applicationDate: "",
            link: "",
            salary: "",
            notes: ""
        }
    )
    function collectInput(fieldname) {
        return ((e) => {
            setFormData(Prev => {
                return {
                    ...Prev,
                    [fieldname]: e.target.value
                }
            })
        })
    }
    async function SubmitForm(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/applications', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    }
    return (
        <div className="add-application-page">
            <div className="add-application-section">

                <TitleAndSubline title="Add Application" subline="Add a job application manually" />
                <SubHeading subheading="Application Details" />
                <form className="application-form" onSubmit={SubmitForm}>
                    <FormInputText subheading="Company Name" type="text" placeholder="e.g.Microsoft" onChange={collectInput("company")} value={formData.company} />
                    <FormInputText subheading="Job Role" type="text" placeholder="e.g.Software Engineer" onChange={collectInput("role")} value={formData.role} />
                    <FormInputSelect subheading="Job Type" optionArray={["Internship", "Part-Time", "Full-Time"]} onChange={collectInput("jobtype")} value={formData.jobtype} />
                    <FormInputText subheading="Job Location" type="text" placeholder="e.g.Bengaluru" onChange={collectInput("location")} value={formData.location} />
                    <FormInputText subheading="Application Date" type="date" onChange={collectInput("applicationDate")} value={formData.applicationDate} />
                    <FormInputText subheading="Job Link(Optional)" type="text" placeholder="https://careers.company.com" onChange={collectInput("link")} value={formData.link} />
                    <FormInputText subheading="Salary" type="text" placeholder="e.g.12 LPA" onChange={collectInput("salary")} value={formData.salary} />
                    <FormInputTextarea subheading="Notes(Optional)" placeholder="Any additional information.." onChange={collectInput("notes")} value={formData.notes} />
                    <FormInputButton text="Submit" />
                </form>
            </div>

            <div className="recruitment-pipeline-section">
                <div className="recruitment-pipeline-title-section">
                    <SubHeading subheading="Recruitment Pipeline" />

                </div>
            </div>
        </div>)
}
export { AddApplication }