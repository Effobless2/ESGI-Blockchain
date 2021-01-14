pragma experimental ABIEncoderV2;

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


    function addElection(string memory electionName, string[] memory candidates) public returns (uint electionId) {
        uint election_id = elections.length++;
        elections[election_id].name = electionName;
        for(uint i = 0; i < candidates.length; i++){
            addCandidatToElection(election_id, candidates[i]);
        }
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

    function getAllElections() public view returns (Election[] memory allElections) {
        return elections;
    }

    function hasAlreadyVoted(uint _index) public view returns (bool) {
        require(_index < elections.length);
//        return elections[_index].alreadyVoted[msg.sender];
        return false;
    }

}