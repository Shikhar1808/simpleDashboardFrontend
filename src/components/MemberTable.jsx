import React from 'react';

const MemberTable = ({ members }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Role</th>
          <th className="p-3">Permissions</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <tr key={member.id} className="border-b">
            <td className="p-3">{member.name}</td>
            <td className="p-3">{member.email}</td>
            <td className="p-3">
              <select className="border rounded p-2">
                <option value="Admin" selected={member.role === 'Admin'}>
                  Admin
                </option>
                <option value="Editor" selected={member.role === 'Editor'}>
                  Editor
                </option>
                <option value="Viewer" selected={member.role === 'Viewer'}>
                  Viewer
                </option>
              </select>
            </td>
            <td className="p-3 flex gap-2">
              <label>
                <input type="checkbox" defaultChecked={member.permissions.edit} /> Edit
              </label>
              <label>
                <input type="checkbox" defaultChecked={member.permissions.delete} /> Delete
              </label>
              <label>
                <input type="checkbox" defaultChecked={member.permissions.invite} /> Invite
              </label>
            </td>
            <td className="p-3">
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MemberTable;
