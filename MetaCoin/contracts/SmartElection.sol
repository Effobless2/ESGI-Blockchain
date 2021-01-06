pragma solidity >=0.4.25 <0.7.0;

contract SmartElection {

    struct Candidat {
        string name;
        uint votes;
    }

    struct Election {
        string name;
        Candidat[] candidats;
    }

    Election[] elections;
    mapping (address => uint) balances;

	constructor() public {
		balances[tx.origin] = 10000;
	}

    event ElectionAdded(uint electionId, string name);
    event CandidateAdded(uint electionId, uint candidateId, string candidateName);


    function addElection(string memory electionName) public returns (uint electionId) {
        uint election_id = elections.length++;
        elections[election_id].name = electionName;
        emit ElectionAdded(election_id, electionName);
        return election_id;
    }

    function addCandidatToElection(uint electionIndex, string memory candidateName) public returns (bool success) {
        require(electionIndex <= elections.length);
        elections[electionIndex].candidats.push(Candidat(candidateName, 0));
        emit CandidateAdded(electionIndex, elections[electionIndex].candidats.length - 1, candidateName);
        return true;
    }

    function vote(uint electionIndex, uint candidateIndex) public returns (bool success) {
        if (elections.length <= electionIndex) return false;
        // Check msg.sender not in elections.alreadyVoted
//        if (elections[electionIndex].candidatsCount < candidateIndex) return false;
//        elections[electionIndex].candidats[candidateIndex].votes++;
//        elections[electionIndex].alreadyVoted[msg.sender] = true;
//        balances[msg.sender]--;
        return false;
    }

    function getAllElectionsCount() public view returns (uint electionsCount) {
        return elections.length;
    }

    function getElection(uint _index) public view returns (string memory name, uint candidatsCount) {
        require(_index < elections.length);
        return (elections[_index].name, elections[_index].candidats.length);
    }

    function hasAlreadyVoted(uint _index) public view returns (bool) {
        require(_index < elections.length);
//        return elections[_index].alreadyVoted[msg.sender];
        return false;
    }

    function getCandidateForElection(uint _electionIndex, uint _candidateIndex) public view returns (string memory name, uint votes) {
        require(_electionIndex < elections.length);
        require(_candidateIndex < elections[_electionIndex].candidats.length);
        Candidat memory candidat = elections[_electionIndex].candidats[_candidateIndex]; 
        return (candidat.name, candidat.votes);
    }

}