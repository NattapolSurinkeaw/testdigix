import { useRef, useState } from 'react';
import { Modal, Box } from '@mui/material';
import { authorService } from '../../../services/authorService';

const emptyForm = { author_name: '', description: '', status_display: true };

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
  maxHeight: '90vh',
  overflowY: 'auto',
};

export default function CreateAuthorModal({ open, onClose, onCreated }) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('author_name', form.author_name);
      payload.append('description', form.description || '');
      payload.append('status_display', String(form.status_display));
      if (file) payload.append('photo_img', file);

      const res = await authorService.create(payload);
      if (res.status) {
        reset();
        onClose();
        onCreated?.(res.author);
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
        <h2 className="text-xl font-bold mb-4">เพิ่มผู้แต่ง</h2>
        {error && (
          <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อผู้แต่ง *</label>
            <input
              name="author_name"
              value={form.author_name}
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
            <label className="block text-sm font-medium mb-1">รูปภาพ</label>
            <input
              ref={fileInputRef}
              type="file"
              name="photo_img"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm"
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 w-24 h-24 object-cover rounded border"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="status_display"
              checked={form.status_display}
              onChange={handleChange}
              id="create_author_status"
            />
            <label htmlFor="create_author_status" className="text-sm">แสดงผล</label>
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
