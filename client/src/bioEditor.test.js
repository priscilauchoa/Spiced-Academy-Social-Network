import BioEditor from "./bioEditor";
import { render, screen, fireEvent } from "@testing-library/react";

test("When no bio is passed an add button is rendered", () => {
    const { container } = render(<BioEditor bio={null} />);
    const button = container.querySelector("button");

    expect(button).toBeDefined();
    expect(button.innerHTML).toBe("Add");
});

test("When a bio is passed to it, an Edit button is rendered", () => {
    const { container } = render(<BioEditor bio="I love Pets" />);
    const button = container.querySelector("button");

    expect(button).toBeDefined();
    expect(button.innerHTML).toBe("Edit 🖋");
});

test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered.", () => {
    const { container } = render(<BioEditor />);

    fireEvent.click(screen.getByText("Add"));
    const textarea = container.querySelector("textarea");
    const button = container.querySelector("button");
    expect(textarea).toBeDefined();
    expect(button).toBeDefined();
    expect(button.innerHTML).toBe("Save");
});

test("Clicking the Save button causes an HTTP request. The request should not actually happen during your test, and it won't because Jest has been configured to automatically use a mock of fetch in your tests.s", () => {
    fetch.mockResolvedValueOnce({
        async json() {
            return {
                rows: [{}],
            };
        },
    });
    render(<BioEditor bio="I love cat" setBio={() => {}} />);

    fireEvent.click(screen.getByText("Edit 🖋"));
    fireEvent.click(screen.getByText("Save"));
    expect(fetch).toHaveBeenCalled();
});

test("When the mock request is successful, the function that was passed as a prop to the component gets called.", () => {
    fetch.mockResolvedValueOnce({
        async json() {
            return {
                rows: [{}],
            };
        },
    });
    const setBioMock = jest.fn();
    render(<BioEditor bio="I love cat" setBio={setBioMock} />);

    fireEvent.click(screen.getByText("Edit 🖋"));
    fireEvent.click(screen.getByText("Save"));
    expect(setBioMock).toHaveBeenCalledWith("I love cat");
});
//
