import { TitleAndSubline, SubHeading } from "../bodyTitle";
import { FormInputText, FormInputSelect, FormInputTextarea } from "./formInput";
import '../../../addApplication.css'
function AddApplication() {
    return (
        <div className="add-application-page">
            <div className="add-application-section">

                <TitleAndSubline title="Add Application" subline="Add a job application manually" />
                <SubHeading subheading="Application Details" />
                <form className="application-form">
                    <FormInputText subheading="Company Name" type="text" placeholder="e.g.Microsoft" />
                    <FormInputText subheading="Job Role" type="text" placeholder="e.g.Software Engineer" />
                    <FormInputSelect subheading="Job Type" optionArray={["Internship", "Part-Time", "Ful-Time"]} />
                    <FormInputText subheading="Job Location" type="text" placeholder="e.g.Bengaluru" />
                    <FormInputText subheading="Application Date" type="date" />
                    <FormInputSelect subheading="Source" optionArray={["LinkedIn", "Naukri", " Company Website",
                        "Referral", "College Placement", "Indeed", "Internshala", "Wellfound", "Job Fair", "Other"]} />
                    <FormInputText subheading="Job Link(Optional)" type="text" placeholder="https://careers.company.com" />
                    <FormInputText subheading="Salary" type="text" placeholder="e.g.12 LPA" />
                    <FormInputTextarea subheading="Notes(Optional)" placeholder="Any additional information.." />
                </form>
            </div>
            <div className="recruitment-pipeline-section">
                <div className="recruitment-pipeline-title-section">
                <SubHeading subheading="Recruitment Pipeline" />

                </div>
            </div>
        </div>)
}
export default AddApplication