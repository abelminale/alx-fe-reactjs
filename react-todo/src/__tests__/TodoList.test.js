
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../components/TodoList';

test('renders the TodoList component correctly', () => {
  render(<TodoList />);
  expect(screen.getByText('Todo List')).toBeInTheDocument();
  expect(screen.getByText('Learn React')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo List')).toBeInTheDocument();
});

test('can add a new todo', () => {
  render(<TodoList />);
  const input = screen.getByRole('textbox');
  const addButton = screen.getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

test('can toggle a todo between completed and not completed', () => {
  render(<TodoList />);
  const todoItem = screen.getByText('Learn React');

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: line-through');

  fireEvent.click(todoItem);
  expect(todoItem).toHaveStyle('text-decoration: none');
});

test('can delete a todo', () => {
  render(<TodoList />);
  const todoItem = screen.getByText('Learn React');
  const deleteButton = todoItem.nextElementSibling;

  fireEvent.click(deleteButton);
  expect(todoItem).not.toBeInTheDocument();
});
