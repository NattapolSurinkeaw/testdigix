import { useEffect, useState } from 'react';
import { Card } from "@mui/material";
import { categoryService } from '../../services/categoryService';
import CreateCategoryModal from './components/CreateCategoryModal';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

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
            </Card>
          ))}
        </Card>
      )}

      <CreateCategoryModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={fetchCategories}
      />
    </div>
  );
}
