/* eslint-disable react/prop-types */
export default function Alerts({ alert }) {
    return (
        <div style={{ height: '60px' }}>
            {alert && <div className={`d-flex alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong className="mx-5 pe-5 ps-4">iNotebook!</strong> {alert.msg}
            </div>}
        </div>
    )
}