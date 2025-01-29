import { useRef, useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import SelectableTextBlock from "./SelectableTextBlock";
import { Grid } from "@mui/material";
import { NormalCard } from "../components/Cards";
import { findSubArray } from "../components/utils";
import { Height } from "@mui/icons-material";
import { candidateColorList } from "./ckp";


function ReviewerViewer(props) {
    const {
        theme,
        payload,
        hoverWeakness,
        weaknessText,
        setWeaknessText,
    } = props;

    const hoverWeaknessIsValid = hoverWeakness != -1 && hoverWeakness < payload.response["Weakness associated with claims"].length;

    const parentRef = useRef(null);

    // Extract title and abstract using regex
    // The text looks like Title: xxx Abstract: xxx
    let review_regex = /Review: (.*)/s;
    let review = payload.meta.review.replace(/\s+/g, ' ');
    review = review.match(review_regex)[1];
    if (hoverWeaknessIsValid) {
        console.log(weaknessText);
    }
    const reviewTokens = review.split(' ');

    const selection = hoverWeaknessIsValid
        ? weaknessText.replace(/\s+/g, ' ')
        : null;
    const selectionTokens = selection !== null
        ? selection.split(' ')
        : null;
    const selectionIndices = selectionTokens
        ? findSubArray(reviewTokens, selectionTokens)
        : null;
    const selectedTokenSpan = selectionIndices
        ? [selectionIndices[0], selectionIndices[1] - 1]  // selectedTokenSpan end index is inclusive
        : null;

    return <NormalCard sx={{
        margin: "30px",
        height: "300px",
    }}>
        <Box sx={{
            height: "100%",
            overflow: "auto",
        }}
            ref={parentRef}
        >
            <SelectableTextBlock
                prefix="Review: "
                tokens={reviewTokens}
                disabled={!hoverWeaknessIsValid}
                selectedTokenSpan={selectedTokenSpan}
                onSelect={(span, tokens, text) => {if (hoverWeaknessIsValid) {
                    setWeaknessText(text);
                }}}
                parentRef={parentRef}
                bColor={
                    hoverWeaknessIsValid
                    ? candidateColorList[hoverWeakness % candidateColorList.length]
                    : theme.palette["card-bg-emph"].main
                }
                />
        </Box>
    </NormalCard>
}

export default ReviewerViewer;