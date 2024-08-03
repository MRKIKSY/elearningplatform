import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import './css/HomeCards.css'; // Import the CSS file

const HomeCards = () => {
  return (
    <section className='py-4 home-background'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <Card>
            <h2 className='text-2xl font-bold'>For Students</h2>
            <p className='mt-2 mb-4'>
              Upload Assignments and E-tasks for your teachers
            </p>
            <Link
              to='/jobs'
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Navigate E-assignments
            </Link>
          </Card>
          <Card bg='bg-indigo-100'>
            <h2 className='text-2xl font-bold'>For Class Teachers</h2>
            <p className='mt-2 mb-4'>
              Upload Assignments and E tasks for your students
            </p>
            <Link
              to='/add-job'
              className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
            >
              Add E- Assignment
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HomeCards;
