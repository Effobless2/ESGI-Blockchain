import Candidate from "./Candidate";

export default interface Election {
    id: number;
    name: string;
    candidates: Candidate[];
    maxVotes: number;
    isCreator: boolean;
    canBeVoted: boolean;
}