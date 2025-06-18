import React, { useEffect, useState } from 'react';
import api from '../utils/api'; // axios instance
import SubjectCard from './SubjectCard';

export default function DomainsWithSubjects() {
  const [domains, setDomains] = useState([]);
  const [subjectsByDomain, setSubjectsByDomain] = useState({});

  useEffect(() => {
    const fetchDomainsAndSubjects = async () => {
      try {
        const domainRes = await api.get('/domains');
        setDomains(domainRes.data);

        // For each domain, fetch its subjects
        for (let domain of domainRes.data) {
          const subjectsRes = await api.get(`/subjects/by-domain/${domain._id}`);
          setSubjectsByDomain(prev => ({
            ...prev,
            [domain._id]: subjectsRes.data
          }));
        }
      } catch (err) {
        console.error('Error:', err.message);
      }
    };

    fetchDomainsAndSubjects();
  }, []);

  return (
    <div className="p-6 text-white">
      {domains.map(domain => (
        <div key={domain._id} className="mb-10">
          <h2 className="text-3xl font-bold mb-4">{domain.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(subjectsByDomain[domain._id] || []).map(subject => (
              <SubjectCard key={subject._id} subject={subject} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
