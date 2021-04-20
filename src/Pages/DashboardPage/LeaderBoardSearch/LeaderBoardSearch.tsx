import { SearchIcon } from "icons/SearchIcon";
import * as React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { ILeaderBoardSearchProps } from "./interfaces";
import "./LeaderBoardSearch.scss";
import { ClickAwayListener, Popper } from "@material-ui/core";
import { LeaderBoardData } from "../LeaderBoardJsonData";
import { SelectArrow } from "icons";
import { useHistory } from "react-router";
import { BestFarmerTitle, Caption, FarmerTypography, LeaderBox, LeaderContent, PopperPaper, SearchBox, SearchInput, SearchPopper, SearchSpinnerBox, SelectArrowBox, SelectContent, SuggestionLabel, Image } from "./Components";





export const LeaderSearchView: React.FC<{ heading: string; suggestions: ILeaderBoardSearchProps["suggestions"] }> = (props) => {
    const { heading, suggestions } = props;
    const history = useHistory();

    const handleLeaderClick = (id: string) => () => {
        history.push(`/dashboard/farmer/${id}`);
    };

    return (
        <>
            <SuggestionLabel>{heading}</SuggestionLabel>


            {suggestions.map((leader, index) => {
                return (
                    <>
                        <LeaderBox key={index} onClick={handleLeaderClick(leader.GUID)}>
                            <Image src={leader.picture} alt="icon" />
                            <LeaderContent>
                                <FarmerTypography>{leader.name}</FarmerTypography>
                                <Caption>Total profit {leader.profit}</Caption>
                            </LeaderContent>
                            <SelectArrowBox className="d-flex align-items-center flex-fill justify-content-end"
                            >
                                <SelectContent>Select</SelectContent>
                                <SelectArrow />
                            </SelectArrowBox>
                        </LeaderBox>
                    </>
                )
            })

            }
        </>
    )
}


export const LeaderBoardSearch: React.FC<ILeaderBoardSearchProps> = (props) => {
    const { suggestions, lastSearch } = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
    const [searchValue, setSearchValue] = React.useState("");


    const open = Boolean(anchorEl);



    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!anchorEl) {
            setAnchorEl(anchorEl ? null : event.currentTarget);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const handleOnFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
         if(searchValue !== "" && !anchorEl){
            setAnchorEl(anchorEl ? null : event.currentTarget);
         }
    }




    return (
        <>


            <Row className="mt-5">
                <Col className="d-flex justify-content-between">
                    <BestFarmerTitle>Become the best farmer</BestFarmerTitle>
                    <ClickAwayListener mouseEvent="onMouseDown" onClickAway={() => setAnchorEl(null)}>
                        <div>
                            <SearchBox isOpened={open} onChange={handleChange}>
                                <SearchIcon />
                                <SearchInput
                                    type="text"
                                    value={searchValue}
                                    placeholder="Search top farmer"
                                    onFocus={handleOnFocus}
                                    onChange={handleInputChange} />
                                <SearchPopper open={open} popperOptions={{
                                    adaptive: false,

                                }} disablePortal placement="bottom"
                                    transition>
                                    <PopperPaper >
                                        {suggestions.length > 0 &&

                                            <>
                                                <LeaderSearchView heading="Our Suggestions" suggestions={suggestions} />
                                            </>
                                        }

                                        {lastSearch.length > 0 &&
                                            <>
                                                <LeaderSearchView heading="last search" suggestions={lastSearch} />
                                            </>

                                        }

                                        {(suggestions.length === 0 && lastSearch.length === 0) &&
                                            <>
                                                <SearchSpinnerBox>
                                                    <Spinner animation="border" />
                                                </SearchSpinnerBox>
                                            </>
                                        }

                                    </PopperPaper>
                                </SearchPopper>
                            </SearchBox>
                        </div>
                    </ClickAwayListener>
                </Col>
            </Row>







        </>
    )
}