import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

const ResultPage = () => {
  const router = useRouter();
  const isSuccess = router.query.success === 'true';

  useEffect(() => {
    // Redirect to the home page after 5 seconds on success
    if (isSuccess) {
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  }, [isSuccess, router]);

  return (
    <div className="container mx-auto my-8 text-center">
      {isSuccess ? (
        <>
          <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-xl">
            Thank you for your payment. Your booking has been confirmed.
          </p>
          <p className="text-lg mt-4">
            You will be redirected to the home page in a few seconds...
          </p>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
          <p className="text-xl">
            Sorry, something went wrong with your payment. Please try again later.
          </p>
          <p className="text-lg mt-4">
            You will be redirected to the home page in a few seconds...
          </p>
        </>
      )}
    </div>
  );
};

export default ResultPage;
