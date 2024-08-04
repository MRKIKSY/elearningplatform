import { FaExternalLinkAlt } from 'react-icons/fa';

const Hero = ({
  title = 'Royals Scholar E-Learning Platform',
  subtitle = 'Making Teaching easily accessible and easy to access',
}) => {
  return (
    <section className='bg-indigo-700 py-20 mb-4'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-white sm:text-5xl md:text-6xl'>
            {title}
          </h1>
          <p className='my-4 text-xl text-white'>{subtitle}</p>
          <a
            href='https://mrkiksyquizapp.netlify.app/'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-6 inline-flex items-center px-6 py-3 bg-white text-indigo-700 rounded-md shadow-md hover:bg-gray-100'
          >
            Click to take the School daily Quiz
            <FaExternalLinkAlt className='ml-2' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
