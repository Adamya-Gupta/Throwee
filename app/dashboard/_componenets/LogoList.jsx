"use client"
import { UserDetailContext } from '@/app/_context/UserDetailContext'
import { db } from '@/app/configs/FirebaseConfig'
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

function LogoList() {
  const { userDetail } = useContext(UserDetailContext)
  const [logoList, setLogoList] = useState([])

  useEffect(() => {
    if (userDetail) GetUserLogos()
  }, [userDetail])

  const GetUserLogos = async () => {
    try {
      const q = collection(db, 'users', userDetail?.email, 'logos')
      const querySnapshot = await getDocs(q)
      const logos = []
      querySnapshot.forEach((doc) => {
        logos.push({ id: doc.id, ...doc.data() })
      })
      setLogoList(logos)
    } catch (error) {
      toast.error("Failed to fetch logos.")
    }
  }

  const ViewLogo = (imageUrl) => {
    const win = window.open('', '_blank')
    if (win) {
      const htmlContent = `
        <html>
          <head><title>Logo View</title></head>
          <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background-color:#f9fafb;">
            <img src="${imageUrl}" style="max-width:90%; max-height:90%; border-radius:12px;" alt="Logo Image" />
          </body>
        </html>`
      win.document.write(htmlContent)
      win.document.close()
    } else {
      toast.error("Pop-up blocked. Please allow pop-ups.")
    }
  }

  const DeleteLogo = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this logo?')
    if (!confirmed) return

    try {
      await deleteDoc(doc(db, 'users', userDetail?.email, 'logos', id))
      setLogoList((prev) => prev.filter((logo) => logo.id !== id))
      toast.success('Logo deleted successfully')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete logo')
    }
  }

  return (
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-4">

  {logoList?.length > 0 ? (
    logoList.map((logo, index) => (
      <CardContainer key={index} className="inter-var">
        <CardBody
          className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full max-w-sm  rounded-xl p-6 border mx-auto"
          style={{ maxWidth: '320px' , minHeight: '350px'  }} // ensure consistent max width inside grid cell
        >
          <CardItem
            translateZ="50"
            className="text-lg font-semibold text-neutral-800 dark:text-white text-center truncate"
          >
            {logo?.title || "Untitled"}
          </CardItem>

          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 text-center line-clamp-1"
          >
            {logo?.desc || "No description"}
          </CardItem>

          <CardItem
            translateZ="100"
            className="w-full mt-4 cursor-pointer"
            onClick={() => ViewLogo(logo?.image)}
          >
            <img
              src={logo?.image}
              height="1000"
              width="1000"
              className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={logo?.title}
            />
          </CardItem>

          <div className="flex justify-between items-center mt-6">
            <CardItem
              translateZ={20}
              as="button"
              onClick={() => ViewLogo(logo?.image)}
              className="px-4 py-2 rounded-xl text-xs font-medium dark:text-white border border-neutral-300 dark:border-neutral-600 cursor-pointer"
            >
              View
            </CardItem>

            <CardItem
              translateZ={20}
              as="button"
              onClick={() => DeleteLogo(logo?.id)}
              className="px-4 py-2 rounded-xl bg-red-600 dark:bg-red-400 dark:text-black text-white text-xs font-bold cursor-pointer"
            >
              Delete
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    ))
  ) : (
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
      <div
        key={index}
        className="bg-slate-200 animate-pulse rounded-xl w-full max-w-sm h-[300px] mx-auto my-2"
        style={{ maxWidth: '320px' }}
      />
    ))
  )}
</div>

  )
}

export default LogoList
