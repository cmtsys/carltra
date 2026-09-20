type MetaDataProps = {
  year?: string
  role?: string
  skills?: string
  client?: string
  context?: string
}

export default function MetaData({
  year,
  role,
  skills,
  client,
  context,
}: MetaDataProps) {
  const fourthItem = context
    ? { label: "Context", value: context }
    : client
      ? { label: "Client", value: client }
      : null

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

      {fourthItem && (
        <div className="info-box">
          <dt className="label-s">{fourthItem.label}</dt>
          <dd className="body-s">{fourthItem.value}</dd>
        </div>
      )}
    </dl>
  )
}