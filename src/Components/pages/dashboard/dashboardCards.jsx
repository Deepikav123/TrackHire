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

function RecentApplicationCard({ role, company, date,key }) {
    return (
        <div className="recent-application-card" key={key}>
            <div className="recentApplication-company-details">
                <div className="recentApplication-company-role">{role}</div>
                <div className="recentApplication-company-name">{company}</div>
            </div>
            <div className="recentApplication-dateDetails">
                <div className="recentApplication-date">{date}</div>
            </div>
        </div>
    )
}
export { SummaryCard,RecentApplicationCard }