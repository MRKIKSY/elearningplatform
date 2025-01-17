import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const jobLoader = async ({ params }) => {
  const { id } = params;
  console.log('Job ID from URL:', id); // Debugging line

  if (!id) {
    throw new Error('Job ID is missing');
  }

  try {
    const res = await fetch(`https://elearningbackend-z07d.onrender.com/api/jobs/${id}`); // Updated URL for production
    if (!res.ok) {
      const errorText = await res.text(); // Capture error response as text
      console.error('Error response:', errorText); // Log error response for debugging
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error; // Ensure errors are thrown to be caught by React Router's Error Boundary
  }
};

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const job = useLoaderData(); // Data is automatically loaded by `jobLoader`

  if (!job) {
    return <div>Error loading job details</div>; // Basic error handling
  }

  const onDeleteClick = async (jobId) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');

    if (!confirm) return;

    try {
      await deleteJob(jobId);
      toast.success('Job deleted successfully');
      navigate('/jobs');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Error deleting job');
    }
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/jobs'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='text-gray-500 mb-4'>{job.type}</div>
                <h1 className='text-3xl font-bold mb-4'>{job.title}</h1>
                <div className='text-gray-500 mb-4 flex align-middle justify-center md:justify-start'>
                  <FaMapMarker className='text-orange-700 mr-1' />
                  <p className='text-orange-700'>{job.location}</p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                Assignment Description or Explanation
                </h3>

                <p className='mb-4'>{job.description}</p>

                <h3 className='text-indigo-800 text-lg font-bold mb-2'>
                  Class
                </h3>

                {/* <p className='mb-4'>{job.salary} / Class</p> */}
              </div>
            </main>

            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Class Teacher name</h3>

                <h2 className='text-2xl'>{job.company?.name}</h2>

                <p className='my-2'>{job.company?.description}</p>

                <hr className='my-4' />

                <h3 className='text-xl'>Contact Class Teacher by  Email:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company?.contactEmail}
                </p>

                <h3 className='text-xl'>Contact Class Teacher by Phone:</h3>

                <p className='my-2 bg-indigo-100 p-2 font-bold'>
                  {job.company?.contactPhone}
                </p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Manage Job</h3>
                <Link
                  to={`/edit-job/${job._id}`} // Ensure correct path and parameter
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job._id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
