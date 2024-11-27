import React from 'react';
import { useSelector } from 'react-redux';
import { selectLogs } from '../redux/slices/activityLogsSlics';

const ActivityLogs = () => {
  const logs = useSelector(selectLogs);
  

  return (
    <div className='max-w-7xl mx-auto flex justify-center items-center flex-col '>
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
      {logs.length === 0 ? (
        <p>No logs available.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Action</th>
              <th className="border border-gray-300 p-2">Member</th>
              <th className="border border-gray-300 p-2">Timestamp</th>
              <th className="border border-gray-300 p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{log.action}</td>
                <td className="border border-gray-300 p-2">{log.member.name}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {log.changes
                    ? Object.entries(log.changes).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value.old} → {value.new}
                        </div>
                      ))
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityLogs;
