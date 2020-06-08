import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

const ExpenseListFilters = (props) => (
    <div>
        <input 
            type="text" 
            value={props.filters.text} 
            onChange={(e) => {
                props.dispatch(setTextFilter(e.target.value))
            }} 
        />
        <select 
            value={props.filters.sortBy}
            onChange={(e) => {
                const filter = e.target.value;
                if (filter === 'date') {
                    props.dispatch(sortByDate());
                } else if (filter === 'amount') {
                    props.dispatch(sortByAmount());
                }
            }}
        >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
        </select>
    </div>
);

const mapStateToProps = (state) => (
    {
        filters: state.filters
    }
);

export default connect(mapStateToProps)(ExpenseListFilters);
