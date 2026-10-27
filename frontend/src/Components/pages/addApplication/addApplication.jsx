import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { FormInputText, FormInputDate, FormInputSelect, FormInputTextarea, FormInputButton, RecruitmentPipeline } from "./formInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../../addApplication.css'
import { useContext } from "react";
import AuthContext from "../../../../context/authContext";

function AddApplication() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState("");
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
            stage: {
                name: "",
                status: "Upcoming"
            },
            jobtype: "",
            location: "",
            applicationDate: "",
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
            setErrMessage("");
        })

    }
    async function SubmitForm(e) {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            },
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        if (!response.ok) {
            setErrMessage(data.message);
            return;
        }
        navigate('/trackhire/app/application')

    }
    return (
        <div className="add-application-section">

            <TitleAndSubline title="Add Application" subline="Add a job application manually" />
            <form className="addApplication-section" onSubmit={SubmitForm}>
                <div className="application-details-section">
                    <SubHeading subheading="Application Details" />
                    <div className="application-details-form">
                        <FormInputText subheading="Company Name" type="text" placeholder="e.g.Microsoft" required="true" onChange={collectInput("company")} value={formData.company} />
                        <FormInputText subheading="Job Role" type="text" placeholder="e.g.Software Engineer" required="true" onChange={collectInput("role")} value={formData.role} />
                        <FormInputText subheading="Stage" type="text" placeholder="e.g.Technical Interview" required="true" onChange={(e) => {
                            setFormData(
                                Prev => ({
                                    ...Prev,
                                    stage: {
                                        name: e.target.value,
                                        status: e.target.value == "ShortListed" || e.target.value == "Selected" ? "Completed" : e.target.value == "Rejected" ? "Failed" : "Upcoming"
                                    }

                                })
                            )
                            setErrMessage("");
                        }} value={formData.stage.name} />
                        <FormInputSelect subheading="Job Type" optionArray={["Internship", "Part-Time", "Full-Time"]} required="true" onChange={collectInput("jobtype")} value={formData.jobtype} />
                        <FormInputText subheading="Job Location" placeholder="e.g.Bengaluru" onChange={collectInput("location")} value={formData.location} />
                        <FormInputDate subheading="Application Date" onChange={collectInput("applicationDate")} value={formData.applicationDate} />
                        <FormInputText subheading="Job Link(Optional)" placeholder="https://careers.company.com" onChange={collectInput("link")} value={formData.link} />
                        <FormInputText subheading="Salary" placeholder="e.g.12 LPA" onChange={collectInput("salary")} value={formData.salary} />
                        <FormInputTextarea subheading="Notes(Optional)" placeholder="Any additional information.." onChange={collectInput("notes")} value={formData.notes} />
                    </div>
                    {errMessage && <div className="addApplication-error"><span className="error-icon">!</span> {errMessage}</div>}
                    <div className="recruitment-pipeline-buttons">
                        <FormInputButton text="Cancel"  ButtonClassName="application-cancel-button" type="button" />
                        <FormInputButton text="Save Application" ButtonClassName="application-save-button" type="submit" />
                    </div>
                </div>
            </form>
        </div>


    )
}
export { AddApplication }