import React, { useEffect, useState } from 'react';
import Container from './Container';
import Footer from './Footer';
import AddStudentForm from './forms/addStudentForm';
import './App.css';
import { getAllStudents } from './client';
import { Table, Avatar, Spin, Modal, Empty } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { errorNotification } from './Notification';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const columns = [
  {
    title: '',
    key: 'avatar',
    render: (text, student) => (
      <Avatar size='large'>
        {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
      </Avatar>
    ),
  },
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);

  const commonElements = () => (
    <div>
      <Modal
          title="Add new student"
          open={isAddStudentModalVisible}
          onOk={closeAddStudentModal}
          onCancel={closeAddStudentModal}
          width={1000}
        >
          <AddStudentForm 
          onSuccess={() => {
            closeAddStudentModal();
            fetchStudents();
          }}
          onFailure={(error) => {
            const message = error.message;
            const description = error.httpStatus;
            errorNotification('err', 'err');
          }}
          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClickEvent={openAddStudentModal}
        />
    </div>
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setIsFetching(true);
    getAllStudents()
      .then((res) => res.json())
      .then((studentsData) => {
        console.log(studentsData);
        setStudents(studentsData);
        setIsFetching(false);
      })
      .catch((error) => {
        errorNotification(
          'There was an issue',
          'Something went wrong!'
        );
        setIsFetching(false);
      });
  }

  const openAddStudentModal = () => setIsAddStudentModalVisible(true);
  const closeAddStudentModal = () => setIsAddStudentModalVisible(false);

  let studentList;
  if (isFetching) {
    studentList = (
      <Container>
        <Spin indicator={antIcon} />
      </Container>
    );
  } else if (students.length > 0) {
    studentList = (
      <Container>
        <div style={{ marginBottom: '100px' }}>
          <Table
            columns={columns}
            dataSource={students}
            pagination={false}
            rowKey="studentId"
          />
        </div>
        {commonElements()};
      </Container>
    );
  } else {
    studentList = (
      <Container>
    <Empty description={
      <h1>No Students Found</h1>
    }/>
    {commonElements()}
      </Container>
    );
  }

  return (
    <div className="App">
      <h1>Hello World Spring Boot</h1>
      <h2>Student List:</h2>
      {studentList}
    </div>
  );
}

export default App;
