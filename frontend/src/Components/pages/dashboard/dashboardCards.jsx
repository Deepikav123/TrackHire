
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
function SummaryCard({ icon, title, quantity, detail }) {
    return (<div className="summary-card">
        <img src={icon} alt="" className="summary-card-icon-img" />
        <div className="summary-card-info">
            <div className="summary-card-title">
                {title}
            </div>
            <div className="summary-card-quantity">
                {quantity}
            </div>
            <div className="summary-card-detail">
                {detail}
            </div>
        </div>
    </div>)
}

function RecentApplicationCard({ role, company, date,stage,status,key }) {
    return (
        <div className="recent-application-card" key={key}>
            <div className="recentApplication-company-details">
                <div className="recentApplication-company-role">{role}</div>
                <div className="recentApplication-company-name">{company}</div>
            </div>

                <div className="recentApplication-stage">{stage}</div>
                <div className="recentApplication-status">{status}</div>
                <div className="recentApplication-date">{formatDate(date)}</div>
        </div>
    )
}
export { SummaryCard,RecentApplicationCard }