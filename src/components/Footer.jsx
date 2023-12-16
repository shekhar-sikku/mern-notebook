import PropTypes from 'prop-types';

export default function Footer({ year, title, creator }) {
    return (
        <div className="container-fluid footer border-top mt-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
            <section className="d-flex justify-content-around py-3 fw-normal">
                <span className="my-auto mx-auto">
                    <span className="text-secondary">Copyright ©{year} {title}</span>
                </span>
                <span className="my-auto mx-auto">
                    <span className="text-secondary">Created By : <small className="text-primary fw-medium">{creator}</small></span>
                </span>
            </section>
        </div>
    )
}

Footer.propTypes = {
    year: PropTypes.number.isRequired
}

Footer.propTypes = {
    title: PropTypes.string.isRequired
}

Footer.propTypes = {
    creator: PropTypes.string.isRequired
}