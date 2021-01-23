pragma experimental ABIEncoderV2;

contract SmartElection {

    struct Candidat {
        string name;
        uint votes;
    }

    struct Election {
        string name;
        Candidat[] candidats;
        address[] alreadyVoted;
        address payable creator;
        uint maxVotes;
    }

    Election[] elections;
    mapping (address => uint) balances;

    uint voteFee = 0.001 ether;

	constructor() public {
		balances[tx.origin] = 10000;
	}

    event ElectionAdded(uint electionId, string name);
    event CandidateAdded(uint electionId, uint candidateId, string candidateName);
    event Voted(uint electionId, address voter);

    function receive() external payable {}
    
    function addElection(string memory electionName, string[] memory candidates, uint maxVotes) public payable returns (uint electionId) {
        uint election_id = elections.length++;
        elections[election_id].name = electionName;
        elections[election_id].maxVotes = maxVotes;
        elections[election_id].creator = msg.sender;
        for(uint i = 0; i < candidates.length; i++){
            addCandidatToElection(election_id, candidates[i]);
        }
        emit ElectionAdded(election_id, electionName);
        return election_id;
    }

    function addCandidatToElection(uint electionIndex, string memory candidateName) private returns (bool success) {
        require(electionIndex <= elections.length);
        elections[electionIndex].candidats.push(Candidat(candidateName, 0));
        emit CandidateAdded(electionIndex, elections[electionIndex].candidats.length - 1, candidateName);
        return true;
    }

    function vote(uint electionIndex, uint[] memory votes) payable public returns (bool success) {
        require(elections.length > electionIndex);
        require(elections[electionIndex].creator != msg.sender);
        require(elections[electionIndex].maxVotes > elections[electionIndex].alreadyVoted.length);
        require(elections[electionIndex].candidats.length == votes.length);
        require(elections[electionIndex].creator.balance > voteFee);
        require(!hasAlreadyVoted(electionIndex));

        
        uint factor = votes.length;
        for (uint i = 0; i < votes.length; i++) {
            require(votes[i] < elections[electionIndex].candidats.length);
            elections[electionIndex].candidats[votes[i]].votes += factor;
            factor--;
        }

        address payable creator = elections[electionIndex].creator;

        bool succeed = creator.send(voteFee);
        if (succeed) {
            emit Voted(electionIndex, msg.sender);
        }

        return succeed;
    }

    function getAllElections() public view returns (Election[] memory allElections) {
        return elections;
    }

    function hasAlreadyVoted(uint _index) public view returns (bool) {
        require(_index < elections.length);
        for (uint i = 0; i < elections[_index].alreadyVoted.length; i++) {
            if (elections[_index].alreadyVoted[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

}