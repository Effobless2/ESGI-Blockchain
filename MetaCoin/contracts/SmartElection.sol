pragma experimental ABIEncoderV2;

contract SmartElection {

    struct Candidate {
        string name;
        address candidateAddress;
        uint votes;
    }

    struct Election {
        string name;
        Candidate[] candidates;
        address[] alreadyVoted;
        address payable creator;
        uint maxVotes;
        bool isOpenForApplication;
        bool isOpenToVotes;
    }

    struct newCandidate {
        string name;
        address payable candidateAddress;
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
    event ElectionFinished(uint electionIndex);

    function receive() external payable {}
    function fallback() external payable {}
    
    function addElectionFill(string memory electionName, newCandidate[] memory candidates, uint maxVotes) public payable returns (uint electionId) {
        uint election_id = elections.length++;
        elections[election_id].name = electionName;
        elections[election_id].maxVotes = maxVotes;
        elections[election_id].creator = msg.sender;
        elections[election_id].isOpenForApplication = candidates.length == 0;
        elections[election_id].isOpenToVotes = candidates.length != 0;
        for(uint i = 0; i < candidates.length; i++){
            addCandidatToElection(election_id, candidates[i].name, candidates[i].candidateAddress);
        }
        emit ElectionAdded(election_id, electionName);
        return election_id;
    }

    function addOpenElection(string memory electionName, uint maxVotes)  public payable returns (uint electionId){
        newCandidate[] memory list;
        return addElectionFill(electionName, list, maxVotes);
    }

    function addCandidatToElection(uint electionIndex, string memory candidateName) public returns (bool success) {
        return addCandidatToElection(electionIndex, candidateName, msg.sender);
    }

    function addCandidatToElection(uint electionIndex, string memory candidateName, address candidateAddress) private returns (bool success) {
        require(electionIndex <= elections.length);
        bool alreadyApplied = false;
        for(uint i = 0; i < elections[electionIndex].candidates.length; i++) {
            if (elections[electionIndex].candidates[i].candidateAddress == msg.sender) {
                alreadyApplied = true;
            }
        }
        require(!alreadyApplied);
        elections[electionIndex].candidates.push(Candidate(candidateName, candidateAddress, 0));
        emit CandidateAdded(electionIndex, elections[electionIndex].candidates.length - 1, candidateName);
        return true;
    }

    function vote(uint electionIndex, uint[] memory votes) payable public returns (bool success) {
        require(elections.length > electionIndex);
        require(elections[electionIndex].creator != msg.sender);
        require(elections[electionIndex].maxVotes > elections[electionIndex].alreadyVoted.length);
        require(elections[electionIndex].candidates.length == votes.length);
        require(elections[electionIndex].creator.balance > voteFee);
        require(!hasAlreadyVoted(electionIndex));

        
        uint factor = votes.length;
        for (uint i = 0; i < votes.length; i++) {
            require(votes[i] < elections[electionIndex].candidates.length);
            elections[electionIndex].candidates[votes[i]].votes += factor;
            factor--;
        }

        elections[electionIndex].alreadyVoted.push(msg.sender);
        if (elections[electionIndex].alreadyVoted.length == elections[electionIndex].maxVotes) {
            elections[electionIndex].isOpenToVotes = false;
            emit ElectionFinished(electionIndex);
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

    function hasAlreadyVoted(uint _index) private view returns (bool) {
        require(_index < elections.length);
        for (uint i = 0; i < elections[_index].alreadyVoted.length; i++) {
            if (elections[_index].alreadyVoted[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function lockElection(uint electionId) public payable returns (bool success) {
        require(electionId < elections.length);
        require(elections[electionId].creator == msg.sender);
        elections[electionId].isOpenForApplication = false;
        elections[electionId].isOpenToVotes = true;
    }

}