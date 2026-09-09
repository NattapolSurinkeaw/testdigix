import { useEffect, useState } from 'react';
import { Card, Modal, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { userService } from '../../services/userService';

const emptyForm = {
  username: '',
  password: '',
  email: '',
  display_name: '',
  status_confirm: 'confirmed',
  status: 'active',
};

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

export default function Members() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getAll();
      if (res.status) setUsers(res.users || []);
    } catch (err) {
      console.error('fetch users error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelect = (name) => (e) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const handleClose = () => {
    setOpenCreate(false);
    setForm(emptyForm);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.username || !form.password || !form.email || !form.display_name) {
      setError('กรุณากรอก username, password, email และ display_name');
      return;
    }
    setSubmitting(true);
    try {
      const res = await userService.create(form);
      if (res.status) {
        handleClose();
        fetchUsers();
      } else {
        setError(res.message || 'บันทึกไม่สำเร็จ');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`ลบ user "${u.username}"?`)) return;
    try {
      const res = await userService.remove(u.id);
      if (res.status) fetchUsers();
      else alert(res.message || 'ลบไม่สำเร็จ');
    } catch (err) {
      alert(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold text-gray-700">Members</p>
        <button
          onClick={() => setOpenCreate(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 h-10 rounded-md transition-all ease-in-out duration-300"
        >
          + เพิ่มสมาชิก
        </button>
      </div>

      <Card className="p-4">
        <div className="relative overflow-x-auto rounded-md">
          {loading ? (
            <p className="p-4 text-gray-500">กำลังโหลด...</p>
          ) : (
            <table className="w-full text-left text-gray-500 font-bold">
              <thead className="text-gray-700 bg-gray-100">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Username</th>
                  <th className="p-4">Display Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Status</th>
                  <th align="center" className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr className="bg-white border-b">
                    <td colSpan={7} className="p-4 text-center text-gray-400 font-normal">
                      ยังไม่มีข้อมูลสมาชิก
                    </td>
                  </tr>
                )}
                {users.map((u) => (
                  <tr key={u.id} className="bg-white border-b">
                    <td className="p-4">{u.id}</td>
                    <td className="p-4">{u.username}</td>
                    <td className="p-4">{u.display_name}</td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.status}</td>
                    <td className="p-4">
                      <div className="h-full flex justify-center items-center">
                        <button
                          onClick={() => handleDelete(u)}
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
          )}
        </div>
      </Card>

      <Modal open={openCreate} onClose={handleClose}>
        <Box sx={styleModal}>
          <h2 className="text-xl font-bold mb-4">เพิ่มสมาชิก</h2>
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Username *</label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Display Name *</label>
              <input
                name="display_name"
                value={form.display_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormControl size="small">
                <InputLabel>Status Confirm</InputLabel>
                <Select value={form.status_confirm} label="Status Confirm" onChange={handleSelect('status_confirm')}>
                  <MenuItem value="confirmed">confirmed</MenuItem>
                  <MenuItem value="pending">pending</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel>Status</InputLabel>
                <Select value={form.status} label="Status" onChange={handleSelect('status')}>
                  <MenuItem value="active">active</MenuItem>
                  <MenuItem value="suspended">suspended</MenuItem>
                </Select>
              </FormControl>
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
