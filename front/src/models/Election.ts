import Candidate from "./Candidate";

export default interface Election {
    id: number;
    name: string;
    candidates: Candidate[];
    maxVotes: number;
    isCreator: boolean;
    isOpenToVote: boolean;
    isOpenForApplication: boolean;
    canApply: boolean;
    userCanVote: boolean;
    numberOfVotes: number;
}