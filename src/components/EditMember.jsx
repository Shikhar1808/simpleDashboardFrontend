import React, { useState } from 'react';

const EditMember = ({ member, onClose, onSave }) => {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [role, setRole] = useState(member.role);
  const [permissions, setPermissions] = useState(member.permissions);

  const handleSave = () => {
    if (name && email) {
      onSave({ ...member, name, email, role, permissions });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Member</h2>
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
        <div className="mb-4">
          <label className="block font-medium">Permissions</label>
          <select
            className="border rounded w-full p-2"
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)}
          >
            <option value="canEdit">Can Edit</option>
            <option value="canDelete">Can Delete</option>
            <option value="canInvite">Can Invite</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
