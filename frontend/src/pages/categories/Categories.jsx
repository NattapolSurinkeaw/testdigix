import React from 'react'
import { Card } from "@mui/material";

export default function Categories() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold text-gray-700">Categories</p>
      <Card className="p-4 grid grid-cols-4 gap-4">
        <Card sx={{ background: "rgb(209 213 219)" }} className="p-4 flex flex-col gap-4">
          <figure className="bg-white rounded-md p-4 w-[150px] h-[150px] m-auto">
            <img className="w-full h-full" src="/images/pikachu.png" alt="Pikachu" />
          </figure>
          <div>
            <p>This is title of category 1</p>
            <p>This is description of category 1</p>
            <p>15 June 2023 9:13 AM</p>
          </div>
          <div className="flex justify-center items-center gap-8">
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold w-20 h-10 rounded-md transition-all ease-in-out duration-300">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold w-20 h-10 rounded-md transition-all ease-in-out duration-300">
              Delete
            </button>
          </div>
        </Card>
        <Card className="p-4">test2</Card>
        <Card className="p-4">test3</Card>
        <Card className="p-4">test4</Card>
      </Card>
    </div>
  )
}
