import { TitleAndSubline, SubHeading } from "./bodyTitle";
import '../../email.css'
import { Link } from 'react-router-dom'
import { useState } from "react";

function PasteEmail() {

    const [email, setEmail] = useState({
        sender: "",
        body: ""
    });

    async function analyzeEmail(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/email/analyze', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "sender": email.sender,
                "emailText": email.body
            })
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <form className="paste-email-section" onSubmit={analyzeEmail} >
            <TitleAndSubline title="Add Application" subline="Import a job update from your mail" />
            <div className="email-content">
                <SubHeading subheading="Email Content" />
                <input type="text" className="sender-data" placeholder="Enter Sender address" onChange={((e)=>{
                    setEmail(Prev=>{
                        return{
                            ...Prev,
                            sender:e.target.value
                        }
                    })
                })}/>
                <textarea className="email-importBox" placeholder='Paste your job-related email here..' rows={15} onChange={((e) => (
                    setEmail(Prev => {
                        return {
                            ...Prev,
                            body: e.target.value
                        }
                    }
                    )
                ))}></textarea>
            </div>
            <div className="secure-message">🔒 Your email content is used only to extract application details.</div>
            <div className="email-buttons">
                <Link to='/trackhire/dashboard' className="email-cancel-button email-button" >Cancel</Link>
                <button className="email-analyze-button email-button" type="submit">Analyze Email</button>
            </div>
        </form>
    )
}
export default PasteEmail;