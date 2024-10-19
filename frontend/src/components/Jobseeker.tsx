import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AgencyDetails: React.FC = () => {
  const [agency, setAgency] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { agencyId } = useParams<{ agencyId: string }>();

  useEffect(() => {
    const fetchAgencyDetails = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:4000/users/agencydetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAgency(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching agency details");
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyDetails();
  }, []);

  const checkApplicationStatus = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `http://localhost:4000/jobseekers/application-status/${agencyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplicationStatus(response.data.status);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching application status");
    }
  };

  const handleStatusUpdate = async (jobSeekerId: number, status: "accepted" | "declined") => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `http://localhost:4000/jobseekers/${jobSeekerId}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplicationStatus(status);
      alert(`Job seeker ${status} successfully.`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating job seeker status");
    }
  };

  const navigateToChat = (roomId: string) => {
    navigate(`/chat/${roomId}`); 
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Agency Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {agency?.firstname} {agency?.lastname}
          </h5>
          <p className="card-text">
            <strong>Email:</strong> {agency?.email}
          </p>
          <p className="card-text">
            <strong>Phone:</strong> {agency?.phone}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <button className="btn btn-primary" onClick={checkApplicationStatus}>
          Check Application Status
        </button>
        {applicationStatus && (
          <div className="mt-2">
            <strong>Application Status:</strong> {applicationStatus}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h5>Job Seekers Applications</h5>
        {agency?.jobSeekers && agency.jobSeekers.map((jobSeeker: any) => (
          <div key={jobSeeker.id} className="d-flex justify-content-between align-items-center my-2">
            <span>{jobSeeker.firstname} {jobSeeker.lastname}</span>
            <div>
              <button
                className="btn btn-success me-2"
                onClick={() => handleStatusUpdate(jobSeeker.id, "accepted")}
              >
                Accept
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleStatusUpdate(jobSeeker.id, "declined")}
              >
                Decline
              </button>
              <button
                className="btn btn-info ms-2" 
                onClick={() => navigateToChat(jobSeeker.roomId)} 
              >
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AgencyDetails;

























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AgencyDetails: React.FC = () => {
//   const [agency, setAgency] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAgencyDetails = async () => {
//       const token = localStorage.getItem("authToken");
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/users/agencydetails",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAgency(response.data);
//       } catch (err: any) {
//         setError(
//           err.response?.data?.message || "Error fetching agency details"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgencyDetails();
//   }, []);

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="alert alert-danger">Error: {error}</div>;

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Agency Details</h2>
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">
//             {agency?.firstname} {agency?.lastname}
//           </h5>
//           <p className="card-text">
//             <strong>Email:</strong> {agency?.email}
//           </p>
//           <p className="card-text">
//             <strong>Phone:</strong> {agency?.phone}
//           </p>
//         </div>
//       </div>
//       <div className="mt-4">
//         <button className="btn btn-danger" onClick={() => navigate("/")}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AgencyDetails;
