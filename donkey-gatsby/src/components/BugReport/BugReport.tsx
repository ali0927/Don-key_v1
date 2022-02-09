
import { BugCardList } from "components/BugList";
import { BugReportButton, BugReportForm } from "components/BugReportForm";
import { KnownBug } from "components/KnownBug/KnownBug";
import { StaticImage } from "gatsby-plugin-image";
import { useBugReportApi } from "hooks";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { theme } from "theme";

const Comp = (props: { className?: string }) => {
  return (
    <StaticImage
      className={props.className}
      src="../../images/bug-report/fix-donkey.png"
      alt="Bug Reporter Donkey"
      layout="fullWidth"
    />
  );
};

const DonkeyScope = styled(Comp)`
  width: 200px;
  margin: 40px auto;
  ${theme.mediaQueries.sm.up} {
    width: 350px;
    margin: 0 auto;
  }
`;

const Heading = styled.p`
  font-family: "Work Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 24px;
  font-weight: 800;
  font-style: normal;
  color: #222222;
  ${theme.mediaQueries.lg.up} {
    font-size: 42px;
  }
`;

export const BugReport = () => {
  const { fetchList } = useBugReportApi();
  const [isReady, setIsReady] = useState(false);
  const [bugs, setBugs] = useState([]);
  const [knownBug, setKnownBug] = useState<null | {
    title: string;
    content: string;
  }>(null);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    const bugslist = await fetchList();
    setIsReady(true);
    setBugs(bugslist);
    const known = (bugslist.Extras || []).filter(
      (item: any) => item["__component"] === "component.info"
    );
    setKnownBug(known[0] || null);
  };
  const [showCount, setCount] = useState(3);
  const totalCount = bugs.length;

  const filtered = useMemo(() => {
    return bugs.slice(0, showCount);
  }, [bugs, showCount]);

  return (
    <div className="container">
      <div className="row mb-5 pt-5">
        <div className="col-lg-8">
          {knownBug && (
            <KnownBug title={knownBug.title} content={knownBug.content} />
          )}
          <BugReportForm />
        </div>
        <div className="col-lg-4 d-flex flex-column pt-md-5">
          <DonkeyScope />
        </div>
      </div>

      {isReady && filtered.length > 0 && (
        <>
          <div className="row py-5 mb-2">
            <div className="col-12 mb-5">
              <Heading className="text-center">Other bugs in work</Heading>
            </div>
            <BugCardList bugs={filtered} />
          </div>
          {showCount < totalCount && (
            <div className="row justify-content-center mb-5">
              <div className="col-3">
                <BugReportButton onClick={() => setCount((val) => val + 3)}>
                  Show More
                </BugReportButton>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}