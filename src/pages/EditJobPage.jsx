import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditJobPage = ({ updateJobSubmit }) => {
  const job = useLoaderData();
  const [title, setTitle] = useState(job?.title || '');
  const [type, setType] = useState(job?.type || '');
  const [location, setLocation] = useState(job?.location || '');
  const [description, setDescription] = useState(job?.description || '');
  const [salary, setSalary] = useState(job?.salary || '');
  const [companyName, setCompanyName] = useState(job?.company?.name || '');
  const [companyDescription, setCompanyDescription] = useState(job?.company?.description || '');
  const [contactEmail, setContactEmail] = useState(job?.company?.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(job?.company?.contactPhone || '');

  const navigate = useNavigate();
  const { id } = useParams();

  // Debugging: Log job ID and job data
  useEffect(() => {
    console.log('Job ID from URL:', id);
    console.log('Fetched job data:', job);
  }, [id, job]);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      location,
      description,
      salary,
      company: {
        name: companyName,
        description: companyDescription,
        contactEmail,
        contactPhone,
      },
    };

    console.log('Submitting job update:', { id, ...updatedJob });

    try {
      await updateJobSubmit({ id, ...updatedJob });
      toast.success('Job Updated Successfully');
      navigate(`/jobs/${id}`);
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Job
            </h2>

            {/* Job Type */}
            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Job Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                 <option value='Full-Time'>Pratice</option>
                <option value='Part-Time'>Exercise</option>
                <option value='Remote'>Reading</option>
                <option value='Internship'>Comprehension</option>
              </select>
            </div>

            {/* Job Title */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Assignment  Listing or Topic
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. Beautiful Apartment In Miami'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any job duties, expectations, requirements, etc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Salary */}
            <div className='mb-4'>
              <label
                htmlFor='salary'
                className='block text-gray-700 font-bold mb-2'
              >
              Assignment Description or Explanation
              </label>
              <select
                id='salary'
                name='salary'
                className='border rounded w-full py-2 px-3'
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
               <option value='Under $50K'>Nursery 1</option>
                <option value='$50K - 60K'>Nursery 2</option>
                <option value='$60K - 70K'>Primary 1</option>
                <option value='$70K - 80K'>Primary 2</option>
                <option value='$80K - 90K'>Primary 3</option>
                <option value='$90K - 100K'>Primary 4</option>
                <option value='$100K - 125K'>Primary 5</option>
                <option value='$125K - 150K'>Test</option>
                <option value='$150K - 175K'>Project</option>
                <option value='$175K - 200K'>Extra Curriculim</option>
                <option value='Over $200K'>Miscelleanous </option>
              </select>
            </div>

            {/* Location */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Class Teacher Name
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Company Info */}
            <h3 className='text-2xl mb-5'>Assignment Instruction</h3>

            <div className='mb-4'>
              <label
                htmlFor='company'
                className='block text-gray-700 font-bold mb-2'
              >
                 Assignment Questions
              </label>
              <input
                type='text'
                id='company'
                name='company'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Name'
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='company-description'
                className='block text-gray-700 font-bold mb-2'
              >
               Assignment Hints 
              </label>
              <textarea
                id='company-description'
                name='company-description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any company description'
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact-email'
                className='block text-gray-700 font-bold mb-2'
              >
               Contact Class Teacher By Email 
              </label>
              <input
                type='email'
                id='contact-email'
                name='contact-email'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Contact Email'
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='contact-phone'
                className='block text-gray-700 font-bold mb-2'
              >
                Contact Class Teacher by Phone
              </label>
              <input
                type='tel'
                id='contact-phone'
                name='contact-phone'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Contact Phone'
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className='text-center'>
              <button
                type='submit'
                className='bg-indigo-500 text-white py-2 px-4 rounded'
              >
                Submit Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
