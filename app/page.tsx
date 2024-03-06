"use client";
import React, { useState, useRef, useEffect } from 'react';
import './app.scss';

export default function Home() {
  const [buget, setBuget] = useState(2000);
  const [allocation, setAllocation] = useState(0);
  const [selectVal, setSelectVal] = useState('Marketing');
  const inputVal = useRef();
  const [bugetList, setBugetList] = useState([]);

  const handleSelect = (e) => {
    setSelectVal(e.target.value);
  }

  const handleAdd = () => {
    const list = [...bugetList];
    const currentVal = parseInt(inputVal.current.value);
    const addval = currentVal + allocation;
    if (currentVal) {
      if (addval > buget) {
        alert("Amout more than buget");
        return;
      }
      let flag = false;
      list.map((item, index) => {
        if (item.id === selectVal) {
          flag = true;
          list[index].allocation = item.allocation + currentVal;

        }
      })
      if (!flag) {
        list.push({
          id: selectVal,
          allocation: currentVal
        });
      }
      setAllocation(addval);
      setBugetList([...list]);
    } else {
      alert("Please enter amount")
    }
  }
  const handleDelete = (item) => {
    const lists = [...bugetList];
    const removed = lists.filter(list => list.id !== item.id);
    setBugetList([...removed]);
  }

  useEffect(() => {
    let allocationVal = 0;
    bugetList.map((list) => {
      allocationVal += list.allocation;
    });
    if (allocationVal > buget) {
      alert("Amout more than buget");
      return;
    } else {
      setAllocation(allocationVal);
    }
  }, [bugetList])

  const handleAmountChange = (mode, item) => {
    const lists = [...bugetList];
    console.log('amoutn chagne ', bugetList.indexOf(item));
    lists.map((list, index) => {
      if (list.id === item.id) {
        const amount = parseInt(list.allocation) + (mode === 0 ? 100 : -100);
        if (amount > 0) {
          list.allocation = amount;
          console.log("map", list, item);
        }
      }
    })
    setBugetList([...lists]);
  }

  return (
    <div className="container">
      <div className='row'>
        <span className='marRight'> Company buget allocation</span>
        <input type="text" value={buget} className='marRight' />
        <div className='flex marRight'>
          allocated: {allocation}
        </div>
        <div className='flex marRight'>
          remaining: {buget - allocation}
        </div>
      </div>
      <div className='row'>
        <div className='bugetRow'>
          <div className='head'>Department</div>
          <div className='head'>Allocation</div>
          <div className='head'>Increment by 10</div>
          <div className='head'>Decrement by 10</div>
          <div className='head'></div>
        </div>
        {bugetList.map(item => {
          return <div className='bugetRow'>
            <div>{item.id}</div>
            <div>{item.allocation}</div>
            <div>
              <button type='button' className='increment' onClick={() => handleAmountChange(0, item)}>+</button>
            </div>
            <div>
              <button type='button' className='decrement' onClick={() => handleAmountChange(1, item)}>-</button>
            </div>
            <div>
              <button type='button' className='delete' onClick={() => handleDelete(item)}>Delete</button>
            </div>
          </div>
        })}
      </div>
      <div className='row'>
        <span className='marRight'>Buget </span>
        <select className='marRight' onChange={(e) => handleSelect(e)}>
          <option selected>Marketing</option>
          <option>Finance</option>
          <option>Sales</option>
          <option>Human Resource</option>
          <option>IT</option>
        </select>
        <input type='text' ref={inputVal} className='marRight' />
        <button type='button' onClick={handleAdd}>Add</button>
      </div>

    </div>
  );
}

