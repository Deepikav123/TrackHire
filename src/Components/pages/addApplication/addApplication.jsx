import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { FormInputText, FormInputSelect, FormInputTextarea, FormInputButton, RecruitmentPipeline } from "./formInput";
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
const recruitmentStages=["Applied","Online Assessment","Technical Interview","HR Interview","Result"]

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
                        <FormInputSelect subheading="Job Type" optionArray={["Internship", "Part-Time", "Full-Time"]} onChange={collectInput("jobtype")} value={formData.jobtype} />
                        <FormInputText subheading="Job Location" type="text" placeholder="e.g.Bengaluru" onChange={collectInput("location")} value={formData.location} />
                        <FormInputText subheading="Application Date" type="date" onChange={collectInput("applicationDate")} value={formData.applicationDate} />
                        <FormInputText subheading="Job Link(Optional)" type="text" placeholder="https://careers.company.com" onChange={collectInput("link")} value={formData.link} />
                        <FormInputText subheading="Salary" type="text" placeholder="e.g.12 LPA" onChange={collectInput("salary")} value={formData.salary} />
                        <FormInputTextarea subheading="Notes(Optional)" placeholder="Any additional information.." onChange={collectInput("notes")} value={formData.notes} />
                    </div>
                </div>

                <div className="recruitment-pipeline-section">
                    <div className="recruitment-pipeline-title-section">
                        <SubHeading subheading="Recruitment Pipeline" />
                        <button className="add-stage">+ Add Another Stage</button>
                    </div>
                    <div className="recruitmentPipeline-details-form">
                        <div className="recruitment-headings">
                            <div className="recruitment-stage-heading">Stage</div>
                            <div className="recruitment-status-heading">Status</div>
                            <div className="recruitment-date-heading">Date(Optional)</div>
                        </div>
                            <div className="recruitment-form-details">
                                {
                                    recruitmentStages.map((stage)=>(

                                        <RecruitmentPipeline stage={stage} optionArray={["Upcoming","Selected","Failed"]}/>
                                    )

                                    )
                                }
                            </div>
                    </div>
                    <div className="recruitment-pipeline-buttons">
                        <FormInputButton text="Cancel" ButtonClassName="application-cancel-button"/>
                        <FormInputButton text="Save Application" ButtonClassName="application-save-button"/>
                    </div>
                </div>
            </form>
        </div>


    )
}
export { AddApplication }