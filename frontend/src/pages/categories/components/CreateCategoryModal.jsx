import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { categoryService } from '../../../services/categoryService';

const emptyForm = { cate_title: '', description: '', priority: 1, status_display: true };

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function CreateCategoryModal({ open, onClose, onCreated }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleClose = () => {
    setForm(emptyForm);
    setError('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...form,
        priority: Number(form.priority),
        status_display: form.status_display === true || form.status_display === 'true',
      };
      const res = await categoryService.create(payload);
      if (res.status) {
        setForm(emptyForm);
        onClose();
        onCreated?.(res.category);
      } else {
        setError(res.message || 'บันทึกไม่สำเร็จ');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styleModal}>
        <h2 className="text-xl font-bold mb-4">เพิ่มหมวดหมู่</h2>
        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อหมวดหมู่ *</label>
            <input
              name="cate_title"
              value={form.cate_title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">คำอธิบาย</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority *</label>
            <input
              type="number"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="status_display"
              checked={form.status_display}
              onChange={handleChange}
              id="create_cat_status"
            />
            <label htmlFor="create_cat_status" className="text-sm">แสดงผล</label>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 h-10 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 h-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 transition"
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึก'}
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
