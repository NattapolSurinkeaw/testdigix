import { useEffect, useRef, useState } from 'react';
import { Modal, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { bookService } from '../../../services/bookService';
import { categoryService } from '../../../services/categoryService';
import { authorService } from '../../../services/authorService';
import CreateCategoryModal from '../../categories/components/CreateCategoryModal';
import CreateAuthorModal from '../../authors/components/CreateAuthorModal';

const emptyForm = {
  title: '',
  description: '',
  author_id: '',
  cate_id: '',
  publish_year: new Date().getFullYear(),
  status_display: true,
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 560,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function CreateBookModal({ open, onClose, onCreated }) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [openCreateAuthor, setOpenCreateAuthor] = useState(false);

  const fetchOptions = async () => {
    try {
      const [c, a] = await Promise.all([
        categoryService.getAll(),
        authorService.getAll(),
      ]);
      if (c.status) setCategories(c.categories || []);
      if (a.status) setAuthors(a.authors || []);
    } catch (err) {
      console.error('fetch options error:', err);
    }
  };

  useEffect(() => {
    if (open) fetchOptions();
  }, [open]);

  const reset = () => {
    setForm(emptyForm);
    setFile(null);
    setPreview('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const f = files[0];
      setFile(f);
      setPreview(f ? URL.createObjectURL(f) : '');
      return;
    }
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelect = (name) => (e) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.author_id || !form.cate_id || !form.publish_year) {
      setError('กรุณากรอก title, author, category และ publish_year');
      return;
    }
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('description', form.description || '');
      payload.append('author_id', form.author_id);
      payload.append('cate_id', form.cate_id);
      payload.append('publish_year', String(form.publish_year));
      payload.append('status_display', String(form.status_display));
      if (file) payload.append('thumnail', file);

      const res = await bookService.create(payload);
      if (res.status) {
        reset();
        onClose();
        onCreated?.(res.book);
      } else {
        setError(res.message || 'บันทึกไม่สำเร็จ');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryCreated = (newCat) => {
    setCategories((prev) => [...prev, newCat]);
    setForm((f) => ({ ...f, cate_id: newCat.id }));
  };

  const handleAuthorCreated = (newAuth) => {
    setAuthors((prev) => [...prev, newAuth]);
    setForm((f) => ({ ...f, author_id: newAuth.id }));
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={styleModal}>
          <h2 className="text-xl font-bold mb-4">เพิ่มหนังสือ</h2>
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">รูปภาพหนังสือ</label>
              <div
                className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs px-2 py-1 rounded"
                    >
                      ลบรูป
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16.5 12L12 7.5m0 0L7.5 12M12 7.5V19" />
                    </svg>
                    <span className="text-sm">คลิกเพื่อเลือกรูปภาพ</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="thumnail"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ชื่อหนังสือ *</label>
              <input
                name="title"
                value={form.title}
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
              <label className="block text-sm font-medium mb-1">ปีที่พิมพ์ *</label>
              <input
                type="number"
                name="publish_year"
                value={form.publish_year}
                onChange={handleChange}
                required
                min="1000"
                max="9999"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end gap-2">
              <FormControl fullWidth size="small" required>
                <InputLabel id="create-book-cate-label">หมวดหมู่</InputLabel>
                <Select
                  labelId="create-book-cate-label"
                  label="หมวดหมู่"
                  value={form.cate_id}
                  onChange={handleSelect('cate_id')}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>{c.cate_title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                type="button"
                onClick={() => setOpenCreateCategory(true)}
                className="px-3 h-10 rounded-md bg-gray-200 hover:bg-gray-300 text-sm whitespace-nowrap"
              >
                + ใหม่
              </button>
            </div>

            <div className="flex items-end gap-2">
              <FormControl fullWidth size="small" required>
                <InputLabel id="create-book-author-label">ผู้แต่ง</InputLabel>
                <Select
                  labelId="create-book-author-label"
                  label="ผู้แต่ง"
                  value={form.author_id}
                  onChange={handleSelect('author_id')}
                >
                  {authors.map((a) => (
                    <MenuItem key={a.id} value={a.id}>{a.author_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <button
                type="button"
                onClick={() => setOpenCreateAuthor(true)}
                className="px-3 h-10 rounded-md bg-gray-200 hover:bg-gray-300 text-sm whitespace-nowrap"
              >
                + ใหม่
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="status_display"
                checked={form.status_display}
                onChange={handleChange}
                id="create_book_status"
              />
              <label htmlFor="create_book_status" className="text-sm">แสดงผล</label>
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

      <CreateCategoryModal
        open={openCreateCategory}
        onClose={() => setOpenCreateCategory(false)}
        onCreated={handleCategoryCreated}
      />
      <CreateAuthorModal
        open={openCreateAuthor}
        onClose={() => setOpenCreateAuthor(false)}
        onCreated={handleAuthorCreated}
      />
    </>
  );
}
