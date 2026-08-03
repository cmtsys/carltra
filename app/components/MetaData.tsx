type MetaDataProps = {
    year?: string
    role?: string
    skills?: string
    client?: string
}


export default function MetaData({ year, role, skills, client }: MetaDataProps) {
    return (
        <dl className="info">

            {year && (
                <div className="info-box">
                    <dt className="label-s">Year</dt>
                    <dd className="body-s">{year}</dd>
                </div>
            )}

            {role && (
                <div className="info-box">
                    <dt className="label-s">Role</dt>
                    <dd className="body-s">{role}</dd>
                </div>
            )}

            {skills && (
                <div className="info-box">
                    <dt className="label-s">Skills</dt>
                    <dd className="body-s">{skills}</dd>
                </div>
            )}

            {client && (
                <div className="info-box">
                    <dt className="label-s">Client</dt>
                    <dd className="body-s">{client}</dd>
                </div>
            )}

        </dl>
    )
}