import {useState} from 'react';
import {Table,  Button} from 'flowbite-react'
import Pagination from './Pagination';

const MemberTable = ({ members, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

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
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Permissions</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentMembers.map((member) => (
            <Table.Row key={member.id} className="bg-white hover:bg-gray-50">
              <Table.Cell className="font-medium text-gray-900">
                {member.name}
              </Table.Cell>
              <Table.Cell>{member.email}</Table.Cell>
              <Table.Cell>{member.role}</Table.Cell>
              <Table.Cell>{formatPermissions(member.permissions)}</Table.Cell>
              <Table.Cell>
                <Button size="xs" color='red' onClick={() => onEdit(member)} className="mr-2"
                >
                  Edit
                </Button>
                <Button size="xs" color="red">
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
