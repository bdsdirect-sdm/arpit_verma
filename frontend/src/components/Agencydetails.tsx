import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const JobSeekers: React.FC = () => {
  const [jobSeekers, setJobSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobSeekers = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          "http://localhost:4000/users/jobseekers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobSeekers(response.data.jobSeekers);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error fetching job seekers");
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekers();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `http://localhost:4000/jobseekers/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optionally, update the state to reflect the changes
      setJobSeekers((prev) =>
        prev.map((jobSeeker) =>
          jobSeeker.id === id ? { ...jobSeeker, status } : jobSeeker
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating status");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Seekers List</h2>
      <ul className="list-group">
        {jobSeekers?.map((jobSeeker: any) => (
          <li
            key={jobSeeker.id}
            className="list-group-item d-flex align-items-center"
          >
            <img
              src={`http://localhost:4000/${jobSeeker.photopath}`}
              alt={`${jobSeeker.firstname} ${jobSeeker.lastname}'s Profile Photo`}
              className="rounded-circle me-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h5>
                {jobSeeker.firstname} {jobSeeker.lastname}
              </h5>
              <p className="mb-0">{jobSeeker.email}</p>
              <p className="mb-0">{jobSeeker.hobbies}</p>
              <p className="mb-0">{jobSeeker.phone}</p>
              <div className="mt-2">
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
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <button className="btn btn-danger" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default JobSeekers;




























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// const JobSeekers: React.FC = () => {
//   const [jobSeekers, setJobSeekers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobSeekers = async () => {
//       const token = localStorage.getItem("authToken");
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/users/jobseekers",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setJobSeekers(response.data.jobSeekers);
//       } catch (err: any) {
//         setError(err.response?.data?.message || "Error fetching job seekers");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobSeekers();
//   }, []);

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="alert alert-danger">Error: {error}</div>;

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Job Seekers List</h2>
//       <ul className="list-group">
//         {jobSeekers?.map((jobSeeker: any) => (
//           <li
//             key={jobSeeker.id}
//             className="list-group-item d-flex align-items-center"
//           >
//             <img
//               src={`http://localhost:4000/${jobSeeker.photopath}`}
//               alt={`${jobSeeker.firstname} ${jobSeeker.lastname}'s Profile Photo`}
//               className="rounded-circle me-3"
//               style={{ width: "100px", height: "100px", objectFit: "cover" }}
//             />
//             <div>
//               <h5>
//                 {jobSeeker.firstname} {jobSeeker.lastname}
//               </h5>
//               <p className="mb-0">{jobSeeker.email}</p>
//               <p className="mb-0">{jobSeeker.hobbies}</p>
//               <p className="mb-0">{jobSeeker.phone}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="mt-4">
//         <button className="btn btn-danger" onClick={() => navigate("/")}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobSeekers;
