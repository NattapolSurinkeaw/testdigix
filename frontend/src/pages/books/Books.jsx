import React from 'react'
import BookTable from './components/BooksTable.jsx'
import { Card } from "@mui/material"

export default function Books() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold text-gray-700">Books</p>
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            {/* <CreateMember getMembers={getMembers} /> */}
            {/* <MembersSearch
              setPage={setPage}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            /> */}
          </div>
          <div className="relative overflow-x-auto rounded-md">
            <BookTable
            />
            {/* <div className="flex flex-col sm:flex-row justify-end items-center gap-4 sm:gap-0 my-4 sm:mb-0">
              <MembersPagination
                members={members}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                totalPages={totalPages}
                setTotalPages={setTotalPages}
              />
            </div> */}
          </div>
        </div>
      </Card>
    </div>
  )
}
