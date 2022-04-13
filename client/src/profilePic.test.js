import ProfilePic from "./profilePic";
import { render } from "@testing-library/react";

test("test 2 - no url, img default?", () => {
    const { container } = render(<ProfilePic />);

    expect(
        container
            .querySelector("img")
            .src.endsWith(
                "https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"
            )
    ).toBe(true);
});

test("test 2 - no url, img  src does not have default?", () => {
    const { container } = render(<ProfilePic img="someURL" />);

    expect(
        container
            .querySelector("img")
            .src.endsWith(
                "https://icons.iconarchive.com/icons/alecive/flatwoken/512/Apps-User-icon.png"
            )
    ).toBe(false);
});

test("first and last passed as props get set as alt attribute value", () => {
    const { container } = render(<ProfilePic first="Priscila" />);

    expect(container.querySelector("img").alt).toBe("Priscila");
});
