import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const StyledSpinner = styled(Spinner)({
    width: 24,
    height: 24,
});


export const DonKeySpinner: React.FC<{ animation?: "border" | "grow"; color?: string; }> = (props) => {

    const { animation = "border", color= "#fff"} = props;

    return (
        <>
            <StyledSpinner animation={animation} color={color} />
        </>
    )

}

