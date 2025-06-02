"use client"

import { setUser } from '@/lib/features/userSlice';
import AuthService from '@/services/auth.service';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

function UserProvider ({
  children
}: {
  children: React.ReactNode
}) {
  const dispatch = useDispatch();
  const authService = AuthService;

  const getCurrentUser = async () => {
    const res = await authService.getCurrentUser();
    if(res.user){
      dispatch(setUser(res.user));
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default UserProvider