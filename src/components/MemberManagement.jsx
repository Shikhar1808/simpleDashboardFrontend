import {useState, useEffect} from 'react'
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
  }))

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [isAddMemberComponentOpen, setAddMemberComponentOpen] = useState(false);
    const [edittingMember, setEdittingMember] = useState(null);
    const [logs, setLogs] = useState([]);
    const dispatch = useDispatch();

    const apiBaseUrl = 'http://localhost:5000/api';

    useEffect(() => {
        const fetchData = async () => {
          try {
            // const response = await axios.get('https://example.com/api/members');
            const [memberResponse, logResponse] = await Promise.all([
                axios.get(`${apiBaseUrl}/members`), 
                axios.get(`${apiBaseUrl}/logs`)
            ]);
            setLogs(logResponse.data || []);
            console.log(memberResponse.data);
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
      }

      const addMember = async (newMember) => {
        try {
          const response = await axios.post(`${apiBaseUrl}/members`, newMember);
          setMembers([...members, response.data]);

          console.log(response.data);
          
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
          setEditingMember(null);
        } catch (error) {
          console.error('Error updating member:', error);
        }
      };

      const deleteMember = async (memberId) => {
        try {
            console.log(memberId);
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

    const handleEditMember = (member) =>{
        setEdittingMember(member);
    }


  return (
    <div className='max-w-7xl pl-20 mx-auto relative overflow-hidden max-md:max- top-20' >
        <div className={`${isAddMemberComponentOpen? 'opacity-50': ""} flex flex-col justify-center gap-10`}  >
            <div>
                <h1 className='text-2xl font-bold mb-6' >Member Management</h1>

                <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 "
                    onClick={() => setAddMemberComponentOpen(true)}
                >
                    Add New Member
                </button>
            </div>
            <MemberTable members={members} onEdit={handleEditMember} onDelete={deleteMember} />

            <div>
                {window.innerWidth < 768 && <div className="absolute bottom-0">Scroll</div>}
            </div>
        </div>

        {isAddMemberComponentOpen && <AddNewMember onClose={() => setAddMemberComponentOpen(false)}  onSave={addMember} />}

        {edittingMember && <EditMember member={edittingMember} onClose={() => setEdittingMember(null)} onSave={updateMember} />}
    </div>
  )
}

export default MemberManagement