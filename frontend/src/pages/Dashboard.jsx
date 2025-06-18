// import { useEffect, useState } from "react";
// import axios from "../api/axiosConfig";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [domains, setDomains] = useState([]);

//   useEffect(() => {
//     const fetchDomains = async () => {
//       try {
//         const res = await axios.get("/domains");
//         setDomains(res.data);
//       } catch (err) {
//         console.error("Error fetching domains", err);
//       }
//     };

//     fetchDomains();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Explore Tech Domains</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {domains.map((domain) => (
//           <Link
//             key={domain._id}
//             to={`/domain/${domain._id}`}
//             className="bg-white/10 hover:bg-white/20 p-6 rounded-lg transition"
//           >
//             <h2 className="text-xl font-semibold">{domain.name}</h2>
//             <p className="mt-2 text-gray-300">{domain.description}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
