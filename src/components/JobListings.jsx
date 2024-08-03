import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? 'https://elearningbackend-z07d.onrender.com/api/jobs?_limit=3' : 'https://jobmarketbackend.onrender.com/api/jobs';
      try {
        console.log(`Fetching data from: ${apiUrl}`);
        const res = await fetch(apiUrl);
        console.log(`Response status: ${res.status}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched data:', data);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setJobs([]); // You might want to add user feedback here
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]); // Removed apiUrl as a dependency

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobListing key={job._id} job={job} />
              ))
            ) : (
              <p className='text-center text-gray-500'>No jobs available.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
