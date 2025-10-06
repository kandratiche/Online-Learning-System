import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/certificates.css"

export default function Certificates() {

    const [user] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            if (!user?.courses) return;

            const completedCourses = user.courses.filter(c => c.progress === 100);

            const certs = await Promise.all(
                completedCourses.map(async (course) => {
                    try {
                        const res = await axios.get(
                            `${process.env.REACT_APP_API_URL}/api/courses/${course.course_id}`
                        );
                        return {
                            id: course.course_id,
                            title: res.data.title, 
                        };
                    } catch (err) {
                        console.error("Error fetching course:", err);
                        return null;
                    }
                })
            );

            setCertificates(certs.filter(Boolean)); 
        };

        fetchCertificates();
    }, [user]);

    if(certificates.length === 0) {
        return(
            <div className="certificates">
                <h2>Certificates</h2>
                <p id="certificates-not-ready">You have not earned any certificates yet.<br/>To earn a certificate, You must to complete any course</p>
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
                            <p>Ready to Download</p>
                            <button className="download-btn">Download</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}