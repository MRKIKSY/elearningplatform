import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';
const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    try {
      const res = await fetch('https://jobmarketbackend.onrender.com/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        const errorDetail = await res.text(); // Get error details from response
        throw new Error(`HTTP error! status: ${res.status}, detail: ${errorDetail}`);
      }
      // Optionally handle response or confirmation
    } catch (error) {
      console.error('Error adding job:', error.message);
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`https://jobmarketbackend.onrender.com/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      // Optionally handle response or confirmation
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Update Job
  const updateJob = async (job) => {
    try {
      console.log('Updating job with data:', job); // Debugging line
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      console.log('Job update response:', await res.json()); // Debugging line
      // Optionally handle response or confirmation
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path='/edit-job/:id'
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
