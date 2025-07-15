import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WorkoutForm from "../WorkoutForm";

describe("WorkoutForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with all required fields", () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/distance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cadence/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ok/i })).toBeInTheDocument();
  });

  it("defaults to running workout type", () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const typeSelect = screen.getByLabelText(/type/i) as HTMLSelectElement;
    expect(typeSelect.value).toBe("running");
    expect(screen.getByLabelText(/cadence/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/elev gain/i)).not.toBeInTheDocument();
  });

  it("switches to cycling fields when cycling is selected", async () => {
    const user = userEvent.setup();
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const typeSelect = screen.getByLabelText(/type/i);
    await user.selectOptions(typeSelect, "cycling");

    expect(screen.queryByLabelText(/cadence/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/elev gain/i)).toBeInTheDocument();
  });

  it("focuses on distance input when mounted", () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const distanceInput = screen.getByLabelText(/distance/i);
    expect(distanceInput).toHaveFocus();
  });

  it("submits form with valid running data", async () => {
    const user = userEvent.setup();
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/distance/i), "5");
    await user.type(screen.getByLabelText(/duration/i), "30");
    await user.type(screen.getByLabelText(/cadence/i), "180");

    fireEvent.submit(
      screen.getByRole("button", { name: /ok/i }).closest("form")!
    );

    expect(mockOnSubmit).toHaveBeenCalledWith("running", 5, 30, 180);
  });

  it("submits form with valid cycling data", async () => {
    const user = userEvent.setup();
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.selectOptions(screen.getByLabelText(/type/i), "cycling");
    await user.type(screen.getByLabelText(/distance/i), "20");
    await user.type(screen.getByLabelText(/duration/i), "60");
    await user.type(screen.getByLabelText(/elev gain/i), "200");

    fireEvent.submit(
      screen.getByRole("button", { name: /ok/i }).closest("form")!
    );

    expect(mockOnSubmit).toHaveBeenCalledWith("cycling", 20, 60, 200);
  });

  it("shows alert for invalid running data", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    await user.type(screen.getByLabelText(/distance/i), "-5");
    await user.type(screen.getByLabelText(/duration/i), "30");
    await user.type(screen.getByLabelText(/cadence/i), "180");

    fireEvent.submit(
      screen.getByRole("button", { name: /ok/i }).closest("form")!
    );

    expect(alertSpy).toHaveBeenCalledWith(
      "Inputs have to be positive numbers!"
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it("shows alert for empty fields", async () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.submit(
      screen.getByRole("button", { name: /ok/i }).closest("form")!
    );

    expect(alertSpy).toHaveBeenCalledWith(
      "Inputs have to be positive numbers!"
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it("resets form after successful submission", async () => {
    const user = userEvent.setup();
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    const distanceInput = screen.getByLabelText(
      /distance/i
    ) as HTMLInputElement;
    const durationInput = screen.getByLabelText(
      /duration/i
    ) as HTMLInputElement;
    const cadenceInput = screen.getByLabelText(/cadence/i) as HTMLInputElement;

    await user.type(distanceInput, "5");
    await user.type(durationInput, "30");
    await user.type(cadenceInput, "180");

    fireEvent.submit(
      screen.getByRole("button", { name: /ok/i }).closest("form")!
    );

    await waitFor(() => {
      expect(distanceInput.value).toBe("");
      expect(durationInput.value).toBe("");
      expect(cadenceInput.value).toBe("");
    });
  });
});
