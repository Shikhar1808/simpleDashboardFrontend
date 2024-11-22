import React, { useState } from 'react';

const AddNewMember = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Viewer');

  const addNewMember = () => {
    onSave({ name, email, role, permissions: { edit: false, delete: false, invite: false } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
        <div className="mb-4">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            className="border rounded w-full p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Role</label>
          <select
            className="border rounded w-full p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={addNewMember}>
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewMember;
