import React from 'react'

const TimeCard = ({bus:{line,hour}}) => {
    return (
        <div className="grid h-10 grid-cols-2 shadow-md">
            <div className={"content"}><span className="text-gradient">Linea </span> {line}</div>
            <div className={"content"}><span className="text-gradient">Orario </span> {hour}</div>
        </div>
    )
}
export default TimeCard
