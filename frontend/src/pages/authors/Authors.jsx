import { useEffect, useRef, useState } from 'react';
import { Card, Modal, Box } from '@mui/material';
import { authorService } from '../../services/authorService';
import CreateAuthorModal from './components/CreateAuthorModal';

const emptyForm = { author_name: '', description: '', status_display: true };
const API_ORIGIN = (import.meta.env.VITE_API_PATH || '').replace(/\/api$/, '');

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

export default function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const res = await authorService.getAll();
      if (res.status) setAuthors(res.authors || []);
    } catch (err) {
      console.error('fetch authors error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAuthors(); }, []);

  const resetEditForm = () => {
    setForm(emptyForm);
    setFile(null);
    setPreview('');
    setEditId(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleOpenEdit = (a) => {
    resetEditForm();
    setEditId(a.id);
    setForm({
      author_name: a.author_name || '',
      description: a.description || '',
      status_display: a.status_display ?? true,
    });
    if (a.photo_img) setPreview(a.photo_img.startsWith('http') ? a.photo_img : `${API_ORIGIN}/${a.photo_img}`);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    resetEditForm();
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const f = files[0];
      setFile(f);
      setPreview(f ? URL.createObjectURL(f) : '');
      return;
    }
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('author_name', form.author_name);
      payload.append('description', form.description || '');
      payload.append('status_display', String(form.status_display));
      if (file) payload.append('photo_img', file);

      const res = await authorService.update(editId, payload);
      if (res.status) {
        handleCloseEdit();
        fetchAuthors();
      } else {
        setError(res.message || 'บันทึกไม่สำเร็จ');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ลบผู้แต่งนี้?')) return;
    try {
      const res = await authorService.remove(id);
      if (res.status) fetchAuthors();
      else alert(res.message || 'ลบไม่สำเร็จ');
    } catch (err) {
      alert(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-gray-700">Authors</p>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 h-10 rounded-md transition-all ease-in-out duration-300"
        >
          + เพิ่มผู้แต่ง
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">กำลังโหลด...</p>
      ) : authors.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">ยังไม่มีข้อมูลผู้แต่ง</Card>
      ) : (
        <Card className="p-4 grid grid-cols-4 gap-4">
          {authors.map((a) => {
            const imgSrc = a.photo_img
              ? (a.photo_img.startsWith('http') ? a.photo_img : `${API_ORIGIN}/${a.photo_img}`)
              : null;
            return (
              <Card
                key={a.id}
                sx={{ background: 'rgb(243 244 246)' }}
                className="p-4 flex flex-col gap-4"
              >
                <figure className="bg-white rounded-md w-[150px] h-[150px] m-auto overflow-hidden flex items-center justify-center">
                  {imgSrc ? (
                    <img className="w-full h-full object-cover" src={imgSrc} alt={a.author_name} />
                  ) : (
                    <span className="text-4xl font-bold text-gray-400">
                      {a.author_name?.charAt(0).toUpperCase() || '?'}
                    </span>
                  )}
                </figure>
                <div>
                  <p className="font-bold">{a.author_name}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{a.description || '-'}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {a.status_display ? 'แสดง' : 'ซ่อน'}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <button
                    onClick={() => handleOpenEdit(a)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold w-20 h-10 rounded-md transition-all ease-in-out duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold w-20 h-10 rounded-md transition-all ease-in-out duration-300"
                  >
                    Delete
                  </button>
                </div>
              </Card>
            );
          })}
        </Card>
      )}

      <CreateAuthorModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={fetchAuthors}
      />

      <Modal open={openEdit} onClose={handleCloseEdit}>
        <Box sx={styleModal}>
          <h2 className="text-xl font-bold mb-4">แก้ไขผู้แต่ง</h2>
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">ชื่อผู้แต่ง *</label>
              <input
                name="author_name"
                value={form.author_name}
                onChange={handleEditChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">คำอธิบาย</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleEditChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">รูปภาพ (เลือกใหม่เพื่ออัปเดต)</label>
              <input
                ref={fileInputRef}
                type="file"
                name="photo_img"
                accept="image/*"
                onChange={handleEditChange}
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
                onChange={handleEditChange}
                id="edit_author_status"
              />
              <label htmlFor="edit_author_status" className="text-sm">แสดงผล</label>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={handleCloseEdit}
                className="px-4 h-10 rounded-md bg-gray-300 hover:bg-gray-400 transition"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 h-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 transition"
              >
                {submitting ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
