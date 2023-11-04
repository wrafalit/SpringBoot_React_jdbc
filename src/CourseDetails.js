import React, { useState, useEffect } from 'react';
import { Table, Empty } from 'antd';
import { getStudentCourses } from './client';
import { errorNotification } from './Notification';

const CourseDetails = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      getStudentCourses(studentId)
        .then((courses) => {
          setCourses(courses);
        })
        .catch((error) => {
          errorNotification('Error', 'Failed to fetch student courses');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [studentId]);

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Description',
      dataIndex: 'courseDescription',
      key: 'courseDescription',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Teacher Name',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    // Add more columns for other course details
  ];

  return (
    <div className="courseDetails">
    {courses.length > 0 ? (
      <Table
        columns={columns}
        dataSource={courses}
        loading={loading}
        rowKey="courseName"
        pagination={false}
      />
    ) : (
      <Empty description={<h3>No Courses Found</h3>} />
    )}
  </div>
  );
};

export default CourseDetails;
