import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnquiryForm from '@/components/sections/EnquiryForm';

describe('EnquiryForm Component', () => {
  it('renders form fields correctly', () => {
    render(<EnquiryForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<EnquiryForm />);

    const submitButton = screen.getByRole('button', { name: /send enquiry/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<EnquiryForm />);
    const user = userEvent.setup();

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /send enquiry/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
    });
  });

  it('validates phone number format', async () => {
    render(<EnquiryForm />);
    const user = userEvent.setup();

    const phoneInput = screen.getByLabelText(/phone number/i);
    await user.type(phoneInput, '123');

    const submitButton = screen.getByRole('button', { name: /send enquiry/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid 10-digit phone number/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Success' }),
      })
    ) as jest.Mock;

    render(<EnquiryForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '9876543210');
    await user.selectOptions(screen.getByLabelText(/project interest/i), 'project1');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    const submitButton = screen.getByRole('button', { name: /send enquiry/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/enquiry',
        expect.any(Object)
      );
    });
  });
});
