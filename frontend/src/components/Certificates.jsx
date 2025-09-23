import "../styles/certificates.css"

export default function Certificates() {

    const certificates = [
        {
            id: 1,
            title: "React for Beginners",
            date: "2023-08-15"
        },
        {
            id: 2,
            title: "Advanced Node.js",
            date: "2023-09-10"
        }
    ];

    if(certificates.length === 0) {
        return(
            <div className="certificates">
                <h2>Certificates</h2>
                <p>You have not earned any certificates yet.<br/>To earn a certificate, You must to complete any course</p>
            </div>
        )
    }   

    else {
        return(
            <div className="certificates">
                <h2>Certificates</h2>
                <div className="certificates-list">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="certificate-card">
                            <h3>{cert.title}</h3>
                            <p>Issued on: {cert.date}</p>
                            <button className="download-btn">Download</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}