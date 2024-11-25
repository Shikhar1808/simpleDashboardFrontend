import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();

    useEffect(() =>{
        // if(!sessionStorage.getItem('membersLoaded')){
        //     sessionStorage.setItem('membersLoaded', true);
        // }
        setMembers(mockMembers);
    },[])

    const addMember = (newMember) =>{
        setMembers([...members, {...newMember, id: members.length +1, permissions: {}}]);

        const newLog = {
            action:  'Add Member',
            member: newMember,
            timestamp: new Date().toISOString(),
            changes: null
        }
        dispatch(addLog(newLog));
    }

    const updateMember = (updatedMember) =>{
        setMembers(members.map(member =>
            member.id === updatedMember.id ? updatedMember : member
        ))
        
        console.log(updatedMember);
        const newLog = {
            action:  'Update Member',
            member: updatedMember,
            timestamp: new Date().toISOString(),
            changes: {
                name: updatedMember.name,
                email: updatedMember.email,
                role: updatedMember.role,
                permissions: updatedMember.permissions
            }
        }
        dispatch(addLog(newLog));

        setEdittingMember(null);
    }

    const handleEditMember = (member) =>{
        setEdittingMember(member);
    }


  return (
    <div className='max-w-7xl lg:pl-20 mx-auto relative overflow-hidden max-md:max-w-sm ' >
        <div className={`${isAddMemberComponentOpen? 'opacity-50': ""}  `}  >
            {/* <div> */}
                <h1 className='text-2xl font-bold mb-6' >Member Management</h1>

                <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 "
                    onClick={() => setAddMemberComponentOpen(true)}
                >
                    Add New Member
                </button>
            {/* </div> */}
            <MemberTable members={members} onEdit={handleEditMember} />
        </div>

        {isAddMemberComponentOpen && <AddNewMember onClose={() => setAddMemberComponentOpen(false)}  onSave={addMember} />}

        {edittingMember && <EditMember member={edittingMember} onClose={() => setEdittingMember(null)} onSave={updateMember} />}
    </div>
  )
}

export default MemberManagement