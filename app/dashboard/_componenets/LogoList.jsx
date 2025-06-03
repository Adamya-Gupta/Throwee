// "use client"
// import { UserDetailContext } from '@/app/_context/UserDetailContext'
// import { db } from '@/app/configs/FirebaseConfig';
// import { collection, getDocs } from 'firebase/firestore';
// import Image from 'next/image';
// import React, { useContext, useEffect, useState } from 'react'

// function LogoList() {
//     const {userDetail,setUserDetail}=useContext(UserDetailContext);
//     const [logoList,setLogoList]=useState([]);

//     useEffect(()=>{
//         userDetail&&GetUserLogos();
//     },[userDetail])

//     const GetUserLogos=async()=>{
//         const querySnapshot= await getDocs(collection(db,"users",userDetail?.email,"logos"));
//         setLogoList([]);
//         querySnapshot.forEach((doc)=>{
//             console.log(doc.data());
//             setLogoList(prev=>[...prev,doc.data()])
//         })
//     }

//     // const ViewLogo(image)={
//     //     const imageWindow = window.open();
//     //     imageWindow.document.write(`<img src="${image}" alt=Base64 Image" />`)
//     // }

//   return (
//     <div className='mt-10'>
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//             {logoList?.length>0?logoList.map((logo,index)=>(
//                 <div key={index} className='hover:scale-105 transition-all cursor-pointer'
//                 onClick={()=>ViewLogo(logo?.image)}
//                 >
//                     <Image src={logo?.image} width={400} height={200} alt={logo?.title}
//                     className='w-full rounded-xl'
//                     />
//                     <h2 className='text-center text-lg mt-2 font-medium'>{logo?.title}</h2>
//                     <p className='text-sm text-gray-500 text-center'>{logo?.desc}</p>
//                 </div>
//             )):
//             [1,2,3,4,5,6].map((item,index)=>(
//                 <div key={index} className='bg-slate-200 animate-pulse rounded-xl w-full h-[200px]'>

//                 </div>
//             ))
//             }

//         </div>
      
//     </div>
//   )
// }

// export default LogoList

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
    <div className="mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Logo Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {logoList?.length > 0 ? (
          logoList.map((logo, index) => (
            <div
              key={index}
              className="relative group bg-primary-foreground p-2 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div
                onClick={() => ViewLogo(logo?.image)}
                className="cursor-pointer"
              >
                <Image
                  src={logo?.image}
                  width={400}
                  height={200}
                  alt={logo?.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <h2 className="text-center text-lg mt-2 font-medium truncate text-cyan-950">
                  {logo?.title}
                </h2>
                <p className="text-sm text-center truncate">
                  {logo?.desc}
                </p>
              </div>

              <div className="flex justify-center gap-3 mt-3 ">
                <Button onClick={() => ViewLogo(logo?.image)} 
                variant="outline" 
                size="sm" 
                className='cursor-pointer'>
                  View
                </Button>
                <Button
                  onClick={() => DeleteLogo(logo?.id)}
                  variant="destructive"
                  size="sm"
                  className='cursor-pointer'
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="bg-slate-200 animate-pulse rounded-xl w-full h-[200px]"
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default LogoList
