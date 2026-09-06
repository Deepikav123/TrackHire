function TitleAndSubline({ title, subline }) {
    return (
        <div className="title-and-subtitle">
            <h2 className="body-title">{title}</h2>
            <div className="body-subtitle">{subline}</div>
        </div>
    )
}
function SubHeading({ subheading }) {
    return (<h3 className="sub-heading">
{subheading}
    </h3>)
}
export  {TitleAndSubline,SubHeading};