import { useEffect, useState } from 'react';
import { Card } from "@mui/material";
import { categoryService } from '../../services/categoryService';
import CreateCategoryModal from './components/CreateCategoryModal';
import EditCategoryModal from './components/EditCategoryModal';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await categoryService.getAll();
      if (res.status) setCategories(res.categories || []);
    } catch (err) {
      console.error('fetch categories error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleOpenEdit = (cat) => {
    setEditTarget(cat);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditTarget(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ลบหมวดหมู่นี้?')) return;
    try {
      const res = await categoryService.remove(id);
      if (res.status) fetchCategories();
      else alert(res.message || 'ลบไม่สำเร็จ');
    } catch (err) {
      alert(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-gray-700">Categories</p>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 h-10 rounded-md transition-all ease-in-out duration-300"
        >
          + เพิ่มหมวดหมู่
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">กำลังโหลด...</p>
      ) : categories.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">ยังไม่มีข้อมูลหมวดหมู่</Card>
      ) : (
        <Card className="p-4 grid grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              sx={{ background: "rgb(243 244 246)" }}
              className="p-4 flex flex-col gap-4"
            >
              <div className="bg-white rounded-md p-4 w-[150px] h-[150px] m-auto flex items-center justify-center text-4xl font-bold text-gray-400">
                {cat.cate_title?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <p className="font-bold">{cat.cate_title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{cat.description || '-'}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Priority: {cat.priority} · {cat.status_display ? 'แสดง' : 'ซ่อน'}
                </p>
              </div>
              <div className="flex justify-center items-center gap-8">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold w-20 h-10 rounded-md transition-all ease-in-out duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold w-20 h-10 rounded-md transition-all ease-in-out duration-300"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))}
        </Card>
      )}

      <CreateCategoryModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={fetchCategories}
      />

      <EditCategoryModal
        open={openEdit}
        category={editTarget}
        onClose={handleCloseEdit}
        onUpdated={fetchCategories}
      />
    </div>
  );
}
