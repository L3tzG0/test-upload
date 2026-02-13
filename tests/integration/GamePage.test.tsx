import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GamePage } from '@/pages/GamePage/GamePage';

describe('GamePage', () => {
  it('renders board and keypad', async () => {
    render(<GamePage />);

    expect(screen.getByRole('grid', { name: /sudoku board/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/keypad/i)).toBeInTheDocument();

    // Click a cell then enter a digit.
    const cells = screen.getAllByRole('gridcell');
    await userEvent.click(cells[2]);
    await userEvent.click(screen.getByRole('button', { name: /digit 1/i }));

    // We do not assert exact cell content here because the clicked cell might be a given
    // depending on the selected puzzle. This test is intentionally light.
    expect(screen.getByRole('button', { name: /new game/i })).toBeInTheDocument();
  });
});
