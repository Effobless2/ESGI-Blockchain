pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SmartElection.sol";

contract TestSmartElection {

    function testGetAllElections() public {
        SmartElection smartElect = SmartElection(DeployedAddresses.SmartElection());
        SmartElection.Election[] memory expected;

        Assert.equal(smartElect.getAllElections().length, 0,"at least one election found");
    }

    function testAddOpenElection() public{
        SmartElection smartElect = SmartElection(DeployedAddresses.SmartElection());
        smartElect.addOpenElection("myElection", 7);

        Assert.equal(smartElect.getAllElections().length, 1,"at least two elections found");
    }

    function testAddCandidatToElection() public {
        SmartElection smartElect = SmartElection(DeployedAddresses.SmartElection());
        smartElect.addOpenElection("myElection", 7);

        Assert.equal(smartElect.addCandidatToElection(0, "toto"), true, "Candidat not add");
    }

/*    function testVote() public {
        SmartElection smartElect = SmartElection(DeployedAddresses.SmartElection());
        smartElect.addOpenElection("myElection", 7);
        smartElect.addCandidatToElection(0, "toto");
        uint[] memory vote;
        vote.length = 2;
        vote[0] = 0;
        vote[1] = 1;
        smartElect.lockElection(0);

        Assert.equal(smartElect.vote(0, vote), true, "Candidat not add");
    }
*/
}
