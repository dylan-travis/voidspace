import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSession, getSession } from "next-auth/react"

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    
    if (!session || !session.user) {
      // Handle the case where the user is not authenticated
      // You can redirect them to the login page or handle it as needed
      return {
        redirect: {
          destination: '/login', // Redirect to the login page
          permanent: false,
        },
      };
    }
    
    const userId = session.user.id;
    const confirmCartBookingUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/confirmCartBooking";
    const confirmCartBookingUrlWithQuery = `${confirmCartBookingUrl}?userId=${userId}`;
    await fetch(confirmCartBookingUrlWithQuery, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        }
      });

    return { props: { success: true } };
  } catch (e) {
    // Handle the error and still return an object with props
    return { props: { error: 'An error occurred' } };
  }
}    

export default function ResultPage({ success, error }) {
  const router = useRouter();
  const isSuccess = router.query.success === 'true';

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push('/');
      }, 5000);
    }
  }, [isSuccess, router]);

  if (typeof success === 'undefined') {
    // While the promise is being resolved, you can return a loading state here
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8 text-center">
      {success ? (
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
}
