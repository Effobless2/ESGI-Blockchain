pragma solidity >=0.4.25 <0.7.0;

contract TodoList {

    struct Candidat {
        string name;
        uint votes;
    }

    struct Election {
        string name;
        mapping (uint => Candidat) candidats;
        uint[] candidatIndexes;
        address[] alreadyVoted;
        uint candidatsCount;
    }

    Election[] elections;
    mapping (address => uint) balances;

	constructor() public {
		balances[tx.origin] = 10000;
	}

    function addElection(string memory electionName) public returns (bool success) {
        address[] memory addresses;
        elections.push(Election(electionName, addresses, 0));
        return true;
    }

    function addCandidatToElection(uint electionIndex, string memory candidateName) public returns (bool success) {
        if (elections.length <= electionIndex) return false;
        elections[electionIndex].candidats[elections[electionIndex].candidatsCount] = Candidat(candidateName, 0);
        elections[electionIndex].candidatsCount++;
        return true;
    }

    function vote(uint electionIndex, uint candidateIndex) public returns (bool success) {
        if (elections.length <= electionIndex) return false;
        // Check msg.sender not in elections.alreadyVoted
        if (elections[electionIndex].candidatsCount < candidateIndex) return false;
        elections[electionIndex].candidats[candidateIndex].votes++;
        elections[electionIndex].alreadyVoted.push(msg.sender);
        balances[msg.sender]--;
        return true;
    }

    

    struct TodoItem {
        string value;
        bool done;
    }

    TodoItem[] todoItems;

    function addTodoItem(string memory _value) public returns (bool success) {
        TodoItem memory item;
        item.value = _value;
        item.done = false;

        todoItems.push(item);
        return true;
    }

    function toggleItem(uint index) public returns (bool success) {
        if (index >= todoItems.length) return false;
        
        bool newValue = !todoItems[index].done;
        todoItems[index].done = newValue;
        return newValue;
    }
}