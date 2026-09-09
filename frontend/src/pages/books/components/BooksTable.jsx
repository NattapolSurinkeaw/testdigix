import React from 'react';

const API_ORIGIN = (import.meta.env.VITE_API_PATH || '').replace(/\/api$/, '');

export default function BooksTable({ books, authors, categories, onEdit, onDelete }) {
  const findName = (list, id) => list.find((x) => x.id === Number(id))?.author_name
    || list.find((x) => x.id === Number(id))?.cate_title
    || '-';

  const imgSrc = (path) =>
    path ? (path.startsWith('http') ? path : `${API_ORIGIN}/${path}`) : null;

  return (
    <table className="w-full text-left text-gray-500 font-bold">
      <thead className="text-gray-700 bg-gray-100">
        <tr>
          <th scope="col" className="p-4">ID</th>
          <th scope="col" className="p-4">Image</th>
          <th scope="col" className="p-4">Title</th>
          <th scope="col" className="p-4">Author</th>
          <th scope="col" className="p-4">Category</th>
          <th scope="col" className="p-4">Year</th>
          <th scope="col" className="p-4">Status</th>
          <th align="center" scope="col" className="p-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {books.length === 0 && (
          <tr className="bg-white border-b">
            <td colSpan={8} className="p-4 text-center text-gray-400 font-normal">
              ยังไม่มีข้อมูลหนังสือ
            </td>
          </tr>
        )}
        {books.map((b) => (
          <tr key={b.id} className="bg-white border-b">
            <td className="p-4">{b.id}</td>
            <td className="p-4">
              {imgSrc(b.thumnail) ? (
                <img
                  className="w-full max-w-[80px] h-[80px] object-cover rounded-md"
                  src={imgSrc(b.thumnail)}
                  alt={b.title}
                />
              ) : (
                <div className="w-[80px] h-[80px] bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                  No img
                </div>
              )}
            </td>
            <td className="p-4">{b.title}</td>
            <td className="p-4">{findName(authors, b.author_id)}</td>
            <td className="p-4">{findName(categories, b.cate_id)}</td>
            <td className="p-4">{b.publish_year}</td>
            <td className="p-4">{b.status_display ? 'แสดง' : 'ซ่อน'}</td>
            <td className="p-4">
              <div className="h-full flex justify-center items-center gap-2">
                <button
                  onClick={() => onEdit(b)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-3 h-9 rounded-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(b)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-3 h-9 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
