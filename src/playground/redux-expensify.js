import { createStore, combineReducers } from 'redux';
import { v4 as uuidv4 } from "uuid";

/**
 * Actions Generators:
 * ADD_EXPENSE
 * REMOVE_EXPENSE
 * EDIT_EXPENSE
 * SET_TEXT_FILTER
 * SORT_BY_DATE
 * SORT_BY_AMOUNT
 * SET_START_DATE
 * SET_END_DATE
 */

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt,
  },
});

const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT' });

const sortByDate = () => ({ type: 'SORT_BY_DATE' });

const setStartDate = (startDate = null) => ({
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate = null) => ({
    type: 'SET_END_DATE',
    endDate
});

// Reducers
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map( exp => {
                if (exp.id === action.id) {
                    return {
                        ...exp,
                        ...action.updates
                    };
                } else {
                    return exp;
                }
            });
        default:
            return state;
    }
};

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: null,
  endDate: null,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

// Filter expenses
const getFilteredExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter( (expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort( (a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

// Store
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
    const state = store.getState();
    const filteredExpenses = getFilteredExpenses(state.expenses, state.filters);
    console.log(filteredExpenses);
});

const expenseOne = store.dispatch(
    addExpense({
        description: 'Rent',
        amount: 1.00,
        createdAt: 1000
    })
);

const expenseTwo = store.dispatch(
  addExpense({
    description: "Coffee",
    amount: 2.50,
    createdAt: 500
  })
);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 5.00 }));
// store.dispatch(setTextFilter('cof'));
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
    expenses: [
        {
            id: 'asdoihjek',
            description: 'January Rent',
            note: 'Final payment',
            amount: 54500,
            createdAt: 0
        }
    ],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: null,
        endDate: null
    }
}