import React, { useReducer } from 'react';
import axios from 'axios';
import BugContext from './bugContext';
import bugReducer from './bugReducer';
import AlertContext from '../alert/alertContext';

const BugState = (props) => {
  const initialState = {
    bugs: [],
    current: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(bugReducer, initialState);

  // --- Actions ---

  const getBugs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bugs');
      dispatch({ type: 'GET_BUGS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'BUG_ERROR', payload: err.response.data.msg });
    }
  };

  const addBug = async (bug) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.post('http://localhost:5000/api/bugs', bug, config);
      dispatch({ type: 'ADD_BUG', payload: res.data });
    } catch (err) {
      dispatch({ type: 'BUG_ERROR', payload: err.response.data.msg });
    }
  };

  const deleteBug = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      dispatch({ type: 'DELETE_BUG', payload: id });
    } catch (err) {
      dispatch({ type: 'BUG_ERROR', payload: err.response?.data?.msg || 'Delete failed' });
    }
  };

  const setCurrent = (bug) => {
    dispatch({ type: 'SET_CURRENT', payload: bug });
  };

  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Update Bug
  const updateBug = async (bug) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const res = await axios.put(`http://localhost:5000/api/bugs/${bug._id}`, bug, config);
      dispatch({ type: 'UPDATE_BUG', payload: res.data });
    } catch (err) {
      dispatch({ type: 'BUG_ERROR', payload: err.response.data.msg });
    }
  };

  return (
    <BugContext.Provider
      value={{
        bugs: state.bugs,
        current: state.current,
        error: state.error,
        loading: state.loading,
        getBugs,
        addBug,
        deleteBug,
        setCurrent,
        clearCurrent,
        // THIS IS THE FIX: 'updateBug' is now included
        updateBug,
      }}
    >
      {props.children}
    </BugContext.Provider>
  );
};

export default BugState;