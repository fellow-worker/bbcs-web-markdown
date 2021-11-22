type ReferenceProps = {
    reference : number,
}

export const Reference = (props : ReferenceProps) => {
    const { reference } = props;
    return (
        <sup id={`reference_${reference}`}>
            <a className="reference" href={`#footnote_${reference}`}>
                {reference}
            </a>
        </sup>
    )
}