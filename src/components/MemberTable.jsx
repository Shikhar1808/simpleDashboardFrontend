import {useEffect, useState} from 'react';
import {Table,  Button} from 'flowbite-react'
import Pagination from './Pagination';

const MemberTable = ({ members, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerpage] = useState(15);

  useEffect(()=>{
    const updateMembersPerPage = () => {
      if(window.innerWidth < 900){
        setMembersPerpage(12);
      }else{
        setMembersPerpage(15);
      }
    }

    updateMembersPerPage();

    window.addEventListener('resize', updateMembersPerPage);
  })

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatPermissions = (permissions) => {
    return Object.entries(permissions)
      .filter(([_, value]) => value) // Only include permissions set to true
      .map(([key]) => key)
      .join(', '); // Convert to a comma-separated string
  };
  

  return (
    <div className="overflow-x-auto h-full">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Permissions</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        {false && (
          <div className="absolute left-0 top-0 -z-10">
          </div>  
        )}

          {currentMembers.map((member) => (
            <Table.Row key={member.id} className="bg-white hover:bg-gray-50 ">
              <Table.Cell className="font-medium text-gray-900">
                {member.name}
              </Table.Cell>
              <Table.Cell>{member.email}</Table.Cell>
              <Table.Cell>{member.role}</Table.Cell>
              <Table.Cell>{formatPermissions(member.permissions)}</Table.Cell>
              <Table.Cell className='flex pr-2' >
                <Button size="md" color='red' onClick={() => onEdit(member)} className="mr-2"
                >
                  Edit
                </Button>
                <Button size="md" color="red" onClick={() => onDelete(member.id)} >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(members.length / membersPerPage)}
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default MemberTable;
