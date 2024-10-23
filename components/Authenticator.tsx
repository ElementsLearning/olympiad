"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

export const Authenticator: React.FC<Props> = ({children}) => {  

  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [allowed, setAllowed] = useState(false)

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  const checkPassword = () => {
    if (password === adminPassword) {
      setAllowed(true)
    } else {
      setError("Wrong Password")
      setPassword("")
    }
  }

  useEffect(() => {
    const onEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        checkPassword()
      }
    }

    window.addEventListener("keydown", onEnter)

    return () => {
      window.removeEventListener("keydown", onEnter)
    }
  }, [password])
  
  return (
    <>
    {allowed ?
    <>{children}</> :
    <div className="h-screen w-full flex justify-center items-center">
      <Card className='w-4/5 max-w-sm'>
        <CardHeader>
          <CardTitle>Not Logged In</CardTitle>
          <CardDescription>The Page You are trying to visit is for admin only</CardDescription>
        </CardHeader>
        <CardContent>
          <Label className={`${error ? "text-destructive" : ""}`}>{!error ? "Password" : error}</Label>
          <div className='flex gap-2 items-center'>
            <Input autoFocus value={password} onChange={e => {setPassword(e.target.value); setError("")}} type="password" placeholder='Password' />
            <Button onClick={checkPassword} size={"icon"} className='h-full aspect-square'><ArrowRightIcon /></Button>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={"/"} className='w-full'>
            <Button className='w-full' variant={"outline"}>Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>}
    </>
  )
}