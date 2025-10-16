import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConsentToggle from './ConsentToggle';

describe('ConsentToggle', () => {
  const defaultProps = {
    purposeId: 'test-purpose',
    label: 'Test Label',
    onGrant: vi.fn(),
    onWithdraw: vi.fn()
  };

  it('renders with correct label', () => {
    render(<ConsentToggle {...defaultProps} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows withdrawn state initially', () => {
    render(<ConsentToggle {...defaultProps} />);
    expect(screen.getByText('Withdrawn')).toBeInTheDocument();
  });

  it('shows granted state when initialValue is true', () => {
    render(<ConsentToggle {...defaultProps} initialValue={true} />);
    expect(screen.getByText('Granted')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const description = 'Test description';
    render(<ConsentToggle {...defaultProps} description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('calls onGrant with correct payload when toggled to granted', () => {
    const onGrant = vi.fn();
    render(<ConsentToggle {...defaultProps} onGrant={onGrant} />);
    
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    
    expect(onGrant).toHaveBeenCalledWith({
      purposeId: 'test-purpose',
      value: true
    });
  });

  it('calls onWithdraw with correct payload when toggled to withdrawn', () => {
    const onWithdraw = vi.fn();
    render(<ConsentToggle {...defaultProps} initialValue={true} onWithdraw={onWithdraw} />);
    
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    
    expect(onWithdraw).toHaveBeenCalledWith({
      purposeId: 'test-purpose',
      value: false
    });
  });

  it('supports keyboard navigation', () => {
    const onGrant = vi.fn();
    render(<ConsentToggle {...defaultProps} onGrant={onGrant} />);
    
    const toggle = screen.getByRole('button');
    fireEvent.keyDown(toggle, { key: ' ' });
    
    expect(onGrant).toHaveBeenCalledWith({
      purposeId: 'test-purpose',
      value: true
    });
  });

  it('is disabled when disabled prop is true', () => {
    render(<ConsentToggle {...defaultProps} disabled={true} />);
    
    const toggle = screen.getByRole('button');
    expect(toggle).toBeDisabled();
  });

  it('has proper ARIA attributes', () => {
    render(<ConsentToggle {...defaultProps} />);
    
    const toggle = screen.getByRole('button');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(toggle).toHaveAttribute('aria-label');
  });
});