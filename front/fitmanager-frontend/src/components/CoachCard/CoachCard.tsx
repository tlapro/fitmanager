import { ICoach } from "@/config/coaches";
import Image from "next/image";

export default function CoachCard({id, name, img, description, email} : ICoach) {
  return (
    <div key={id}>
        <div className="w-[24rem] h-[12rem] cursor-default border-gray-200 border-2 p-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ease pb-4">
          <div>
            <h1 className="text-xl font-bold">{name}</h1>
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-2 justify-center mt-4">
            <div className="w-full flex justify-center">
              <Image 
              className="rounded-full"
              src={img} 
              alt="{`coach ${name}`}"
              width={100} 
              height={120} />
            </div>
            <div className="mt-2 w-full">
              <p className="text-sm font-serif">{description}</p>
            </div>
          </div>
            <p className="text-gray-500 text-center">{email}</p>
        
        </div>
    </div>
    
  )
}