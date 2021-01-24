import Candidate from "./Candidate";

export default interface Election {
    id: number;
    name: string;
    candidates: Candidate[];
    maxVotes: number;
    isCreator: boolean;
    isOpenToVote: boolean;
    resultsAvailable: boolean;
    canApply: boolean;
}