// SPDX-License-Identifier: MIT

// d8888b. d88888b db    db d888888b d88888b db   d8b   db      .88b  d88. d888888b d8b   db d888888b
// 88  `8D 88'     88    88   `88'   88'     88   I8I   88      88'YbdP`88   `88'   888o  88 `~~88~~'
// 88oobY' 88ooooo Y8    8P    88    88ooooo 88   I8I   88      88  88  88    88    88V8o 88    88
// 88`8b   88~~~~~ `8b  d8'    88    88~~~~~ Y8   I8I   88      88  88  88    88    88 V8o88    88
// 88 `88. 88.      `8bd8'    .88.   88.     `8b d8'8b d8'      88  88  88   .88.   88  V888    88
// 88   YD Y88888P    YP    Y888888P Y88888P  `8b8' `8d8'       YP  YP  YP Y888888P VP   V8P    YP

// By BraverElliot.eth

import './IERC721.sol';

pragma solidity ^0.8.7;

interface IMidpoint {
    function callMidpoint(uint64 midpointId, bytes calldata _data) external returns (uint256 requestId);
}

contract reviewMintContract {
    mapping(address => bool) public isVerified;
    uint64 constant midpointIDTwil = 430;

    constructor(address _lensaddress) public {
        lensaddress = _lensaddress;
    }

    event RequestMade(uint256 requestId, string user_address);
    event ResponseReceived(uint256 requestId, int256 ENScount);
    event skillset(address a, string p1, string p2, string p3, string p4);
    event ReviewAdded(address reviewer, address reviewee, string skillName, uint256 rating, string review);
    address constant startpointAddress = 0x47a4905D4C2Eabd58abBDFEcBaeB07F1A29b660c;
    address constant whitelistedCallbackAddress = 0xC0FFEE4a3A2D488B138d090b8112875B90b5e6D9;

    // Midpoint ID
    uint64 constant midpointID = 408;

    function callMidpoint(string memory user_address) public {
        // Argument String
        bytes memory args = abi.encodePacked(user_address, bytes1(0x00));

        // Call Your Midpoint
        uint256 requestId = IMidpoint(startpointAddress).callMidpoint(midpointID, args);

        // For Demonstration Purposes Only
        emit RequestMade(requestId, user_address);
    }

    /*
     * This function is the callback target specified in the prebuilt function in the midpoint response workflow.
     * The callback does not need to be defined in the same contract as the request.
     */

    function parseAddr(string memory _a) internal pure returns (address _parsedAddress) {
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint256 i = 0; i < 2 * 20; i += 2) {
            iaddr *= 256;
            b1 = uint160(uint8(tmp[i]));
            b2 = uint160(uint8(tmp[i + 1]));
            if ((b1 >= 97) && (b1 <= 102)) {
                b1 -= 87;
            } else if ((b1 >= 65) && (b1 <= 70)) {
                b1 -= 55;
            } else if ((b1 >= 48) && (b1 <= 57)) {
                b1 -= 48;
            }
            if ((b2 >= 97) && (b2 <= 102)) {
                b2 -= 87;
            } else if ((b2 >= 65) && (b2 <= 70)) {
                b2 -= 55;
            } else if ((b2 >= 48) && (b2 <= 57)) {
                b2 -= 48;
            }
            iaddr += (b1 * 16 + b2);
        }
        return address(iaddr);
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2 * i] = char(hi);
            s[2 * i + 1] = char(lo);
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }

    function verify() public payable {
        if (IERC721(lensaddress).balanceOf(msg.sender) > 0) {
            isVerified[msg.sender] = true;
        } else {
            // Argument String

            bytes memory args = abi.encodePacked(toAsciiString(msg.sender), bytes1(0x00));

            // Call Your Midpoint
            uint256 requestId = IMidpoint(startpointAddress).callMidpoint(midpointID, args);

            // For Demonstration Purposes Only
            // emit RequestMade(requestId, (msg.sender));
        }
    }

    function callback(
        uint256 _requestId,
        uint64 _midpointId,
        int256 ENScount,
        string memory user_address
    ) public {
        // Only allow the verified callback address to submit information for your midpoint.
        require(tx.origin == whitelistedCallbackAddress, 'Invalid callback address');
        require(midpointID == _midpointId, 'Invalid Midpoint ID');

        // Your callback function here
        if (ENScount > 0) {
            isVerified[parseAddr(user_address)] = true;
        } else {
            isVerified[parseAddr(user_address)] = false;
        }
        // For Demonstration Purposes Only
        emit ResponseReceived(_requestId, ENScount);
    }

    mapping(address => string) public phoneVerify;
    mapping(address => bool) public isphoneVerify;

    mapping(address => uint256) public skillRating1;
    mapping(address => uint256) public skillRating2;
    mapping(address => uint256) public skillRating3;
    mapping(address => uint256) public skillRating4;

    mapping(address => uint256) public skillRatingnumber1;
    mapping(address => uint256) public skillRatingnumber2;
    mapping(address => uint256) public skillRatingnumber3;
    mapping(address => uint256) public skillRatingnumber4;

    mapping(address => string) public skillName1;
    mapping(address => string) public skillName2;
    mapping(address => string) public skillName3;
    mapping(address => string) public skillName4;

    mapping(address => bool) public hasSetSkills;

    address lensaddress;

    function setPhone(string memory _phone) public {
        require(isVerified[msg.sender] = true, 'user does not hold lens nft or ens nft');
        phoneVerify[msg.sender] = _phone;
        isphoneVerify[msg.sender] = true;
        bytes memory sendermsg = bytes(toAsciiString(msg.sender));
        bytes memory messageee = bytes.concat('0x', sendermsg, ' just got signed up!');
        string memory recipient = _phone;
        // Argument String
        bytes memory args = abi.encodePacked(string(recipient), bytes1(0x00), messageee, bytes1(0x00));

        // Call Your Midpoint
        uint256 requestId = IMidpoint(startpointAddress).callMidpoint(midpointIDTwil, args);

        // For Demonstration Purposes Only
        // emit RequestMade(requestId, recipient, messageee);
    }

    function setSkills(
        string memory _skillName1,
        string memory _skillName2,
        string memory _skillName3,
        string memory _skillName4
    ) public payable {
        require(isVerified[msg.sender] = true, 'user does not hold lens nft or ens nft');

        skillName1[msg.sender] = _skillName1;
        skillName2[msg.sender] = _skillName2;
        skillName3[msg.sender] = _skillName3;
        skillName4[msg.sender] = _skillName4;
        hasSetSkills[msg.sender] = true;

        emit skillset(msg.sender, _skillName1, _skillName2, _skillName3, _skillName4);
    }

    function addReview(
        address reviewaddy,
        uint256 _rating1,
        uint256 _rating2,
        uint256 _rating3,
        uint256 _rating4,
        string memory review1,
        string memory review2,
        string memory review3,
        string memory review4
    ) public payable {
        require(hasSetSkills[reviewaddy] = true, 'user has not set skills');
        require(isVerified[msg.sender] = true, 'user does not hold lens nft or ens nft');

        skillRating1[reviewaddy] += _rating1;
        skillRating2[reviewaddy] += _rating2;
        skillRating3[reviewaddy] += _rating3;
        skillRating4[reviewaddy] += _rating4;

        if (_rating1 == 0) {
            skillRatingnumber1[reviewaddy] += 0;
        } else {
            skillRatingnumber1[reviewaddy] += 1;
        }
        if (_rating2 == 0) {
            skillRatingnumber1[reviewaddy] += 0;
        } else {
            skillRatingnumber2[reviewaddy] += 1;
        }
        if (_rating3 == 0) {
            skillRatingnumber1[reviewaddy] += 0;
        } else {
            skillRatingnumber3[reviewaddy] += 1;
        }
        if (_rating4 == 0) {
            skillRatingnumber1[reviewaddy] += 0;
        } else {
            skillRatingnumber4[reviewaddy] += 1;
        }
        if (isphoneVerify[msg.sender] = true) {
            bytes memory sendermsg = bytes(toAsciiString(msg.sender));
            bytes memory messageee = bytes.concat('0x', sendermsg, ' just reviewed you!');
            string memory recipient = phoneVerify[reviewaddy];
            // Argument String
            bytes memory args = abi.encodePacked(string(recipient), bytes1(0x00), messageee, bytes1(0x00));

            // Call Your Midpoint
            uint256 requestId = IMidpoint(startpointAddress).callMidpoint(midpointIDTwil, args);

            // For Demonstration Purposes Only
            // emit RequestMade(requestId, message, phoneVerify[reviewaddy]);
        }
        emit ReviewAdded(msg.sender, reviewaddy, skillName1[reviewaddy], _rating1, review1);
        emit ReviewAdded(msg.sender, reviewaddy, skillName2[reviewaddy], _rating2, review2);
        emit ReviewAdded(msg.sender, reviewaddy, skillName3[reviewaddy], _rating3, review3);
        emit ReviewAdded(msg.sender, reviewaddy, skillName4[reviewaddy], _rating4, review4);
    }
}
