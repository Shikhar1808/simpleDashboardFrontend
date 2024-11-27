import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AddNewMember from './AddNewMember';
import MemberTable from './MemberTable';
import EditMember from './EditMember';
import { addLog } from '../redux/slices/activityLogsSlics';

const mockMembers = Array(50).fill().map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
  permissions: {
    canEdit: i % 2 === 0,
    canDelete: i % 3 === 0,
    canInvite: i % 4 === 0
  }
}));

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [isAddMemberComponentOpen, setAddMemberComponentOpen] = useState(false);
  const [edittingMember, setEdittingMember] = useState(null);
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({ role: 'All', permission: 'All' });
  const [sort, setSort] = useState({ column: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const apiBaseUrl = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberResponse, logResponse] = await Promise.all([
          axios.get(`${apiBaseUrl}/members`),
          axios.get(`${apiBaseUrl}/logs`)
        ]);
        setLogs(logResponse.data || []);
        if (memberResponse.data && memberResponse.data.length > 0) {
          setMembers(memberResponse.data);
        } else {
          console.warn('No members found in API response, using mock data.');
          setMembers(mockMembers);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
        setMembers(mockMembers);
      }
    };

    fetchData();
  }, []);

  const addLogEntry = async (newLog) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/members`, newLog);
      setLogs([...logs, response.data]);
      dispatch(addLog(response.data));
    } catch (error) {
      console.error('Error adding log entry:', error);
    }
  };

  const addMember = async (newMember) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/members`, newMember);
      setMembers([...members, response.data]);

      const newLog = {
        action: 'Add Member',
        member: response.data,
        timestamp: new Date().toISOString(),
      };
      await addLogEntry(newLog);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const updateMember = async (updatedMember) => {
    try {
      const response = await axios.put(`${apiBaseUrl}/members/${updatedMember.id}`, updatedMember);
      setMembers(
        members.map((member) => (member.id === updatedMember.id ? response.data : member))
      );

      const newLog = {
        action: 'Update Member',
        member: response.data,
        timestamp: new Date().toISOString(),
        changes: updatedMember,
      };
      await addLogEntry(newLog);
      setEdittingMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await axios.delete(`${apiBaseUrl}/members/${memberId}`);
      setMembers(members.filter((member) => member.id !== memberId));

      const newLog = {
        action: 'Delete Member',
        memberId,
        timestamp: new Date().toISOString(),
      };
      await addLogEntry(newLog);
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEditMember = (member) => {
    setEdittingMember(member);
  };

  const handleSort = (column) => {
    const newDirection = sort.direction === 'asc' ? 'desc' : 'asc';
    setSort({ column, direction: newDirection });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = members
    .filter((member) => filters.role === 'All' || member.role === filters.role)
    .filter((member) => filters.permission === 'All' || member.permissions[filters.permission])
    .filter((member) => {
      const searchQuery = searchTerm.toLowerCase();
      return (
        member.name.toLowerCase().includes(searchQuery) ||
        member.email.toLowerCase().includes(searchQuery) ||
        member.role.toLowerCase().includes(searchQuery)
      );
    })
    .sort((a, b) => {
      const aValue = a[sort.column];
      const bValue = b[sort.column];

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <div className='max-w-7xl pl-20 mx-auto relative overflow-hidden max-md:max- top-20'>
      <div className={`${isAddMemberComponentOpen ? 'opacity-50' : ''} flex flex-col justify-center gap-10`}>
        <div>
          <h1 className='text-2xl font-bold mb-6'>Member Management</h1>

          <button
            className='bg-black text-white px-4 py-2 rounded hover:bg-gray-800'
            onClick={() => setAddMemberComponentOpen(true)}
          >
            Add New Member
          </button>
        </div>

        <div className='flex items-center gap-6 mb-6'>

          <div className='flex items-center'>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Search by name, email, or role'
              className='p-2 rounded bg-white border border-gray-300'
            />
          </div>

          <div>
            <label htmlFor='sort' className='mr-2'>
              Sort By:
            </label>
            <select
              name='sort'
              onChange={(e) => handleSort(e.target.value)}
              className='p-2 rounded bg-white border border-gray-300'
            >
              <option value='name'>Name</option>
              <option value='role'>Role</option>
              <option value='email'>Email</option>
            </select>
          </div>

          <div className='flex gap-4'>
            <div>
              <label htmlFor='role' className='mr-2'>
                Role:
              </label>
              <select
                name='role'
                value={filters.role}
                onChange={handleFilterChange}
                className='p-2 rounded bg-white border border-gray-300'
              >
                <option value='All'>All</option>
                <option value='Admin'>Admin</option>
                <option value='Editor'>Editor</option>
                <option value='Viewer'>Viewer</option>
              </select>
            </div>

            <div>
              <label htmlFor='permission' className='mr-2'>
                Permission:
              </label>
              <select
                name='permission'
                value={filters.permission}
                onChange={handleFilterChange}
                className='p-2 rounded bg-white border border-gray-300'
              >
                <option value='All'>All</option>
                <option value='canEdit'>Can Edit</option>
                <option value='canDelete'>Can Delete</option>
                <option value='canInvite'>Can Invite</option>
              </select>
            </div>
          </div>
        </div>

        <MemberTable members={filteredMembers} onEdit={handleEditMember} onDelete={deleteMember} />

        <div>
          {window.innerWidth < 768 && <div className='absolute bottom-0'>Scroll</div>}
        </div>
      </div>

      {isAddMemberComponentOpen && <AddNewMember onClose={() => setAddMemberComponentOpen(false)} onSave={addMember} />}
      {edittingMember && <EditMember member={edittingMember} onClose={() => setEdittingMember(null)} onSave={updateMember} />}
    </div>
  );
};

export default MemberManagement;
