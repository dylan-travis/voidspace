import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@mui/material';

function Profile() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        Your name: {session.user.name} <br />
        <Button variant="contained" color="primary" component="label">
          <button onClick={() => signOut()}>Sign out</button>
        </Button>
      </>
    )
  }
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold pb-6">Not Signed In!</h1>
      </div>
    </>
  );
}

export default Profile;