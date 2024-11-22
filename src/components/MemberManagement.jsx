import {useState, useEffect} from 'react'
import AddNewMember from './AddNewMember';
import MemberTable from './MemberTable';

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

    useEffect(() =>{
        setMembers(mockMembers);
    },[])

    const addMember = (newMember) =>{
        setMembers([...members, {...newMember, id: members.length +1, permissions: {}}]);
    }

    const updateMember = () =>{
        setMembers(members.map(member =>
            member.id === edittingMember.id ? edittingMember : member
        ))
        setEdittingMember(null);
    }

    const handleRoleChange = (selectedMemberId, newRole) =>{
        setMembers(members.map(member =>
            member.id === selectedMemberId ? {...member, role: newRole}: member
        ))
    }

    const handlePremissionChange = (selectedMemberId, permission) =>{
        setMembers(members.map(member =>
            member.id === selectedMemberId? {...member, permissions: {
            ...member.permission,
            [permission]: !member.permissions[permission]
            } 
        }: member
        ))
    }


  return (
    <div className='max-w-4xl mx-auto p-6 relative' >
        <div className={`${isAddMemberComponentOpen? 'opacity-50': ""}  `}  >
            {/* <div> */}
                <h1 className='text-2xl font-bold mb-6' >Member Management</h1>

                <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => setAddMemberComponentOpen(true)}
                >
                    Add New Member
                </button>
            {/* </div> */}
            <MemberTable members={members} />
        </div>

        {isAddMemberComponentOpen && <AddNewMember onClose={() => setAddMemberComponentOpen(false)}  onSave={addMember} />}
    </div>
  )
}

export default MemberManagement