import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { FormInputText,FormInputDate, FormInputSelect, FormInputTextarea, FormInputButton, RecruitmentPipeline } from "./formInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../addApplication.css'
function AddApplication() {
    const navigate=useNavigate();

    function formatDate(dateValue) {
         if (!dateValue) {
        return "";
    }
    const date = new Date(dateValue + "T00:00:00");

    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long"
    }).format(date);
}

    const [formData, setFormData] = useState(
        {
            company: "",
            role: "",
            stage:{
                name:"",
                status:"upcoming"
            },
            jobtype: "",
            location: "",
            applicationDate:"",
            link: "",
            salary: "",
            notes: ""
        }
    )
// const recruitmentStages=["Applied","Online Assessment","Technical Interview","HR Interview","Result"]

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
        navigate('/trackhire/app/application')

    }
    return (
        <div className="add-application-section">

            <TitleAndSubline title="Add Application" subline="Add a job application manually" />
            <form className="addApplication-section" onSubmit={SubmitForm}>
                <div className="application-details-section">
                    <SubHeading subheading="Application Details" />
                    <div className="application-details-form">
                        <FormInputText subheading="Company Name" type="text" placeholder="e.g.Microsoft" onChange={collectInput("company")} value={formData.company} />
                        <FormInputText subheading="Job Role" type="text" placeholder="e.g.Software Engineer" onChange={collectInput("role")} value={formData.role} />
                        <FormInputText subheading="Stage" type="text" placeholder="e.g.Technical Interview" onChange={(e)=>{
                            setFormData(
                                Prev=>({
                                   ...Prev,
                                   stage:{
                                    name:e.target.value,
                                    status:e.target.value=="shortListed" ||e.target.value=="selected"?"completed":e.target.value=="rejected"?"failed":"upcoming"
                                   }

                                })
                            )
                        }} value={formData.stage.name} />
                        <FormInputSelect subheading="Job Type" optionArray={["Internship", "Part-Time", "Full-Time"]} onChange={collectInput("jobtype")} value={formData.jobtype} />
                        <FormInputText subheading="Job Location"  placeholder="e.g.Bengaluru" onChange={collectInput("location")} value={formData.location} />
                        <FormInputDate subheading="Application Date"  onChange={collectInput("applicationDate")} value={formData.applicationDate} />
                        <FormInputText subheading="Job Link(Optional)"  placeholder="https://careers.company.com" onChange={collectInput("link")} value={formData.link} />
                        <FormInputText subheading="Salary"  placeholder="e.g.12 LPA" onChange={collectInput("salary")} value={formData.salary} />
                        <FormInputTextarea subheading="Notes(Optional)" placeholder="Any additional information.." onChange={collectInput("notes")} value={formData.notes} />
                    </div>
                    <div className="recruitment-pipeline-buttons">
                        <FormInputButton text="Cancel" ButtonClassName="application-cancel-button"/>
                        <FormInputButton text="Save Application" ButtonClassName="application-save-button" type="submit"/>
                    </div>
                </div>
            </form>
        </div>


    )
}
export { AddApplication }