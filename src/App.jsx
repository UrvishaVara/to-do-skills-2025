
import { useEffect, useState } from 'react'
import { Button, Modal, NativeSelect, TextInput } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [skills, setSkills] = useState('');
  const [addData, setAddData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false)
  const [deleteId, setDeleteId] = useState(null);
  const [selectValue, setSelectValue] = useState('Select Category');

  useEffect(() => {
    setCategoryData(addData)
  }, [addData]);

  const handleAddNewData = () => {
    if (skills.trim() === '') {
      alert("Please Enter Skills")
      return;
    }

    if (selectValue === 'Select Category') {
      alert("Please select a category");
      return;
    }
    const objData = { id: uuidv4(), skills, category: selectValue };

    setAddData([...addData, objData]);
    setIsAdding(false);
    setIsDelete(false);
    setSelectValue('Select Category');
    setSkills('');
  }

  const handleInputChange = (event) => {
    const inpValue = event.target.value;
    setSkills(inpValue);
  }

  const handleModalClose = () => {
    setIsAdding(false);
    setIsEditing(false);
    setSkills('');
    setIsDelete(false);
    setSelectValue('Select Category');
  }

  const handleEditData = (id) => {
    const data = addData.find((ele) => ele.id === id);
    setEditId(id);
    setSkills(data?.skills);
    setIsEditing(true);
    setSelectValue(data?.category);
  }

  const updateData = () => {
    if (skills.trim() === '') {
      alert("Please Enter Skills")
      return;
    }

    const updatedData = addData.map((ele) => {
      if (ele.id === editId) {
        return { id: ele.id, skills, category: selectValue }
      }
      return ele;
    });
    setAddData(updatedData);
    setSkills('');
    setIsEditing(false);
    setSelectValue('select Category');

  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setIsDelete(true);
  };

  const handleDeleteData = () => {
    const filteredData = addData.filter((ele) =>
      ele.id !== deleteId
    );
    setAddData(filteredData);
    setIsDelete(false);
  };

  const filterDataByCategory = (event) => {
    const categoryName = event.target.name;
    if (categoryName === "All") {
      setCategoryData(addData);
    } else {
      const filteredData = addData.filter((ele) => ele.category === categoryName);
      setCategoryData(filteredData);
    }
  }


  return (
    <>
      <div className="max-w-md mx-auto p-5 bg-gradient-to-r from-gray-300 to-white-600 rounded-lg shadow-lg ">
        <div className='flex justify-between justify-items-center'>
          <h1 className='text-2xl font-bold mb-3'>Skills</h1>
          <Modal opened={isAdding} onClose={() => { setIsAdding(false) }} title="Add Skills">
            <TextInput onChange={handleInputChange} value={skills} withAsterisk placeholder="Add Here" className='mb-2' />
            <NativeSelect
              value={selectValue}
              onChange={(ele) => { setSelectValue(ele.target.value) }}
              data={['Select Category', 'Frontend', 'Backend']}
            />
            <div className='grid grid-cols-2 gap-5 my-2'>
              <Button onClick={handleAddNewData} variant="filled" color="rgba(44, 99, 69, 1)">Add</Button>
              <Button onClick={handleModalClose} variant="filled" color="pink">Cancel</Button>
            </div>
          </Modal>
          <Button onClick={() => { setIsAdding(true) }} variant="default"> + </Button>
        </div>
        <div className="flex gap-3 mb-3 justify-center items-center">
          <button name='All' onClick={filterDataByCategory} className='bg-green-900 hover:bg-yellow-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-yellow-300 ... text-white rounded-xl px-3 py-1'>All</button>
          <button name='Frontend' onClick={filterDataByCategory} className='bg-green-900 hover:bg-yellow-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-yellow-300 ... text-white rounded-xl px-2 py-1'>Frontend</button>
          <button name='Backend' onClick={filterDataByCategory} className='bg-green-900 hover:bg-yellow-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-yellow-300 ... text-white rounded-xl px-2 py-1'>Backend</button>
        </div>
        <Modal opened={isDelete} onClose={() => { setIsDelete(false) }} title="Are you sure want to delete?">
          <div className="flex gap-4 justify-end">
            <Button onClick={handleDeleteData} color="rgba(44,99,69,1)" variant="default"> Yes </Button>
            <Button onClick={() => { setIsDelete(false) }} variant="filled" color="pink"> No </Button>
          </div>
        </Modal>
        <Modal opened={isEditing} onClose={handleModalClose} title="Edit Your Skill">
          <TextInput onChange={handleInputChange} value={skills} name='value' type='string' />
          <NativeSelect
            className='my-3'
            value={selectValue}
            onChange={(ele) => { setSelectValue(ele.target.value) }}
            data={['Select Category', 'Frontend', 'Backend']}
          />
          <div className="flex gap-4 justify-end">
            <Button onClick={updateData} color="rgba(44,99,69,1)" variant="default"> Update </Button>
            <Button onClick={handleModalClose} variant="filled" color="pink"> Cancel </Button>
          </div>
        </Modal>
        {
          categoryData.length === 0 ? <div className='text-center text-xl text-green-700 font-semibold'>No Data available</div> : (categoryData.map((ele) => {
            return (
              <div className='bg-gradient-to-r from-green-600 to-white-600 border border-black rounded-lg shadow-lg p-3 mb-3 text-white' key={ele?.id}>
                <div className='flex justify-between items-center'>
                  {ele?.skills}
                  <div className='flex gap-3'>
                    <Button onClick={() => { handleEditData(ele.id) }} variant="default" className='bg-green-700 border p-2 rounded-lg text-white'> Edit </Button>
                    <Button variant="default" className='bg-red-500 border p-2 rounded-lg text-white' onClick={() => { handleDeleteClick(ele?.id) }}> Delete
                    </Button>
                  </div>
                </div>
              </div>
            )
          }))

        }
      </div >
    </>
  )
}

export default App
